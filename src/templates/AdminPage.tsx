/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { FC, useCallback, Fragment } from 'react'
import { navigate } from 'gatsby'
import { RouteComponentProps } from '@reach/router'
import { Dropdown, Layout, Menu, Alert } from 'antd'
import { HomeOutlined, DownOutlined, LogoutOutlined } from '@ant-design/icons'
import * as firebase from 'firebase/app'
import 'firebase/auth'

import logo from '../assets/logo.png'
import { useAuth } from '../contexts/auth/AuthContext'
import { useAltIntl, Message } from '../intlConfig'

const { Header, Content, Footer, Sider } = Layout

const AdminPage: FC<RouteComponentProps> = ({ children }) => {
  const intl = useAltIntl()
  const [{ user, userDb }] = useAuth()

  const logout = useCallback(() => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        navigate('/')
      })
  }, [])

  const showDevAlert = window?.location.hostname === 'localhost'

  return (
    <Fragment>
      {showDevAlert && (
        <Alert
          type="warning"
          message={intl.formatMessage({ id: 'admin.onDevMode' })}
          className="tc"
        />
      )}
      <Layout style={{ minHeight: '100vh' }}>
        <Sider breakpoint="lg" collapsedWidth="0">
          <div className="flex justify-center">
            <div>
              <img
                src={logo}
                alt="Alt Zap"
                className="pa2"
                style={{ maxHeight: '50px' }}
              />
            </div>
          </div>
          <Menu theme="dark" mode="inline" defaultSelectedKeys={['4']}>
            <Menu.Item
              key="1"
              onClick={() => navigate('/app/tenants')}
              icon={<HomeOutlined />}
            >
              <Message id="admin.tenants" />
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Header
            className="site-layout-sub-header-background flex justify-end"
            style={{ padding: 0 }}
          >
            {user && (
              <Dropdown
                overlay={
                  <Menu>
                    <Menu.Item>
                      <button
                        className="bg-transparent bn pointer"
                        tabIndex={0}
                        onKeyPress={() => logout()}
                        onClick={() => logout()}
                      >
                        <Message id="adming.logout" /> <LogoutOutlined />
                      </button>
                    </Menu.Item>
                  </Menu>
                }
                className="mr3"
              >
                <a
                  href="#"
                  className="ant-dropdown-link f5 f4-l white"
                  onClick={(e) => e.preventDefault()}
                  onKeyPress={(e) => e.preventDefault()}
                >
                  <span className="mr2">
                    {userDb?.name ?? user.displayName}
                  </span>
                  <DownOutlined />
                </a>
              </Dropdown>
            )}
          </Header>
          <Content>{children}</Content>
          <Footer style={{ textAlign: 'center' }}>
            Alt Zap ©2020 -{' '}
            <a
              target="_black"
              rel="noopener noreferer"
              href="https://github.com/lucis/alt-zap"
            >
              <Message id="adming.githubLink" />
            </a>
          </Footer>
        </Layout>
      </Layout>
    </Fragment>
  )
}

export default AdminPage
