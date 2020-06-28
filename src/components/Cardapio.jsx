import React, { Fragment, useState, useCallback, useEffect } from "react"
import { List, Avatar, Dropdown, Typography } from "antd"
import { DownOutlined } from "@ant-design/icons"

import QuantitySelector from "./QuantitySelector"
import Real from "./Real"

const { Text } = Typography

export default ({ items, onOrder }) => {
  const [quantities, setQuantities] = useState({})
  const setForIndex = useCallback(
    i => value => setQuantities({ ...quantities, [i]: value }),
    [quantities]
  )

  useEffect(() => {
    const order = Object.keys(quantities).map(i => [
      items[i].nome,
      parseInt(quantities[i], 10),
      items[i].price
    ])
    onOrder(order)
  }, [items, onOrder, quantities])

  return (
    <div className="mt3">
      <h2 className="tc">Qual seu pedido?</h2>
      <List
        itemLayout="horizontal"
        dataSource={items.filter(({ live }) => live)}
        renderItem={({ headline, imgSrc, nome, items, price }, i) => (
          <List.Item>
            <List.Item.Meta
              avatar={<Avatar src={imgSrc} />}
              title={nome}
              description={<Description headline={headline} items={items} />}
            />
            <div className="flex flex-column items-center justify-center w-25 tc">
              <div className="tc pb1">
                <b>
                  <Real cents={price} />
                </b>
              </div>
              <QuantitySelector
                quantity={quantities[i] || "0"}
                onQuantity={setForIndex(i)}
              />
            </div>
          </List.Item>
        )}
      />
    </div>
  )
}

const Description = ({ headline, items }) => (
  <Fragment>
    <Text code className="mr1">
      {headline}
    </Text>
    {items && items.length && (
      <Dropdown overlay={<MenuForItems items={items} />}>
        <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
          Mais <DownOutlined />
        </a>
      </Dropdown>
    )}
  </Fragment>
)

const MenuForItems = ({ items }) => (
  <List
    size="small"
    className="bg-white"
    bordered
    dataSource={items}
    renderItem={item => <List.Item>{item}</List.Item>}
  />
)
