/* eslint-disable no-console */
import React, { useState } from 'react'
import { AutoComplete, Button } from 'antd'

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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [options, setOptions] = useState<any[]>([])

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { H } = window as any
  const platform = new H.service.Platform({
    app_id: '3QJ2bSLt38M4CglGoiHp',
    apikey: 'gHjA5cqevmhypFVTPn__kUvcvPNXPjpPnj57pG6iIno',
  })

  async function geo(term: string) {
    await platform.getSearchService().discover(
      {
        at: '-7.23072,-35.8817',
        limit: 10,
        q: term,
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
    geo(term)
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
      <Button className="mb2 mr2 blue b--light-blue">
        Digite seu endereço
      </Button>
      <AutoComplete
        options={options}
        style={{ width: 526 }}
        onSelect={onSelect}
        onSearch={onSearch}
        placeholder="ex: Rua João Julião Martins, 155, Universitário"
      />
    </>
  )
}

export default SmartAddress
