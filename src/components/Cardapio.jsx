import React, { Fragment, useState, useCallback, useEffect } from 'react'
import { List, Dropdown, Typography } from 'antd'
import { DownOutlined } from '@ant-design/icons'

import ProductImage from './customer/ProductImage'
import QuantitySelector from './QuantitySelector'
import Real from './Real'

const { Text } = Typography

export default ({ items, onOrder }) => {
  const [quantities, setQuantities] = useState({})
  const setForIndex = useCallback(
    i => value => setQuantities({ ...quantities, [i]: value }),
    [quantities]
  )

  useEffect(() => {
    const order = Object.keys(quantities).map(i => [
      items[i].name,
      parseInt(quantities[i], 10),
      items[i].price,
    ])
    onOrder(order)
  }, [items, onOrder, quantities])

  return (
    <div className="mt3">
      <h2 className="tc">Qual seu pedido?</h2>
      <List
        itemLayout="horizontal"
        dataSource={items ? items.filter(({ live }) => live) : []}
        renderItem={({ headline, imgSrc, name, items, price }, i) => (
          <List.Item>
            <List.Item.Meta
              className="items-center"
              avatar={<ProductImage src={imgSrc} title={name} />}
              title={name}
              description={<Description headline={headline} items={items} />}
            />
            <div className="flex flex-column items-center justify-center w-25 tc">
              <div className="tc pb1">
                <b>
                  <Real cents={price} />
                </b>
              </div>
              <QuantitySelector
                quantity={quantities[i] || '0'}
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
  <div className="flex flex-column">
    {headline && <Text code>{headline}</Text>}
    {items && items.length && (
      <Dropdown overlay={<MenuForItems items={items} />}>
        <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
          Detalhes <DownOutlined />
        </a>
      </Dropdown>
    )}
  </div>
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
