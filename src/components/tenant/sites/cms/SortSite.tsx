/* eslint-disable no-console */
import React, { FC, useCallback, useState } from 'react'
import { Select, Form, Alert } from 'antd'

import { useTenant, setTenantData } from '../../../../contexts/TenantContext'
import SortCategories from './sort/SortCategories'
import SortProducts from './sort/SortProducts'
import { useAltIntl } from '../../../../intlConfig'
import { Section, TenantConfig } from '../../../../typings'

const { Option, OptGroup } = Select
const { Item } = Form

/**
 * Some notes about this component
 *
 * - We hold local state and lazily updates the remote server
 */
const SortSite: FC = () => {
  const [{ tenant, tenantId }, dispatch] = useTenant()
  const intl = useAltIntl()

  const [mode, setMode] = useState<'CATEGORIES' | 'PRODUCTS'>('CATEGORIES')
  const [category, setCategory] = useState<number | null>(null)

  const handleSortedCategories = useCallback(
    (categoryIds: Array<Section<number>>) => {
      const sites: TenantConfig['sites'] = {
        zap: {
          categoryIds,
          productMap: tenant?.sites?.zap?.productMap ?? [],
        },
      }

      setTenantData(dispatch, { tenantId, tenantData: { sites } })
    },
    [tenant, tenantId, dispatch]
  )

  const handleSortedProducts = useCallback(
    (productIds: Array<Section<string>>) => {
      // Pleasing the TS compiler
      if (category === null || category === undefined) {
        return
      }

      const sites: TenantConfig['sites'] = {
        zap: {
          categoryIds: tenant?.sites?.zap.categoryIds ?? [],
          productMap: {
            ...tenant?.sites?.zap?.productMap,
            [category]: productIds,
          },
        },
      }

      setTenantData(dispatch, { tenantId, tenantData: { sites } })
    },
    [tenant, tenantId, dispatch, category]
  )

  return (
    <div className="bg-white w-100">
      <div className="mv2">
        <Alert
          type="info"
          showIcon
          message={intl.formatMessage({ id: 'tenant.sites.sort.info' })}
        />
      </div>
      <div className="flex justify-center mt4">
        <Form layout="vertical">
          <Item label={intl.formatMessage({ id: 'tenant.sites.sort.label' })}>
            <Select
              defaultValue="categories"
              style={{ width: 200 }}
              onChange={(value) => {
                if (value === 'categories') {
                  setMode('CATEGORIES')
                } else {
                  setMode('PRODUCTS')
                  const [, id] = (value as string).split('-')

                  setCategory(parseInt(id, 10))
                }
              }}
            >
              <Option value="categories">
                {intl.formatMessage({ id: 'tenant.sites.sort.categories' })}
              </Option>
              <OptGroup
                label={intl.formatMessage({
                  id: 'tenant.sites.sort.categories',
                })}
              >
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
