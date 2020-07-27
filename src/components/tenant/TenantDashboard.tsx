import React, { FC } from 'react'
import { PageHeader, Tag, Button, Statistic, Row, Tabs } from 'antd'
import {
  CarOutlined,
  EditOutlined,
  MenuOutlined,
  ScheduleOutlined,
} from '@ant-design/icons'

import { useTenantConfig } from '../../contexts/TenantContext'
import OpeningHours from './OpeningHours'
import MenuDashboard from './menus/MenuDashboard'
import LogisticsDashboard from './logistics/LogisticsDashboard'

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
      <Tabs defaultActiveKey="3">
        <TabPane
          tab={
            <span>
              <MenuOutlined />
              Menu de Produtos
            </span>
          }
          key="1"
        >
          <MenuDashboard />
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
          <OpeningHours />
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
          <LogisticsDashboard />
        </TabPane>
      </Tabs>
    </div>
  ) : null
}

export default TenantDashboard
