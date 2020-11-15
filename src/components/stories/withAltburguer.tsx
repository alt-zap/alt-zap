import React, { FC, useReducer } from 'react'

import {
  TenantStateProvider,
  TenantDispatchProvider,
} from '../../contexts/TenantContext'
import { tenantStateReducer } from '../../contexts/tenantReducer'
import { TenantContextState, TenantConfig } from '../../typings'

const WithAltburguer: FC<{ overrides?: Partial<TenantConfig> }> = ({
  children,
  overrides = {},
}) => {
  // Check this later
  const [state, dispatch] = useReducer(tenantStateReducer, ({
    loading: false,
    tenantId: 'crTm1DXh6HG3IMjlzMlH',
    live: true,
    productsLoading: false,
    tenant: {
      sites: {
        zap: {
          categoryIds: [
            { visible: true, element: 0 },
            { visible: true, element: 1 },
            { visible: true, element: 2 },
          ],
          productMap: {
            0: [
              { visible: true, element: '3JFP2gm0DKKZpc5sD6ay' },
              { visible: true, element: 'JYCkG0nIN1zLfkZA2NzE' },
              { visible: true, element: 'Mv7z8QhY90fmgtEpikGM' },
              { visible: true, element: 'qG64OFMtkAUzAj76AqNY' },
              { visible: true, element: 'qbEDBaIQ628jOBoO8OX8' },
            ],
            1: [
              { visible: true, element: 'KMp6nh8bNTxWV76sNTkb' },
              { visible: true, element: 'aGofVkNn93REZ0fWuGHf' },
            ],
            2: [
              { visible: true, element: '2qyjg0pwg8dolDGQh6Ee' },
              { visible: true, element: 'wtSQPwPMBKMcxMjzy6Vl' },
            ],
          },
        },
      },
      address: {
        district: 'Catolé',
        street: 'Severino Trindade',
        state: 'PB',
        number: '157',
        city: 'Campina Grande',
      },
      items: [
        {
          name: 'CHUT Burguer',
          price: 1620,
          live: true,
          imgSrc:
            'https://firebasestorage.googleapis.com/v0/b/alt-zap.appspot.com/o/4e8aba7a-31e3-4ba9-8cbd-5d213b4bd228.jpg?alt=media&token=54d0ffd2-faa0-4c92-a47c-202dbf543739',
          headline: '130g blend bovino',
          items: [
            'Chutney especial de tomate',
            'Cebola roxa ',
            'Rúcula fresca',
            'Maionese',
          ],
        },
        {
          live: true,
          headline: '130G DE FRALDINHA',
          imgSrc: 'https://i.imgur.com/Y880XEG.png',
          items: [
            'Pão de batata feito NO DIA',
            'Blend de Fraldinha 🥩 130g',
            'Farofa crocante de Bacon 🥓',
            'Cebola caramelizada 🌰',
            'Creme de cheddar DA CASA',
          ],
          price: 1440,
          name: 'O Pioneiro',
        },
        {
          name: 'Combo Refri + batata média',
          imgSrc:
            'https://firebasestorage.googleapis.com/v0/b/alt-zap.appspot.com/o/7dd9f517-c1d5-4067-98ad-22c7237b8ef8.jpg?alt=media&token=894e76c3-700d-42c6-9840-b363a8a5acaf',
          headline: 'Coca ou guaraná',
          price: 700,
          live: true,
        },
        {
          imgSrc:
            'https://firebasestorage.googleapis.com/v0/b/alt-zap.appspot.com/o/cfee1914-cdbd-4f77-9130-db7862a4a41d.jpg?alt=media&token=1301dc3d-29ca-4dd2-a4ee-e6b3ab21b18d',
          live: true,
          price: 500,
          name: 'Batata média',
        },
        {
          imgSrc:
            'https://firebasestorage.googleapis.com/v0/b/alt-zap.appspot.com/o/fa0d84f6-9378-48ed-b7f3-e07ea332a53c.jpg?alt=media&token=fb889e1b-a0e9-402d-a757-6238ce0d6a51',
          live: true,
          name: 'Batata grande',
          price: 900,
        },
        {
          live: true,
          headline: 'Coca ou guaraná',
          price: 500,
          name: 'Refrigerante 350ml',
          imgSrc:
            'https://firebasestorage.googleapis.com/v0/b/alt-zap.appspot.com/o/33d86096-c27e-4b2f-a47c-5ab14c515a54.jpg?alt=media&token=19ad499a-4d57-44fa-9f58-442ff28ed2dc',
        },
      ],
      color: '#e2d531',
      instagram: 'altburguercg',
      categories: [
        { live: true, slug: 'hamburguer', name: 'Hamburguer' },
        { name: 'Vegetariano', slug: 'vegetariano', live: true },
        { live: true, name: 'Acompanhamentos', slug: 'acompanhamentos' },
      ],
      category: 'hamburgueria',
      userId: 'LuFiB39EBdNFiX66VeWaHlAfEK52',
      whatsapp: '+55 (83) 21539-856_',
      logoSrc:
        'https://firebasestorage.googleapis.com/v0/b/alt-zap.appspot.com/o/d1732c0c-32df-4a7e-b6f3-c6f4c7a336a2.png?alt=media&token=8f5c7bb3-bd6a-496b-8362-3341d59b8efe',
      shippingStrategies: {
        deliveryFixed: { active: true, price: 600 },
        takeaway: { active: true },
      },
      migrated: true,
      slug: 'altburguer-cg',
      openingHours: {
        intervals: [
          {
            to: '2020-09-06T01:00:00.648Z',
            days: 'SUNDAY',
            from: '2020-09-05T18:00:00.807Z',
          },
          {
            days: 'FRIDAY',
            from: '2020-09-11T18:00:00.706Z',
            to: '2020-09-12T01:30:00.210Z',
          },
          {
            days: 'SATURDAY',
            from: '2020-09-12T18:00:00.672Z',
            to: '2020-09-13T01:30:00.768Z',
          },
        ],
      },
      live: true,
      paymentMethods: [
        {
          description:
            '**Banco:** 260 - **Agência:** 0001\r\r\n **Conta:** 56593261-7',
          imgSrc: 'https://i.imgur.com/SZ5X8ME.png',
          name: 'Transferência Nubank',
        },
        {
          description:
            'Acesse o link [https://picpay.me/altburguercg](https://picpay.me/altburguercg) para me pagar com PicPay.',
          name: 'PicPay',
          imgSrc: 'https://i.imgur.com/Gdqzo24.png',
        },
        { name: 'A vista', checksForChange: true },
      ],
      showOnClose: true,
      name: 'Alt Burguer CG',
      deliveryFee: 600,
      editedLast: '2020-07-03T20:58:19.897Z',
    },
    products: [
      {
        live: true,
        userId: 'LuFiB39EBdNFiX66VeWaHlAfEK52',
        description: '',
        imgSrc:
          'https://firebasestorage.googleapis.com/v0/b/alt-zap.appspot.com/o/fa0d84f6-9378-48ed-b7f3-e07ea332a53c.jpg?alt=media&token=fb889e1b-a0e9-402d-a757-6238ce0d6a51',
        highlight: false,
        price: 900,
        name: 'Batata grande',
        category: 2,
        id: '2qyjg0pwg8dolDGQh6Ee',
      },
      {
        live: true,
        userId: 'LuFiB39EBdNFiX66VeWaHlAfEK52',
        category: 0,
        price: 500,
        highlight: false,
        imgSrc:
          'https://firebasestorage.googleapis.com/v0/b/alt-zap.appspot.com/o/33d86096-c27e-4b2f-a47c-5ab14c515a54.jpg?alt=media&token=19ad499a-4d57-44fa-9f58-442ff28ed2dc',
        description: '',
        name: 'Refrigerante 350ml',
        id: '3JFP2gm0DKKZpc5sD6ay',
      },
      {
        imgSrc:
          'https://firebasestorage.googleapis.com/v0/b/alt-zap.appspot.com/o/7dd9f517-c1d5-4067-98ad-22c7237b8ef8.jpg?alt=media&token=894e76c3-700d-42c6-9840-b363a8a5acaf',
        live: true,
        price: 700,
        category: 0,
        description: '',
        highlight: false,
        name: 'Combo Refri + batata média',
        userId: 'LuFiB39EBdNFiX66VeWaHlAfEK52',
        id: 'JYCkG0nIN1zLfkZA2NzE',
      },
      {
        min: null,
        name: 'Pioneiro Vegetariano',
        userId: 'LuFiB39EBdNFiX66VeWaHlAfEK52',
        live: true,
        price: 1500,
        category: 1,
        description:
          'Burguer vegetal 65g (lentilha ou grão de bico), creme de queijo e cebola caramelizada. No pão de batata.',
        id: 'KMp6nh8bNTxWV76sNTkb',
      },
      {
        price: 1600,
        name: 'O Pioneiro',
        live: true,
        category: 0,
        description:
          'Pão de batata feito NO DIA\n\nBlend de Fraldinha 🥩 130g\n\nFarofa crocante de Bacon 🥓\n\nCebola caramelizada 🌰\n\nCreme de cheddar DA CASA',
        imgSrc: 'https://i.imgur.com/Y880XEG.png',
        userId: 'LuFiB39EBdNFiX66VeWaHlAfEK52',
        highlight: false,
        id: 'Mv7z8QhY90fmgtEpikGM',
      },
      {
        price: 1700,
        userId: 'LuFiB39EBdNFiX66VeWaHlAfEK52',
        description:
          'Burguer vegetariano (lentilha ou grão de bico).\nChutney de tomate\nCebola roxa\nRúcula',
        live: true,
        category: 1,
        name: 'Chutney Vegetariano',
        id: 'aGofVkNn93REZ0fWuGHf',
      },
      {
        price: 1600,
        live: true,
        name: 'Basic Burguer',
        userId: 'LuFiB39EBdNFiX66VeWaHlAfEK52',
        description:
          '130g de blend bovino\n2 fatias de queijo cheddar maçaricado\nPicles artesanal da casa\nMolho especial da casa\nPão australiano ou pão batata (Verificar disponibilidade)',
        imgSrc:
          'https://firebasestorage.googleapis.com/v0/b/alt-zap.appspot.com/o/ea978740-9c62-447c-a4e2-bfc6c76d4e87.jpg?alt=media&token=12894356-28ee-4dca-a72d-9a57e01a8b38',
        category: 0,
        highlight: true,
        id: 'qG64OFMtkAUzAj76AqNY',
      },
      {
        highlight: false,
        description:
          'Chutney especial de tomate\n\nCebola roxa \n\nRúcula fresca\n\nMaionese',
        imgSrc:
          'https://firebasestorage.googleapis.com/v0/b/alt-zap.appspot.com/o/4e8aba7a-31e3-4ba9-8cbd-5d213b4bd228.jpg?alt=media&token=54d0ffd2-faa0-4c92-a47c-202dbf543739',
        live: true,
        category: 0,
        name: 'CHUT Burguer',
        userId: 'LuFiB39EBdNFiX66VeWaHlAfEK52',
        price: 1800,
        id: 'qbEDBaIQ628jOBoO8OX8',
      },
      {
        price: 500,
        category: 2,
        live: true,
        highlight: false,
        description: '',
        imgSrc:
          'https://firebasestorage.googleapis.com/v0/b/alt-zap.appspot.com/o/cfee1914-cdbd-4f77-9130-db7862a4a41d.jpg?alt=media&token=1301dc3d-29ca-4dd2-a4ee-e6b3ab21b18d',
        userId: 'LuFiB39EBdNFiX66VeWaHlAfEK52',
        name: 'Batata média',
        id: 'wtSQPwPMBKMcxMjzy6Vl',
      },
    ],
  } as unknown) as TenantContextState)

  return (
    <TenantStateProvider
      value={{
        ...state,
        tenant: {
          ...(state?.tenant as TenantConfig),
          ...overrides,
        },
      }}
    >
      <TenantDispatchProvider value={dispatch}>
        {children}
      </TenantDispatchProvider>
    </TenantStateProvider>
  )
}

export default WithAltburguer
