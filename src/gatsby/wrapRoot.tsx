import React from 'react'
import { globalHistory } from '@reach/router'
import { IntlProvider } from 'react-intl'
import { QueryParamProvider } from 'use-query-params'

import { AuthContextProvider } from '../contexts/auth/AuthContext'
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
      <AuthContextProvider>
        <QueryParamProvider {...{ path: '/' }} reachHistory={globalHistory}>
          {element}
        </QueryParamProvider>
      </AuthContextProvider>
    </IntlProvider>
  )
}
