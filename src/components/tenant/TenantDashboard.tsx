import React, { FC } from 'react'
import { PageHeader, Tag, Button, Statistic, Row, Divider, Tabs } from 'antd'
import {
  CarOutlined,
  EditOutlined,
  MenuOutlined,
  ScheduleOutlined,
} from '@ant-design/icons'

import Categories from './categories/Categories'
import Products from './products/Products'
import { useTenantConfig } from '../../contexts/TenantContext'

const { TabPane } = Tabs

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
      <Tabs defaultActiveKey="2">
        <TabPane
          tab={
            <span>
              <MenuOutlined />
              Menu de Produtos
            </span>
          }
          key="1"
        >
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
        </TabPane>
        <TabPane
          tab={
            <span>
              <ScheduleOutlined />
              Horário de Funcionamento
            </span>
          }
          key="2"
        >
          Tab 2
        </TabPane>
        <TabPane
          tab={
            <span>
              <CarOutlined />
              Logística
            </span>
          }
          key="3"
        >
          Logística
        </TabPane>
      </Tabs>
    </div>
  ) : null
}

export default TenantDashboard
