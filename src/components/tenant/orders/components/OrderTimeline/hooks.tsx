import { useAltIntl } from '@src/intlConfig'
import { Order } from '@src/typings'
import { Timeline } from 'antd'
import { format } from 'date-fns'
import React, { ComponentPropsWithoutRef, useMemo, useCallback } from 'react'

type TimelineItem = ComponentPropsWithoutRef<typeof Timeline.Item>

const colors: Record<Order['state'], TimelineItem['color']> = {
  CANCELED: 'red',
  CONFIRMED: 'green',
  CREATED: 'gray',
  FULFILLED: 'blue',
}

export const useOrderTimeline = (order: Order) => {
  const intl = useAltIntl()
  const multiDay = useMemo(
    () =>
      [
        ...new Set(
          order.stateChanges.map(({ date }) => new Date(date).getDate())
        ),
      ].length > 1,
    [order]
  )

  const formatDate = useCallback(
    (date: Date) => {
      const formatString = multiDay ? 'dd/MM/yyyy HH:mm:ss' : 'HH:mm:ss'

      return format(date, formatString)
    },
    [multiDay]
  )

  const getChangeDescriptor = useCallback(
    (state: Order['state'], lastState?: Order['state']) => {
      switch (state) {
        case 'CREATED':
          return lastState === 'CANCELED'
            ? intl.formatMessage({ id: 'order.stateChange.recreated' })
            : intl.formatMessage({ id: 'order.stateChange.created' })

        case 'CANCELED':
          return intl.formatMessage({ id: 'order.stateChange.canceled' })

        case 'FULFILLED':
          return intl.formatMessage({ id: 'order.stateChange.fulfilled' })

        case 'CONFIRMED':
          return intl.formatMessage({ id: 'order.stateChange.confirmed' })

        default:
          break
      }
    },
    [intl]
  )

  return useMemo<TimelineItem[]>(
    () =>
      order.stateChanges.map(({ date, state }, i, col) => ({
        children: (
          <>
            <b>{formatDate(new Date(date))} - </b>
            <span>{getChangeDescriptor(state, col[i - 1]?.state)}</span>
          </>
        ),
        color: colors[state],
      })),
    [order, getChangeDescriptor, formatDate]
  )
}
