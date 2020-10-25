import React, { ChangeEvent, useState } from 'react'
import { Input, message, Skeleton, Card } from 'antd'
import { useDebouncedCallback } from 'use-debounce/lib'
import { LoadingOutlined } from '@ant-design/icons'

import { useAltIntl } from '../../../intlConfig'
import { WorldAddress } from '../../../typings'
import useHere, { mapHereToWorldAddress } from '../../common/useHere'

type Props = {
  onAddress: (data: Partial<WorldAddress>) => void
}

const SmartAddress: React.FC<Props> = ({ onAddress }) => {
  const intl = useAltIntl()

  const [inputValue, setInputValue] = useState('')
  const [empty, setEmpty] = useState(false)
  const [loading, setLoading] = useState(false)
  const [inputLoading, setInputLoading] = useState(false)

  const [options, setOptions] = useState<Option[]>([])

  const { discoverAddress } = useHere()

  const onSearch = (term: string) => {
    if (!term?.length) {
      setOptions([])
      setInputLoading(false)
      setLoading(false)
      setEmpty(false)

      return
    }

    setLoading(true)
    discoverAddress({ q: term })
      .then((data) => {
        const newOptions = data.items
          .filter((item) => !!item.address.street)
          .map((item) => ({
            value: item.address.label,
            label: item.address.label,
            address: mapHereToWorldAddress(item),
          }))

        setOptions(newOptions)
        setEmpty(newOptions.length === 0)
      })
      .catch(() => {
        message.error(intl.formatMessage({ id: 'address.smarAddress.error' }))
      })
      .finally(() => {
        setInputLoading(false)
        setLoading(false)
      })
  }

  const [debouncedSearch] = useDebouncedCallback(onSearch, 1000)

  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputLoading(true)
    setInputValue(e.target.value)
    debouncedSearch(e.target.value)
  }

  return (
    <>
      <Input
        allowClear
        className="mb3"
        value={inputValue}
        onChange={onInputChange}
        suffix={inputLoading ? <LoadingOutlined /> : <span />}
        size="large"
        placeholder={intl.formatMessage({
          id: 'address.smartAddress.placeholder',
        })}
      />
      {loading && <Skeleton />}
      {!loading &&
        !!options.length &&
        options.map((option, i) => (
          <Card
            key={i}
            style={{ marginBottom: '6px', cursor: 'pointer' }}
            bodyStyle={{ padding: '15px' }}
            onKeyPress={() => onAddress(option.address)}
            onClick={() => onAddress(option.address)}
            tabIndex={0}
            role="button"
          >
            <AddressOption option={option} />
          </Card>
        ))}
      {empty && (
        <div className="flex items-center">
          <span className="tc light-silver">Nenhum endereço encontrado</span>
        </div>
      )}
    </>
  )
}

const AddressOption: React.FC<{
  option: Option
}> = ({ option: { address } }) => {
  return (
    <div className="flex flex-column">
      <span className="b">
        {address?.street}
        {`${address?.number ? `, ${address.number}` : ''}`}
      </span>
      <span className="light-silver">{`${address?.district}, ${address.city} - ${address.state}`}</span>
    </div>
  )
}

export default SmartAddress

type Option = {
  value: string
  label: string
  address: WorldAddress
}
