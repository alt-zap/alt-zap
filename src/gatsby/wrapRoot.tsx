import React from 'react'
import { globalHistory } from '@reach/router'
import { IntlProvider } from 'react-intl'
import { QueryParamProvider } from 'use-query-params'
import { ConfigProvider } from 'antd'
import ptBR from 'antd/es/locale/pt_BR'
import * as Sentry from '@sentry/react'

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
          <ConfigProvider locale={ptBR}>
            <Sentry.ErrorBoundary fallback={null} showDialog>
              {element}
            </Sentry.ErrorBoundary>
          </ConfigProvider>
        </QueryParamProvider>
      </AuthContextProvider>
    </IntlProvider>
  )
}
