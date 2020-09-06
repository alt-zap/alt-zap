import React, { FC, useCallback, useState, useMemo, Fragment } from 'react'
import { Affix, Alert, Button, Form, Divider, Input, Spin, Layout } from 'antd'
import { SendOutlined } from '@ant-design/icons'
import * as firebase from 'firebase/app'
import 'firebase/analytics'

import { WorldAddress, Product } from '../typings'
import { useAltIntl, Message } from '../intlConfig'
import ProductList from './ProductList'
import Totalizer from './Totalizer'
import OrderSummary from './OrderSummary'
import PaymentSelector from './customer/PaymentSelector'
import { useTenantConfig } from '../contexts/TenantContext'
import { generateLink, log, isTenantOpen } from '../utils'
import instagram from '../assets/instagram.svg'
import whatsapp from '../assets/whatsapp.svg'
import SelectShipping, { ShippingMethod } from './order/SelectShipping'

const { Header, Footer } = Layout
const { TextArea } = Input
const { Item } = Form

interface TempFormData extends WorldAddress {
  name: string
  info?: string
  shippingMethod?: ShippingMethod
}

/**
 * Keypoints here:
 *
 * - I'd hope to deliver the new Admin without this page/form, with all rendered by Gatsby.
 * - As it happens, it was not so trivial to implement all of the new features on the new project + setup build.
 * -  We really need to delivery an easier way for people to develop (Firebase Emulator) and lots of other stuff
 * to Andromedev folks.
 * - Now, we're TEMPORARILY supporting this page, adapting the data to use the new model.
 * - I've updated this as fast as I could... The new Order page should be localized and using Form
 *
 *  WE WON'T MAINTAIN THIS PAGE FOR LONG
 */
const Order: FC = () => {
  const intl = useAltIntl()
  const [orderForm] = Form.useForm()
  const { tenant, loading, products } = useTenantConfig()
  const [order, setOrder] = useState([])
  const [total, setTotal] = useState(0)
  const [shipping, setShipping] = useState<ShippingMethod | null>(null)
  const [paymentInfo, setPayment] = useState<PaymentInfo>()

  const enviarPedido = useCallback(
    (formData: TempFormData) => {
      const { name: label, change } = paymentInfo as PaymentInfo
      const { name, info, shippingMethod, ...address } = formData

      const whatsappLink = generateLink({
        whatsapp: tenant?.whatsapp as string,
        shippingMethod: shippingMethod as ShippingMethod,
        tenantAddress: tenant?.address as WorldAddress,
        address,
        order,
        payment: {
          label,
          change,
        },
        name,
        total,
        info,
      })

      try {
        const analytics = firebase.analytics()

        // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
        // @ts-ignore
        analytics.logEvent('purchase', {
          tenant: tenant?.name,
          value: total / 100,
          currency: 'BRA',
        })
      } catch (e) {
        log(e)
        log('Erro ao enviar evento ao Analytics')
      }

      const win = window.open(whatsappLink, '_blank')

      win?.focus()
    },
    [order, paymentInfo, total, tenant]
  )

  const handleAutoFill = useCallback(
    (data: Partial<WorldAddress>) => {
      orderForm.setFieldsValue({ ...data })
    },
    [orderForm]
  )

  const hasOrder = useMemo(() => {
    return order.some(([, quantity]) => parseInt(quantity, 10))
  }, [order])

  const pedidoValido = total > 0 && paymentInfo

  const deliveryFee =
    tenant?.shippingStrategies?.deliveryFixed?.price ?? tenant?.deliveryFee

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

  const tenantOpen =
    tenant?.live && isTenantOpen(tenant?.openingHours ?? { intervals: [] })

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
                  position: 'fixed',
                  zIndex: 1,
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
                style={{ marginTop: '80px' }}
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
                  <ProductList
                    products={!tenant?.migrated ? fallbackProducts : products}
                    onOrder={setOrder}
                  />
                  <Divider />
                  <Form
                    scrollToFirstError
                    onFinish={(data) => {
                      enviarPedido(data as TempFormData)
                    }}
                    form={orderForm}
                    onValuesChange={(_, data) => {
                      setShipping((data as TempFormData).shippingMethod ?? null)
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
                      {hasOrder && (
                        <Totalizer
                          order={order}
                          methods={tenant?.shippingStrategies}
                          selectedMethod={shipping}
                          deliveryFee={deliveryFee ?? 0}
                          onTotal={setTotal}
                        />
                      )}
                    </Affix>
                    {hasOrder && <OrderSummary order={order} />}
                    <Divider />
                    {hasOrder && (
                      <PaymentSelector
                        methods={paymentMethods ?? []}
                        onPayment={setPayment}
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
                        disabled={!pedidoValido && !tenantOpen}
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
