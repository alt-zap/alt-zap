/* eslint-disable no-console */
import { Button } from 'antd'
import Modal from 'antd/lib/modal/Modal'
import React, { FC, useState } from 'react'

import { WorldAddress } from '../../typings'
import SelectAddress from '../common/SelectAddress'

type Props = { onAddress: (data: Partial<WorldAddress>) => void }

const OrderAddress: FC<Props> = () => {
  const [modal, setModal] = useState(false)

  return (
    <div className="flex flex-column items-center">
      <span className="tc">Você não tem nenhum endereço selecionado</span>
      <Button type="primary" onClick={() => setModal(true)}>
        Selecionar Endereço
      </Button>
      <Modal visible={modal} footer={null}>
        <SelectAddress onValidAddress={(data) => console.log(data)} />
      </Modal>
    </div>
  )
}

export default OrderAddress
