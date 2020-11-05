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
    successful: 'Dados atualizados com sucesso',
    errorful: 'Ocorreu um erro ao atualizar os dados',
    add: 'Adicionar',
    'all.f': 'Todas',
    save: 'Salvar',
    'currency.symbol': 'R$',
    'tenant.live': 'Ativo',
    'tenant.openTitle': 'Com base em seu horário de funcionamento',
    'tenant.productsLabel': 'Produtos',
    'tenant.categoriesLabel': 'Categorias',
    'tenant.products':
      '{n, plural, =0 {Produto} one {Produto} other {Produtos}}',
    'tenant.categories':
      '{n, plural, =0 {Categoria} one {Categoria} other {Categorias}}',
    'tenant.categories.name': 'Nome da Categoria',
    'tenant.slug': 'Slug',
    'tenant.data.success': 'Dados salvos com sucesso',
    'tenant.data.error': 'Houve um erro ao salvar os dados :(',
    'tenant.categories.add': 'Adicionar Categoria',
    'tenant.categories.live': 'Ativa',
    'tenant.categories.edit': 'Editar Categoria',
    'tenant.categories.productCount':
      '{count} {count, plural, =0 {produto} one {produto} other {produtos}}',
    'tenant.categories.alreadyExists': 'Já existe uma categoria %s',
    'tenant.categories.addSuccess': 'Categoria cadastrada com sucesso',
    'tenant.categories.editSuccess': 'Categoria editada com sucesso',
    'tenant.categories.nameRequired': 'Você deve preencher o nome da categoria',
    'tenant.categories.nameMin': 'O nome deve ter pelo menos 4 caracteres',
    'tenant.categories.nameMax': 'O nome deve ter no máximo 30 caracteres',
    'tenant.edit': 'Editar',
    'tenant.pendencies': 'Pendências',
    'tenant.open': 'Aberto',
    'tenant.closed': 'Fechado',
    'tenant.sections.menu': 'Catálogo',
    'tenant.sections.schedule': 'Horário de Funcionamento',
    'tenant.sections.operation': 'Operação',
    'tenant.sections.scheduleLive': 'Em funcionamento',
    'tenant.sections.scheduleLiveDesc':
      'Desmarcando essa opção, mesmo que você esteja em horário de funcionamento, seu cardápio não será exibido e você não poderá receber pedidos pelo Alt.',
    'tenant.sections.showOnClose': 'Exibir catálogo fora do horário',
    'tenant.sections.showOnCloseDesc':
      'Com essa opção marcada, seus clients poderão visualizar seu catálogo no Alt Menu fora do horário de atendimento. Eles não conseguirão realizar pedidos',
    'tenant.sections.logistics': 'Logística',
    'tenant.sections.payments': 'Meios de Pagamento',
    'tenant.noProducts': 'Não há produtos cadastrados.',
    'tenant.noCategories': 'Não há categorias cadastradas',
    'tenant.filterByName': 'Filtrar por Nome',
    'tenant.productNamePlaceholder': 'ex: Burguer',
    'tenant.filterByCategory': 'ou por Categoria',
    'tenant.selectCategory': 'Selecione a Categoria',
    'tenant.categories.noCategories': 'Você deve ter categorias cadastradas!',
    'tenant.product.sureToDelete':
      'Você tem certeza que deseja remover esse produto?',
    'tenant.product.deleted': 'Produto removido com sucesso',
    'tenant.product.deletedError': 'Ocorreu um erro ao remover o produto',
    'tenant.product.yes': 'Sim',
    'tenant.product.no': 'No',
    'tenant.product.name': 'Nome do Produto',
    'tenant.product.live': 'Disponível?',
    'tenant.product.delete': 'Remover',
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
    'imageupload.sending': 'Enviando...',
    'imageupload.upload': 'Upload',
    'imageupload.newImage': 'Nova Imagem',
    'imageupload.editImage': 'Edite a imagem',
    'tenant.shipping.success': 'Informações alteradas com sucesso',
    'tenant.shipping.deliveryFixed': 'Entrega com preço fixo',
    'tenant.shipping.deliveryFixedDesc':
      'Caso você determine um valor, este será somado automaticamente em cada compra caso o cliente escolha por Entrega',
    'tenant.shipping.errorFee': 'Informe a taxa',
    'tenant.shipping.takeAway': 'Retirada no Local',
    'tenant.shipping.takeAwayDesc':
      'O cliente poderá visualizar o endereço da sua unidade. Não é adicionada nenhuma taxa no pedido',
    'tenant.paymentMethods': 'Meios de Pagamento',
    'tenant.paymentForm.name': 'Nome',
    'tenant.paymentForm.namePlaceholder': 'Ex: Nubank',
    'tenant.paymentForm.checkForChange': 'Precisa de Troco?',
    'tenant.paymentForm.desc': 'Informações Extras',
    'tenant.paymentForm.imgSrc': 'Imagem',
    'tenant.paymentForm.add': 'Adicionar Meio de Pagamento',
    'tenant.paymentForm.success': 'Dados salvos com sucesso',
    'tenant.paymentForm.error': 'Houve um erro ao salvar os dados',
    'tenant.logistics.strategies': 'Modalidades',
    'tenant.address.success': 'Endereço atualizado com sucesso',
    'tenant.address.title': 'Endereço da Unidade',
    'tenant.hours.weekTitle': 'Horário Semanal',
    'tenant.hours.day': 'Dia (ou intervalo)',
    'tenant.hours.dayPlaceholder': 'Selecione',
    'tenant.hours.hourInterval': 'Intervalo de Horas',
    'tenant.hours.remove': 'Remover',
    'tenant.hours.addInterval': 'Adicionar Janela de Tempo',
    'tenant.name': 'Nome do seu negócio',
    'tenant.url': 'URL da sua página',
    'tenant.category': 'Categoria',
    'tenant.categoryPlaceholder': 'Selecione a categoria',
    'tenant.whatsapp': 'WhatsApp',
    'tenant.whatsappPlaceholder': 'ex: (83) 99934-2545',
    'tenant.instagram': 'Instagram',
    'tenant.logoSrc': 'Logomarca',
    'tenant.color': 'Cor do Tema',
    'tenant.data.nameRequired': 'Você deve preencher o nome do negócio',
    'tenant.data.nameMin': 'O nome deve ter pelo menos 4 caracteres',
    'tenant.data.nameMax': 'O nome deve ter no máximo 30 caracteres',
    'tenant.data.slugRequired': 'Você deve preencher a URL',
    'tenant.data.slugPattern': 'A URL não pode ter caracteres especiais',
    'tenant.data.whatsappRequired': 'Você deve preencher o Whatsapp',
    'tenant.data.instagramPattern': 'Forneça um usuário válido',
    mandatoryField: 'Este campo é obrigatório',
    'tenant.category.hamburgueria': 'Hamburgueria',
    'tenant.category.pizzaria': 'Pizzaria',
    'tenant.category.loja': 'Loja',
    'tenant.category.restaurante': 'Restaurante',
    'tenant.days.all': 'Todos os dias',
    'tenant.days.weekdays': 'De Seg a Sex',
    'tenant.days.weekend': 'Sábado e Domingo',
    'tenant.days.monday': 'Segunda-Feira',
    'tenant.days.tuesday': 'Terça-Feira',
    'tenant.days.wednesday': 'Quarta-Feira',
    'tenant.days.thursday': 'Quinta-Feira',
    'tenant.days.friday': 'Sexta-Feira',
    'tenant.days.saturday': 'Sábado',
    'tenant.days.sunday': 'Domingo',
    'tenant.pendencies.metadata':
      'Você precisa preencher dados como Categoria, cor do tema e outros dados do seu negócio. Clique no botão Editar para preencher!',
    'tenant.pendencies.categories':
      'Você precisa cadastrar as Categorias de Produto para seu negócio. Faça isso no primeiro painel Catálogo',
    'tenant.pendencies.products':
      'Você não tem produtos cadastrados :( Cadastre-os no painel Catálogo',
    'tenant.pendencies.openingHours':
      'No painel Horário de Funcionamento, preencha os intervalos nos quais você estará recebendo pedidos!',
    'tenant.pendencies.logistics':
      'No painel Logística, preencha as suas modalidade de entrega (ou retirada)',
    'tenant.pendencies.payment':
      'Preencha as formas de pagamento que você aceita no painel Meios de Pagamento',
    'tenant.pendencies.address':
      'Você precisa preencher o Endereço de seu negócio no painel de Logística',
    'tenant.pendencies.title': 'Pendência que você precisa ajustar',
    'tenant.productform.assemblyRepeat': 'Selecão Com Repetição',
    'tenant.productform.assemblyText': 'Texto Personalizado',
    'tenant.productform.assemblySimple': 'Seleção Simples',
    'tenant.productform.lessThenMin': 'Maior que o mínimo',
    'tenant.productform.optionSameName':
      'Não é permitido repetir nome de opções',
    'tenant.productform.itemSameName': 'Não é permitido repetir nome de itens',
    'order.assembly.required': 'Esta opção é obrigatória.',
    'order.assembly.select':
      'Selecione {range, select, yes {de {min}} other {}} {strict, select, no {até} other {}} {max} {max, plural, one {opção} other {opções} }',
    'order.assembly.lessThanMin':
      'Você deve selecionar pelo menos {min} {min, plural, one {opção} other {opções}}.',
    'order.field.description': 'Informações Extras',
    'order.field.descriptionPlaceholder': 'Ex: Por favor, tire as cebolas.',
    'onboard.personalData': 'Dados pessoais',
    'onboard.yourBusiness': 'Seu negócio',
    'onboard.fillYourData':
      'Preencha aqui seus dados pessoais. Eles serão usados apenas para controle interno.',
    'onboard.user.name': 'Nome Completo',
    'onboard.user.nameRule': 'Você deve preencher seu nome completo',
    'onboard.user.document': 'CPF',
    'onboard.user.documentRule': 'Por favor, preencha seu CPF',
    'onboard.user.documentMask': '999.999.999-99',
    'onboard.label.main': 'Falta pouco!',
    'onboard.label.sub1': 'Precisamos que você preenche alguns ',
    'onboard.label.sub2': 'dados pessoais',
    'onboard.label.sub3': ' antes de configurar a página do seu negócio.',
    'onboard.error':
      'Ocorreu um erro ao cadastrar o usuário. Já estamos investigando!',
    'onboard.tenantSuccess': 'Negócio cadastrado com sucesso',
    'onboard.tenant.slugError':
      'Já existe um negócio com essa URL. Por favor, escolha outra',
    'onboard.tenant.error':
      'Ocorreu um erro ao cadastrar o tenant. Estamos investigando...',
    address: 'Endereço',
    'address.postalCode': 'CEP',
    'address.loading': 'Carregando...',
    'address.search': 'Buscar',
    'address.useLocation': 'use a sua localização',
    'address.street': 'Logradouro',
    'address.streetPlaceholder': 'ex: Rua Margarida Maria Alves',
    'address.number': 'Número',
    'address.complement': 'Complemento',
    'address.complementPlaceholder': 'ex: Apto 205',
    'address.district': 'Bairro',
    'address.city': 'Cidade',
    'address.state': 'Estado',
    'address.streetRule': 'Preencha com o nome de sua rua',
    'address.numberRule': 'Obrigatório',
    'address.districtRule': 'Preencha seu bairro',
    'address.cityRule': 'Preencha sua cidade',
    'address.stateRule': 'Selecione seu estado',
    'address.form.save': 'Salvar Endereço',
    'tenant.migrate': 'Mostrar Produtos',
    'tenant.postMigrate':
      'Você está testando uma versão beta! Algumas configurações não refletirão no seu Menu.',
    'tenant.invalidSlug': 'Slug inválido ou já existente. Escolha outro',
    'tenant.pendenciesInfo':
      'Ei! Algumas dessas funcionalidades ainda estão sendo testadas e poderão não refletir no seu Cardápio Online. Aguarde!',
    'order.closedForBuzz': 'Este estabelecimento não está atendendo agora',
    'order.semiClosed':
      'Este estabelecimento não está atendendo agora. Você poderá ver seu catálogo mas não poderá fazer pedidos.',
    'order.alert':
      'No final, vamos te redirecionar pra o Whatsapp para finalizar seu pedido ;)',
    'order.loading': 'Carregando o catálogo...',
    'order.shippingMethod': 'Forma de Envio',
    'order.shipping.rule': 'Você deve preencher uma forma de entrega',
    'order.shipping.delivery': 'Entrega',
    'order.shipping.takeaway': 'Retire no Local',
    'order.shipping.addressTake': 'Endereço para Retirada',
    'order.shipping.openOnMaps': 'Abra no Google Maps',
    'order.payment.selectPayment': 'Selecione a forma de pagamento',
    'order.payment.info': 'Informações',
    'order.payment.sendReceive':
      'Envie o comprovante de transferência pelo Whatsapp',
    'order.payment.changeLabel': 'Precisa de troco para:',
    'admin.onDevMode': 'MODO DE DESENVOLVIMENTO',
    'admin.tenants': 'Meus negócios',
    'adming.githubLink': 'Estamos no GitHub',
    'adming.logout': 'Sair',
    'tenant.sites': 'Sites',
    'tenant.sitesOnline': 'Sites Online',
    'tenant.sites.status': 'Status',
    'tenant.sites.active': 'Ativo',
    'tenant.sites.inactive': 'Inativo',
    'tenant.sites.address': 'Endereço',
    'tenant.sites.type': 'Tipo',
    'tenant.sites.info':
      'Estamos configurando o endereço alt.app.br para você usar. Logo estará disponível!',
    'autofill.locationNotShared': 'Você não compartilhou sua localização',
    'autofill.locationError': 'Não foi possível buscar sua localização',
    'tenant.sites.sort.info':
      'Para ordernar os itens, basta arrastá-los com o mouse ou com o toque. Todas as alterações são salvas automaticamente.',
    'tenant.sites.sort.categories': 'Categorias',
    'tenant.sites.sort.label': 'O que deseja ordenar?',
    'tenant.sites.table.edit': 'Editar',
    'tenant.sites.editModal.title': 'Ordenar sessões',
    'feedback.sendSuggestionButton': 'Enviar Sugestão',
    'feedback.sendBugbutton': 'Enviar Problema',
    'feedback.reportBug': 'Reportar um Problema',
    'feedback.reportFeature': 'Enviar uma Sugestão',
    'feedback.placeholder': 'Descreva o que você quer nos dizer',
    'feedback.title': 'Envie-nos um Feedback',
    'feedback.conta': 'Conta!',
  },
}

export const altMessage = (id: AltMessage) => id

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
      values?: Record<string, string | number>
    ) => intl.formatMessage(descriptor, values),
  }
}

export type AltMessage = keyof typeof intlConfig['messages']

type IntlRule = {
  message?: AltMessage
  required?: boolean
  pattern?: RegExp
  min?: number
  max?: number
}

export type IntlRules = Record<string, IntlRule[]>

export type TypedIntlRules<T> = Partial<Record<keyof T, IntlRule[]>>

export type IntlSelect<T = string> = Array<{ name: AltMessage; value: T }>

export const prepareSelect = (select: IntlSelect, intl: IntlShape) => {
  return select.map(({ name, value }) => ({
    value,
    name: intl.formatMessage({ id: name }),
  }))
}

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
