import React from 'react'
import { withKnobs, text } from '@storybook/addon-knobs'

import ProductSummary from '../common/ProductSummary'

export default {
  title: 'common|ProductSummary',
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
      name: text('Name', 'O Pioneiro'),
      imgSrc: 'https://i.imgur.com/Y880XEG.png',
      headline: text('Headline', '130g blend bovino'),
      price: 1800,
    }}
  />
)

export const BigTitle = () => (
  <ProductSummary
    {...commonProps}
    product={{
      name: 'Combo 1 Hambúrguer + Duas Cocas + Batata',
      imgSrc: 'https://i.imgur.com/Y880XEG.png',
      headline: text('Headline', '130g blend bovino'),
      price: 1800,
    }}
  />
)

export const BigHeadline = () => (
  <ProductSummary
    {...commonProps}
    product={{
      name: 'O Pioneiro',
      imgSrc: 'https://i.imgur.com/Y880XEG.png',
      headline: '130g de calabra quentinha pra você, no capricho',
      price: 1800,
    }}
  />
)
