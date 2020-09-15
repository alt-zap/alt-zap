import React, { FC, useCallback, useMemo, Fragment, useEffect } from 'react'
import { Affix, Alert, Button, Form, Divider, Input, Spin, Layout } from 'antd'
import { SendOutlined } from '@ant-design/icons'
import * as firebase from 'firebase/app'
import slugify from 'slugify'
import { useQueryParam, BooleanParam } from 'use-query-params'
import 'firebase/analytics'

import {
  WorldAddress,
  Product,
  Category,
  Section,
  ShippingStrategy,
} from '../typings'
import { useAltIntl, Message } from '../intlConfig'
import ProductList from './order/ProductList'
import Totalizer from './Totalizer'
import OrderSummary from './OrderSummary'
import PaymentSelector from './customer/PaymentSelector'
import { useTenantConfig } from '../contexts/TenantContext'
import { generateLink, log, isTenantOpen } from '../utils'
import instagram from '../assets/instagram.svg'
import whatsapp from '../assets/whatsapp.svg'
import SelectShipping from './order/SelectShipping'
import { useOrder } from '../contexts/order/OrderContext'

const { Header, Footer } = Layout
const { TextArea } = Input
const { Item } = Form

interface TempFormData extends WorldAddress {
  name: string
  info?: string
  shippingMethod?: ShippingStrategy
}

