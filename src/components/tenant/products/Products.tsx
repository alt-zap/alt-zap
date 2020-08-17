import React, {
  FC,
  Fragment,
  useState,
  useMemo,
  useCallback,
  useEffect,
} from 'react'
import { Button, List, Modal, Skeleton, Divider, Tag } from 'antd'
import { PlusOutlined, EditOutlined } from '@ant-design/icons'
import { Img } from 'react-image'

import {
  useTenantConfig,
  useTenantDispatch,
  addProduct,
  addCategory,
} from '../../../contexts/TenantContext'
import AddProduct from './AddProduct'
import EditProduct from './EditProduct'
import Real from '../../Real'
import ProductsFilters from './ProductsFilters'
import { Product } from '../../../typings'
import { Message } from '../../../intlConfig'
import { useAuth } from '../../../contexts/auth/AuthContext'

const Products: FC = () => {
  const [filters, setFilters] = useState<Record<string, string>>({})

  const [addModal, setAddModal] = useState(false)
  const [selectedProduct, setProduct] = useState<Product>()

  const { products, productsLoading, tenant, tenantId } = useTenantConfig()
  const dispatch = useTenantDispatch()
  const [{ user }] = useAuth()

  const getColorForCategory = useCallback((index: number) => {
    return ['#2db7f5', '#87d068', '#108ee9'][index]
  }, [])

  const getCategoryName = useCallback(
    (index) => {
      const category = tenant?.categories?.[index]

      return category?.name ?? ''
    },
    [tenant]
  )

  const filteredProducts = useMemo(() => {
    return products?.filter(({ name, category }) => {
      const selectedCategory = filters.category

      const matchName = filters.name
        ? name.toLowerCase().includes(filters.name.toLowerCase())
        : true

      const matchCategory = selectedCategory
        ? category === parseInt(selectedCategory, 10)
        : true

      return matchName && matchCategory
    })
  }, [products, filters])

  const [lock, setLock] = useState(false)

  /**
   *  DATA MIGRATION ALERT
   *
   *  This piece of code lazily migrate tenant' products from the older way
   *  (inside the tenant) to the new one (with a separate collection).
   */
  useEffect(() => {
    const runMigration = async () => {
      if (
        lock ||
        !tenant?.items?.length ||
        products?.length ||
        productsLoading
      ) {
        return
      }

      await addCategory(dispatch, {
        category: {
          name: 'Principal',
          live: true,
          slug: 'principal',
        },
        tenantId,
        firstCategory: true,
      })

      await Promise.all(
        tenant.items.map(({ items, headline, ...oldProduct }) =>
          addProduct(dispatch, {
            tenantId,
            product: {
              ...oldProduct,
              description: items ? items.join('\n\n') : '',
              highlight: false,
              category: 0,
              userId: user?.uid as string,
            },
          })
        )
      )
      setLock(true)
    }

    runMigration()
  }, [tenant, products, tenantId, user, dispatch, productsLoading, lock])

  return (
    <Fragment>
      <div className="flex flex-column">
        {!!products?.length && tenant?.categories && (
          <ProductsFilters
            onChangeFilters={(data) => setFilters(data)}
            categories={tenant?.categories}
          />
        )}
      </div>

      <List
        size="small"
        bordered
        itemLayout="horizontal"
        dataSource={filteredProducts ?? undefined}
        renderItem={(product) => (
          <List.Item>
            <List.Item.Meta
              avatar={
                <Img
                  width="44"
                  className="br2 mt1"
                  src={product.imgSrc as string}
                  loader={
                    <Skeleton.Image style={{ width: '44px', height: '44px' }} />
                  }
                />
              }
              description={
                <div>
                  <Tag
                    color={getColorForCategory(product.category)}
                    style={{ marginRight: 0 }}
                  >
                    {getCategoryName(product.category)}
                  </Tag>
                  <Divider type="vertical" />
                  <Real cents={product.price} />
                </div>
              }
              title={<span className="f5 fw4">{product.name}</span>}
            />
            <div>
              <Button
                onClick={() => setProduct(product)}
                shape="circle"
                icon={<EditOutlined />}
              />
            </div>
          </List.Item>
        )}
      >
        {productsLoading && (
          <List.Item
            style={{
              maxWidth: '300px',
              width: '90%',
              margin: '5pxpx 0 10px 5px',
            }}
          >
            <Skeleton loading active />
          </List.Item>
        )}
        {!productsLoading && !products?.length && (
          <div className="tc flex justify-center pt4 pb3">
            <Message id="tenant.noProducts" />
          </div>
        )}
        <div className="pt1 pb3 flex justify-center">
          <Button icon={<PlusOutlined />} onClick={() => setAddModal(true)}>
            <Message id="add" />
          </Button>
        </div>
      </List>
      <Modal
        title={<Message id="tenant.product.edit" />}
        visible={!!selectedProduct}
        onCancel={() => setProduct(undefined)}
        footer={null}
      >
        {selectedProduct && (
          <EditProduct
            onFinish={() => setProduct(undefined)}
            product={selectedProduct}
          />
        )}
      </Modal>
      <Modal
        title={<Message id="tenant.product.add" />}
        visible={addModal}
        onCancel={() => setAddModal(false)}
        footer={null}
      >
        <AddProduct onFinish={() => setAddModal(false)} />
      </Modal>
    </Fragment>
  )
}

export default Products
