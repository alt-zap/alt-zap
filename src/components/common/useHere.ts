/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useEffect, useRef } from 'react'
import * as Sentry from '@sentry/react'

import { WorldAddress } from '../../typings'

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

type HereDiscoverReturn = {
  items: HereItem[]
}

export default () => {
  const hereClient = useRef()

  useEffect(() => {
    const { H } = window as Window

    hereClient.current = new H.service.Platform({
      app_id: process.env.REACT_APP_HERE_APP_ID,
      apikey: process.env.REACT_APP_HERE_KEY,
    })
  }, [])

  const discoverAddress = useCallback(
    async ({
      q,
      at = CAMPINAGRANDE_GEOLOCATION,
      limit = 10,
      inParam = 'countryCode:BRA',
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
            at,
            limit,
            q,
            in: inParam,
          },
          (data: HereDiscoverReturn) => resolve(data),
          (error: any) => {
            Sentry.captureException(error)
            reject(error)
          }
        )
      })
    },
    []
  )

  return {
    discoverAddress,
  }
}

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
