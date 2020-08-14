import React from 'react'
import { Layout } from 'antd'
import { Router, RouteComponentProps } from '@reach/router'

import TenantDashboard from '../tenant/TenantDashboard'
import { TenantStateProvider } from '../../contexts/TenantContext'
import { Product, TenantConfig } from '../../typings'

const { Content, Footer, Sider } = Layout

export default {
  title: 'tenant|TenantDashboard',
  component: TenantDashboard,
}

const exampleCategories = [
  {
    name: 'Principal',
    slug: 'principal',
    live: true,
  },
  {
    name: 'Hamburgueres',
    slug: 'hamburgueres',
    live: true,
  },
]

const exampleTenant = {
  name: 'Alt Burger CG',
  slug: 'altburger-cg',
  live: true,
  categories: exampleCategories,
  menus: [
    {
      name: 'Principal',
      slug: 'main',
    },
  ],
}

const exampleProducts: Product[] = [
  {
    name: 'Double Cheese Burguer',
    userId: '',
    imgSrc: 'https://i.imgur.com/numiAKw.png',
    live: true,
    price: 2000,
    highlight: false,
    category: 1,
  },
  {
    name: 'Triplo Smash Bacon',
    userId: '',
    imgSrc: 'https://i.imgur.com/jExYkIW.png',
    live: true,
    price: 1600,
    highlight: false,
    category: 1,
  },
  {
    name: 'CHUT Burger',
    userId: '',
    imgSrc:
      'https://firebasestorage.googleapis.com/v0/b/alt-zap.appspot.com/o/4e8aba7a-31e3-4ba9-8cbd-5d213b4bd228.jpg?alt=media&token=54d0ffd2-faa0-4c92-a47c-202dbf543739',
    live: false,
    price: 2250,
    highlight: false,
    category: 2,
  },
]

export const Active = () => (
  <TenantStateProvider
    value={{
      tenant: (exampleTenant as unknown) as TenantConfig,
      products: exampleProducts,
      loading: false,
    }}
  >
    <TenantDashboard />
  </TenantStateProvider>
)

export const Dashboard: React.FC<RouteComponentProps> = () => {
  return <TenantDashboard />
}

export const Loading = () => (
  <TenantStateProvider
    value={{
      tenant: undefined,
      categoryLoading: true,
      productsLoading: true,
      loading: true,
    }}
  >
    <Router>
      <Dashboard default />
    </Router>
  </TenantStateProvider>
)

export const withLayout = () => (
  <TenantStateProvider
    value={{
      tenant: (exampleTenant as unknown) as TenantConfig,
      products: exampleProducts,
      loading: false,
    }}
  >
    <Layout style={{ minHeight: '100vh' }}>
      <Sider breakpoint="lg" collapsedWidth="0">
        <div className="flex justify-center">jeu</div>
      </Sider>
      <Layout>
        <Content>
          <TenantDashboard />
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
  </TenantStateProvider>
)
