import React, { FC, useState } from 'react'
import { Divider, Table, Tag, Skeleton, Modal, Button } from 'antd'
import { EditOutlined } from '@ant-design/icons'

import { Message, useAltIntl, AltMessage } from '../../../intlConfig'
import { useTenantConfig } from '../../../contexts/TenantContext'
import { OrdersList } from './OrdersList'

const OrdersDashboard: FC = () => {
  const intl = useAltIntl()
  const { tenant, loading } = useTenantConfig()
  // For now, hardcoded to only work on Zap site
  const [editModal, setEditModal] = useState(false)

  return (
    <div className="flex flex-column flex-row-l items-center items-start-l">
      <div className="w-90 w-50-l bg-white mv2 ml4-l ml-0 pb3 ph3 br1">
        <Divider>
          <Message id="orders" />
        </Divider>
        {loading && <Skeleton active />}
        {!loading && <OrdersList />}
      </div>
      <Modal
        destroyOnClose
        title={<Message id="tenant.sites.editModal.title" />}
        visible={editModal}
        onCancel={() => setEditModal(false)}
        footer={null}
      >
        <div>Oi</div>
      </Modal>
    </div>
  )
}

export default OrdersDashboard
