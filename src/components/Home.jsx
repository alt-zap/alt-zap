import React, { useCallback, useState, useMemo } from "react"
import { Affix, Alert, Button, Divider, Input } from "antd"
import { SendOutlined } from "@ant-design/icons"

import Endereco from "./Endereco"
import Cardapio from "./Cardapio"
import Totalizer from "./Totalizer"
import OrderSummary from "./OrderSummary"
import PaymentSelector from "./PaymentSelector"

import { generateLink, eSet } from "../utils"
import config from "../config"

const { deliveryFee, items, paymentMethods } = config

export default () => {
  const [address, setAddress] = useState(null)
  const [order, setOrder] = useState([])
  const [total, setTotal] = useState(0)
  const [info, setInfo] = useState("")
  const [paymentInfo, setPayment] = useState(null)

  const enviarPedido = useCallback(() => {
    const whatsappLink = generateLink({
      address,
      order,
      paymentInfo,
      info
    })
    var win = window.open(whatsappLink, "_blank")
    win.focus()
  }, [address, order, info, paymentInfo])

  const hasOrder = useMemo(() => {
    return true
    return order.some(([, quantity]) => parseInt(quantity, 10))
  }, [order])

  return (
    <div className="App">
      <Alert
        message="No final, vamos te enviar pra o Whatsapp para você finalizar seu pedido ;)"
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
          disabled={hasOrder}
          onClick={enviarPedido}
        >
          Enviar Pedido
        </Button>
      </div>
    </div>
  )
}
