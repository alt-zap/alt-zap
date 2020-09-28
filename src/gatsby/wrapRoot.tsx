import React from 'react'
import { IntlProvider } from 'react-intl'

import { intlConfig } from '../intlConfig'

export const wrapRootElement: React.FC<any> = ({ element }) => {
  return (
    <IntlProvider
      locale={intlConfig.locale}
      defaultLocale={intlConfig.locale}
      messages={intlConfig.messages}
    >
      {element}
    </IntlProvider>
  )
}
