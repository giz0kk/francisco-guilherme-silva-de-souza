// Configuração do Tailwind (CDN): fonte e cores do protótipo do Figma.
tailwind.config = {
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        'uber-navy': '#050c4d',  // card azul-marinho da Home
        'uber-blue': '#276ef1',  // destaques azuis (promoção, zona de embarque)
        'uber-green': '#32bb78', // aba selecionada em "Minhas viagens"
      },
    },
  },
};
