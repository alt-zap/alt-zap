import React, { FC } from 'react'
import { Button, Form, Divider, Input, Switch } from 'antd'
import { PlusOutlined, MinusCircleOutlined } from '@ant-design/icons'

import ImageUpload from '../../common/ImageUpload'
import { Message, useAltIntl } from '../../../intlConfig'

const { Item } = Form

const PaymentsDashboard: FC = () => {
  const intl = useAltIntl()

  return (
    <div className="flex justify-center">
      <div className="w-90 w-50-l bg-white mv2 ml4-l ml-0 pb3 ph3 br1">
        <Divider>
          <Message id="tenant.paymentMethods" />
        </Divider>
        <Form
          layout="vertical"
          onFinish={(data) => {
            // eslint-disable-next-line no-console
            console.log({ data })
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
                      <div className="w-70">
                        <Item
                          {...field}
                          className="w-100"
                          name={[field.name, 'name']}
                          fieldKey={[field.fieldKey, 'name']}
                          label={<Message id="tenant.paymentForm.name" />}
                          rules={[{ required: true }]}
                        >
                          <Input
                            placeholder={intl.formatMessage({
                              id: 'tenant.paymentForm.namePlaceholder',
                            })}
                          />
                        </Item>
                      </div>
                      <div className="w-30 pl3">
                        <Item
                          {...field}
                          name={[field.name, 'checksForChange']}
                          fieldKey={[field.fieldKey, 'checksForChange']}
                          label={
                            <Message id="tenant.paymentForm.checkForChange" />
                          }
                          valuePropName="checked"
                          rules={[{ required: true }]}
                        >
                          <Switch />
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
                        <Input.TextArea />
                      </Item>
                    </div>
                    <div>
                      <Item
                        {...field}
                        name={[field.name, 'imgSrc']}
                        fieldKey={[field.fieldKey, 'imgSrc']}
                        label={<Message id="tenant.paymentForm.imgSrc" />}
                      >
                        <ImageUpload />
                      </Item>
                    </div>
                    <MinusCircleOutlined
                      className="pa3"
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
            <Button size="large" type="primary" htmlType="submit" block>
              <Message id="save" />
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}

export default PaymentsDashboard
