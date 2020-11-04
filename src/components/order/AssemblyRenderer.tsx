import React, { FC, useState, useCallback, useMemo } from 'react'
import { Form, Divider, Radio } from 'antd'
import { RadioChangeEvent } from 'antd/lib/radio'

import { Assembly } from '../../typings'
import { generateHash } from '../../utils'
import BooleanQuantitySelector from '../common/BooleanQuantitySelector'
import LeanQuantitySelector from '../common/LeanQuantitySelector'
import { Message, useAltIntl } from '../../intlConfig'
import Real from '../Real'

type OptionState = {
  [option: string]: string
}

type Props = { assemblyOptions: Assembly[] }

const AssemblyRenderer: FC<Props> = ({ assemblyOptions }) => {
  const intl = useAltIntl()

  return (
    <div className="flex flex-column items-center">
      {(assemblyOptions ?? []).length > 0 && <h2 className="tc pa2">Opções</h2>}
      {assemblyOptions
        .filter(({ live }) => live)
        .map((assembly, i) => (
          <div key={i} className="w-100">
            <div className="bg-light-gray flex ph3 pv1 w-100">
              <div className="flex flex-column">
                <span className="f5 b pb0 mb0">
                  {assembly.name}
                  {assembly.price ? (
                    <span>
                      &nbsp; (+ <Real cents={assembly.price} />)
                    </span>
                  ) : (
                    ''
                  )}
                </span>
                <span className="black-40" style={{ marginTop: '-5px' }}>
                  <Message
                    id="order.assembly.select"
                    values={{
                      max: assembly.max,
                      min: assembly.min,
                      strict: assembly.max === assembly.min ? 'yes' : 'no',
                      range:
                        assembly.min &&
                        assembly.min > 0 &&
                        assembly.max !== assembly.min
                          ? 'yes'
                          : 'no',
                    }}
                  />
                </span>
              </div>
            </div>
            <Form.Item
              className="w-100"
              name={['assembly', assembly.name]}
              initialValue={(assembly.options ?? []).reduce(
                (acc, cur) => ({
                  ...acc,
                  [cur.name]: `${cur.initialQuantity ?? 0}`,
                }),
                {}
              )}
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
                      return Promise.reject(
                        intl.formatMessage(
                          {
                            id: 'order.assembly.lessThanMin',
                          },
                          { min: assembly.min as number }
                        )
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
                  max={assembly.max as number}
                  options={assembly.options}
                  single={assembly.type === 'SINGLE'}
                />
              )}
            </Form.Item>
          </div>
        ))}
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

  const inputValue = useMemo(
    () =>
      Object.keys(value ?? {}).find((key) => value?.[key] === '1') ??
      Object.keys(value ?? {})[0],
    [value]
  )

  return (
    <div className="flex flex-column">
      <Radio.Group value={inputValue} onChange={handleChange}>
        {(options ?? [])
          .filter(({ live }) => live)
          .map((option, i) => (
            <label htmlFor={`${hash}-${i}`} key={i}>
              <div className="pa2 w-100 dim flex justify-between items-center">
                <div className="flex flex-column">
                  <b>{option.name}</b>
                  {!!option.price && (
                    <span
                      className="gray"
                      style={{
                        marginTop: '-5px',
                      }}
                    >
                      + <Real cents={option.price} />{' '}
                    </span>
                  )}
                </div>
                <Radio id={`${hash}-${i}`} value={option.name} />
              </div>
              <Divider style={{ margin: 0 }} />
            </label>
          ))}
      </Radio.Group>
    </div>
  )
}

interface MultiProps extends UniProps {
  single?: boolean
  max: number
}

const MultiSelectInput: FC<MultiProps> = ({
  value,
  onChange,
  options,
  single,
  max,
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

  const totalSelected = useMemo(() => {
    return value
      ? Object.values(value)
          .map((stringQuantity) => parseInt(stringQuantity, 10))
          .reduce((a, b) => a + b, 0)
      : 0
  }, [value])

  return (
    <div className="flex flex-column">
      {(options ?? []).map((option, i) => (
        <label htmlFor={`${hash}-${i}`} key={i}>
          <div className="pa2 w-100 flex justify-between">
            <div className="flex flex-column">
              <b className="dim">{option.name}</b>
              {!!option.price && (
                <span
                  className="gray"
                  style={{
                    marginTop: '-5px',
                  }}
                >
                  + <Real cents={option.price} />{' '}
                </span>
              )}
            </div>
            {single ? (
              <BooleanQuantitySelector
                isMax={totalSelected === max}
                id={`${hash}-${i}`}
                quantity={value?.[option.name]}
                onQuantity={(quantity) =>
                  handleQuantityChange(option.name, quantity)
                }
              />
            ) : (
              <LeanQuantitySelector
                disabled={totalSelected === max}
                quantity={value?.[option.name]}
                onQuantity={(quantity) =>
                  handleQuantityChange(option.name, quantity ?? '0')
                }
              />
            )}
          </div>
          <Divider style={{ margin: 0 }} />
        </label>
      ))}
    </div>
  )
}

export default AssemblyRenderer
