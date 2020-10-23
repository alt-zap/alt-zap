import React, { FC, Fragment } from 'react'
import { Form, Input } from 'antd'

import { WorldAddress } from '../../typings'
// TODO: Think how to i18n that
import {
  useAltIntl,
  TypedIntlRules,
  prepareRules,
  IntlRules,
} from '../../intlConfig'

const { Item } = Form

type Props = {
  rules: TypedIntlRules<WorldAddress>
}

const ComplementAddress: FC<Props> = ({ rules: intlRules }) => {
  const intl = useAltIntl()

  const rules = prepareRules(intlRules as IntlRules, intl)

  return (
    <Fragment>
      <div className="w-90 mr2">
        <Item
          label={intl.formatMessage({ id: 'address.complement' })}
          name="complement"
        >
          <Input
            size="large"
            placeholder={intl.formatMessage({
              id: 'address.complementPlaceholder',
            })}
          />
        </Item>
        <div />
      </div>
      <div>
        <Item
          label={intl.formatMessage({ id: 'address.number' })}
          name="number"
          rules={rules.number}
        >
          <Input size="large" autoComplete="cc-csc" />
        </Item>
      </div>
    </Fragment>
  )
}

export default ComplementAddress
