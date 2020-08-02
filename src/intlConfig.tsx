import React, { FC } from 'react'
import { FormattedMessage, useIntl, MessageDescriptor } from 'react-intl'

export const intlConfig = {
  locale: 'pt',
  messages: {
    add: 'Adicionar',
    'all.f': 'Todas',
    save: 'Salver',
    'tenant.live': 'Ativo',
    'tenant.products': 'Produtos',
    'tenant.categories': 'Categorias',
    'tenant.edit': 'Editar',
    'tenant.sections.menu': 'Menu de Produtos',
    'tenant.sections.schedule': 'Horário de Funcionamento',
    'tenant.sections.logistics': 'Logística',
    'tenant.sections.payments': 'Meios de Pagamento',
    'tenant.noProducts': 'Não há produtos cadastrados.',
    'tenant.filterByName': 'Filtrar por Nome',
    'tenant.productNamePlaceholder': 'ex: Burguer',
    'tenant.filterByCategory': 'ou por Categoria',
    'tenant.selectCategory': 'Selecione a Categoria',
    'tenant.categories.noCategories': 'Você deve ter categorias cadastradas!',
    'tenant.product.name': 'Nome do Produto',
    'tenant.product.live': 'Disponível?',
    'tenant.product.category': 'Categoria',
    'tenant.product.categoryPlaceholder': 'Selecione a categoria',
    'tenant.product.description': 'Descrição',
    'tenant.product.display': 'Exibição',
    'tenant.product.displayMode': 'Modo de Exibição',
    'tenant.product.horizontal': 'Horizontal',
    'tenant.product.highlight': 'Destaque',
    'tenant.product.basePrice': 'Preço Base',
    'tenant.product.price': 'Preço',
    'tenant.product.offer': 'Oferta',
    'tenant.product.min': 'Mínimo',
    'tenant.product.max': 'Máximo',
    'tenant.product.assemblyOptions': 'Opções de Montagem',
    'tenant.product.fieldName': 'Nome do Campo',
    'tenant.product.placeholderField': 'ex: Sabor',
    'tenant.product.type': 'Tipo',
    'tenant.product.placeholderType': 'Selecione o tipo',
    'tenant.product.options': 'Opções',
    'tenant.product.optionName': 'Nome da Opção',
    'tenant.product.placeholderOption': 'Ex: Calabresa',
    'tenant.product.placeholderDescription': 'Ex: Contém Lactose',
    'tenant.product.initialQuantity': 'Quantidade Inicial',
    'tenant.product.removeItem': 'Remover Item',
    'tenant.product.removeOption': 'Remover Opção',
    'tenant.product.addItem': 'Adicionar Item',
    'tenant.product.addOption': 'Adicionar Opção',
    'tenant.product.addField': 'Adicionar Campo',
    'tenant.product.add': 'Adicionar Produt',
    'tenant.product.imgSrc': 'Imagem',
  },
}

interface MessageProps
  extends React.ComponentPropsWithoutRef<typeof FormattedMessage> {
  id: keyof typeof intlConfig['messages']
}

export const Message: FC<MessageProps> = ({ id, ...props }) => {
  return <FormattedMessage id={id} {...props} />
}

interface MyMessageDescriptor extends MessageDescriptor {
  id: keyof typeof intlConfig['messages']
}

export const useAltIntl = () => {
  const intl = useIntl()

  return {
    ...intl,
    formatMessage: (
      descriptor: MyMessageDescriptor,
      values?: Record<string, string>
    ) => intl.formatMessage(descriptor, values),
  }
}
