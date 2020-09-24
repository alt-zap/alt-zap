/* eslint-disable no-console */
import React, { useState } from 'react'
import { AutoComplete, Button, message } from 'antd'
import * as Sentry from '@sentry/react'

import { Message, useAltIntl } from '../../../intlConfig'
import { WorldAddress } from '../../../typings'

type Props = {
  onAddress: (data: Partial<WorldAddress>) => void
}

type HereDiscoverReturn = {
  items: Array<{
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
  }>
}

const SmartAddress: React.FC<Props> = ({ onAddress }) => {
  const intl = useAltIntl()
  const at = '-7.23072,-35.8817'
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [options, setOptions] = useState<any[]>([])

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { H } = window as any
  const platform = new H.service.Platform({
    app_id: process.env.REACT_APP_HERE_APP_ID,
    apikey: process.env.REACT_APP_HERE_KEY,
  })

  async function geo(term: string) {
    await platform.getSearchService().discover(
      {
        at,
        limit: 10,
        q: term === '' ? 'undefined' : term,
        in: 'countryCode:BRA',
      },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (data: HereDiscoverReturn) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const newOptions = data.items.map(({ address, position }: any) => {
          const { label } = address

          return {
            label,
            value: JSON.stringify({
              address,
              position,
            }),
          }
        })

        setOptions(newOptions)
      },
      console.error
    )
  }

  const onSearch = (term: string) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    geo(term).catch((e: any) => {
      message.error(intl.formatMessage({ id: 'address.smarAddress.error' }))
      Sentry.captureException(e)
    })
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSelect = (e: any) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const selected = JSON.parse(e) as any

    const { houseNumber, ...address } = selected.address
    const { ...position } = selected.position

    onAddress({
      number: houseNumber,
      ...address,
      ...position,
    })
  }

  return (
    <>
      <Button className="mb2 mt2 mr2 blue b--light-blue">
        <Message id="address.smartAddress.button" />
      </Button>
      <AutoComplete
        options={options}
        style={{ width: '100%' }}
        onSelect={onSelect}
        onSearch={onSearch}
        placeholder={<Message id="address.smartAddress.placeholder" />}
      />
    </>
  )
}

export default SmartAddress
