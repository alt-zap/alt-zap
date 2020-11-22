import React, { FC, useState } from 'react'
import { Divider, Table, Tag, Skeleton, Modal, Button } from 'antd'
import { EditOutlined, QrcodeOutlined } from '@ant-design/icons'
import QRCode from 'qrcode.react'

import { Message, useAltIntl, AltMessage } from '../../../intlConfig'
import { useTenantConfig } from '../../../contexts/TenantContext'
import SortSite from './cms/SortSite'

const SitesDashboard: FC = () => {
  const intl = useAltIntl()
  const { tenant, loading } = useTenantConfig()
  // For now, hardcoded to only work on Zap site
  const [editModal, setEditModal] = useState(false)
  const [site, setSite] = useState('')
  const [showQR, setShowQR] = useState(false)

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
                title: intl.formatMessage({ id: 'tenant.sites' }),
                dataIndex: 'address',
                key: 'address',
                // eslint-disable-next-line react/display-name
                render: (address) => (
                  <>
                    <a
                      href={`https://${address.url}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => setSite(`https://${address.url}`)}
                    >
                      {address.menu}
                    </a>
                  </>
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
              {
                title: intl.formatMessage({ id: 'tenant.sites.table.edit' }),
                key: 'edit',
                // eslint-disable-next-line react/display-name
                render: () => (
                  <Button
                    onClick={() => {
                      setEditModal(true)
                    }}
                    icon={<EditOutlined />}
                  />
                ),
              },
              {
                title: intl.formatMessage({ id: 'qrCode' }),
                key: 'qrcode',
                // eslint-disable-next-line react/display-name
                render: () => (
                  <Button
                    onClick={() => {
                      setShowQR(true)
                    }}
                    icon={<QrcodeOutlined />}
                  />
                ),
              },
            ]}
            dataSource={[
              {
                address: {
                  url: `${tenant?.slug}.alt.app.br`,
                  menu: 'Menu Alt',
                },
                status: 'active',
                key: 'alt-zap',
              },
              {
                address: {
                  url: `${tenant?.slug}.alt.app.br/loja-fisica`,
                  menu: 'Menu Loja Física',
                },
                status: 'active',
                key: 'alt-zap',
              },
            ]}
          />
        )}
      </div>
      <Modal
        destroyOnClose
        title={<Message id="tenant.sites.editModal.title" />}
        visible={editModal}
        onCancel={() => setEditModal(false)}
        footer={null}
      >
        <SortSite />
      </Modal>
      <Modal
        destroyOnClose
        title={<Message id="qrCode" />}
        visible={showQR}
        onCancel={() => setShowQR(false)}
        footer={null}
      >
        <QRCode value={site} renderAs="svg" size={240} includeMargin />
      </Modal>
    </div>
  )
}

export default SitesDashboard
