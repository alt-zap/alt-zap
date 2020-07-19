/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { FC, useCallback } from 'react'
import { RouteComponentProps, useNavigate } from '@reach/router'
import { Dropdown, Layout, Menu } from 'antd'
import { HomeOutlined, DownOutlined, LogoutOutlined } from '@ant-design/icons'
import * as firebase from 'firebase/app'
import 'firebase/auth'

import logo from '../assets/logo.png'
import { useAuth } from '../contexts/AuthContext'

const { Header, Content, Footer, Sider } = Layout

const AdminPage: FC<RouteComponentProps> = ({ children }) => {
  const navigate = useNavigate()
  const { user } = useAuth()

  const logout = useCallback(() => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        navigate('/')
      })
  }, [navigate])

  return (
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
            onClick={() => navigate('/tenants')}
            icon={<HomeOutlined />}
          >
            Página Inicial
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
                      Logout <LogoutOutlined />
                    </button>
                  </Menu.Item>
                </Menu>
              }
              className="mr3"
            >
              <a
                href="#"
                className="ant-dropdown-link f4 white"
                onClick={(e) => e.preventDefault()}
                onKeyPress={(e) => e.preventDefault()}
              >
                <span className="mr2">{user.displayName}</span>
                <DownOutlined />
              </a>
            </Dropdown>
          )}
        </Header>
        <Content className="flex justify-center">
          <div className="w-100 w-60-l">{children}</div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          Alt Zap ©2020 -{' '}
          <a
            target="_black"
            rel="noopener noreferer"
            href="https://github.com/lucis/alt-zap"
          >
            Estamos no Github
          </a>
        </Footer>
      </Layout>
    </Layout>
  )
}

export default AdminPage
