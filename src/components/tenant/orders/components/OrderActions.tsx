import React, { ComponentPropsWithoutRef, FC, useMemo } from 'react'
import { CheckOutlined } from '@ant-design/icons'
import { useAltIntl } from '@src/intlConfig'
import { Order } from '@src/typings'
import { Button, Popconfirm } from 'antd'

export type OrderAction =
  | {
      type: 'set_state'
      state: Order['state']
    }
  | {
      type: 'set_last'
    }

interface Props {
  order: Order
  loading?: boolean
  onAction(action: OrderAction): void
}

type ButtonConfig = {
  text: string
  buttonProps: ComponentPropsWithoutRef<typeof Button>
  promptTitle: string
  action(): void
}

const OrderActions: FC<Props> = ({ order, onAction, loading }) => {
  const intl = useAltIntl()

  const cancelButton = useMemo<ButtonConfig>(
    () => ({
      text: intl.formatMessage({ id: 'orders.cancel' }),
      buttonProps: {
        danger: true,
        type: 'dashed',
      },
      promptTitle: intl.formatMessage({ id: 'orders.cancelPrompt' }),
      action: () => onAction({ type: 'set_state', state: 'CANCELED' }),
    }),
    [onAction, intl]
  )

  const setLastButton = useMemo<ButtonConfig>(
    () => ({
      text: intl.formatMessage({ id: 'orders.setLast' }),
      buttonProps: {},
      promptTitle: intl.formatMessage({ id: 'orders.lastPrompt' }),
      action: () => onAction({ type: 'set_last' }),
    }),
    [onAction, intl]
  )

  const confirmButton = useMemo<ButtonConfig>(
    () => ({
      text: intl.formatMessage({ id: 'orders.confirm' }),
      buttonProps: {
        type: 'primary',
        icon: <CheckOutlined />,
      },
      promptTitle: intl.formatMessage({ id: 'orders.confirmPrompt' }),
      action: () => onAction({ type: 'set_state', state: 'CONFIRMED' }),
    }),
    [onAction, intl]
  )

  const fulfillButton = useMemo<ButtonConfig>(
    () => ({
      text: intl.formatMessage({ id: 'orders.fulfilled' }),
      buttonProps: {
        type: 'primary',
      },
      promptTitle: intl.formatMessage({ id: 'orders.fulfillPrompt' }),
      action: () => onAction({ type: 'set_state', state: 'FULFILLED' }),
    }),
    [onAction, intl]
  )

  const recreateButton = useMemo<ButtonConfig>(
    () => ({
      text: intl.formatMessage({ id: 'orders.recreate' }),
      buttonProps: {
        type: 'primary',
      },
      promptTitle: intl.formatMessage({ id: 'orders.recreatePrompt' }),
      action: () => onAction({ type: 'set_state', state: 'CONFIRMED' }),
    }),
    [onAction, intl]
  )

  const rightButton = useMemo<ButtonConfig | boolean>(() => {
    switch (order.state) {
      case 'CONFIRMED':
        return fulfillButton

      case 'CREATED':
        return confirmButton

      case 'CANCELED':
        return !order.last && setLastButton

      case 'FULFILLED':
        return !order.last && setLastButton

      default:
        return false
    }
  }, [confirmButton, fulfillButton, order.last, order.state, setLastButton])

  const leftButton = useMemo(() => {
    if (order?.state === 'CANCELED') {
      return recreateButton
    }

    return cancelButton
  }, [cancelButton, order, recreateButton])

  return (
    <>
      {[leftButton, rightButton].map(
        (buttonConfig) =>
          typeof buttonConfig === 'object' && (
            <Popconfirm
              key={buttonConfig.text}
              title={buttonConfig.promptTitle}
              onConfirm={buttonConfig.action}
              okText={intl.formatMessage({ id: 'common.yes' })}
              cancelText={intl.formatMessage({ id: 'common.no' })}
            >
              <Button
                {...buttonConfig.buttonProps}
                loading={loading}
                size="small"
                className="mr2"
              >
                {buttonConfig.text}
              </Button>
            </Popconfirm>
          )
      )}
    </>
  )
}

export { OrderActions }
