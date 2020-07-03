import React, { Fragment, useCallback, useState, useMemo } from "react"
import { Affix, Alert, Button, Divider, Input, Spin } from "antd"
import { SendOutlined } from "@ant-design/icons"

import Endereco from "../components/Endereco"
import Cardapio from "../components/Cardapio"
import Totalizer from "../components/Totalizer"
import OrderSummary from "../components/OrderSummary"
import PaymentSelector from "../components/PaymentSelector"
import { useTenantConfig } from "../contexts/TenantContext"

import { generateLink, eSet } from "../utils"

export default () => {
  const { tenant, loading } = useTenantConfig()
  const [address, setAddress] = useState(null)
  const [order, setOrder] = useState([])
  const [total, setTotal] = useState(0)
  const [name, setName] = useState("")
  const [info, setInfo] = useState("")
  const [paymentInfo, setPayment] = useState(null)

  const enviarPedido = useCallback(() => {
    const { name: label, change } = paymentInfo
    const whatsappLink = generateLink({
      address,
      order,
      payment: {
        label,
        change
      },
      name,
      total,
      info
    })
    var win = window.open(whatsappLink, "_blank")
    win.focus()
  }, [address, order, info, paymentInfo, name, total])

  const hasOrder = useMemo(() => {
    return order.some(([, quantity]) => parseInt(quantity, 10))
  }, [order])

  const pedidoValido = useMemo(() => {
    return total > 0 && name && address.logradouro
  }, [total, name, address])

  const { deliveryFee, items, paymentMethods } = tenant || {}
  return (
    <div className="App">
      {loading && (
        <div className="flex flex-column items-center">
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
        <Fragment>
          <Alert
            message="No final, vamos te redirecionar pra o Whatsapp para finalizar seu pedido ;)"
            type="info"
          />
          <Cardapio items={items} onOrder={setOrder} />
          <Divider />
          <Endereco onAddress={setAddress} />
          <Divider />
          <span>Outras Informações?</span>
          <Input.TextArea
            value={info}
            onChange={eSet(setInfo)}
            placeholder="Ex: Tira o sal da batata frita"
            className="mv2"
            size="large"
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
                items={items}
                deliveryFee={deliveryFee}
                onTotal={setTotal}
              />
            )}
          </Affix>
          {hasOrder && <OrderSummary order={order} />}
          <Divider />
          {hasOrder && (
            <PaymentSelector
              total={total}
              methods={paymentMethods}
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
        </Fragment>
      )}
    </div>
  )
}
