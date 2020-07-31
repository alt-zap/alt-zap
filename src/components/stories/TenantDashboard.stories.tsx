import React from 'react'
import { Layout } from 'antd'

import TenantDashboard from '../tenant/TenantDashboard'
import { TenantProvider } from '../../contexts/TenantContext'

const { Content, Footer, Sider } = Layout

export default {
  title: 'tenant|TenantDashboard',
  component: TenantDashboard,
}

const exampleTenant = {
  name: 'Alt Burger CG',
  slug: 'altburger-cg',
  live: true,
  menus: [
    {
      name: 'Principal',
      slug: 'main',
    },
  ],
}

const exampleCategories = [
  {
    id: '1',
    name: 'Principal',
    slug: 'principal',
    live: true,
  },
  {
    id: '2',
    name: 'Hamburgueres',
    slug: 'hamburgueres',
    live: true,
  },
]

const exampleProducts: Product[] = [
  {
    name: 'Double Cheese Burguer',
    imgSrc: 'https://i.imgur.com/numiAKw.png',
    live: true,
    price: 2000,
    highlight: false,
    category: {
      id: '1',
      name: 'Principal',
    },
  },
  {
    name: 'Triplo Smash Bacon',
    imgSrc: 'https://i.imgur.com/jExYkIW.png',
    live: true,
    price: 1600,
    highlight: false,
    category: {
      id: '1',
      name: 'Principal',
    },
  },
  {
    name: 'CHUT Burger',
    imgSrc:
      'https://firebasestorage.googleapis.com/v0/b/alt-zap.appspot.com/o/4e8aba7a-31e3-4ba9-8cbd-5d213b4bd228.jpg?alt=media&token=54d0ffd2-faa0-4c92-a47c-202dbf543739',
    live: false,
    price: 2250,
    highlight: false,
    category: {
      id: '2',
      name: 'Hamburguers',
    },
  },
]

export const Active = () => (
  <TenantProvider
    value={{
      tenant: (exampleTenant as unknown) as TenantConfig,
      categories: exampleCategories,
      products: exampleProducts,
      loading: false,
      updateTenant: () => {},
      editCategory: () => {},
      addCategory: () => Promise.resolve(),
      addProduct: () => {},
      editProduct: () => {},
      isCategoryUnique: (slug) => slug !== 'principal',
    }}
  >
    <TenantDashboard />
  </TenantProvider>
)

export const Loading = () => (
  <TenantProvider
    value={{
      tenant: (exampleTenant as unknown) as TenantConfig,
      categoryLoading: true,
      productsLoading: true,
      loading: false,
      updateTenant: () => {},
      editCategory: () => {},
      addCategory: () => Promise.resolve(),
      addProduct: () => {},
      editProduct: () => {},
      isCategoryUnique: (slug) => slug !== 'principal',
    }}
  >
    <TenantDashboard />
  </TenantProvider>
)

export const withLayout = () => (
  <TenantProvider
    value={{
      tenant: (exampleTenant as unknown) as TenantConfig,
      categories: exampleCategories,
      products: exampleProducts,
      loading: false,
      updateTenant: () => {},
      editCategory: () => {},
      addCategory: () => Promise.resolve(),
      addProduct: () => {},
      editProduct: () => {},
      isCategoryUnique: (slug) => slug !== 'principal',
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
  </TenantProvider>
)
