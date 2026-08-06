import React, { FC, ReactNode } from 'react'
import { IntlProvider } from 'react-intl'
import { ConfigProvider } from 'antd'
import ptBR from 'antd/es/locale/pt_BR'
import * as Sentry from '@sentry/react'

import { AuthContextProvider } from '../contexts/auth/AuthContext'
import { intlConfig } from '../intlConfig'

type Props = {
  children: ReactNode
}

export const AppProviders: FC<Props> = ({ children }) => {
  return (
    <IntlProvider
      locale={intlConfig.locale}
      defaultLocale={intlConfig.locale}
      messages={intlConfig.messages}
    >
      <AuthContextProvider>
        <ConfigProvider locale={ptBR}>
          <Sentry.ErrorBoundary fallback={null} showDialog>
            {children}
          </Sentry.ErrorBoundary>
        </ConfigProvider>
      </AuthContextProvider>
    </IntlProvider>
  )
}
