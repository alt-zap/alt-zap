import React, { FC, useReducer } from 'react'

import {
  TenantStateProvider,
  TenantDispatchProvider,
} from '../../contexts/TenantContext'
import { tenantStateReducer } from '../../contexts/tenantReducer'

const WithAltburguer: FC = ({ children }) => {
  const [state, dispatch] = useReducer(tenantStateReducer, {
    loading: true,
    tenantId: '0',
    tenant: {
      migrated: true,
      address: {
        state: 'PB',
        number: '157',
        city: 'Campina Grande',
        district: 'Catolé',
        street: 'Severino Trindade',
      },
      instagram: 'altburguercg',
      openingHours: {
        intervals: [
          {
            from: '2020-09-05T18:00:00.807Z',
            to: '2020-09-06T01:00:00.648Z',
            days: 'SUNDAY',
          },
          {
            to: '2020-09-12T01:30:00.210Z',
            from: '2020-09-11T18:00:00.706Z',
            days: 'FRIDAY',
          },
          {
            to: '2020-09-13T01:30:00.768Z',
            days: 'SATURDAY',
            from: '2020-09-12T18:00:00.672Z',
          },
        ],
      },
      shippingStrategies: {
        takeaway: { active: true },
        deliveryFixed: { active: true, price: 600 },
      },
      live: true,
      userId: 'LuFiB39EBdNFiX66VeWaHlAfEK52',
      whatsapp: '558396446497',
      deliveryFee: 600,
      name: 'Alt Burguer CG',
      category: 'hamburgueria',
      items: [
        {
          imgSrc:
            'https://firebasestorage.googleapis.com/v0/b/alt-zap.appspot.com/o/4e8aba7a-31e3-4ba9-8cbd-5d213b4bd228.jpg?alt=media&token=54d0ffd2-faa0-4c92-a47c-202dbf543739',
          items: [
            'Chutney especial de tomate',
            'Cebola roxa ',
            'Rúcula fresca',
            'Maionese',
          ],
          headline: '130g blend bovino',
          price: 1620,
          name: 'CHUT Burguer',
          live: true,
        },
        {
          headline: '130G DE FRALDINHA',
          imgSrc: 'https://i.imgur.com/Y880XEG.png',
          name: 'O Pioneiro',
          price: 1440,
          items: [
            'Pão de batata feito NO DIA',
            'Blend de Fraldinha 🥩 130g',
            'Farofa crocante de Bacon 🥓',
            'Cebola caramelizada 🌰',
            'Creme de cheddar DA CASA',
          ],
          live: true,
        },
        {
          imgSrc:
            'https://firebasestorage.googleapis.com/v0/b/alt-zap.appspot.com/o/7dd9f517-c1d5-4067-98ad-22c7237b8ef8.jpg?alt=media&token=894e76c3-700d-42c6-9840-b363a8a5acaf',
          headline: 'Coca ou guaraná',
          price: 700,
          name: 'Combo Refri + batata média',
          live: true,
        },
        {
          imgSrc:
            'https://firebasestorage.googleapis.com/v0/b/alt-zap.appspot.com/o/cfee1914-cdbd-4f77-9130-db7862a4a41d.jpg?alt=media&token=1301dc3d-29ca-4dd2-a4ee-e6b3ab21b18d',
          name: 'Batata média',
          live: true,
          price: 500,
        },
        {
          imgSrc:
            'https://firebasestorage.googleapis.com/v0/b/alt-zap.appspot.com/o/fa0d84f6-9378-48ed-b7f3-e07ea332a53c.jpg?alt=media&token=fb889e1b-a0e9-402d-a757-6238ce0d6a51',
          price: 900,
          live: true,
          name: 'Batata grande',
        },
        {
          headline: 'Coca ou guaraná',
          imgSrc:
            'https://firebasestorage.googleapis.com/v0/b/alt-zap.appspot.com/o/33d86096-c27e-4b2f-a47c-5ab14c515a54.jpg?alt=media&token=19ad499a-4d57-44fa-9f58-442ff28ed2dc',
          live: true,
          name: 'Refrigerante 350ml',
          price: 500,
        },
      ],
      slug: 'altburguer-cg',
      paymentMethods: [
        {
          description:
            '**Banco:** 260 - **Agência:** 0001\r\r\n **Conta:** 56593261-7',
          name: 'Transferência Nubank',
          imgSrc: 'https://i.imgur.com/SZ5X8ME.png',
        },
        {
          imgSrc: 'https://i.imgur.com/Gdqzo24.png',
          description:
            'Acesse o link [https://picpay.me/altburguercg](https://picpay.me/altburguercg) para me pagar com PicPay.',
          name: 'PicPay',
        },
        { name: 'A vista', checksForChange: true },
      ],
      categories: [
        { slug: 'hamburguer', name: 'Hamburguer', live: true },
        { name: 'Vegetariano', slug: 'vegetariano', live: true },
      ],
    },
  })

  return (
    <TenantStateProvider value={state}>
      <TenantDispatchProvider value={dispatch}>
        {children}
      </TenantDispatchProvider>
    </TenantStateProvider>
  )
}

export default WithAltburguer
