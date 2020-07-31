import React, { FC } from 'react'
import { Divider } from 'antd'

import Products from '../products/Products'
import Categories from '../categories/Categories'

const MenuDashboard: FC = () => {
  return (
    <div className="flex flex-column flex-row-l items-center items-start-l">
      <div className="w-90 w-50-l bg-white mv2 ml0 ml4-l pb3 ph3 br1">
        <Divider>Produtos</Divider>
        <Products />
      </div>
      <div className="w-90 w-50-l bg-white mv2 ml0 mh4-l pb3 ph3 br1">
        <Divider>Categorias</Divider>
        <Categories />
      </div>
    </div>
  )
}

export default MenuDashboard