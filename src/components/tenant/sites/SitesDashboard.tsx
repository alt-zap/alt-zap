import React, { FC } from 'react'
import { Divider, Table, Tag, Skeleton, Alert } from 'antd'

import { Message, useAltIntl, AltMessage } from '../../../intlConfig'
import { useTenantConfig } from '../../../contexts/TenantContext'

const SitesDashboard: FC = () => {
  const intl = useAltIntl()
  const { tenant, loading } = useTenantConfig()

  return (
    <div className="flex flex-column flex-row-l items-center items-start-l">
      <div className="w-90 w-50-l bg-white mv2 ml4-l ml-0 pb3 ph3 br1">
        <Divider>
          <Message id="tenant.sitesOnline" />
        </Divider>
        {loading && <Skeleton active />}
        {!loading && (
          <Table
            pagination={false}
            columns={[
              {
                title: intl.formatMessage({ id: 'tenant.sites.address' }),
                dataIndex: 'address',
                key: 'address',
                // eslint-disable-next-line react/display-name
                render: (address) => (
                  <a
                    href={`https://${address}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {address}
                  </a>
                ),
              },
              {
                title: intl.formatMessage({ id: 'tenant.sites.status' }),
                dataIndex: 'status',
                key: 'status',
                // eslint-disable-next-line react/display-name
                render: (status) => (
                  <Tag
                    color={status === 'inactive' ? 'volcano' : 'green'}
                    key={status}
                  >
                    <Message id={`tenant.sites.${status}` as AltMessage} />
                  </Tag>
                ),
              },
            ]}
            dataSource={[
              {
                address: `alt-zap.vercel.app/${tenant?.slug}`,
                status: 'active',
              },
              {
                address: `alt.app.br/${tenant?.slug}`,
                status: 'inactive',
              },
            ]}
          />
        )}
        <div className="mt3">
          <Alert
            type="info"
            message={intl.formatMessage({ id: 'tenant.sites.info' })}
          />
        </div>
      </div>
    </div>
  )
}

export default SitesDashboard
