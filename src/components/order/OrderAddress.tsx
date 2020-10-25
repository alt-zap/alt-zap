/* eslint-disable no-console */
import { DeleteOutlined } from '@ant-design/icons'
import { Button, Card } from 'antd'
import Modal from 'antd/lib/modal/Modal'
import React, { FC, useCallback, useState } from 'react'

import { useOrder } from '../../contexts/order/OrderContext'
import { WorldAddress } from '../../typings'
import AddressDisplay from '../common/AddressDisplay'
import SelectAddress from '../common/SelectAddress'

type Props = { onAddress: (data: Partial<WorldAddress>) => void }

const OrderAddress: FC<Props> = () => {
  const [modal, setModal] = useState(false)
  const [{ order }, dispatch] = useOrder()

  const selectedAddress = order?.shipping?.address
  const hasAddress = Object.keys(selectedAddress ?? {}).length > 0

  const onSelectedAddress = useCallback(
    (data: WorldAddress) => {
      dispatch({ type: 'SET_CUSTOMER_ADDRESS', args: data })
      setModal(false)
    },
    [dispatch]
  )

  return (
    <div className="flex flex-column items-center">
      {!hasAddress && (
        <>
          <span className="tc mb2">
            Você não tem nenhum endereço selecionado
          </span>
          <Button size="large" type="primary" onClick={() => setModal(true)}>
            Selecionar Endereço
          </Button>
        </>
      )}
      {hasAddress && (
        <div className="flex flex-column w-100 pa2">
          <Card
            title="Endereço Selecionado"
            className="w-100"
            actions={[<DeleteOutlined key="setting" />]}
          >
            <AddressDisplay address={selectedAddress} />
          </Card>
        </div>
      )}
      <Modal visible={modal} footer={null} onCancel={() => setModal(false)}>
        <SelectAddress onValidAddress={onSelectedAddress} />
      </Modal>
    </div>
  )
}

export default OrderAddress
