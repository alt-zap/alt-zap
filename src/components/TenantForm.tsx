import React, { FC } from 'react'
import { Button } from 'antd'
import { withTheme, FormProps } from '@rjsf/core'
import { Theme as AntDTheme } from '@rjsf/antd'
import MaskedInput from './MaskedInput'
import tenantConfigSchema from '../schemas/tenantConfigSchema'

const Form = withTheme(AntDTheme)

interface Props extends Omit<FormProps<TenantConfig>, 'schema' | 'uiSchema' | 'formData'> {
  initialValue?: TenantConfig
}

const TenantForm: FC<Props> = ({ initialValue, ...props }) => {
  return (
    <div className="flex flex-column w-100 bg-light-gray br3 pa2 tc">
      <Form
        {...props}
        schema={tenantConfigSchema}
        uiSchema={uiSchema}
        formData={initialValue}
      >
        <Button type="primary" size="large" htmlType="submit">
          Salvar Dados
        </Button>
      </Form>
    </div>
  )
}

type CurrencyInputProps = {
  value: string
  onChange: (data: string) => void
}

const CurrencyInput: FC<CurrencyInputProps> = ({
  value,
  onChange,
  ...props
}) => {
  return (
    <MaskedInput
      {...props}
      experimentalNumber
      mask="0[0],00"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  )
}

const uiSchema = {
  paymentMethods: {
    items: {
      description: {
        'ui:widget': 'textarea',
      },
    },
  },
  deliveryFee: {
    'ui:widget': CurrencyInput,
  },
  items: {
    items: {
      price: {
        'ui:widget': CurrencyInput,
      },
    },
  },
}

export default TenantForm
