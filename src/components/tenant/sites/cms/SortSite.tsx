/* eslint-disable no-console */
import React, { FC, useCallback, useState } from 'react'
import { Select, Form, Alert } from 'antd'

import {
  useTenant,
  getSectionsFromIds,
} from '../../../../contexts/TenantContext'
import SortCategories from './sort/SortCategories'
import SortProducts from './sort/SortProducts'

const { Option, OptGroup } = Select
const { Item } = Form

// Situação Inicial: não foi salvo nenhum ordenamento.
// Situação Normal: já foi salvo um ordenamento
// Pensar em uma forma mais genéricas para tratar "sessões"
const SortSite: FC = () => {
  const [{ tenant }] = useTenant()

  const [mode, setMode] = useState<'CATEGORIES' | 'PRODUCTS'>('CATEGORIES')
  const [category, setCategory] = useState<number | null>(null)

  const handleSortedCategories = useCallback((indexes: number[]) => {
    // For now, not using the `visible` prop
    const categoryIds = getSectionsFromIds(indexes)

    console.log('Saving', indexes)
  }, [])

  const handleSortedProducts = useCallback((ids: string[]) => {
    // For now, not using the `visible` prop
    const productIds = getSectionsFromIds(ids)

    console.log('Saving', ids)
  }, [])

  return (
    <div className="bg-white w-100">
      <div className="mv2">
        <Alert
          type="info"
          showIcon
          message="
        Para ordernar os itens, basta arrastá-los com o mouse ou com o toque. Todas
        as alterações são salvas automaticamente.
      "
        />
      </div>
      <div className="flex justify-center">
        <Form layout="vertical">
          <Item label="O que deseja ordenar?">
            <Select
              defaultValue="categories"
              style={{ width: 200 }}
              onChange={(value) => {
                if (value === 'categories') {
                  setMode('CATEGORIES')
                } else {
                  setMode('PRODUCTS')
                  const [, id] = (value as string).split('-')

                  console.log({ id })
                  setCategory(parseInt(id, 10))
                }
              }}
            >
              <Option value="categories">Ordem das Categorias</Option>
              <OptGroup label="Categorias">
                {tenant?.categories?.map(({ slug, name }, i) => (
                  <Option value={`category-${i}`} key={slug}>
                    {name}
                  </Option>
                ))}
              </OptGroup>
            </Select>
          </Item>
        </Form>
      </div>
      {mode === 'CATEGORIES' && (
        <SortCategories onSortedCategories={handleSortedCategories} />
      )}
      {mode === 'PRODUCTS' && (
        <SortProducts
          key={category ?? ''}
          selectedCategory={category ?? 0}
          onSortedProducts={handleSortedProducts}
        />
      )}
    </div>
  )
}

export default SortSite
