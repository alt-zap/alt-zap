import React, { FC } from 'react'
import { Helmet } from 'react-helmet'

type Props = {
  meta?: any[]
  title?: string
  description?: string
  ogImage?: string
  ogZap?: string
}

const SEO: FC<Props> = ({
  meta = [],
  title,
  description,
  ogImage: ogImg,
  ogZap,
}) => {
  const pageTitle = title ?? 'Alt - Compartilhe seus produtos'

  const pageDescription =
    description ??
    'GRATUITO - Organize seus pedidos de delivery, configure seu catálogo/cardápio rapidamente e venda mais!'

  const imageBase = 'https://alt.app.br'
  const url = 'https://alt.app.br'

  const ogImage = ogImg ?? `${imageBase}/meta.png`
  const ogImageZap = ogZap ?? `${imageBase}/zap.png`
  const icon16 = `${imageBase}/favicon-16x16.png`
  const icon32 = `${imageBase}/favicon-32x32.png`
  const icon180 = `${imageBase}/apple-touch-icon.png`
  const webManifest = `${imageBase}/site.webmanifest`

  return (
    <Helmet
      htmlAttributes={{
        lang: 'pt-BR',
      }}
      title={pageTitle}
      meta={[
        {
          charset: 'utf-8',
        },
        {
          name: 'themeColor',
          content: '#041527',
        },
        {
          name: `description`,
          content: pageDescription,
        },
        {
          property: `og:title`,
          content: pageTitle,
        },
        {
          property: `og:url`,
          content: url,
        },

        {
          property: `og:site_name`,
          content: pageTitle,
        },
        {
          property: `og:description`,
          content: pageDescription,
        },
        {
          property: `og:type`,
          content: `website`,
        },
        {
          name: `twitter:card`,
          content: `summary_large_image`,
        },
        {
          name: `twitter:image:alt`,
          content: pageTitle,
        },
        {
          name: `twitter:title`,
          content: pageTitle,
        },
        {
          name: `twitter:description`,
          content: pageDescription,
        },
        {
          name: `og:image`,
          content: ogImage,
        },
        {
          name: `og:image:type`,
          content: 'image/png',
        },
        {
          name: `og:image:width`,
          content: '1200',
        },
        {
          name: `og:image:height`,
          content: '628',
        },
        {
          name: `og:image`,
          content: ogImageZap,
        },
        {
          name: `og:image:type`,
          content: 'image/png',
        },
        {
          name: `og:image:width`,
          content: '400',
        },
        {
          name: `og:image:height`,
          content: '400',
        },
      ].concat(meta)}
    >
      <link rel="apple-touch-icon" sizes="180x180" href={icon180} />
      <link rel="icon" type="image/png" sizes="32x32" href={icon32} />
      <link rel="icon" type="image/png" sizes="16x16" href={icon16} />
      <link rel="manifest" href={webManifest} />
    </Helmet>
  )
}

export default SEO
