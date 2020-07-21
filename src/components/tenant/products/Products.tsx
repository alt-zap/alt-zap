import React, { FC, Fragment, useState, useCallback } from 'react'
import { Button, List, Modal, Skeleton, Avatar, Divider, Tag } from 'antd'
import { PlusOutlined, EditOutlined } from '@ant-design/icons'

import { useTenantConfig } from '../../../contexts/TenantContext'
import AddProduct from './AddProduct'
import EditProduct from './EditProduct'
import Real from '../../Real'

const Products: FC = () => {
  const [addModal, setAddModal] = useState(false)
  const [selectedProduct, setProduct] = useState<Product>()

  const { products, productsLoading } = useTenantConfig()

  const getColorForCategory = useCallback((id: string) => {
    // TODO: Use real logic
    return ['#2db7f5', '#87d068', '#108ee9'][parseInt(id, 10)]
  }, [])

  return (
    <Fragment>
      <List
        size="small"
        bordered
        itemLayout="horizontal"
        dataSource={products}
        renderItem={(product) => (
          <List.Item>
            <List.Item.Meta
              avatar={
                <Avatar shape="square" size="large" src={product.imgSrc} />
              }
              description={
                <div>
                  <Tag
                    color={getColorForCategory(product.category.id)}
                    style={{ marginRight: 0 }}
                  >
                    {product.category.name}
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
        <div className="pt1 pb3 flex justify-center">
          <Button icon={<PlusOutlined />} onClick={() => setAddModal(true)}>
            Adicionar
          </Button>
        </div>
      </List>
      <Modal
        title="Editar Categoria"
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
        title="Adicionar Categoria"
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
