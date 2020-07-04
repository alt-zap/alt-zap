import React from "react"
import { Button } from "antd"
import { withTheme } from "@rjsf/core"
import { Theme as AntDTheme } from "@rjsf/antd"
import MaskedInput from "./MaskedInput"
import tenantConfigSchema from "../schemas/tenantConfigSchema"

import { RealMask } from '../util/masks'

const Form = withTheme(AntDTheme)

export default ({ initialValue, ...props }) => {
  return (
    <div className="flex flex-column w-100 bg-light-gray br3 pa2 tc">
      <Form
        schema={tenantConfigSchema}
        uiSchema={uiSchema}
        formData={initialValue}
        {...props}
      >
        <Button type="primary" size="large" htmlType="submit">
          Salvar Dados
        </Button>
      </Form>
    </div>
  )
}

const CurrencyInput = ({ value, onChange, ...props }) => {
  return (
    <MaskedInput
      experimentalNumber
      mask={RealMask}
      value={value}
      onChange={e => onChange(e.target.value)}
    />
  )
}

const uiSchema = {
  paymentMethods: {
    items: {
      description: {
        "ui:widget": "textarea"
      }
    }
  },
  deliveryFee: {
    "ui:widget": CurrencyInput
  },
  items: {
    items: {
      price: {
        "ui:widget": CurrencyInput
      }
    }
  }
}
