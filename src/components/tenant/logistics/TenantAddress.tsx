import React, { FC, useCallback, useState } from 'react'
import { Divider, Skeleton, message, Button, Card } from 'antd'
import Modal from 'antd/lib/modal/Modal'

import AddressDisplay from '../../common/AddressDisplay'
import SelectAddress from '../../common/SelectAddress'
import {
  useTenantConfig,
  useTenantDispatch,
  setAddress,
} from '../../../contexts/TenantContext'
import { WorldAddress } from '../../../typings'
import { useAltIntl, Message } from '../../../intlConfig'

const TenantAddress: FC = () => {
  const intl = useAltIntl()
  const { tenant, tenantId, loading: tenantLoading } = useTenantConfig()
  const [loading, setLoading] = useState(false)
  const [modal, setModal] = useState(false)

  const hasAddress = Object.keys(tenant?.address?.city ?? {}).length > 0

  const dispatch = useTenantDispatch()

  const handleAddressChange = useCallback(
    (address: WorldAddress) => {
      setLoading(true)
      setModal(false)
      setAddress(dispatch, {
        address,
        tenantId,
      })
        .then(() => {
          message.success(intl.formatMessage({ id: 'tenant.address.success' }))
        })
        .finally(() => {
          setLoading(false)
        })
    },
    [tenantId, dispatch, setLoading, intl]
  )

  return (
    <div className="flex flex-column items-center">
      <Divider>
        <Message id="tenant.address.title" />
      </Divider>
      <Modal visible={modal} footer={null} onCancel={() => setModal(false)}>
        <div className="mt2">
          <SelectAddress onValidAddress={handleAddressChange} />
        </div>
      </Modal>
      {hasAddress && (
        <>
          <span className="tc mb4 w-100">
            <Card className=" mb-4" actions={[]}>
              <AddressDisplay address={tenant?.address} />
            </Card>
          </span>
          <Button size="large" type="primary" onClick={() => setModal(true)}>
            {intl.formatMessage({ id: 'address.editAddress' })}
          </Button>
        </>
      )}
      {!hasAddress && (
        <>
          {tenantLoading ? (
            <Skeleton active />
          ) : (
            <Button size="large" type="primary" onClick={() => setModal(true)}>
              {intl.formatMessage({ id: 'address.selectAddress' })}
            </Button>
          )}
        </>
      )}
    </div>
  )
}

export default TenantAddress
