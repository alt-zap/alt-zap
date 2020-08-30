import React, { FC, useCallback, useState, useMemo } from 'react'
import { Button, Form, Divider, Input, Switch, Skeleton, message } from 'antd'
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons'

import ImageUpload from '../../common/ImageUpload'
import { Message, useAltIntl } from '../../../intlConfig'
import { PaymentMethod } from '../../../typings'
import {
  useTenantConfig,
  useTenantDispatch,
  setPaymentMethods,
} from '../../../contexts/TenantContext'

const { Item } = Form

type FormData = { paymentMethods: PaymentMethod[] }

const PaymentMethods: FC = () => {
  const [loading, setLoading] = useState(false)

  const intl = useAltIntl()
  const { tenantId, tenant, loading: tenantLoading } = useTenantConfig()
  const dispatch = useTenantDispatch()

  const handleSavePaymentMethods = useCallback(
    ({ paymentMethods }: FormData) => {
      setLoading(true)

      setPaymentMethods(dispatch, {
        paymentMethods,
        tenantId,
      })
        .then(() => {
          message.success(
            intl.formatMessage({ id: 'tenant.paymentForm.success' })
          )
        })
        .catch((error: string) => {
          message.error(
            error || intl.formatMessage({ id: 'tenant.paymentForm.error' })
          )
        })
        .finally(() => {
          setLoading(false)
        })
    },
    [dispatch, tenantId, intl]
  )

  const initialValues = useMemo(() => {
    if (!tenant) return {}

    return {
      paymentMethods: tenant.paymentMethods,
    }
  }, [tenant])

  return (
    <div className="w-90 w-50-l bg-white mv2 ml4-l ml-0 pb3 ph3 br1">
      <Divider>
        <Message id="tenant.paymentMethods" />
      </Divider>
      {tenantLoading ? (
        <Skeleton active />
      ) : (
        <Form
          autoComplete="off"
          layout="vertical"
          initialValues={initialValues}
          onFinish={(data) => {
            handleSavePaymentMethods(data as FormData)
          }}
        >
          <Form.List name="paymentMethods">
            {(fields, { add, remove }) => (
              <div>
                {fields.map((field) => (
                  <div
                    key={field.key}
                    className="flex flex-column bg-light-gray br3 pa2 mt3"
                    style={{ borderWidth: '1px' }}
                  >
                    <div className="flex">
                      <div className="w-50 w-70-l">
                        <Item
                          {...field}
                          className="w-100"
                          name={[field.name, 'name']}
                          fieldKey={[field.fieldKey, 'name']}
                          label={<Message id="tenant.paymentForm.name" />}
                          rules={[{ required: true }]}
                        >
                          <Input
                            size="large"
                            disabled={loading}
                            placeholder={intl.formatMessage({
                              id: 'tenant.paymentForm.namePlaceholder',
                            })}
                          />
                        </Item>
                      </div>
                      <div className="w-50 w-30-l pl3">
                        <Item
                          {...field}
                          name={[field.name, 'checksForChange']}
                          fieldKey={[field.fieldKey, 'checksForChange']}
                          label={
                            <Message id="tenant.paymentForm.checkForChange" />
                          }
                          valuePropName="checked"
                          initialValue={false}
                          rules={[{ required: true }]}
                        >
                          <Switch disabled={loading} />
                        </Item>
                      </div>
                    </div>
                    <div>
                      <Item
                        {...field}
                        name={[field.name, 'description']}
                        fieldKey={[field.fieldKey, 'description']}
                        label={<Message id="tenant.paymentForm.desc" />}
                      >
                        <Input.TextArea disabled={loading} />
                      </Item>
                    </div>
                    <div>
                      <Item
                        {...field}
                        name={[field.name, 'imgSrc']}
                        fieldKey={[field.fieldKey, 'imgSrc']}
                        label={<Message id="tenant.paymentForm.imgSrc" />}
                      >
                        <ImageUpload large disabled={loading} />
                      </Item>
                    </div>
                    <DeleteOutlined
                      className="pa3 red"
                      alt="Remover"
                      onClick={() => {
                        remove(field.name)
                      }}
                    />
                  </div>
                ))}
                <div className="mt3">
                  <Form.Item>
                    <Button
                      type="dashed"
                      onClick={() => {
                        add()
                      }}
                      block
                    >
                      <PlusOutlined /> <Message id="tenant.paymentForm.add" />
                    </Button>
                  </Form.Item>
                </div>
              </div>
            )}
          </Form.List>

          <Form.Item>
            <Button
              loading={loading}
              size="large"
              type="primary"
              htmlType="submit"
              block
            >
              <Message id="save" />
            </Button>
          </Form.Item>
        </Form>
      )}
    </div>
  )
}

export default PaymentMethods
