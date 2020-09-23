import React, { FC } from 'react'

import { useTenant } from '../../../contexts/TenantContext'

// Situação Inicial: não foi salvo nenhum ordenamento.
// Situação Normal: já foi salvo um ordenamento
const SortCategories: FC = () => {
  const [{ tenant, products }] = useTenant()

  return <div />
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
