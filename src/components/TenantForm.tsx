import React, { FC, useCallback, useState } from 'react'
import { Button } from 'antd'
import { withTheme, FormProps } from '@rjsf/core'
import { Theme as AntDTheme } from '@rjsf/antd'
import slugify from 'slugify'

import MaskedInput from './MaskedInput'
import tenantConfigSchema from '../schemas/tenantConfigSchema'
import { masks } from '../constants'
import ImageUpload from './common/ImageUpload'

const Form = withTheme(AntDTheme)

interface Props
  extends Omit<FormProps<TenantConfig>, 'schema' | 'uiSchema' | 'formData'> {
  initialValue?: TenantConfig
}

type CurrencyInputProps = {
  value: string
  onChange: (data: string) => void
  disabled: boolean
  placeholder: string
}

const CurrencyInput: FC<CurrencyInputProps> = ({
  value,
  placeholder,
  onChange,
  disabled,
}) => {
  return (
    <MaskedInput
      disabled={disabled}
      experimentalNumber
      mask={masks.REAL}
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  )
}

const uiSchema = {
  slug: {
    'ui:description': 'The best password',
    'ui:placeholder': 'Preencheremos para você automaticamente',
  },
  whatsapp: {
    'ui:placeholder': 'ex: 5583998760978',
  },
  paymentMethods: {
    items: {
      description: {
        'ui:widget': 'textarea',
      },
      imgSrc: {
        'ui:widget': ImageUpload,
      },
    },
  },
  deliveryFee: {
    'ui:widget': CurrencyInput,
    'ui:placeholder': 'Preencha no formato 5,00 com os centavos',
  },
  items: {
    items: {
      price: {
        'ui:widget': CurrencyInput,
        'ui:placeholder': 'Preencha no formato 5,00 com os centavos',
      },
      imgSrc: {
        'ui:widget': ImageUpload,
      },
    },
  },
}

const TenantForm: FC<Props> = ({ initialValue, ...props }) => {
  const [formData, setFormData] = useState(initialValue)
  const [tenantName, setTenantName] = useState(initialValue?.name)

  const onChangeForm = useCallback(
    ({ formData: data }) => {
      if (data?.name && data.name !== tenantName) {
        const slug = slugify(data.name, { lower: true })

        setTenantName(data.name)
        const clone = { ...data }

        setFormData({ ...clone, slug })
      } else {
        setFormData(data)
      }
    },
    [setFormData, tenantName]
  )

  return (
    <div className="flex flex-column w-100 bg-light-gray br3 pa2 tc">
      <Form
        {...props}
        schema={tenantConfigSchema}
        uiSchema={uiSchema}
        formData={formData}
        onChange={onChangeForm}
      >
        <Button type="primary" size="large" htmlType="submit">
          Salvar Dados
        </Button>
      </Form>
    </div>
  )
}

export default TenantForm
