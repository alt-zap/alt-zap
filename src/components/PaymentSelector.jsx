import React, { useState, useEffect, useCallback, useMemo } from 'react'
import { Radio, Alert } from 'antd'
import ReactMarkdown from 'react-markdown'

import MaskedInput from './MaskedInput'

import { RealMask } from '../util/masks'

const radioStyle = {
  height: '30px',
  lineHeight: '30px',
}

export default ({ methods, onPayment }) => {
  const [selectedIndex, setSelected] = useState(null)
  const [change, setChange] = useState(null)

  useEffect(() => {
    const method = methods[selectedIndex]
    if (!method) return
    onPayment({ name: method.name, change })
  }, [onPayment, selectedIndex, methods, change])

  const onChange = useCallback(
    e => {
      const methodIndex = e.target.value
      setSelected(methodIndex)
    },
    [setSelected]
  )

  const { imgSrc, description, name } = useMemo(() => {
    return methods[selectedIndex] || {}
  }, [selectedIndex, methods])

  return (
    <div className="flex flex-column items-center w-100 mt2">
      <h2>Selecione o pagamento</h2>
      <div>
        <Radio.Group
          onChange={onChange}
          value={selectedIndex}
          className="w-100"
        >
          {methods.map(({ name, checksForChange }, i) => (
            <Radio style={radioStyle} value={i} key={i} className="w-100">
              {name}
              {checksForChange && selectedIndex === i && (
                <MaskedInput
                  placeholder="Troco para?"
                  className="ml2 w-50"
                  experimentalNumber
                  mask={RealMask}
                  value={change}
                  onChange={e => setChange(e.target.value)}
                />
              )}
            </Radio>
          ))}
        </Radio.Group>
      </div>
      <div className="tc">
        {(description || imgSrc) && <h4>Informações</h4>}
        <div className="flex flex-column items-center">
          {description && (
            <ReactMarkdown source={description} className="pa1" />
          )}
          {imgSrc && <img src={imgSrc} alt={name} className="w-70" />}
        </div>
        {(description || imgSrc) && (
          <Alert
            message="Envie o comprovante de transferência pelo Whatsapp."
            type="warning"
            className="mt4"
          />
        )}
      </div>
    </div>
  )
}
