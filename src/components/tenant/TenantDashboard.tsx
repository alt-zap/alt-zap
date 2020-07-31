import React, { FC, Fragment, useState } from 'react'
import { PageHeader, Tag, Button, Statistic, Row, Tabs, Modal } from 'antd'
import {
  CarOutlined,
  EditOutlined,
  MenuOutlined,
  ScheduleOutlined,
  DollarOutlined,
} from '@ant-design/icons'
import { useNavigate } from '@reach/router'

import { useTenantConfig } from '../../contexts/TenantContext'
import OpeningHours from './OpeningHours'
import MenuDashboard from './menus/MenuDashboard'
import LogisticsDashboard from './logistics/LogisticsDashboard'
import PaymentsDashboard from './payments/PaymentsDashboard'
import EditTenant from './EditTenant'

const { TabPane } = Tabs

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const renderTabBar = (props: any, DefaultTabBar: any) => (
  <DefaultTabBar
    {...props}
    className="site-custom-tab-bar"
    style={{ backgroundColor: 'white', paddingLeft: '8px' }}
  />
)

const TenantDashboard: FC = () => {
  const [editingMetadata, setEditMetadata] = useState(false)
  const { tenant } = useTenantConfig()
  const navigate = useNavigate()

  return tenant ? (
    <div className="flex flex-column">
      <PageHeader
        style={{
          backgroundColor: 'white',
        }}
        onBack={() => navigate(-1)}
        title={tenant.name}
        tags={
          <Tag color={tenant.live ? 'blue' : 'red'}>
            {tenant.live ? 'Aberto' : 'Fechado'}
          </Tag>
        }
        extra={[
          <Button key="1" type="primary" onClick={() => setEditMetadata(true)}>
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
      <Tabs defaultActiveKey="1" renderTabBar={renderTabBar}>
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
          <div className="flex justify-center justify-start-l">
            <OpeningHours />
          </div>
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
        <TabPane
          tab={
            <span>
              <DollarOutlined />
              Meios de Pagamento
            </span>
          }
          key="4"
        >
          <PaymentsDashboard />
        </TabPane>
      </Tabs>
      <Modal
        footer={null}
        visible={editingMetadata}
        onCancel={() => setEditMetadata(false)}
      >
        <EditTenant />
      </Modal>
    </div>
  ) : null
}

export default TenantDashboard
