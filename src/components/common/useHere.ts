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

type RoutingParams = {
  clientLat: number
  clientLng: number
  tenantLat: number
  tenantLng: number
}

type HereDiscoverReturn = {
  items: HereItem[]
}

export default () => {
  const hereClient = useRef()
  const intl = useAltIntl()

  useEffect(() => {
    const { H } = window as Window

    hereClient.current = new H.service.Platform({
      app_id: process.env.GATSBY_HERE_APP_ID,
      apikey: process.env.GATSBY_HERE_KEY,
    })
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

  return {
    discoverAddress,
  }
}

// TESTING ROUTING SERVICE -- TESTING ROUTING SERVICE --TESTING ROUTING SERVICE -- TESTING ROUTING

// eslint-disable-next-line max-params
export async function calculaTempoEDistancia(routingParam: RoutingParams) {
  const { H } = window as Window
  const Here = new H.service.Platform({
    app_id: process.env.GATSBY_HERE_APP_ID,
    apikey: process.env.GATSBY_HERE_KEY,
  })

  const { tenantLat, tenantLng, clientLat, clientLng } = routingParam

  const router = Here.getRoutingService(null, 8)
  const routingParameters = {
    routingMode: 'fast',
    transportMode: 'car',
    // The start point of the route:
    origin: `${tenantLat},${tenantLng}`,
    // The end point of the route:
    destination: `${clientLat},${clientLng}`,
    // Includes the route shape in the response
    return: 'polyline',
    spans: 'length,carAttributes,duration',
  }

  router.calculateRoute(
    routingParameters,
    // eslint-disable-next-line no-console
    (result: any) =>
      console.log(
        result.routes[0].sections[0].spans[0].length,
        result.routes[0].sections[0].spans[0].duration
      ),
    console.error
  )
}
// TESTING ROUTING SERVICE -- TESTING ROUTING SERVICE -- TESTING ROUTING SERVICE -- TESTING ROUTING

export const mapHereToWorldAddress = (data: HereItem): WorldAddress => {
  const {
    address: { houseNumber, ...addressFields },
    position,
  } = data

  return {
    ...addressFields,
    number: houseNumber,
    ...position,
  }
}
