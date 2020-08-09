import React, { FC, useMemo } from 'react'
import { Form, Divider, Radio } from 'antd'

import { Assembly } from '../../typings'

type Props = { assemblyOptions: Assembly[] }
const AssemblyRenderer: FC<Props> = ({ assemblyOptions }) => {
  return (
    <div className="flex flex-column items-center">
      <h2 className="tc pa2">Opções</h2>
      {assemblyOptions.map((assembly, i) => (
        <div key={i} className="w-100">
          <div className="bg-light-gray flex ph3 pv1">
            <div className="flex flex-column">
              <span className="f5 b pb0 mb0">{assembly.name}</span>
              <span className="black-40" style={{ marginTop: '-5px' }}>
                Selecione 3 opções
              </span>
            </div>
          </div>
          <Form.Item>
            <UniSelectInput options={assembly.options} />
          </Form.Item>
        </div>
      ))}
    </div>
  )
}

type UniProps = {
  value?: string
  onChange?: (data: string) => void
  options: Assembly['options']
}

function makeid(length: number) {
  let result = ''
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

  const charactersLength = characters.length

  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength))
  }

  return result
}

const UniSelectInput: FC<UniProps> = ({ value, onChange, options }) => {
  const hash = useMemo(() => makeid(5), [])

  return (
    <div className="flex flex-column">
      <Radio.Group>
        {options.map((option, i) => (
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

export default AssemblyRenderer
