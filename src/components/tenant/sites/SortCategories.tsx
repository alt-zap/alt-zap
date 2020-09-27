import React, { FC, Fragment } from 'react'
import { Divider, Typography, List } from 'antd'

import { useTenant } from '../../../contexts/TenantContext'

const { Title } = Typography
// Situação Inicial: não foi salvo nenhum ordenamento.
// Situação Normal: já foi salvo um ordenamento
const SortCategories: FC = () => {
  const [{ tenant, products }] = useTenant()

  return (
    <div className="bg-white w-100">
      <span className="flex justify-center mt2 fw2 f4">
        Lista de Categorias
      </span>

      <List className="list pl0 ml3 mt5">
        {tenant?.categories?.map((obj) => (
          <Fragment>
            <Title level={3} className="mr6">
              {obj.name}
            </Title>
            <Divider />
          </Fragment>
        ))}
      </List>
    </div>
  )
}

export default SortCategories

// 1. Pensar no tipo para persistir a ordenação
/**
 * (ordem das categorias, e a ordem dos produtos)
 * productId =>
 *
 * [{
 *  categoryIndex: number,
 *  productsIds: [string]
 * }]
 *
 */
// 3. Adicionar os typings no Tenant
// 2. Fazer a ordenação somente das categorias
