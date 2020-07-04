import React, { FC, useCallback, useState, Fragment, useEffect } from 'react'
import { Input, Select } from 'antd'

import AutoFill from './AutoFill'
import { eSet } from '../utils'

type Props = {
  onAddress: (data: Address) => void
}

const Address: FC<Props> = ({ onAddress }) => {
  const [logradouro, setLogradouro] = useState('')
  const [numero, setNumero] = useState('')
  const [complemento, setComplemento] = useState('')
  const [bairro, setBairro] = useState('')

  // Campina Grande é o meu país
  const setAddress = useCallback(({ logradouro, bairro, numero }) => {
    setLogradouro(logradouro)
    setBairro(bairro)
    setNumero(numero)
  }, [])

  useEffect(() => {
    onAddress({
      logradouro,
      numero,
      complemento,
      bairro,
    })
  }, [onAddress, logradouro, numero, complemento, bairro])

  return (
    <Fragment>
      <h2 className="tc">Selecione seu endereço</h2>
      <AutoFill onAddress={setAddress} />
      <div id="endereco" className="flex flex-column items-center mt2">
        <div className="flex mb2 w-100 justify-center">
          <span className="w-80">Logradouro</span>
          <span className="w-20 ml2">Nº</span>
        </div>
        <div className="flex w-100 justify-center">
          <Input
            size="large"
            placeholder="ex: Rua Margarida Maria Alves"
            className="w-80 mr2"
            value={logradouro}
            onChange={eSet(setLogradouro)}
          />
          <Input
            size="large"
            className="w-20"
            value={numero}
            onChange={eSet(setNumero)}
          />
        </div>
        <div className="mv2 flex w-100 justify-center">
          <span className="w-50">Complemento</span>
          <span className="w-50">Bairro</span>
        </div>
        <div className="flex w-100 justify-center">
          <Input
            size="large"
            placeholder="ex: Apto 205"
            className="w-50 mr2"
            value={complemento}
            onChange={eSet(setComplemento)}
          />
          <Input
            size="large"
            className="w-50"
            value={bairro}
            onChange={eSet(setBairro)}
          />
        </div>
        <div className="mv2 flex w-100 justify-center">
          <span className="w-60">Cidade</span>
          <span className="w-40">Estado</span>
        </div>
        <div className="flex w-100 justify-center">
          <Input
            size="large"
            value="Campina Grande"
            disabled
            className="w-60 mr2"
          />
          <Select defaultValue="lucy" className="w-40" size="large" disabled>
            <Select.Option value="lucy">Paraíba</Select.Option>
          </Select>
        </div>
      </div>
      <div />
    </Fragment>
  )
}

export default Address