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
      title: "Número do seu Whatsapp"
    },
    live: {
      type: "boolean",
      title: "Você está atendendendo agora?"
    },
    slug: {
      type: "string",
      title: "Slug (URL da sua página)"
    },
    deliveryFee: {
      type: "number",
      title: "Preço da Entrega"
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
        required: ["title"],
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
