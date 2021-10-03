import React, {
  FC,
  useCallback,
  useMemo,
  Fragment,
  useState,
  useEffect,
} from 'react'
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
  ShippingMethod,
  Order as OrderType,
  OrderTypes,
} from '../typings'
import { useAltIntl, Message } from '../intlConfig'
import ProductList, { UISection } from './order/ProductList'
import Totalizer from './Totalizer'
import OrderSummary from './OrderSummary'
import PaymentSelector from './customer/PaymentSelector'
import { useTenantConfig } from '../contexts/TenantContext'
import { generateLink, log, isTenantOpen } from '../utils'
import SelectShipping from './order/SelectShipping'
import { addOrder, useOrder } from '../contexts/order/OrderContext'
import { useInitialShipping } from './order/useInitialShipping'
import SEO from './SEO'
import TenantHeader from './order/TenantHeader'

const { Footer } = Layout
const { TextArea } = Input
const { Item } = Form

interface TempFormData extends WorldAddress {
  name: string
  info?: string
  shippingMethod?: ShippingMethod
}

type Props = {
  mode?: OrderTypes
}

const Order: FC<Props> = ({ mode }) => {
  const intl = useAltIntl()
  const [debug] = useQueryParam('debug', BooleanParam)
  const [orderForm] = Form.useForm()
  const { tenant, loading, products, tenantId } = useTenantConfig()
  const [{ order }, dispatch] = useOrder()
  const shippingAddress = order?.shipping?.address
  const [isAddressOnViewport, setAddressOnViewport] = useState(false)

  // Dirty hack to initially select a shipping method
  useInitialShipping(tenant, order, dispatch)

  useEffect(() => {
    if (mode && order?.type !== mode) {
      dispatch({
        type: 'SET_PARTIAL_ORDER',
        args: {
          type: mode,
        },
      })
    }
  }, [mode, order, dispatch])

  const insertOrder = useCallback(() => {
    if (!order || !tenant) return

    try {
      const analytics = firebase.analytics()

      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      analytics.logEvent('purchase', {
        tenant: tenant?.name,
        value: order.totalizers?.totalPrice ?? 0 / 100,
        type: 'indoor',
        currency: 'BRA',
      })
    } catch (e) {
      log(e)
      log('Erro ao enviar evento ao Analytics')
    }

    addOrder(dispatch, { order, tenantId })
  }, [dispatch, order, tenant, tenantId])

  const sendToWhatsapp = useCallback(() => {
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

  const hasValidOrder =
    (order?.totalizers?.totalPrice ?? 0) > 0 && order?.payment

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

    const productsMap = productItems.filter(Boolean).reduce((acc, product) => {
      acc[product.id ?? ''] = product

      return acc
    }, {} as Record<string, Product>)

    return tenant?.sites?.zap.categoryIds
      .filter(({ visible }) => !!visible)
      .map((index) => ({
        category: categoryItems[index.element],
        categoryIndex: index.element,
      }))
      .filter(({ category }) => category.live)
      .map(({ category, categoryIndex }) => {
        const { name } = category
        const productIds = tenant?.sites?.zap.productMap[categoryIndex] ?? []

        return {
          name,
          slug: slugify(name, { lower: true }),
          products: productIds
            .filter(({ visible }) => visible)
            .map(({ element }) => productsMap[element])
            .filter(({ live }) => !!live),
        } as UISection
      })
      .filter(({ products: sectionProducts }) => !!sectionProducts?.length)
  }, [products, tenant, fallbackProducts])

  const tenantOpen =
    (tenant?.live && isTenantOpen(tenant?.openingHours ?? { intervals: [] })) ||
    debug

  return (
    <div>
      <SEO title={tenant?.name} />
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
            <div className="ma3">
              <Alert
                type="warning"
                className="ma3"
                message={intl.formatMessage({ id: 'order.closedForBuzz' })}
              />
            </div>
          )}
          {(tenantOpen || tenant?.showOnClose) && (
            <Layout className="pb3">
              <TenantHeader />
              <div
                className="flex justify-center"
                style={{ marginTop: '10px' }}
              >
                <div className="w-100 ph2 ph0-l w-50-l">
                  {!tenantOpen && (
                    <Alert
                      type="warning"
                      message={intl.formatMessage({ id: 'order.semiClosed' })}
                    />
                  )}
                  <ProductList sections={sections ?? []} />
                  <Divider />
                  <Form
                    scrollToFirstError
                    onFinish={() => {
                      const fn =
                        mode === 'INDOOR' ? insertOrder : sendToWhatsapp

                      fn()
                    }}
                    form={orderForm}
                    onValuesChange={(_, data) => {
                      const formData = data as TempFormData

                      const { name, info, shippingMethod } = formData

                      const partialOrder: Partial<OrderType> = {
                        customer: {
                          name,
                        },
                        info,
                        ...(shippingMethod && {
                          shipping: {
                            type: shippingMethod,
                            address: shippingAddress,
                            price:
                              shippingMethod === 'DELIVERY'
                                ? tenant?.shippingStrategies?.deliveryFixed
                                    ?.price ?? 0
                                : 0,
                          },
                        }),
                      }

                      dispatch({
                        type: 'SET_PARTIAL_ORDER',
                        args: partialOrder,
                      })
                    }}
                    layout="vertical"
                  >
                    {mode !== 'INDOOR' && (
                      <SelectShipping
                        id="shipping-selector"
                        onViewPort={(isIt) => setAddressOnViewport(isIt)}
                      />
                    )}
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
                    {!!order?.items.length && (
                      <>
                        <Affix offsetBottom={-5} className="mt4">
                          <Totalizer
                            order={order}
                            shouldDisplayButton={!isAddressOnViewport}
                          />
                        </Affix>
                        <OrderSummary order={order} />
                        <Divider />
                        {mode !== 'INDOOR' && <PaymentSelector />}
                      </>
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
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://alt-zap.vercel.app"
                >
                  Crie o seu!
                </a>
              </Footer>
            </Layout>
          )}
        </Fragment>
      )}
    </div>
  )
}

export default Order
