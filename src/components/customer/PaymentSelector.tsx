import React, { FC } from 'react'
import { Radio, Alert } from 'antd'
import ReactMarkdown from 'react-markdown'
import { RadioChangeEvent } from 'antd/lib/radio'

import CurrencyInput from '../common/CurrencyInput'
import { useOrder } from '../../contexts/order/OrderContext'
import { useTenant } from '../../contexts/TenantContext'
import { Message, useAltIntl } from '../../intlConfig'
import { PaymentMethod } from '../../typings'

const radioStyle = {
  height: '30px',
  lineHeight: '30px',
}

const PaymentSelector: FC = () => {
  const [{ order }, dispatch] = useOrder()
  const [{ tenant }] = useTenant()
  const intl = useAltIntl()

  const methods = tenant?.paymentMethods ?? []

  const selectedPayment = order?.payment

  const selectedPaymentHasInfo =
    !!selectedPayment?.type?.description || !!selectedPayment?.type?.imgSrc

  const shouldDisplayChangeInput = selectedPayment?.type?.checksForChange

  return (
    <div className="flex flex-column items-center w-100 mt2">
      <h2>
        <Message id="order.payment.selectPayment" />
      </h2>
      <div>
        <Radio.Group
          onChange={(e: RadioChangeEvent) => {
            const method = e.target.value as PaymentMethod

            dispatch({
              type: 'SET_PARTIAL_ORDER',
              args: {
                payment: {
                  type: method,
                  changeFor: selectedPayment?.changeFor,
                },
              },
            })
          }}
          value={selectedPayment?.type}
          className="w-100"
        >
          {methods.map((method, i) => (
            <Radio style={radioStyle} value={method} key={i} className="w-100">
              {method?.name}
            </Radio>
          ))}
        </Radio.Group>
      </div>
      {shouldDisplayChangeInput && (
        <div className="tc flex flex-column items-center">
          <h4>
            <Message id="order.payment.changeLabel" />
          </h4>
          <CurrencyInput
            valueAsString
            style={{ maxWidth: '120px' }}
            addonBefore={intl.formatMessage({ id: 'currency.symbol' })}
            value={selectedPayment?.changeFor}
            onChange={(e) => {
              if (!selectedPayment) {
                // This is never gonna happen. Just pleasing Typescript.
                return
              }

              dispatch({
                type: 'SET_PARTIAL_ORDER',
                args: {
                  payment: {
                    type: selectedPayment.type,
                    changeFor: e.target.value,
                  },
                },
              })
            }}
          />
        </div>
      )}
      {selectedPaymentHasInfo && (
        <div className="tc">
          <h4 className="mt3">
            <Message id="order.payment.info" />
          </h4>
          <div className="flex flex-column items-center">
            {selectedPayment?.type?.description && (
              <ReactMarkdown
                source={selectedPayment.type.description}
                className="pa1"
              />
            )}
            {selectedPayment?.type?.imgSrc && (
              <img
                width="250px"
                src={selectedPayment.type.imgSrc}
                alt={selectedPayment.type.name}
                className="w-70"
              />
            )}
          </div>
          <Alert
            message={intl.formatMessage({ id: 'order.payment.sendReceive' })}
            type="warning"
            className="mt4"
          />
        </div>
      )}
    </div>
  )
}

export default PaymentSelector
