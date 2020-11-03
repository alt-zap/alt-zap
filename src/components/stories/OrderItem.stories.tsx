/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import Modal from 'antd/lib/modal/Modal'

import OrderItem from '../order/OrderItem'
import withIntl from './withIntl'
import { AssemblyType, Product } from '../../typings'

export default {
  title: 'order/OrderItem',
  component: OrderItem,
  decorators: [
    withIntl,
    (Comp: React.FC) => (
      <Modal visible className="customModal" footer={null}>
        <Comp />
      </Modal>
    ),
  ],
}

const products = [
  {
    description: 'Super pamonha de Dona Rosa!',
    userId: '',
    highlight: false,
    price: 500,
    name: 'Pamonha Recheada',
    assemblyOptions: [
      {
        max: 1,
        type: 'SINGLE' as AssemblyType,
        min: 1,
        name: 'Tamanho',
        options: [
          { name: 'Pequeno', live: true },
          { price: 200, name: 'Médio', live: true },
          { price: 400, name: 'Grande', live: true },
        ],
        live: true,
      },
      {
        max: 3,
        type: 'REPEAT' as AssemblyType,
        min: 1,
        name: 'Adicionais',
        price: 300,
        options: [
          { price: 200, name: 'Bacon', live: true, initialQuantity: 2 },
          { price: 50, name: 'Pimenta Calabresa', live: true },
          { price: 100, name: 'Nata', live: true },
        ],
        live: true,
      },
      {
        price: 100,
        max: 3,
        type: 'SINGLE' as AssemblyType,
        min: 0,
        name: 'Temperos',
        options: [
          { price: 0, name: 'Lemon Pepper', live: true, initialQuantity: 1 },
          { price: 0, name: 'Tomilho', live: true },
          { price: 0, name: 'Cumin', live: true },
          { price: 0, name: 'Páprica Picante', live: true },
        ],
        live: true,
      },
    ] as Product['assemblyOptions'],
    category: 1,
    imgSrc:
      'https://firebasestorage.googleapis.com/v0/b/alt-zap.appspot.com/o/7673341d-0e28-4bb4-b258-11f5f8844c47.jpg?alt=media&token=bd86d456-395f-4c7f-91dd-6afab8e3e780',
    live: true,
    id: 'P9gta905bgWcNBBbUlIP',
  },
  {
    userId: '',
    highlight: false,
    description:
      '1kg de buchada muito bem recheada feito por Dona Eurides\n\n**A melhor buchada da região**',
    price: 2000,
    assemblyOptions: [],
    name: 'Buchada de Bode Simples',
    category: 0,
    imgSrc:
      'https://firebasestorage.googleapis.com/v0/b/alt-zap.appspot.com/o/96ff1bba-ddd4-4638-97ec-15f0935a42de.jpg?alt=media&token=c1c608a4-9bd2-4396-b6f5-765ba3e83a87',
    live: true,
    id: 'r6VAJxfAV7C345O3ADN4',
  },
]

export const Classs = () => (
  <OrderItem product={products[1]} onAddItem={() => {}} />
)

export const WithAssembly = () => (
  <OrderItem product={products[0]} onAddItem={() => {}} />
)
