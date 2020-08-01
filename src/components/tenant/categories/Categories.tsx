import React, { FC, Fragment, useState } from 'react'
import { Button, List, Modal, Skeleton } from 'antd'
import { PlusOutlined, EditOutlined } from '@ant-design/icons'

import AddCategory from './AddCategory'
import EditCategory from './EditCategory'
import { useTenantConfig } from '../../../contexts/TenantContext'
import { Category } from '../../../typings'

const Categories: FC = () => {
  const [addModal, setAddModal] = useState(false)
  const [selectedCategory, setCategory] = useState<{
    category: Category
    index: number
  }>()

  const { tenant, loading } = useTenantConfig()

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
              // TODO: Solve this
              description={`${category.products?.length ?? 0} produtos`}
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
            Adicionar
          </Button>
        </div>
      </List>
      <Modal
        title="Editar Categoria"
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
        title="Adicionar Categoria"
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
