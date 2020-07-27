import React, { FC, useState } from 'react'
import { Button, Form, Switch } from 'antd'

import CurrencyInput from '../../common/CurrencyInput'

const { Item } = Form

const ShippingStrategies: FC = () => {
  const [deliveryFee, setFee] = useState(0)
  const [loading, setLoading] = useState(false)

  return (
    <div className="flex flex-column">
      <div
        className="b--solid b--black-20 br1 flex justify-between pa3 flex-wrap"
        style={{ borderWidth: '1px' }}
      >
        <div className="flex flex-column">
          <span className="fw6 f5">Entrega com preço fixo</span>
          <span className="light-silver">
            Caso você determine um valor, este será somado automaticamente em
            cada compra caso o cliente escolha por Entrega
          </span>
        </div>
        <div className="flex w-100 w-auto-l justify-center items-center">
          <div className="pr2 flex flex-column">
            <Item label="Preço">
              <CurrencyInput
                addonBefore="R$"
                value={deliveryFee}
                // TODO: Mudar o tipo de Currency Input
                // TODO: Tem que ajeitar o layout no mobile
                onChange={(e) => setFee((e.target.value as unknown) as number)}
              />
            </Item>
          </div>
          <div className="w-20 w-10-l">
            <Item label="Ativo">
              <Switch />
            </Item>
          </div>
        </div>
      </div>
      <div
        className="b--solid b--black-20 br1 mt2 pa3 flex justify-between"
        style={{ borderWidth: '1px' }}
      >
        <div className="flex flex-column">
          <span className="fw6 f5">Retirada no Local</span>
          <span className="light-silver">
            O cliente poderá visualizar o endereço da sua unidade. Não é
            adicionada nenhuma taxa no pedido
          </span>
        </div>
        <div className="w-30 w-10-l">
          <Item label="Ativo">
            <Switch />
          </Item>
        </div>
      </div>
      <Button
        loading={loading}
        size="large"
        type="primary"
        block
        className="mt3"
      >
        Salvar
      </Button>
    </div>
  )
}

export default ShippingStrategies
