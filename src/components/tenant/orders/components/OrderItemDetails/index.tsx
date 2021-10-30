import React, { FC, useMemo } from 'react'
import { Table } from 'antd'
import { Order } from '@src/typings'
import { hasQuantity } from '@src/utils'

import { useTableColumns, useTableData } from './hooks'
import type { TableItem } from './hooks'

interface Props {
  order: Order
}

const columns = useTableColumns()

export const OrderItemDetails: FC<Props> = ({ order }) => {
  const itemsToDisplay = useMemo(() => order?.items?.filter(hasQuantity), [
    order,
  ])

  const tableData = useTableData(itemsToDisplay)

  return (
    <div className="flex">
      <Table<TableItem>
        size="small"
        style={{ width: '100%' }}
        defaultExpandAllRows
        columns={columns}
        dataSource={tableData}
        pagination={false}
      />
    </div>
  )
}
