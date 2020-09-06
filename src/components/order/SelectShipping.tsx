import React, { FC, useState } from 'react'
import { Form, Radio, Divider } from 'antd'

import { useAltIntl, Message, TypedIntlRules } from '../../intlConfig'
import AddressFields from '../common/AddressFields'
import { WorldAddress } from '../../typings'
import AutoFill from '../AutoFill'
import { useTenantConfig } from '../../contexts/TenantContext'
import addressIcon from '../../assets/address.svg'

const { Group } = Radio
const { Item } = Form

type ShippingMethod = 'takeaway' | 'delivery'

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

const SelectShipping: FC<Props> = ({ onAutoFill }) => {
  const { tenant } = useTenantConfig()
  const [current, setCurrent] = useState<ShippingMethod | null>(null)
  const intl = useAltIntl()

  return (
    <div className="flex flex-column">
      <Divider>
        <h2 className="tc">
          {intl.formatMessage({ id: 'order.shippingMethod' })}
        </h2>
      </Divider>
      <div className="flex justify-center">
        <Item name="shippingMethod">
          <Group
            onChange={(e) => {
              setCurrent(e.target.value)
            }}
            buttonStyle="solid"
            size="large"
          >
            <Radio.Button value="delivery">
              <Message id="order.shipping.delivery" />
            </Radio.Button>
            <Radio.Button value="takeaway">
              <Message id="order.shipping.takeaway" />
            </Radio.Button>
          </Group>
        </Item>
      </div>
      {current === 'delivery' && (
        <div id="address" className="flex flex-column items-center mt2">
          <div className="mb2">
            <AutoFill onAddress={onAutoFill} />
          </div>
          <AddressFields rules={addressRules} />
        </div>
      )}
      {current === 'takeaway' && (
        <div className="flex justify-center">
          <div className="flex justify-between items-center w-100 bg-white pa3 mt2 shadow-1">
            <div className="flex flex-column w-70">
              <span className="f4 grey b">
                <Message id="order.shipping.addressTake" />
              </span>
              <span className="f5">
                {tenant?.address?.street} - {tenant?.address?.number ?? 's/n'}
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
            </div>
            <div className="w-30">
              <img src={addressIcon} alt="Address" />
            </div>
          </div>
        </div>
      )}
      <Divider />
    </div>
  )
}

export default SelectShipping
