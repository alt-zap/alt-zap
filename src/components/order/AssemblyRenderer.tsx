import React, { FC, useState, useCallback } from 'react'
import { Form, Divider, Radio, Button } from 'antd'
import { RadioChangeEvent } from 'antd/lib/radio'

import { Assembly } from '../../typings'
import { generateHash } from '../../utils'
import BooleanQuantitySelector from '../common/BooleanQuantitySelector'
import LeanQuantitySelector from '../common/LeanQuantitySelector'

type OptionState = {
  [option: string]: string
}

type Props = { assemblyOptions: Assembly[] }

const AssemblyRenderer: FC<Props> = ({ assemblyOptions }) => {
  return (
    <div className="flex flex-column items-center">
      <h2 className="tc pa2">Opções</h2>
      <Form
        layout="vertical"
        className="w-100"
        // eslint-disable-next-line no-console
        onFinish={(data) => console.log(data)}
      >
        {assemblyOptions
          .filter(({ live }) => live)
          .map((assembly, i) => (
            <div key={i} className="w-100">
              <div className="bg-light-gray flex ph3 pv1 w-100">
                <div className="flex flex-column">
                  <span className="f5 b pb0 mb0">{assembly.name}</span>
                  <span className="black-40" style={{ marginTop: '-5px' }}>
                    Selecione 3 opções
                  </span>
                </div>
              </div>
              <Form.Item
                className="w-100"
                name={['assembly', assembly.name]}
                rules={[
                  () => ({
                    validator(_, value) {
                      const totalQuantity = Object.values(
                        (value || {}) as OptionState
                      ).reduce(
                        (acc: number, current: string) =>
                          acc + parseInt(current, 10),
                        0
                      )

                      if (totalQuantity < (assembly.min || Math.max())) {
                        // TODO: Intl
                        return Promise.reject(
                          `Você deve selecionar pelo menos ${assembly.min} opções. `
                        )
                      }

                      return Promise.resolve()
                    },
                  }),
                ]}
              >
                {assembly.max === 1 ? (
                  <UniSelectInput options={assembly.options} />
                ) : (
                  <MultiSelectInput
                    options={assembly.options}
                    single={assembly.type === 'SINGLE'}
                  />
                )}
              </Form.Item>
            </div>
          ))}
        <Button htmlType="submit">Hit it</Button>
      </Form>
    </div>
  )
}

type UniProps = {
  value?: OptionState
  onChange?: (data: OptionState) => void
  options: Assembly['options']
}

const UniSelectInput: FC<UniProps> = ({ value, onChange, options }) => {
  const [hash] = useState(generateHash(5))

  const handleChange = useCallback(
    (e: RadioChangeEvent) => {
      onChange?.({
        [e.target.value]: '1',
      })
    },
    [onChange]
  )

  return (
    <div className="flex flex-column">
      <Radio.Group
        value={Object.keys(value ?? {})?.[0]}
        onChange={handleChange}
      >
        {options
          .filter(({ live }) => live)
          .map((option, i) => (
            <label htmlFor={`${hash}-${i}`} key={i}>
              <div className="pa2 w-100 dim flex justify-between">
                <span>{option.name}</span>
                <Radio id={`${hash}-${i}`} value={option.name} />
              </div>
              <Divider className="ma0" />
            </label>
          ))}
      </Radio.Group>
    </div>
  )
}

interface MultiProps extends UniProps {
  single?: boolean
}

const MultiSelectInput: FC<MultiProps> = ({
  value,
  onChange,
  options,
  single,
}) => {
  const [hash] = useState(generateHash(5))

  const handleQuantityChange = useCallback(
    (option: string, quantity: string) => {
      onChange?.({
        ...value,
        [option]: quantity,
      })
    },
    [onChange, value]
  )

  return (
    <div className="flex flex-column">
      {options.map((option, i) => (
        <label htmlFor={`${hash}-${i}`} key={i}>
          <div className="pa2 w-100 flex justify-between">
            <span className="dim">{option.name}</span>
            {single ? (
              <BooleanQuantitySelector
                id={`${hash}-${i}`}
                quantity={value?.[option.name]}
                onQuantity={(quantity) =>
                  handleQuantityChange(option.name, quantity)
                }
              />
            ) : (
              <LeanQuantitySelector
                quantity={value?.[option.name]}
                onQuantity={(quantity) =>
                  handleQuantityChange(option.name, quantity ?? '0')
                }
              />
            )}
          </div>
          <Divider className="ma0" />
        </label>
      ))}
    </div>
  )
}

export default AssemblyRenderer
