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
  CloudOutlined,
} from '@ant-design/icons'
import { navigate } from 'gatsby'
import { useQueryParam, StringParam } from 'use-query-params'

import { useTenantConfig } from '../../contexts/TenantContext'
import MenuDashboard from './menus/MenuDashboard'
import LogisticsDashboard from './logistics/LogisticsDashboard'
import PaymentsDashboard from './payments/PaymentsDashboard'
import EditTenant from './EditTenant'
import { Message, useAltIntl } from '../../intlConfig'
import Pendencies, { pendenciesTest } from './Pendencies'
import { isTenantOpen, useInterval, log } from '../../utils'
import { useAuth } from '../../contexts/auth/AuthContext'
import OperationDashboard from './operation/OperationDashboard'
import SitesDashboard from './sites/SitesDashboard'

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
  const [{ userDb, loading: userLoading }] = useAuth()

  const [isOpen, setOpen] = useState(false)
  const [editingMetadata, setEditMetadata] = useState(false)
  const [pendenciesModal, setPendenciesModal] = useState(false)

  const tenantContext = useTenantConfig()
  const { tenant, loading, productsLoading, products } = tenantContext

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
    if (!userLoading && !userDb?.document) {
      navigate('/app/onboard')
    }
  }, [userDb, userLoading])

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
          className="pt5 pt2-l"
          onBack={() => navigate('/app/tenants')}
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
          <Row className="justify-center justify-start-l">
            {!productsLoading ? (
              <Statistic
                title={
                  // eslint-disable-next-line jsx-a11y/anchor-is-valid
                  <a href="#" onClick={() => setTabId('1')}>
                    <Message
                      id="tenant.products"
                      values={{ n: products?.length ?? 0 }}
                    />
                  </a>
                }
                value={products?.length}
                style={{ margin: '0 32px 0 0' }}
              />
            ) : (
              <Skeleton.Button active size="large" shape="square" />
            )}
            <Statistic
              style={{ margin: '0 30px 0 0' }}
              title={
                // eslint-disable-next-line jsx-a11y/anchor-is-valid
                <a href="#" onClick={() => setTabId('1')}>
                  <Message
                    id="tenant.categories"
                    values={{ n: tenant?.categories?.length ?? 0 }}
                  />
                </a>
              }
              value={tenant?.categories?.length}
            />
            <Statistic
              title={
                // eslint-disable-next-line jsx-a11y/anchor-is-valid
                <a href="#" onClick={() => setTabId('5')}>
                  <Message id="tenant.sitesOnline" />
                </a>
              }
              value={1}
            />
            <div className="mt3 mt0-l ml0 ml4-l mb1 mb3-l w-90 w-40-l">
              <Alert
                type="info"
                message={intl.formatMessage({ id: 'tenant.postMigrate' })}
              />
            </div>
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
          <OperationDashboard />
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
        <TabPane
          tab={
            <span>
              <CloudOutlined />
              <Message id="tenant.sites" />
            </span>
          }
          key="5"
        >
          <SitesDashboard />
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
        destroyOnClose
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