const Order: FC = () => {
  const intl = useAltIntl()
  const [debug] = useQueryParam('debug', BooleanParam)

  const [orderForm] = Form.useForm()
  const { tenant, loading, products } = useTenantConfig()
  const [{ order }, dispatch] = useOrder()

  useEffect(() => {
    // Support legacy deliveryFee
    // Setup initial delivery method for tenant with only one shipping type
    // Or maybe not.
  }, [tenant])

  const enviarPedido = useCallback(() => {
    if (!order || !tenant) return

    const whatsappLink = generateLink(order, tenant)

    try {
      const analytics = firebase.analytics()

      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      analytics.logEvent('purchase', {
        tenant: tenant?.name,
        value: order.totalizers?.totalPrice ?? 0 / 100,
        currency: 'BRA',
      })
    } catch (e) {
      log(e)
      log('Erro ao enviar evento ao Analytics')
    }

    const win = window.open(whatsappLink, '_blank')

    win?.focus()
  }, [order, tenant])

  const handleAutoFill = useCallback(
    (data: Partial<WorldAddress>) => {
      orderForm.setFieldsValue({ ...data })
    },
    [orderForm]
  )

  const hasOrder = !!order?.items.length

  const hasValidOrder =
    (order?.totalizers?.totalPrice ?? 0) > 0 && order?.payment

  const { paymentMethods } = tenant ?? {}

  const fallbackProducts: Product[] = useMemo(
    () =>
      tenant?.items?.map((item) => ({
        ...item,
        userId: ',',
        description: item.items?.join('\n\n'),
        category: 0,
        highlight: false,
      })) ?? [],
    [tenant]
  )

  const sections = useMemo(() => {
    const productItems = !tenant?.migrated ? fallbackProducts : products

    const categoryItems = tenant?.migrated
      ? tenant?.categories
      : ([{ name: 'noop', slug: 'noop', live: true }] as Category[])

    if (!productItems || !categoryItems) return []

    // On a future category refact, change this.
    // We call it sections because, eventually, there'll be the
    // highlights sections that's not a category per se
    return categoryItems
      .filter(({ live }) => live)
      .map(({ name }, i) => {
        return {
          name,
          slug: slugify(name, { lower: true }),
          products: productItems.filter(
            ({ category, live }) => category === i && !!live
          ),
        }
      }) as Section[]
  }, [products, tenant, fallbackProducts])

  const tenantOpen =
    (tenant?.live && isTenantOpen(tenant?.openingHours ?? { intervals: [] })) ||
    debug

  return (
    <div>
      {loading && (
        <div className="flex flex-column items-center pt3">
          <Spin />
          <span>
            <Message id="order.loading" />
          </span>
        </div>
      )}
      {!loading && (
        <Fragment>
          {!tenantOpen && !tenant?.showOnClose && (
            <Alert
              type="warning"
              className="ma3"
              message={intl.formatMessage({ id: 'order.closedForBuzz' })}
            />
          )}
          {(tenantOpen || tenant?.showOnClose) && (
            <Layout className="pb3">
              <Header
                style={{
                  zIndex: 10,
                  width: '100%',
                  padding: '0 10px',
                }}
                className="flex justify-between tc mb3"
              >
                {tenant?.instagram ? (
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href={`https://instagram.com/${tenant?.instagram}`}
                    title="Ir para o Instagram"
                  >
                    <img src={instagram} alt="Ir para o Instagram" width="30" />
                  </a>
                ) : (
                  <div />
                )}
                <span className="fw2 f3 white">{tenant?.name}</span>
                <a
                  href={`https://wa.me/${tenant?.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Ir para o WhatsApp"
                >
                  <img
                    src={whatsapp}
                    alt="Ir para o WhatsApp"
                    width="30"
                    style={{ fill: 'white' }}
                  />
                </a>
              </Header>
              <div
                className="flex justify-center"
                style={{ marginTop: '10px' }}
              >
                <div className="w-100 ph2 ph0-l w-50-l">
                  {tenantOpen ? (
                    <Alert
                      message={intl.formatMessage({ id: 'order.alert' })}
                      type="info"
                    />
                  ) : (
                    <Alert
                      type="warning"
                      message={intl.formatMessage({ id: 'order.semiClosed' })}
                    />
                  )}
                  <ProductList sections={sections} />
                  <Divider />
                  <Form
                    scrollToFirstError
                    onFinish={() => {
                      enviarPedido()
                    }}
                    form={orderForm}
                    onValuesChange={(_, data) => {
                      const formData = data as TempFormData
                      const partialOrder = {
                        customer: {
                          name: formData.name,
                        },
                        info: formData.info,
                      }

                      dispatch({
                        type: 'SET_PARTIAL_ORDER',
                        args: partialOrder,
                      })
                    }}
                    layout="vertical"
                  >
                    <SelectShipping onAutoFill={handleAutoFill} />
                    <Divider />
                    <Item name="info" label="Outras informações?">
                      <TextArea
                        className="mv2"
                        placeholder="Ex: Tira o sal da batata frita"
                      />
                    </Item>
                    <Item
                      name="name"
                      label="Seu nome"
                      rules={[{ required: true }]}
                    >
                      <Input size="large" className="mv2" />
                    </Item>
                    <Affix offsetBottom={-5} className="mt4">
                      {hasOrder && <Totalizer order={order} />}
                    </Affix>
                    {hasOrder && <OrderSummary order={order} />}
                    <Divider />
                    {hasOrder && (
                      <PaymentSelector
                        methods={paymentMethods ?? []}
                        onPayment={(payment) => {
                          dispatch({
                            type: 'SET_PARTIAL_ORDER',
                            args: {
                              payment,
                            },
                          })
                        }}
                      />
                    )}
                    <div className="flex justify-center">
                      <Button
                        icon={<SendOutlined />}
                        htmlType="submit"
                        type="primary"
                        className="mt4"
                        size="large"
                        shape="round"
                        disabled={!hasValidOrder && !tenantOpen}
                      >
                        Enviar Pedido
                      </Button>
                    </div>
                  </Form>
                </div>
              </div>
              <Footer className="tc mt2">
                <b>Alt Zap ©2020 </b> - Gostou?{' '}
                <a href="https://alt-zap.vercel.app">Crie o seu!</a>
              </Footer>
            </Layout>
          )}
        </Fragment>
      )}
    </div>
  )
}

export default Order
