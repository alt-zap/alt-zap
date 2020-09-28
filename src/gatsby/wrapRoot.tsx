import React from 'react'
import { IntlProvider } from 'react-intl'

import { intlConfig } from '../intlConfig'

/**
 * It's better to have this configuration using Gatsby Plugins
 *
 * But, I'll do that later.
 */
export const wrapRootElement: React.FC<{ element: React.FC }> = ({
  element,
}) => {
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
