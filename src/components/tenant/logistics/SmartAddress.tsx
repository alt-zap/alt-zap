/* eslint-disable no-console */
import React, { useState } from 'react'
import { AutoComplete, Button, Input, message } from 'antd'
import { useDebouncedCallback } from 'use-debounce/lib'
import { LoadingOutlined } from '@ant-design/icons'

import { Message, useAltIntl } from '../../../intlConfig'
import { WorldAddress } from '../../../typings'
import useHere, { mapHereToWorldAddress } from '../../common/useHere'

type Props = {
  onAddress: (data: Partial<WorldAddress>) => void
}

const SmartAddress: React.FC<Props> = ({ onAddress }) => {
  const intl = useAltIntl()
  const [loading, setLoading] = useState(false)
  const [options, setOptions] = useState<Option[]>([])

  const { discoverAddress } = useHere()

  const onSearch = (term: string) => {
    if (!term?.length) return
    discoverAddress({ q: term })
      .then((data) => {
        console.log({ data })
        const newOptions = data.items.map((item) => ({
          value: item.address.label,
          label: item.address.label,
          address: mapHereToWorldAddress(item),
        }))

        setOptions(newOptions)
      })
      .catch(() => {
        message.error(intl.formatMessage({ id: 'address.smarAddress.error' }))
      })
      .finally(() => {
        setLoading(false)
      })
  }

  const [debouncedSearch] = useDebouncedCallback(onSearch, 1000)

  const onSelect = (option: Option) => {
    onAddress(option.address)
  }

  return (
    <>
      <Button className="mb2 mt2 mr2 blue b--light-blue">
        <Message id="address.smartAddress.button" />
      </Button>
      <AutoComplete
        options={options}
        style={{ width: '100%' }}
        onSelect={(_: string, option) => onSelect(option as Option)}
        onSearch={(term: string) => {
          setLoading(true)
          debouncedSearch(term)
        }}
      >
        <Input
          suffix={loading ? <LoadingOutlined /> : <span />}
          size="large"
          placeholder={intl.formatMessage({
            id: 'address.smartAddress.placeholder',
          })}
        />
      </AutoComplete>
    </>
  )
}

export default SmartAddress

type Option = {
  value: string
  label: string
  address: WorldAddress
}
