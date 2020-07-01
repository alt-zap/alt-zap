import React from "react"
import { withTheme } from "@rjsf/core"
import { Theme as AntDTheme } from "@rjsf/antd"

import tenantConfigSchema from "../schemas/tenantConfigSchema"

const Form = withTheme(AntDTheme)
const log = type => console.log.bind(console, type)

const uiSchema = {
  classNames: "custom-class-name"
}

export default () => {
  return (
    <div className="flex flex-column items-center ph2">
      <h1>Bem vindo</h1>
      <div className="flex flex-column w-100 bg-light-gray br3 pa2 tc">
        <Form
          schema={tenantConfigSchema}
          uiSchema={uiSchema}
          onChange={log("changed")}
          onSubmit={log("submitted")}
          onError={log("errors")}
        />
      </div>
    </div>
  )
}

const firstData = {
  paymentMethods: [
    {
      name: "À vista",
      checksForChange: true
    },
    {
      name: "Nubank",
      imgSrc: "https://i.imgur.com/Gdqzo24.png",
      description: "Aqui vai ser textares"
    }
  ],
  items: [
    {
      items: ["Muito bom", "Gostoso"],
      name: "O Pioneiro",
      headline: "130g de Picanha",
      live: true,
      imgSrc: "https://i.imgur.com/Gdqzo24.png",
      price: 1591
    }
  ],
  live: true,
  deliveryFee: 500,
  name: "Alt Burguer",
  whatsapp: "5583999432457",
  slug: "altburguer-cg"
}
