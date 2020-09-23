import React, { FC, useState, useEffect } from 'react'
import { Form, Radio, Divider } from 'antd'

import {
  useAltIntl,
  Message,
  TypedIntlRules,
  IntlRules,
  prepareRules,
} from '../../intlConfig'
import AddressFields from '../common/AddressFields'
import { WorldAddress, ShippingMethod } from '../../typings'
import AutoFill from '../AutoFill'
import { useTenantConfig } from '../../contexts/TenantContext'
import addressIcon from '../../assets/address.svg'
import { generateGoogleMapsLink } from '../../utils'

const { Group } = Radio
const { Item } = Form

const addressRules: TypedIntlRules<WorldAddress> = {
  street: [{ required: true, message: 'address.streetRule' }],
  number: [{ required: true, message: 'address.numberRule' }],
  district: [{ required: true, message: 'address.districtRule' }],
  city: [{ required: true, message: 'address.cityRule' }],
  state: [{ required: true, message: 'address.stateRule' }],
}

type Props = {
  onAutoFill: (data: Partial<WorldAddress>) => void
}

const intlRules: IntlRules = {
  shippingMethod: [{ required: true, message: 'order.shipping.rule' }],
}

const SelectShipping: FC<Props> = ({ onAutoFill }) => {
  const { tenant } = useTenantConfig()
  const acceptsTakeaway = tenant?.shippingStrategies?.takeaway?.active
  const acceptsDelivery = tenant?.shippingStrategies?.deliveryFixed?.active
  const initialValue =
    acceptsDelivery && acceptsTakeaway
      ? null
      : acceptsDelivery
      ? 'DELIVERY'
      : 'TAKEAWAY'

  const [current, setCurrent] = useState<ShippingMethod | null>(null)

  useEffect(() => {
    if (!current && initialValue) {
      setCurrent(initialValue)
    }
  }, [setCurrent, initialValue, current])
  const intl = useAltIntl()

  const rules = prepareRules(intlRules, intl)

  return (
    <div className="flex flex-column">
      <Divider>
        <h2 className="tc">
          {intl.formatMessage({ id: 'order.shippingMethod' })}
        </h2>
      </Divider>
      <div className="flex justify-center">
        <Item
          rules={rules.shippingMethod}
          name="shippingMethod"
          initialValue={initialValue}
        >
          <Group
            onChange={(e) => {
              setCurrent(e.target.value)
            }}
            buttonStyle="solid"
            size="large"
          >
            {acceptsDelivery && (
              <Radio.Button value="DELIVERY">
                <Message id="order.shipping.delivery" />
              </Radio.Button>
            )}
            {acceptsTakeaway && (
              <Radio.Button value="TAKEAWAY">
                <Message id="order.shipping.takeaway" />
              </Radio.Button>
            )}
          </Group>
        </Item>
      </div>
      {current === 'DELIVERY' && (
        <div id="address" className="flex flex-column items-center mt2">
          <div className="mb2">
            <AutoFill onAddress={onAutoFill} />
          </div>
          <AddressFields rules={addressRules} />
        </div>
      )}
      {current === 'TAKEAWAY' && (
        <div className="flex justify-center">
          <div className="flex justify-between items-center w-100 bg-white pa3 mt2 shadow-1">
            <div className="flex flex-column w-70">
              <span className="f4 grey b">
                <Message id="order.shipping.addressTake" />
              </span>
              <span className="f5">
                {tenant?.address?.street}, {tenant?.address?.number ?? 's/n'}
              </span>
              <span className="f5">
                {tenant?.address?.complement
                  ? `${tenant?.address?.complement} - `
                  : ''}
                {tenant?.address?.district}
              </span>
              <span className="f5">
                {tenant?.address?.city} - {tenant?.address?.state}
              </span>
              <a
                href={generateGoogleMapsLink(tenant?.address)}
                target="_blank"
                rel="noopener noreferrer"
                className="f5 mt2"
              >
                <Message id="order.shipping.openOnMaps" />
              </a>
            </div>
            <div className="w-30">
              <img src={addressIcon} alt="Address" />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default SelectShipping
