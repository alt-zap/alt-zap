export default {
  title: "Configuração",
  type: "object",
  required: ["name", "whatsapp", "live", "slug", "deliveryFee"],
  properties: {
    name: {
      type: "string",
      title: "Nome do seu negócio"
    },
    whatsapp: {
      type: "string",
      title: "Número do seu Whatsapp (55(ddd)(numero))",
      pattern: "^55[0-9]{10,11}$"
    },
    live: {
      type: "boolean",
      title: "Você está atendendendo agora?",
      default: false
    },
    slug: {
      type: "string",
      title: "Slug (URL da sua página)",
      pattern: "^[a-z0-9]+(?:-[a-z0-9]+)*$"
    },
    deliveryFee: {
      type: "number",
      title: "Preço da Entrega",
      pattern: "^\\d{1,2},\\d{2}$"
    },
    paymentMethods: {
      type: "array",
      title: "Métodos de Pagamento",
      items: {
        type: "object",
        required: [],
        properties: {
          name: {
            type: "string",
            title: "Nome"
          },
          checksForChange: {
            type: "boolean",
            title: "Precisa de troco?"
          },
          imgSrc: {
            type: "string",
            title: "URL da Imagem "
          },
          description: {
            type: "string",
            title: "Dados para Depósito"
          }
        }
      }
    },
    items: {
      type: "array",
      title: "Itens do Cardápio",
      items: {
        type: "object",
        required: ["name", "price"],
        properties: {
          name: {
            type: "string",
            title: "Nome",
            description: "Nome do item"
          },
          headline: {
            type: "string",
            title: "Subtítulo do item"
          },
          live: {
            type: "boolean",
            title: "Ativo?",
            description: "O produto está sendo entregue agora?"
          },
          imgSrc: {
            type: "string",
            title: "URL da Imagem"
          },
          price: {
            type: "number",
            title: "Preço",
            description: "Preço de venda do produto"
          },
          items: {
            type: "array",
            title: "Subitens",
            items: {
              type: "string"
            }
          }
        }
      }
    }
  }
}
