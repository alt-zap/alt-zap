import React, { FC } from 'react'
import { Layout, Menu } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import { useNavigate } from '@reach/router'

import logo from '../assets/logo.png'

const { Header, Content, Footer, Sider } = Layout

const AdminPage: FC = ({ children }) => {
  const navigate = useNavigate()

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
            icon={<UserOutlined />}
          >
            Minha Página
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Header
          className="site-layout-sub-header-background"
          style={{ padding: 0 }}
        />
        <Content className="flex justify-center">
          <div className="w-100 w-60-l">{children}</div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          Alt Zap ©2020 Campina Grande - PB
        </Footer>
      </Layout>
    </Layout>
  )
}

export default AdminPage
