/**
 * Serviço de API (simulado).
 *
 * É o ÚNICO lugar da aplicação que sabe de onde vêm os dados. Hoje ele usa
 * o MOCK_DATA com um pequeno atraso, como se fosse uma requisição de verdade.
 * Quando o back-end existir, basta trocar o conteúdo das funções por `fetch`:
 *
 *   function getTrips() {
 *     return fetch(API_BASE_URL + '/trips').then((response) => response.json());
 *   }
 *
 * Como todas as funções já retornam Promises, as telas não precisam mudar.
 */
const API_BASE_URL = '/api'; // endereço futuro do back-end
const FAKE_DELAY_MS = 250;

/** Devolve uma cópia dos dados depois de um pequeno atraso */
function simulateRequest(data) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(JSON.parse(JSON.stringify(data))), FAKE_DELAY_MS);
  });
}

/** Procura uma viagem do histórico pelo id */
function findTrip(tripId) {
  return MOCK_DATA.trips.find((trip) => trip.id === tripId);
}

/** Sorteia um item de uma lista */
function pickRandom(list) {
  return list[Math.floor(Math.random() * list.length)];
}

const api = {
  getUser() {
    return simulateRequest(MOCK_DATA.user);
  },

  getRecentPlaces() {
    return simulateRequest(MOCK_DATA.recentPlaces);
  },

  getSuggestions() {
    return simulateRequest(MOCK_DATA.suggestions);
  },

  getSavingsSections() {
    return simulateRequest(MOCK_DATA.savingsSections);
  },

  getPromoSlides() {
    return simulateRequest(MOCK_DATA.promoSlides);
  },

  /** Lista endereços; se houver texto, filtra pelo nome ou endereço */
  searchAddresses(query) {
    const text = query.trim().toLowerCase();
    const results = MOCK_DATA.addresses.filter((address) => {
      return address.title.toLowerCase().includes(text) || address.subtitle.toLowerCase().includes(text);
    });
    return simulateRequest(results);
  },

  getRideOptions() {
    return simulateRequest(MOCK_DATA.rideOptions);
  },

  getPaymentMethods() {
    return simulateRequest(MOCK_DATA.paymentMethods);
  },

  getPickupZones() {
    return simulateRequest(MOCK_DATA.pickupZones);
  },

  getRoutes() {
    return simulateRequest(MOCK_DATA.routes);
  },

  getTrips() {
    return simulateRequest(MOCK_DATA.trips);
  },

  /**
   * Pede uma corrida. O "servidor" escolhe um motorista e gera o PIN.
   * Corridas agendadas só entram no histórico (não começam agora).
   */
  requestRide(payload) {
    const option = MOCK_DATA.rideOptions.find((item) => item.id === payload.rideOptionId);

    const ride = {
      id: 't' + Date.now(),
      destination: payload.destination.title,
      pickup: payload.pickup.title,
      pickupZone: payload.pickupZone,
      date: new Date().toISOString(),
      price: option.price,
      rideName: option.name,
      paymentMethod: payload.paymentMethod,
      status: payload.schedule ? 'scheduled' : 'in_progress',
      category: 'pessoal',
      driver: pickRandom(MOCK_DATA.drivers),
      pin: String(Math.floor(1000 + Math.random() * 9000)),
    };

    MOCK_DATA.trips.unshift(ride);
    return simulateRequest(ride);
  },

  /** Finaliza a corrida e salva a avaliação do motorista (0 = não avaliou) */
  finishRide(tripId, rating) {
    const trip = findTrip(tripId);
    trip.status = 'completed';
    trip.rating = rating;
    return simulateRequest(trip);
  },

  cancelRide(tripId) {
    const trip = findTrip(tripId);
    trip.status = 'cancelled';
    trip.price = 0;
    return simulateRequest(trip);
  },
};
