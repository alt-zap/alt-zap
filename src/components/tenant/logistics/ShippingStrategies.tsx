import React, { FC, useState, useCallback } from 'react'
import { Button, Form, Switch, message, Skeleton } from 'antd'

import CurrencyInput from '../../common/CurrencyInput'
import {
  useTenantConfig,
  useTenantDispatch,
  setShippingStrategies,
} from '../../../contexts/TenantContext'
import { ShippingStrategies as ShippingType } from '../../../typings'
import { useAltIntl, Message } from '../../../intlConfig'

const { Item } = Form

const ShippingStrategies: FC = () => {
  const intl = useAltIntl()
  const [form] = Form.useForm()
  const [loading, setLoading] = useState(false)

  const { tenant, tenantId, loading: tenantLoading } = useTenantConfig()
  const dispatch = useTenantDispatch()

  const handleSetShipping = useCallback(
    (data: ShippingType) => {
      setLoading(true)

      setShippingStrategies(dispatch, {
        shippingStrategies: data,
        tenantId,
      })
        .then(() => {
          message.success(intl.formatMessage({ id: 'tenant.shipping.success' }))
        })
        .finally(() => {
          setLoading(false)
        })
    },
    [dispatch, setLoading, tenantId, intl]
  )

  return (
    <div className="flex flex-column">
      {tenantLoading ? (
        <Skeleton active />
      ) : (
        <Form
          form={form}
          layout="vertical"
          initialValues={tenant?.shippingStrategies}
          onFinish={(data) => handleSetShipping(data as ShippingType)}
        >
          <div
            className="b--solid b--black-20 br1 flex justify-between pa3 flex-wrap flex-nowrap-l"
            style={{ borderWidth: '1px' }}
          >
            <div className="flex flex-column w-100 w-70-l">
              <span className="fw6 f5">
                <Message id="tenant.shipping.deliveryFixed" />
              </span>
              <span className="light-silver">
                <Message id="tenant.shipping.deliveryFixedDesc" />
              </span>
            </div>
            <div className="flex w-100 w-auto-l justify-around-l justify-center items-center">
              <div className="pr2 flex flex-column">
                <Item
                  label="Preço"
                  name={['deliveryFixed', 'price']}
                  rules={[
                    ({ getFieldValue }) => ({
                      validator(rule, value) {
                        if (
                          getFieldValue(['deliveryFixed', 'active']) &&
                          typeof value === 'undefined'
                        ) {
                          return Promise.reject(
                            intl.formatMessage({
                              id: 'tenant.shipping.errorFee',
                            })
                          )
                        }

                        return Promise.resolve()
                      },
                    }),
                  ]}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'baseline',
                  }}
                >
                  <CurrencyInput
                    addonBefore="R$"
                    style={{ maxWidth: '120px' }}
                  />
                </Item>
              </div>
              <div className="w-30 w-20-l flex justify-end ml3-l">
                <Item
                  label="Ativo"
                  name={['deliveryFixed', 'active']}
                  valuePropName="checked"
                  initialValue={false}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'baseline',
                  }}
                >
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
              <span className="fw6 f5">
                <Message id="tenant.shipping.takeAway" />
              </span>
              <span className="light-silver">
                <Message id="tenant.shipping.takeAwayDesc" />
              </span>
            </div>
            <div className="w-30 pl3 w-20-l">
              <Item
                initialValue={false}
                valuePropName="checked"
                label="Ativo"
                name={['takeaway', 'active']}
              >
                <Switch />
              </Item>
            </div>
          </div>
          <Button
            loading={loading}
            size="large"
            type="primary"
            htmlType="submit"
            block
            className="mt3"
          >
            <Message id="save" />
          </Button>
        </Form>
      )}
    </div>
  )
}

export default ShippingStrategies
