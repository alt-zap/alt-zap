import React, { FC, Fragment, useState, useMemo } from 'react'
import { Button, List, Modal, Skeleton } from 'antd'
import { PlusOutlined, EditOutlined } from '@ant-design/icons'

import AddCategory from './AddCategory'
import EditCategory from './EditCategory'
import {
  useTenantConfig,
  countProductPerCategory,
} from '../../../contexts/TenantContext'
import { Category } from '../../../typings'
import { useAltIntl, Message } from '../../../intlConfig'

const Categories: FC = () => {
  const intl = useAltIntl()
  const [addModal, setAddModal] = useState(false)
  const [selectedCategory, setCategory] = useState<{
    category: Category
    index: number
  }>()

  const { tenant, loading, products } = useTenantConfig()

  const productsCount = useMemo(() => {
    if (!products) return []

    return (
      tenant?.categories?.map((_, index) =>
        countProductPerCategory(index, products)
      ) ?? []
    )
  }, [tenant, products])

  return (
    <Fragment>
      <List
        size="small"
        bordered
        itemLayout="horizontal"
        dataSource={tenant?.categories}
        renderItem={(category, index) => (
          <List.Item>
            <List.Item.Meta
              title={<span className="f5 fw4">{category.name}</span>}
              description={intl.formatMessage(
                {
                  id: 'tenant.categories.productCount',
                },
                {
                  count: `${productsCount[index]}`,
                }
              )}
            />
            <div>
              <Button
                onClick={() => setCategory({ category, index })}
                shape="circle"
                icon={<EditOutlined />}
              />
            </div>
          </List.Item>
        )}
      >
        {loading && (
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
            <Message id="add" />
          </Button>
        </div>
      </List>
      <Modal
        title={<Message id="tenant.categories.edit" />}
        visible={!!selectedCategory}
        onCancel={() => setCategory(undefined)}
        footer={null}
      >
        {selectedCategory && (
          <EditCategory
            onFinish={() => setCategory(undefined)}
            category={selectedCategory.category}
            index={selectedCategory.index}
          />
        )}
      </Modal>
      <Modal
        title={<Message id="tenant.categories.add" />}
        visible={addModal}
        onCancel={() => setAddModal(false)}
        footer={null}
      >
        <AddCategory onFinish={() => setAddModal(false)} />
      </Modal>
    </Fragment>
  )
}

export default Categories
