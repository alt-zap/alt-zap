import React, { FC } from 'react'
import { Card, List, Typography } from 'antd'
import { InfoCircleOutlined } from '@ant-design/icons'

const { Text } = Typography

interface TenantForList extends TenantConfig {
  id: string
}
type Props = {
  tenants: Array<Pick<TenantForList, 'name' | 'id' | 'slug' | 'items'>>
  onSelectTenant: (tenantId: string) => void
}

const TenantList: FC<Props> = ({ tenants, onSelectTenant }) => {
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
              title={
                <div className="flex flex-column">
                  <span className="fw4">{item.name}</span>
                  <Text code className="f6">{`/${item.slug}`}</Text>
                </div>
              }
              hoverable
              tabIndex={0}
              onClick={() => onSelectTenant(item.id)}
              onKeyPress={() => onSelectTenant(item.id)}
              actions={[<InfoCircleOutlined key="info" />]}
            >
              <div className="flex flex-column">
                <span>{`${item.items?.length} produtos cadastrados`}</span>
              </div>
            </Card>
          </List.Item>
        )}
      />
    </div>
  )
}

export default TenantList
