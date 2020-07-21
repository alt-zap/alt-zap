import React, { FC } from 'react'
import { EditOutlined } from '@ant-design/icons'
import { PageHeader, Tag, Button, Statistic, Row, Divider } from 'antd'

import Categories from './categories/Categories'
import Products from './products/Products'
import { useTenantConfig } from '../../contexts/TenantContext'

const TenantDashboard: FC = () => {
  const { tenant } = useTenantConfig()

  return tenant ? (
    <div className="flex flex-column">
      <PageHeader
        onBack={() => window.history.back()}
        title={tenant.name}
        tags={
          <Tag color={tenant.live ? 'blue' : 'red'}>
            {tenant.live ? 'Aberto' : 'Fechado'}
          </Tag>
        }
        extra={[
          <Button key="1" type="primary">
            Editar
            <EditOutlined />
          </Button>,
        ]}
      >
        <Row>
          <Statistic
            title="Categorias"
            value="1"
            style={{ margin: '0 32px 0 0' }}
          />
          <Statistic title="Produtos" value={tenant.items?.length} />
        </Row>
      </PageHeader>
      <div className="flex flex-column flex-row-l">
        <div className="w-100 w-50-l ph2">
          <Divider>Produtos</Divider>
          <Products />
        </div>
        <div className="w-100 w-50-l ph2">
          <Divider>Categorias</Divider>
          <Categories />
        </div>
      </div>
    </div>
  ) : null
}

export default TenantDashboard
