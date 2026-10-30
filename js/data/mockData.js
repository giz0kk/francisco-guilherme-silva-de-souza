/**
 * Dados simulados da aplicação.
 *
 * Tudo o que está aqui virá do back-end no futuro. As telas NÃO leem este
 * arquivo diretamente: elas sempre usam o serviço `api` (js/services/api.js).
 *
 * Coordenadas do mapa (x, y) estão em PORCENTAGEM da área do mapa:
 * x = 0 é a esquerda, x = 100 é a direita; y = 0 é o topo, y = 100 é a base.
 */
const MOCK_DATA = {
  user: {
    name: 'Alex Morgan',
    rating: 4.92,
  },

  /* Local de embarque padrão (localização atual do usuário) */
  currentLocation: {
    id: 'frei-caneca',
    title: 'Shopping Frei Caneca',
    subtitle: 'Rua Frei Caneca, 569 - Consolação',
  },

  /* Home: destinos recentes */
  recentPlaces: [
    { id: 'masp', title: 'MASP', subtitle: 'Av. Paulista, 1578 - Bela Vista' },
    { id: 'mercadao', title: 'Mercado Municipal', subtitle: 'R. da Cantareira, 306 - Centro Histórico' },
  ],

  /* Home: sugestões de serviços */
  suggestions: [
    { id: 'viagem', label: 'Viagem', image: 'assets/images/car-sedan.png', imageClass: 'h-24 w-24 -my-3', route: 'plan-ride' },
    { id: 'pacote', label: 'Pacote', image: 'assets/images/package-box.png', imageClass: 'h-12 w-12', route: 'delivery' },
    { id: 'por-hora', label: 'Por hora', image: 'assets/images/hourly.png', imageClass: 'h-16 w-16', route: 'plan-ride' },
  ],

  /* Home: seções de cards com rolagem horizontal */
  savingsSections: [
    {
      id: 'economize',
      title: 'Formas de economizar com a Uber',
      cards: [
        { id: 'juntos', title: 'Compartilhe a viagem', subtitle: 'Divida a viagem e o valor', image: 'assets/images/share-ride.png', size: 'large', route: 'plan-ride' },
        { id: 'paradas', title: 'Adicione paradas', subtitle: 'Busque seus amigos', image: 'assets/illustrations/hero-gift.svg', size: 'small', route: 'add-stops' },
      ],
    },
    {
      id: 'mais',
      title: 'Mais jeitos de usar a Uber',
      cards: [
        { id: 'aeroporto', title: 'Vai para o aeroporto?', subtitle: 'Agende sua ida a Congonhas', image: 'assets/illustrations/hero-airport.svg', size: 'large', route: 'plan-ride' },
        { id: 'feira', title: 'Fazer compras', subtitle: 'Vá e volte do mercado', image: 'assets/illustrations/hero-avocado.svg', size: 'small', route: 'plan-ride' },
      ],
    },
  ],

  /* Home: carrossel do card azul */
  promoSlides: [
    { id: 'por-hora', title: 'Um motorista, várias paradas', cta: 'Experimente Uber por hora', artwork: 'assets/illustrations/badge-airport.svg', route: 'plan-ride' },
    { id: 'juntos', title: 'Divida a viagem, divida o valor', cta: 'Experimente Uber Juntos', artwork: 'assets/illustrations/hero-avocado.svg', route: 'plan-ride' },
    { id: 'paradas', title: 'Busque amigos no caminho', cta: 'Adicione até 5 paradas', artwork: 'assets/illustrations/hero-gift.svg', route: 'add-stops' },
  ],

  /* Planejar corrida: endereços que podem ser buscados */
  addresses: [
    { id: 'a1', title: 'MASP', subtitle: 'Av. Paulista, 1578 - Bela Vista' },
    { id: 'a2', title: 'Theatro Municipal', subtitle: 'Praça Ramos de Azevedo - República' },
    { id: 'a3', title: 'Mercado Municipal', subtitle: 'R. da Cantareira, 306 - Centro Histórico' },
    { id: 'a4', title: 'Parque Ibirapuera', subtitle: 'Av. Pedro Álvares Cabral - Vila Mariana' },
    { id: 'a5', title: 'Pinacoteca de São Paulo', subtitle: 'Praça da Luz, 2 - Luz' },
    { id: 'a6', title: 'Aeroporto de Congonhas', subtitle: 'Av. Washington Luís, s/n - Campo Belo' },
    { id: 'a7', title: 'Allianz Parque', subtitle: 'Av. Francisco Matarazzo, 1705 - Água Branca' },
    { id: 'a8', title: 'Shopping Frei Caneca', subtitle: 'Rua Frei Caneca, 569 - Consolação' },
  ],

  /* Escolher corrida: categorias disponíveis */
  rideOptions: [
    { id: 'uberx', name: 'UberX', seats: 4, image: 'assets/images/uberx.png', arrivalTime: '15:24', minutesAway: 4, price: 24.9, promo: '' },
    { id: 'juntos', name: 'Uber Juntos', seats: 2, image: 'assets/images/uberx-share.png', arrivalTime: '15:25 - 15:31', minutesAway: 6, price: 18.5, promo: 'Economize até 30% compartilhando' },
    { id: 'moto', name: 'Uber Moto', seats: 1, image: 'assets/images/connect.png', arrivalTime: '15:22', minutesAway: 2, price: 11.9, promo: '' },
  ],

  paymentMethods: [
    { id: 'dinheiro', label: 'Dinheiro', icon: 'assets/images/cash.png' },
  ],

  /* Local de embarque: zonas de embarque do shopping */
  pickupZones: [
    { id: 'principal', name: 'Entrada principal - Rua Frei Caneca', x: 62, y: 45 },
    { id: 'augusta', name: 'Saída do estacionamento - Rua Augusta', x: 30, y: 62 },
  ],

  /* Rotas desenhadas no mapa (pontos em porcentagem) */
  routes: {
    // do motorista até o embarque
    driverToPickup: [[85, 18], [74, 24], [62, 20], [50, 26], [40, 30], [32, 36]],
    // do embarque até o destino
    pickupToDestination: [[32, 36], [34, 52], [46, 56], [52, 66], [64, 70], [72, 84]],
  },

  /* Motoristas disponíveis (um é sorteado ao pedir a corrida) */
  drivers: [
    { id: 'd1', name: 'Carlos', rating: 4.95, totalTrips: 3240, vehicle: 'Chevrolet Onix', color: 'Prata', plate: 'FJK2B47' },
    { id: 'd2', name: 'Fernanda', rating: 4.98, totalTrips: 1875, vehicle: 'Hyundai HB20', color: 'Branco', plate: 'GHT4C19' },
    { id: 'd3', name: 'Ricardo', rating: 4.91, totalTrips: 5120, vehicle: 'Toyota Corolla', color: 'Preto', plate: 'BRA2E19' },
  ],

  /* Atividade: histórico de viagens */
  trips: [
    { id: 't1', destination: 'Parque Ibirapuera', date: '2026-09-14T17:19:00', price: 0, status: 'cancelled', category: 'pessoal' },
    { id: 't2', destination: 'Aeroporto de Congonhas', date: '2026-08-22T06:42:00', price: 38.6, status: 'completed', category: 'trabalho' },
    { id: 't3', destination: 'Theatro Municipal', date: '2026-08-09T19:05:00', price: 16.2, status: 'completed', category: 'pessoal' },
    { id: 't4', destination: 'Av. Paulista, 1000', date: '2026-07-21T09:10:00', price: 12.8, status: 'completed', category: 'trabalho' },
    { id: 't5', destination: 'Allianz Parque', date: '2026-07-12T20:30:00', price: 27.4, status: 'completed', category: 'pessoal' },
  ],
};
