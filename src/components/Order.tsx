import React, { FC, useCallback, useState, useMemo } from 'react'
import { Affix, Alert, Button, Divider, Input, Spin, Layout } from 'antd'
import { SendOutlined } from '@ant-design/icons'

import Address from './Address'
import ProductList from './ProductList'
import Totalizer from './Totalizer'
import OrderSummary from './OrderSummary'
import PaymentSelector from './customer/PaymentSelector'
import { useTenantConfig } from '../contexts/TenantContext'
import { generateLink, eSet } from '../utils'
import instagram from '../assets/instagram.svg'
import whatsapp from '../assets/whatsapp.svg'

const { Header, Footer } = Layout

const Order: FC = () => {
  const { tenant, loading } = useTenantConfig()
  const [address, setAddress] = useState<Address>()
  const [order, setOrder] = useState([])
  const [total, setTotal] = useState(0)
  const [name, setName] = useState('')
  const [info, setInfo] = useState('')
  const [paymentInfo, setPayment] = useState<PaymentInfo>()

  const enviarPedido = useCallback(() => {
    const { name: label, change } = paymentInfo!
    const whatsappLink = generateLink({
      whatsapp: tenant!.whatsapp,
      address: address!,
      order,
      payment: {
        label,
        change,
      },
      name,
      total,
      info,
    })

    const win = window.open(whatsappLink, '_blank')

    win!.focus()
  }, [address, order, info, paymentInfo, name, total, tenant])

  const hasOrder = useMemo(() => {
    return order.some(([, quantity]) => parseInt(quantity, 10))
  }, [order])

  const pedidoValido = useMemo(() => {
    return total > 0 && name && address && address.logradouro
  }, [total, name, address])

  const { deliveryFee, items, paymentMethods } = tenant ?? {}

  return (
    <div>
      {loading && (
        <div className="flex flex-column items-center pt3">
          <Spin />
          <span> Carregando dados...</span>
        </div>
      )}
      {!loading && tenant && !tenant.live && (
        <Alert
          type="warning"
          message="Este estabelecimento não está atendendo agora"
        />
      )}
      {!loading && tenant && tenant.live && (
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
            <span className="fw2 f3 white">{tenant.name}</span>
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
          <div className="flex justify-center" style={{ marginTop: '80px' }}>
            <div className="w-100 ph2 ph0-l w-50-l">
              <Alert
                message="No final, vamos te redirecionar pra o Whatsapp para finalizar seu pedido ;)"
                type="info"
              />
              <ProductList items={items!} onOrder={setOrder} />
              <Divider />
              <Address onAddress={setAddress} />
              <Divider />
              <span>Outras Informações?</span>
              <Input.TextArea
                value={info}
                onChange={eSet(setInfo)}
                placeholder="Ex: Tira o sal da batata frita"
                className="mv2"
              />
              <span className="mt2">Seu nome</span>
              <Input
                value={name}
                onChange={eSet(setName)}
                className="mt2"
                size="large"
              />
              <Affix offsetBottom={-5} className="mt4">
                {hasOrder && (
                  <Totalizer
                    order={order}
                    deliveryFee={deliveryFee!}
                    onTotal={setTotal}
                  />
                )}
              </Affix>
              {hasOrder && <OrderSummary order={order} />}
              <Divider />
              {hasOrder && (
                <PaymentSelector
                  methods={paymentMethods!}
                  onPayment={setPayment}
                />
              )}
              <div className="flex justify-center">
                <Button
                  icon={<SendOutlined />}
                  type="primary"
                  className="mt4"
                  size="large"
                  shape="round"
                  disabled={!pedidoValido}
                  onClick={enviarPedido}
                >
                  Enviar Pedido
                </Button>
              </div>
            </div>
          </div>
          <Footer className="tc mt2">
            <b>Alt Zap ©2020 </b> - Gostou?{' '}
            <a href="https://alt-zap.vercel.app">Crie o seu!</a>
          </Footer>
        </Layout>
      )}
    </div>
  )
}

export default Order
