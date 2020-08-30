import React, { FC, useState, useCallback, useMemo, useEffect } from 'react'
import {
  PageHeader,
  Tag,
  Button,
  Statistic,
  Row,
  Tabs,
  Modal,
  Skeleton,
  Tooltip,
  Alert,
} from 'antd'
import {
  CarOutlined,
  EditOutlined,
  MenuOutlined,
  ScheduleOutlined,
  DollarOutlined,
  WarningOutlined,
} from '@ant-design/icons'
import { useNavigate } from '@reach/router'
import { useQueryParam, StringParam } from 'use-query-params'

import { useTenantConfig } from '../../contexts/TenantContext'
import OpeningHours from './OpeningHours'
import MenuDashboard from './menus/MenuDashboard'
import LogisticsDashboard from './logistics/LogisticsDashboard'
import PaymentsDashboard from './payments/PaymentsDashboard'
import EditTenant from './EditTenant'
import { Message, useAltIntl } from '../../intlConfig'
import Pendencies, { pendenciesTest } from './Pendencies'
import { isTenantOpen, useInterval, log } from '../../utils'
import { useAuth } from '../../contexts/auth/AuthContext'

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
  const intl = useAltIntl()
  const [tabId, setTabId] = useQueryParam('tabId', StringParam)
  const [{ userDb }] = useAuth()

  const [isOpen, setOpen] = useState(false)
  const [editingMetadata, setEditMetadata] = useState(false)
  const [pendenciesModal, setPendenciesModal] = useState(false)

  const tenantContext = useTenantConfig()
  const { tenant, loading, productsLoading, products } = tenantContext

  const navigate = useNavigate()

  const handleTabChange = useCallback(
    (tab) => {
      setTabId(tab)
    },
    [setTabId]
  )

  const tenantPendencies = useMemo(
    () => pendenciesTest.filter(({ test }) => test(tenantContext)),
    [tenantContext]
  )

  useEffect(() => {
    if (!userDb?.document) {
      navigate('/onboard')
    }
  }, [userDb, navigate])

  useEffect(() => {
    setOpen(tenant?.openingHours ? isTenantOpen(tenant?.openingHours) : false)
  }, [tenant])

  useInterval(() => {
    log('Verificando se o estabelecimento está aberto')
    setOpen(tenant?.openingHours ? isTenantOpen(tenant?.openingHours) : false)
  }, 60000)

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
          className="pt5 pt0-l"
          onBack={() => navigate('/tenants')}
          title={tenant.name}
          tags={
            <Tooltip title={intl.formatMessage({ id: 'tenant.openTitle' })}>
              <Tag
                className="pointer dim"
                onClick={() => setTabId('2')}
                color={isOpen ? 'blue' : 'red'}
              >
                {intl.formatMessage({
                  id: isOpen ? 'tenant.open' : 'tenant.closed',
                })}
              </Tag>
            </Tooltip>
          }
          extra={[
            !!tenantPendencies?.length && (
              <Button
                key="0"
                danger
                icon={<WarningOutlined style={{ marginRight: '6px' }} />}
                onClick={() => setPendenciesModal(true)}
              >
                <Message id="tenant.pendencies" />
              </Button>
            ),
            <Button
              key="edit"
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
                title={
                  <Message
                    id="tenant.products"
                    values={{ n: products?.length ?? 0 }}
                  />
                }
                value={products?.length}
                style={{ margin: '0 32px 0 0' }}
              />
            ) : (
              <Skeleton.Button active size="large" shape="square" />
            )}
            <Statistic
              title={
                <Message
                  id="tenant.categories"
                  values={{ n: tenant?.categories?.length ?? 0 }}
                />
              }
              value={tenant?.categories?.length}
            />
          </Row>
          <Alert
            className="mt3"
            type="info"
            message={intl.formatMessage({ id: 'tenant.postMigrate' })}
          />
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
        destroyOnClose
        footer={null}
        visible={editingMetadata}
        onCancel={() => setEditMetadata(false)}
      >
        <EditTenant onSuccess={() => setEditMetadata(false)} />
      </Modal>
      <Modal
        footer={null}
        visible={pendenciesModal}
        onCancel={() => setPendenciesModal(false)}
      >
        <Pendencies pendencies={tenantPendencies} />
      </Modal>
    </div>
  )
}

export default TenantDashboard
