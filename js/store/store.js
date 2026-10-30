/**
 * Estado global da aplicação.
 *
 * `Vue.reactive` cria um objeto "observado": quando um valor muda aqui,
 * todas as telas que usam esse valor são atualizadas sozinhas.
 * As alterações são feitas pelas funções abaixo.
 */
const MAX_STOPS = 5;

const store = Vue.reactive({
  pickup: { ...MOCK_DATA.currentLocation }, // local de embarque
  stops: [],               // paradas da corrida; a última é o destino final
  schedule: null,          // null = "Agora" | { date: 'AAAA-MM-DD', time: 'HH:MM' }
  selectedRideId: 'uberx',
  selectedZoneId: 'principal',
  activeRide: null,        // corrida em andamento (depois de confirmar)
  toast: { message: '', visible: false },
});

/* ---------------------------- Embarque e destino ---------------------------- */

function setPickup(place) {
  store.pickup = { ...place };
}

/** Define um único destino (fluxo normal do "Para onde?") */
function setDestination(place) {
  store.stops = [{ ...place }];
}

function getDestination() {
  if (store.stops.length === 0) {
    return null;
  }
  return store.stops[store.stops.length - 1];
}

/* --------------------------------- Paradas --------------------------------- */

function addStop() {
  if (store.stops.length < MAX_STOPS) {
    store.stops.push({ id: Date.now(), title: '', subtitle: '' });
  }
}

function removeStop(index) {
  store.stops.splice(index, 1);
}

/** Remove as paradas que ficaram em branco */
function removeEmptyStops() {
  store.stops = store.stops.filter((stop) => stop.title.trim() !== '');
}

/* ------------------------------ Outras escolhas ----------------------------- */

function setSchedule(schedule) {
  store.schedule = schedule;
}

function selectRide(rideId) {
  store.selectedRideId = rideId;
}

function selectZone(zoneId) {
  store.selectedZoneId = zoneId;
}

/* ---------------------------- Corrida em andamento -------------------------- */

/** Limpa os dados do pedido depois que ele foi enviado */
function clearRideRequest() {
  store.stops = [];
  store.schedule = null;
}

/** Guarda a corrida que acabou de ser pedida (começa com o motorista a caminho) */
function startRide(ride) {
  store.activeRide = { ...ride, phase: 'arriving', step: 0 };
  clearRideRequest();
}

/**
 * Atualiza o andamento da corrida.
 * phase: 'arriving' (a caminho) | 'arrived' (chegou) | 'on_trip' (em viagem) | 'finished'
 * step:  em qual ponto da rota o carro está
 */
function setRideProgress(phase, step) {
  store.activeRide.phase = phase;
  store.activeRide.step = step;
}

function finishActiveRide() {
  store.activeRide = null;
}

/* ---------------------------------- Aviso ---------------------------------- */

let toastTimer = null;

/** Mostra uma mensagem rápida no topo da tela por alguns segundos */
function showToast(message) {
  store.toast.message = message;
  store.toast.visible = true;

  clearTimeout(toastTimer);
  toastTimer = setTimeout(hideToast, 3000);
}

function hideToast() {
  store.toast.visible = false;
}
