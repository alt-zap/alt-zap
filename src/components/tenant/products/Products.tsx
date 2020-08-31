import React, { FC, Fragment, useState, useMemo, useCallback } from 'react'
import { Button, List, Modal, Skeleton, Divider, Tag, message } from 'antd'
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  ExclamationCircleOutlined,
} from '@ant-design/icons'
import { Img } from 'react-image'
import * as Sentry from '@sentry/react'

import { useTenant, deleteProduct } from '../../../contexts/TenantContext'
import AddProduct from './AddProduct'
import EditProduct from './EditProduct'
import Real from '../../Real'
import ProductsFilters from './ProductsFilters'
import { Product } from '../../../typings'
import { Message, useAltIntl } from '../../../intlConfig'
import MigrateItems from './MigrateItems'

const { confirm } = Modal

const Products: FC = () => {
  const intl = useAltIntl()
  const [filters, setFilters] = useState<Record<string, string>>({})

  const [addModal, setAddModal] = useState(false)
  const [selectedProduct, setProduct] = useState<Product>()

  const [
    { products, productsLoading, tenant, tenantId },
    dispatch,
  ] = useTenant()

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

  const maybeDeleteProduct = useCallback(
    (product: Product) => {
      confirm({
        title: intl.formatMessage({ id: 'tenant.product.sureToDelete' }),
        icon: <ExclamationCircleOutlined />,
        content: product.name,
        onOk() {
          deleteProduct(dispatch, {
            tenantId,
            productId: product.id,
          })
            .then(() => {
              message.success(
                intl.formatMessage({ id: 'tenant.product.deleted' })
              )
            })
            .catch((e) => {
              message.error(
                intl.formatMessage({ id: 'tenant.product.deletedError' })
              )
              Sentry.captureException(e)
            })
        },
      })
    },
    [intl, tenantId, dispatch]
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
        dataSource={productsLoading ? [] : filteredProducts ?? undefined}
        renderItem={(product) => (
          <List.Item>
            <List.Item.Meta
              avatar={
                <Img
                  width="44"
                  className="br2 mt1"
                  src={
                    (product.imgSrc as string) ??
                    'https://www.bauducco.com.br/wp-content/uploads/2017/09/default-placeholder-1-2.png'
                  }
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
            <div className="flex">
              <Button
                className="red mr2"
                danger
                onClick={() => maybeDeleteProduct(product)}
                shape="circle"
                icon={<DeleteOutlined />}
              />
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
            {tenant?.items?.length && !tenant?.migrated ? (
              <MigrateItems />
            ) : (
              <Message id="tenant.noProducts" />
            )}
          </div>
        )}
        <div className="pt1 pb3 flex justify-center">
          <Button icon={<PlusOutlined />} onClick={() => setAddModal(true)}>
            <Message id="add" />
          </Button>
        </div>
      </List>
      <Modal
        destroyOnClose
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
        destroyOnClose
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
