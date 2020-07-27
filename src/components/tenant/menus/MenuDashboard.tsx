import React, { FC } from 'react'
import { Divider } from 'antd'

import Products from '../products/Products'
import Categories from '../categories/Categories'

const MenuDashboard: FC = () => {
  return (
    <div className="flex flex-column flex-row-l">
      <div className="w-100 w-50-l ph2">
        <Divider>Produtos</Divider>
        <Products />
      </div>
      <div className="w-100 w-50-l ph2">
        <Divider>Categorias</Divider>
        <Categories />
      </div>
    </div>
  )
}

export default MenuDashboard
