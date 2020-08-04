import React, { FC } from 'react'
import {
  FormattedMessage,
  useIntl,
  MessageDescriptor,
  IntlShape,
} from 'react-intl'
import { Rule } from 'antd/lib/form'

export const intlConfig = {
  locale: 'pt',
  messages: {
    add: 'Adicionar',
    'all.f': 'Todas',
    save: 'Salver',
    'tenant.live': 'Ativo',
    'tenant.products': 'Produtos',
    'tenant.categories': 'Categorias',
    'tenant.categories.name': 'Nome da Categoria',
    'tenant.slug': 'Slug',
    'tenant.categories.add': 'Adicionar Categoria',
    'tenant.categories.live': 'Ativa',
    'tenant.categories.edit': 'Editar Categoria',
    'tenant.categories.productCount': '{count} produtos',
    'tenant.categories.alreadyExists': 'Já existe uma categoria %s',
    'tenant.categories.addSuccess': 'Categoria cadastrada com sucesso',
    'tenant.categories.editSuccess': 'Categoria editada com sucesso',
    'tenant.categories.nameRequired': 'Você deve preencher o nome da categoria',
    'tenant.categories.nameMin': 'O nome deve ter pelo menos 4 caracteres',
    'tenant.categories.nameMax': 'O nome deve ter no máximo 30 caracteres',
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
    'tenant.product.add': 'Adicionar Produto',
    'tenant.product.edit': 'Editar Produto',
    'tenant.product.shouldAddCategory':
      'Você deve primeiro adicionar uma categoria',
    'tenant.product.imgSrc': 'Imagem',
    'imageupload.extensionError': 'Envie um arquivo .png ou .jpg válido',
    'imageupload.success': 'Imagem enviada com sucesso!',
    'imageupload.error': 'Ocorreu um erro ao enviar sua imagem',
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

type IntlRule = {
  message?: keyof typeof intlConfig['messages']
  required?: boolean
  min?: number
  max?: number
}

export type IntlRules = Record<string, IntlRule[]>

export const prepareRules = (rules: IntlRules, intl: IntlShape) => {
  const fields = Object.keys(rules)

  return fields.reduce((acc, cur) => {
    const ruleArray = rules[cur]
    const localizedRules = ruleArray.map(({ message, ...rule }) => ({
      ...rule,
      message: intl.formatMessage({ id: message }),
    }))

    return {
      ...acc,
      [cur]: localizedRules,
    }
  }, {} as Record<string, Rule[]>)
}
