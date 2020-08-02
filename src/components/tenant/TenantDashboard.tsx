import React, { FC, useState, useCallback } from 'react'
import {
  PageHeader,
  Tag,
  Button,
  Statistic,
  Row,
  Tabs,
  Modal,
  Skeleton,
} from 'antd'
import {
  CarOutlined,
  EditOutlined,
  MenuOutlined,
  ScheduleOutlined,
  DollarOutlined,
} from '@ant-design/icons'
import { useNavigate } from '@reach/router'
import { useQueryParam, StringParam } from 'use-query-params'

import { useTenantConfig } from '../../contexts/TenantContext'
import OpeningHours from './OpeningHours'
import MenuDashboard from './menus/MenuDashboard'
import LogisticsDashboard from './logistics/LogisticsDashboard'
import PaymentsDashboard from './payments/PaymentsDashboard'
import EditTenant from './EditTenant'
import { Message } from '../../intlConfig'

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
  const [tabId, setTabId] = useQueryParam('tabId', StringParam)

  const [editingMetadata, setEditMetadata] = useState(false)
  const { tenant, loading, productsLoading, products } = useTenantConfig()
  const navigate = useNavigate()

  const handleTabChange = useCallback(
    (tab) => {
      setTabId(tab)
    },
    [setTabId]
  )

  // TODO: Deal with loading state here
  return (
    <div className="flex flex-column">
      {loading && !tenant && (
        <div className="pl4 pv1 bg-white">
          <Skeleton active />
        </div>
      )}
      {tenant && (
        <PageHeader
          style={{
            backgroundColor: 'white',
          }}
          onBack={() => navigate(-1)}
          title={tenant.name}
          tags={
            <Tag color={tenant?.live ? 'blue' : 'red'}>
              {tenant.live ? 'Aberto' : 'Fechado'}
            </Tag>
          }
          extra={[
            <Button
              key="1"
              type="primary"
              onClick={() => setEditMetadata(true)}
            >
              <Message id="tenant.edit" />
              <EditOutlined />
            </Button>,
          ]}
        >
          <Row>
            {!productsLoading ? (
              <Statistic
                title={<Message id="tenant.products" />}
                value={products?.length}
                style={{ margin: '0 32px 0 0' }}
              />
            ) : (
              <Skeleton.Button active size="large" shape="square" />
            )}
            <Statistic
              title={<Message id="tenant.categories" />}
              value={tenant?.categories?.length}
            />
          </Row>
        </PageHeader>
      )}
      <Tabs
        renderTabBar={renderTabBar}
        onChange={handleTabChange}
        activeKey={tabId ?? '1'}
      >
        <TabPane
          tab={
            <span>
              <MenuOutlined />
              <Message id="tenant.sections.menu" />
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
              <Message id="tenant.sections.schedule" />
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
              <Message id="tenant.sections.logistics" />
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
              <Message id="tenant.sections.payments" />
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
  )
}

export default TenantDashboard
