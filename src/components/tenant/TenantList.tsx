import React, { FC, Fragment } from 'react'
import { Button, Card, List, Typography, Skeleton } from 'antd'
import { InfoCircleOutlined, PlusOutlined } from '@ant-design/icons'

const { Text } = Typography

interface TenantForList extends TenantConfig {
  id: string
}
type Props = {
  loading?: boolean
  tenants: Array<Pick<TenantForList, 'name' | 'id' | 'slug' | 'items'>>
  onSelectTenant: (tenantId: string) => void
  onAddTenant: () => void
}

const TenantList: FC<Props> = ({
  loading,
  tenants,
  onSelectTenant,
  onAddTenant,
}) => {
  return (
    <Fragment>
      <List
        grid={{
          column: 2,
          xs: 1,
          sm: 2,
        }}
        className="bg-white w-100"
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
                <span>{`${
                  item.items?.length || '0'
                } produtos cadastrados`}</span>
              </div>
            </Card>
          </List.Item>
        )}
      >
        {loading && (
          <Card
            style={{
              maxWidth: '300px',
              width: '90%',
              margin: '16px 0 10px 16px',
            }}
          >
            <Skeleton loading avatar active />
          </Card>
        )}
        <div className="pt1 pb3 flex justify-center">
          <Button icon={<PlusOutlined />} onClick={() => onAddTenant()}>
            Adicionar
          </Button>
        </div>
      </List>
    </Fragment>
  )
}

export default TenantList
