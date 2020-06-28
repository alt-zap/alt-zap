export default {
  deliveryFee: 500,
  paymentMethods: {
    transfer: {
      label: "Transferência Nubank"
    },
    picpay: {
      label: "PicPay"
    },
    cash: {
      label: "À vista",
      checkForChange: true
    }
  },
  items: [
    {
      nome: "O Pioneiro",
      imgSrc: "https://i.imgur.com/Y880XEG.png",
      headline: "130G DE FRALDINHA",
      items: [
        "Pão de batata feito NO DIA",
        "Blend de Fraldinha 🥩 130g",
        "Farofa crocante de Bacon 🥓",
        "Cebola caramelizada 🌰",
        "Creme de cheddar DA CASA"
      ],
      price: 1600
    },
    {
      nome: "The Scarn",
      imgSrc:
        "https://pbs.twimg.com/profile_images/3040411861/7c55dd6ecd8df145225815cb152abfe9.png",
      headline: "100G DE BANHA",
      items: [
        "Pão de batata feito NO DIA",
        "Blend de Fraldinha 🥩 130g",
        "Farofa crocante de Bacon 🥓",
        "Cebola caramelizada 🌰",
        "Creme de cheddar DA CASA"
      ],
      price: 1600
    },
    {
      nome: "Refrigerante Latinha",
      imgSrc:
        "https://images.rappi.com.br/products/2097997798-1588027867407.png?d=200x200",
      headline: "COCA/GUARANÁ",
      price: 500
    }
  ]
}
