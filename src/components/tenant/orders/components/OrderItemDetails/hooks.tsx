import Real from '@src/components/Real'
import { Order } from '@src/typings'
import { findAssembly, findOption, hasQuantity } from '@src/utils'
import { ColumnsType } from 'antd/es/table'
import React, { useCallback } from 'react'

export interface TableItem {
  label: string | { key: string; value?: string }
  quantity?: number
  price?: number
  totalPrice?: number
  children?: TableItem[]
}

export const renderPrice = (value: any) => {
  return typeof value === 'number' && value > 0 ? <Real cents={value} /> : ''
}

export const useTableColumns: () => ColumnsType<TableItem> = () => [
  {
    key: 'label',
    title: 'Item',
    dataIndex: 'label',
    render(value) {
      if (typeof value === 'string') {
        return value
      }

      return (
        <span>
          <span className="b pr2">
            {value.key}
            {value.value ? ':' : ''}
          </span>
          {value.value}
        </span>
      )
    },
  },
  {
    key: 'quantity',
    title: 'Quantidade',
    dataIndex: 'quantity',
    render(value) {
      return typeof value === 'number' ? value : '-'
    },
  },
  {
    key: 'price',
    title: 'Preço Unitário',
    dataIndex: 'price',
    render: renderPrice,
  },
  {
    key: 'totalPrice',
    title: 'Total',
    dataIndex: 'totalPrice',
    render: renderPrice,
  },
]

export const useTableData = useCallback(
  (itemsToDisplay: Order['items']): TableItem[] => {
    return itemsToDisplay.map((item, i) => ({
      key: i,
      label: item?.product.name,
      quantity: item.quantity,
      price: item.itemPrice,
      totalPrice: item.quantity * item.itemPrice,
      children: item.selectedItems.length
        ? item.selectedItems.reduce((acc, cur) => {
            if (cur.options.length === 1) {
              const option = findOption(
                item.product,
                cur.name,
                cur.options[0].name
              )

              const assembly = findAssembly(item.product, cur.name)

              acc.push({
                label: {
                  key: cur.name,
                  value: cur.options[0].name,
                },
                price: option?.price,
                quantity:
                  assembly?.type === 'REPEAT'
                    ? cur.options[0].quantity
                    : undefined,
                totalPrice:
                  option?.price && cur.options[0].quantity * option?.price,
              })
            } else {
              acc.push({
                label: { key: cur.name },
                children: cur.options.filter(hasQuantity).map((option) => {
                  const { price } = findOption(
                    item.product,
                    cur.name,
                    option.name
                  ) || { price: undefined }

                  return {
                    label: option.name,
                    quantity: option.quantity,
                    price,
                    totalPrice: price && option.quantity * price,
                  }
                }),
              })
            }

            return acc
          }, [] as TableItem[])
        : undefined,
    }))
  },
  []
)
