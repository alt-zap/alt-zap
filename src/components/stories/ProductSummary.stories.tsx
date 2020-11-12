import React from 'react'
import { withKnobs, text } from '@storybook/addon-knobs'

import ProductSummary from '../common/ProductSummary'

export default {
  title: 'common/ProductSummary',
  component: ProductSummary,
  decorators: [(story: any) => <div className="pa2">{story()}</div>, withKnobs],
}

const commonProps = {
  selectedQuantity: '0',
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setQuantity: (a: string) => {},
}

export const CommonSize = () => (
  <ProductSummary
    {...commonProps}
    product={{
      userId: '',
      category: 0,
      highlight: false,
      live: true,
      name: text('Name', 'O Pioneiro'),
      imgSrc: 'https://i.imgur.com/Y880XEG.png',
      price: 1800,
    }}
  />
)

export const BigTitle = () => (
  <ProductSummary
    {...commonProps}
    product={{
      userId: '',
      category: 0,
      highlight: false,
      live: true,
      name: 'Combo 1 Hambúrguer + Duas Cocas + Batata',
      imgSrc: 'https://i.imgur.com/Y880XEG.png',
      price: 1800,
    }}
  />
)

export const BigHeadline = () => (
  <ProductSummary
    {...commonProps}
    product={{
      userId: '',
      category: 0,
      highlight: false,
      live: true,
      name: 'O Pioneiro',
      imgSrc: 'https://i.imgur.com/Y880XEG.png',
      price: 1800,
    }}
  />
)
