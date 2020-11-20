/* eslint-disable no-console */
import React, { FC, useState, useEffect, useRef } from 'react'
import { Form, Radio, Divider } from 'antd'

import { useAltIntl, Message, IntlRules, prepareRules } from '../../intlConfig'
import { ShippingMethod } from '../../typings'
import { useTenantConfig } from '../../contexts/TenantContext'
import addressIcon from '../../assets/address.svg'
import { DeliveryIcon } from '../../assets/DeliveryIcon'
import { TakeawayIcon } from '../../assets/TakeawayIcon'
import { generateGoogleMapsLink } from '../../utils'
import AddressDisplay from '../common/AddressDisplay'
import OrderAddress from './OrderAddress'
import { useObserver } from '../../hooks/useObserver'

const { Group } = Radio
const { Item } = Form

type Props = {
  onViewPort: (isIt: boolean) => void
  id: string
}

const intlRules: IntlRules = {
  shippingMethod: [{ required: true, message: 'order.shipping.rule' }],
}

const SelectShipping: FC<Props> = ({ id, onViewPort }) => {
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
  const ref = useRef<HTMLDivElement>(null)

  useObserver(ref, '0px 0px -100px 0px', onViewPort)

  return (
    <div className="flex flex-column" ref={ref} id={id}>
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
                <div className="flex items-center">
                  <DeliveryIcon
                    className="mr2"
                    size={20}
                    fill={current === 'DELIVERY' ? 'white' : 'black'}
                  />
                  <Message id="order.shipping.delivery" />
                </div>
              </Radio.Button>
            )}
            {acceptsTakeaway && (
              <Radio.Button value="TAKEAWAY">
                <div className="flex items-center">
                  <TakeawayIcon
                    className="mr2"
                    size={20}
                    fill={current === 'TAKEAWAY' ? 'white' : 'black'}
                  />
                  <Message id="order.shipping.takeaway" />
                </div>
              </Radio.Button>
            )}
          </Group>
        </Item>
      </div>
      {current === 'DELIVERY' && (
        <div id="address" className="flex flex-column mt2">
          <div className="mb2">
            <OrderAddress onAddress={(data) => console.log(data)} />
          </div>
        </div>
      )}
      {current === 'TAKEAWAY' && (
        <div className="flex justify-center">
          <div className="flex justify-between items-center w-100 bg-white pa3 mt2 shadow-1">
            <div className="flex flex-column w-70">
              <span className="f4 grey b">
                <Message id="order.shipping.addressTake" />
              </span>
              <AddressDisplay address={tenant?.address} />
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
