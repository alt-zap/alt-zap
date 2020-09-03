import React, { FC, useMemo, useState, useCallback } from 'react'
import { Button, Divider, Form, Switch, Skeleton, message } from 'antd'
import * as Sentry from '@sentry/react'

import { Message, useAltIntl } from '../../../intlConfig'
import { useTenant, setOperationOptions } from '../../../contexts/TenantContext'
import { TenantConfig } from '../../../typings'

const { Item } = Form

type OperationOptions = Pick<TenantConfig, 'live' | 'showOnClose'>

const OperationOption: FC = () => {
  const intl = useAltIntl()
  const [loading, setLoading] = useState(false)
  const [{ tenant, tenantId, loading: tenantLoading }, dispatch] = useTenant()

  const initialValues = useMemo(() => {
    if (!tenant) return {}

    return {
      live: tenant.live ?? false,
      showOnClose: tenant.showOnClose ?? false,
    }
  }, [tenant])

  const handleSaveOperationOptions = useCallback(
    (data: OperationOptions) => {
      setLoading(true)

      setOperationOptions(dispatch, data, tenantId)
        .then(() => {
          message.success(intl.formatMessage({ id: 'successful' }))
        })
        .catch((e) => {
          Sentry.captureException(e)
          message.error(intl.formatMessage({ id: 'errorful' }))
        })
        .finally(() => {
          setLoading(false)
        })
    },
    [dispatch, tenantId, intl]
  )

  return (
    <div className="w-90 w-50-l bg-white ph3 pt1 pb2 ml0 ml4-l mv2 br1">
      <Divider>
        <Message id="tenant.sections.operation" />
      </Divider>
      {tenantLoading ? (
        <Skeleton active />
      ) : (
        <Form
          initialValues={initialValues}
          layout="vertical"
          onFinish={(data) =>
            handleSaveOperationOptions(data as OperationOptions)
          }
        >
          <div
            className="b--solid b--black-20 br1 flex justify-between pa3 flex-wrap flex-nowrap-l"
            style={{ borderWidth: '1px' }}
          >
            <div className="flex flex-column w-70">
              <b>
                <Message id="tenant.sections.scheduleLive" />
              </b>
              <span className="light-silver">
                <Message id="tenant.sections.scheduleLiveDesc" />
              </span>
            </div>
            <div className="w-30 w-20-l flex flex-column items-end ml3-l">
              <Item
                label="Ativo"
                name={['live']}
                valuePropName="checked"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'baseline',
                }}
              >
                <Switch />
              </Item>
            </div>
          </div>
          <div
            className="b--solid b--black-20 br1 mv3 flex justify-between pa3 flex-wrap flex-nowrap-l"
            style={{ borderWidth: '1px' }}
          >
            <div className="flex flex-column w-70">
              <b>
                <Message id="tenant.sections.showOnClose" />
              </b>
              <span className="light-silver">
                <Message id="tenant.sections.showOnCloseDesc" />
              </span>
            </div>
            <div className="w-30 w-20-l flex flex-column items-end ml3-l">
              <Item
                label="Ativo"
                name={['showOnClose']}
                valuePropName="checked"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'baseline',
                }}
              >
                <Switch />
              </Item>
            </div>
          </div>
          <Button
            loading={loading}
            type="primary"
            size="large"
            htmlType="submit"
            block
          >
            <Message id="save" />
          </Button>
        </Form>
      )}
    </div>
  )
}

export default OperationOption
