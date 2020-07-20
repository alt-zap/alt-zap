import React, { FC } from 'react'
import { EditOutlined, PlusOutlined } from '@ant-design/icons'
import {
  PageHeader,
  Tag,
  Button,
  Statistic,
  List,
  Row,
  Typography,
  Divider,
} from 'antd'

const { Text } = Typography

type Props = {
  tenant: Partial<TenantConfig>
}

const TenantDashboard: FC<Props> = ({ tenant }) => {
  return (
    <div className="flex flex-column">
      <PageHeader
        onBack={() => window.history.back()}
        title={tenant.name}
        tags={
          <Tag color={tenant.live ? 'blue' : 'red'}>
            {tenant.live ? 'Aberto' : 'Fechado'}
          </Tag>
        }
        extra={[
          <Button key="1" type="primary">
            Editar
            <EditOutlined />
          </Button>,
        ]}
      >
        <Row>
          <Statistic
            title="Categorias"
            value="1"
            style={{ margin: '0 32px 0 0' }}
          />
          <Statistic title="Produtos" value={tenant.items?.length} />
        </Row>
      </PageHeader>
      <Divider>Categorias</Divider>
      <List
        size="small"
        bordered
        itemLayout="horizontal"
        dataSource={tenant?.menus?.[0]?.categories}
        renderItem={(category) => (
          <List.Item>
            <List.Item.Meta
              title={<a href="https://ant.design">{category.name}</a>}
              description={`${category.products.length} produtos`}
            />
          </List.Item>
        )}
      >
        <div className="pt1 pb3 flex justify-center">
          <Button icon={<PlusOutlined />} onClick={() => onAddTenant()}>
            Adicionar
          </Button>
        </div>
      </List>
      <Divider>Produtos</Divider>
    </div>
  )
}

export default TenantDashboard
