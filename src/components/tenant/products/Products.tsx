import React, { FC, Fragment, useState, useMemo, useCallback } from 'react'
import {
  Button,
  List,
  Form,
  Modal,
  Skeleton,
  Avatar,
  Divider,
  Tag,
  Input,
  Select,
} from 'antd'
import { PlusOutlined, EditOutlined } from '@ant-design/icons'
import { Img } from 'react-image'

import { useTenantConfig } from '../../../contexts/TenantContext'
import AddProduct from './AddProduct'
import EditProduct from './EditProduct'
import Real from '../../Real'

const { Item } = Form
const { Option } = Select

const Products: FC = () => {
  const [filters, setFilters] = useState<Record<string, string>>({})

  const [addModal, setAddModal] = useState(false)
  const [selectedProduct, setProduct] = useState<Product>()

  const { products, productsLoading, categories } = useTenantConfig()

  const getColorForCategory = useCallback((id: string) => {
    // TODO: Use real logic
    return ['#2db7f5', '#87d068', '#108ee9'][parseInt(id, 10)]
  }, [])

  const filteredProducts = useMemo(() => {
    return products?.filter(({ name, category }) => {
      const selectedCategory = filters.category

      const matchName = filters.name
        ? name.toLowerCase().includes(filters.name.toLowerCase())
        : true

      const matchCategory = selectedCategory
        ? category.id === selectedCategory
        : true

      return matchName && matchCategory
    })
  }, [products, filters])

  return (
    <Fragment>
      <div className="flex flex-column">
        <Form
          initialValues={{
            category: '',
          }}
          className=""
          layout="vertical"
          onFieldsChange={(_, fields) => {
            const newFilters = fields.reduce(
              (acc, cur) => ({
                ...acc,
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                [(cur as any).name[0]]: cur.value,
              }),
              {}
            )

            setFilters(newFilters)
          }}
        >
          <div
            className="flex items-center pa3 mb2 br1"
            style={{ border: '1px solid #d9d9d9' }}
          >
            <div className="w-60 pr3">
              <Item name="name" label="Filtar por Nome">
                <Input size="large" placeholder="ex: Burguer" />
              </Item>
            </div>

            <Item name="category" label="ou por Categoria" className="w-60">
              <Select size="large" placeholder="Selecione a categoria">
                <Option value="" key={0}>
                  Todas
                </Option>
                {categories?.map(({ name, id }) => (
                  <Option value={id} key={id}>
                    {name}
                  </Option>
                ))}
              </Select>
            </Item>
          </div>
        </Form>
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
        {!productsLoading && !products && (
          <div className="tc flex justify-center pt4 pb3">Não há produtos</div>
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
