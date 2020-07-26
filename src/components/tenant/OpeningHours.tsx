import React, { FC } from 'react'
import { Button, Form, Divider, Select, TimePicker } from 'antd'
import { PlusOutlined, MinusCircleOutlined } from '@ant-design/icons'

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
  return (
    <div className="flex justify-center">
      <div style={{ maxWidth: '600px' }}>
        <Divider>Horário Semanal</Divider>
        <Form layout="vertical" onFinish={console.log}>
          <Form.List name="intervals">
            {(fields, { add, remove }) => (
              <div>
                {fields.map((field) => (
                  <div
                    key={field.key}
                    className="flex flex-wrap justify-center items-center b--black-20 b--solid pa2 pt3 mt3"
                    style={{ borderWidth: '1px' }}
                  >
                    <div className="pv2-2 pv0 pr2 w-100 w-40-l">
                      <Item
                        {...field}
                        className="w-100"
                        name={[field.name, 'day']}
                        fieldKey={[field.fieldKey, 'day']}
                        label="Dia (ou dias)"
                        rules={[{ required: true }]}
                      >
                        <Select size="large" placeholder="Selecione o tipo">
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
                        label="Intervalo de Horas"
                        rules={[{ required: true }]}
                      >
                        <RangePicker
                          size="large"
                          format="HH:mm"
                          minuteStep={15}
                        />
                      </Item>
                      <MinusCircleOutlined
                        className="pa3"
                        alt="Remover"
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
                      <PlusOutlined /> Adicionar Intervalo
                    </Button>
                  </Form.Item>
                </div>
              </div>
            )}
          </Form.List>

          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Salvar
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}

export default OpeningHours
