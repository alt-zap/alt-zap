import React, { FC } from 'react'
import { Card, List } from 'antd'
import { EditOutlined, AlignLeftOutlined } from '@ant-design/icons'
import { useNavigate } from '@reach/router'

interface TenantForList extends TenantConfig {
  id: string
}
type Props = { tenants: Array<Partial<TenantForList>> }

const TenantList: FC<Props> = ({ tenants, on }) => {
  return (
    <div>
      <List
        grid={{
          column: 1,
        }}
        header={
          <div className="flex justify-center">
            <span className="fw2 f4">Lista de Negócios</span>
          </div>
        }
        bordered
        dataSource={tenants}
        renderItem={(item, i) => (
          <List.Item className={`${i ? '' : 'mt3'}`}>
            <Card
              title={item.name}
              hoverable
              tabIndex={0}
              onClick={() => navigate(`/tenants/${item.id}`)}
              onKeyPress={() => navigate(`/tenants/${item.id}`)}
              actions={[<EditOutlined key="edit" />]}
            >
              15 produtos cadastrados
            </Card>
          </List.Item>
        )}
      />
    </div>
  )
}

export default TenantList
