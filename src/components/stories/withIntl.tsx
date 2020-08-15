import React from 'react'
import { IntlProvider } from 'react-intl'

import { intlConfig } from '../../intlConfig'

const withIntl = (Component: React.FC) => (
  <IntlProvider
    locale={intlConfig.locale}
    defaultLocale={intlConfig.locale}
    messages={intlConfig.messages}
  >
    <Component />
  </IntlProvider>
)

export default withIntl
