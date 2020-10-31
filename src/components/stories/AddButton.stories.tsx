import React from 'react'

import AddButton from '../order/AddButton'

export default {
  title: 'common/AddButton',
  component: AddButton,
  decorators: [(story: any) => <div className="pa2">{story()}</div>],
}

export const Default = () => <AddButton label="Adicionar" price={0} />

export const Loading = () => <AddButton label="Adicionar" price={0} loading />
