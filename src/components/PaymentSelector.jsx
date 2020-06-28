import React, { useState, useEffect, useCallback, useMemo } from "react"
import { Radio } from "antd"

import RealInput from "./RealInput"

const radioStyle = {
  height: "30px",
  lineHeight: "30px"
}

export default ({ total, methods: methodsObj, onPayment }) => {
  const [paymentInfo, setPaymentInfo] = useState(null)

  useEffect(() => {
    const label = paymentInfo && methodsObj[paymentInfo.method].label
    onPayment({ ...paymentInfo, label })
  }, [onPayment, paymentInfo, methodsObj])

  const onChange = useCallback(e => {
    const method = e.target.value
    setPaymentInfo({ method, change: "" })
  }, [])

  const methods = useMemo(() => {
    return Object.keys(methodsObj)
  }, [methodsObj])

  const needsChange = useMemo(() => {
    return paymentInfo && methodsObj[paymentInfo.method].checkForChange
  }, [paymentInfo, methodsObj])

  return (
    <div className="flex flex-column items-center w-100 mt2">
      <h2>Selecione o pagamento</h2>
      <div>
        <Radio.Group
          onChange={onChange}
          value={paymentInfo ? paymentInfo.method : null}
          className="w-100"
        >
          {methods
            .map(name => ({ name, ...methodsObj[name] }))
            .map(({ name, label, checkForChange }) => (
              <Radio style={radioStyle} value={name} className="w-100">
                {label}
                {checkForChange && needsChange && (
                  <RealInput
                    placeholder="Troco para?"
                    className="ml2 w-50"
                    value={paymentInfo ? paymentInfo.change : ""}
                    onChange={e => {
                      setPaymentInfo({ ...paymentInfo, change: e.target.value })
                    }}
                  />
                )}
              </Radio>
            ))}
        </Radio.Group>
      </div>
    </div>
  )
}
