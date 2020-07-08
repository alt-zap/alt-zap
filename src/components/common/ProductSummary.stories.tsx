import React from 'react'
import { withKnobs, text } from '@storybook/addon-knobs'

import ProductSummary from './ProductSummary'

export default {
  title: 'common|ProductSummary',
  component: ProductSummary,
  decorators: [(story: any) => <div className="pa2">{story()}</div>, withKnobs],
}

export const CommonSize = () => (
  <ProductSummary
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
    product={{
      name: 'O Pioneiro',
      imgSrc: 'https://i.imgur.com/Y880XEG.png',
      headline: '130g de calabra quentinha pra você, no capricho',
      price: 1800,
    }}
  />
)
