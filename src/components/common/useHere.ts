/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useEffect, useRef } from 'react'
import * as Sentry from '@sentry/react'

import { WorldAddress } from '../../typings'
import { useAltIntl } from '../../intlConfig'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const CAMPINAGRANDE_GEOLOCATION = '-7.23072,-35.8817'

type HereItem = {
  address: {
    label: string
    state: string
    stateCode: string
    houseNumber: string
    city: string
    district: string
    street: string
    postalCode: string
  }
  position: {
    lat: number
    lng: number
  }
}

type HereDiscoverReturn = {
  items: HereItem[]
}

type RoutingParams = {
  customerLat: number
  customerLng: number
  tenantLat: number
  tenantLng: number
}

export default () => {
  const hereClient = useRef()
  const intl = useAltIntl()

  useEffect(() => {
    const { H } = window as Window

    try {
      hereClient.current = new H.service.Platform({
        app_id: process.env.GATSBY_HERE_APP_ID,
        apikey: process.env.GATSBY_HERE_KEY,
      })
    } catch {
      console.error('Error instantiating Here client')
    }
  }, [])

  const discoverAddress = useCallback(
    async ({
      q,
      at,
      limit = 10,
      inParam,
    }: {
      q: string
      limit?: number
      inParam?: string
      at?: string
    }) => {
      if (!hereClient.current) return Promise.reject()

      const client = hereClient.current as any

      return new Promise<HereDiscoverReturn>((resolve, reject) => {
        client.getSearchService().discover(
          {
            at:
              at ?? intl.formatMessage({ id: 'tenant.shipping.hereDefaultAt' }),
            limit,
            q,
            in:
              inParam ??
              intl.formatMessage({ id: 'tenant.shipping.hereDefaultIn' }),
          },
          (data: HereDiscoverReturn) => resolve(data),
          (error: any) => {
            Sentry.captureException(error)
            reject(error)
          }
        )
      })
    },
    [intl]
  )

  const estimateRouteFee = useCallback(
    // eslint-disable-next-line prettier/prettier
    async ({ routingParams }: { routingParams: RoutingParams }) => {
      if (!hereClient.current) return Promise.reject()

      const client = hereClient.current as any
      const router = client.getRoutingService(null, 8)
      const { tenantLat, tenantLng, customerLat, customerLng } = routingParams

      return new Promise<any>((resolve, reject) => {
        router.calculateRoute(
          {
            routingMode: 'fast',
            transportMode: 'car',
            origin: `${tenantLat},${tenantLng}`,
            destination: `${customerLat},${customerLng}`,
            return: 'polyline',
            spans: 'length,duration',
          },
          (data: any) => resolve(data),
          (error: any) => {
            Sentry.captureException(error)
            reject(error)
          }
        )
      })
    },
    [intl]
  )

  return {
    discoverAddress,
    estimateRouteFee,
  }
}

export const mapHereToWorldAddress = (data: HereItem): WorldAddress => {
  const {
    address: { houseNumber, stateCode, ...addressFields },
    position,
  } = data

  return {
    ...addressFields,
    number: houseNumber,
    state: stateCode,
    ...position,
  }
}
