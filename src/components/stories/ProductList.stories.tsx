/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import { withKnobs } from '@storybook/addon-knobs'

import ProductList from '../order/ProductList'

export default {
  title: 'common|ProductList',
  component: ProductList,
  decorators: [
    (story: any) => (
      <div className="pa2" style={{ backgroundColor: '#f0f2f5' }}>
        {story()}
      </div>
    ),
    withKnobs,
  ],
}

// export const none = () => <ProductList products={[]} onOrder={() => {}} />

const fakeProducts = [
  {
    userId: 'LuFiB39EBdNFiX66VeWaHlAfEK52',
    highlight: false,
    name: 'Batata grande',
    category: 0,
    imgSrc:
      'https://firebasestorage.googleapis.com/v0/b/alt-zap.appspot.com/o/fa0d84f6-9378-48ed-b7f3-e07ea332a53c.jpg?alt=media&token=fb889e1b-a0e9-402d-a757-6238ce0d6a51',
    description: '',
    price: 900,
    live: true,
    id: '2qyjg0pwg8dolDGQh6Ee',
  },
  {
    live: true,
    imgSrc:
      'https://firebasestorage.googleapis.com/v0/b/alt-zap.appspot.com/o/33d86096-c27e-4b2f-a47c-5ab14c515a54.jpg?alt=media&token=19ad499a-4d57-44fa-9f58-442ff28ed2dc',
    category: 0,
    highlight: false,
    name: 'Refrigerante 350ml',
    userId: 'LuFiB39EBdNFiX66VeWaHlAfEK52',
    price: 500,
    description: '',
    id: '3JFP2gm0DKKZpc5sD6ay',
  },
  {
    userId: 'LuFiB39EBdNFiX66VeWaHlAfEK52',
    imgSrc:
      'https://firebasestorage.googleapis.com/v0/b/alt-zap.appspot.com/o/7dd9f517-c1d5-4067-98ad-22c7237b8ef8.jpg?alt=media&token=894e76c3-700d-42c6-9840-b363a8a5acaf',
    description: '',
    category: 0,
    live: true,
    price: 700,
    name: 'Combo Refri + batata média',
    highlight: false,
    id: 'JYCkG0nIN1zLfkZA2NzE',
  },
  {
    highlight: false,
    category: 0,
    imgSrc: 'https://i.imgur.com/Y880XEG.png',
    live: true,
    description:
      'Pão de batata feito NO DIA\n\nBlend de Fraldinha 🥩 130g\n\nFarofa crocante de Bacon 🥓\n\nCebola caramelizada 🌰\n\nCreme de cheddar DA CASA',
    price: 1600,
    userId: 'LuFiB39EBdNFiX66VeWaHlAfEK52',
    name: 'O Pioneiro',
    id: 'Mv7z8QhY90fmgtEpikGM',
  },
  {
    name: 'CHUT Burguer',
    userId: 'LuFiB39EBdNFiX66VeWaHlAfEK52',
    highlight: false,
    category: 0,
    live: true,
    imgSrc:
      'https://firebasestorage.googleapis.com/v0/b/alt-zap.appspot.com/o/4e8aba7a-31e3-4ba9-8cbd-5d213b4bd228.jpg?alt=media&token=54d0ffd2-faa0-4c92-a47c-202dbf543739',
    price: 1800,
    description:
      'Chutney especial de tomate\n\nCebola roxa \n\nRúcula fresca\n\nMaionese',
    id: 'qbEDBaIQ628jOBoO8OX8',
  },
  {
    category: 0,
    price: 500,
    userId: 'LuFiB39EBdNFiX66VeWaHlAfEK52',
    description: '',
    live: true,
    highlight: false,
    imgSrc:
      'https://firebasestorage.googleapis.com/v0/b/alt-zap.appspot.com/o/cfee1914-cdbd-4f77-9130-db7862a4a41d.jpg?alt=media&token=1301dc3d-29ca-4dd2-a4ee-e6b3ab21b18d',
    name: 'Batata média',
    id: 'wtSQPwPMBKMcxMjzy6Vl',
  },
]

const nested = [
  {
    name: 'Principal',
    products: fakeProducts,
  },
  {
    name: 'Secundárias',
    products: fakeProducts,
  },
]

export const LotsOfProducts = () => (
  <ProductList sections={nested} onOrder={() => {}} />
)
