import React, { FC } from 'react'
import { Button, Form, Divider, Select, TimePicker } from 'antd'
import { PlusOutlined, MinusCircleOutlined } from '@ant-design/icons'

import { useAltIntl, Message } from '../../intlConfig'

const { Item } = Form
const { Option } = Select
const { RangePicker } = TimePicker

const dayOptions = [
  {
    value: 'ALL',
    label: 'Todos os dias',
  },
  {
    value: 'WEEKDAYS',
    label: 'De Seg a Sex',
  },
  {
    value: 'WEEKEND',
    label: 'Sábado e Domingo',
  },
  {
    value: 'MONDAY',
    label: 'Segunda-Feira',
  },
  {
    value: 'TUESDAY',
    label: 'Terça-Feira',
  },
  {
    value: 'WEDNESDAY',
    label: 'Quarta-Feira',
  },
  {
    value: 'THURSDAY',
    label: 'Quinta-Feira',
  },
  {
    value: 'FRIDAY',
    label: 'Sexta-Feira',
  },
  {
    value: 'SATURDAY',
    label: 'Sábado',
  },
  {
    value: 'SUNDAY',
    label: 'Domingo',
  },
]

// TODO: Make this works because the current UX sucks
// const RangePickerAuto = (
//   props: React.ComponentPropsWithoutRef<typeof RangePicker>
// ) => {
//   const onBlur = (elem: React.FocusEvent<HTMLInputElement>) => {
//     console.log(elem.target.value)
//     const value = moment(elem.target.value, props.format)

//     if (value?.isValid() && props.onChange) {
//       props.onChange(value, elem.target.value)
//     }
//   }

//   return <RangePicker {...props} onBlur={onBlur} />
// }

const OpeningHours: FC = () => {
  const intl = useAltIntl()

  return (
    <div className="w-90 w-50-l bg-white ph3 pt1 pb2 ml0 ml4-l mt2 br1">
      <Divider>
        <Message id="tenant.hours.weekTitle" />
      </Divider>
      <Form
        layout="vertical"
        onFinish={(data) => {
          // eslint-disable-next-line no-console
          console.log({ data })
        }}
      >
        <Form.List name="intervals">
          {(fields, { add, remove }) => (
            <div>
              {fields.map((field) => (
                <div
                  key={field.key}
                  className="flex flex-wrap flex-nowrap-l justify-center items-center b--black-20 b--solid pa2 pt3 mt3"
                  style={{ borderWidth: '1px' }}
                >
                  <div className="pv2-2 pv0 pr2 w-100 w-40-l">
                    <Item
                      {...field}
                      className="w-100"
                      name={[field.name, 'day']}
                      fieldKey={[field.fieldKey, 'day']}
                      label={<Message id="tenant.hours.day" />}
                      rules={[{ required: true }]}
                    >
                      <Select
                        size="large"
                        placeholder={
                          <Message id="tenant.hours.dayPlaceholder" />
                        }
                      >
                        {dayOptions.map(({ value, label }) => (
                          <Option value={value} key={value}>
                            {label}
                          </Option>
                        ))}
                      </Select>
                    </Item>
                  </div>
                  <div className="w-100 w-auto-l flex justify-between items-center">
                    <Item
                      {...field}
                      name={[field.name, 'time']}
                      fieldKey={[field.fieldKey, 'time']}
                      label={<Message id="tenant.hours.hourInterval" />}
                      rules={[{ required: true }]}
                    >
                      <RangePicker
                        picker="time"
                        size="large"
                        format="HH:mm"
                        minuteStep={15}
                      />
                    </Item>
                    <MinusCircleOutlined
                      className="pa3"
                      alt={intl.formatMessage({ id: 'tenant.hours.remove' })}
                      onClick={() => {
                        remove(field.name)
                      }}
                    />
                  </div>
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
                    <PlusOutlined /> <Message id="tenant.hours.addInterval" />
                  </Button>
                </Form.Item>
              </div>
            </div>
          )}
        </Form.List>

        <Form.Item>
          <Button type="primary" size="large" htmlType="submit" block>
            <Message id="save" />
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default OpeningHours
