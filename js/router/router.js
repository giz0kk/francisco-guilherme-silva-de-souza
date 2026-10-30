/**
 * Navegação entre telas usando o "hash" da URL (ex.: index.html#/trips).
 * Assim o botão "voltar" do navegador também funciona.
 *
 * Cada rota aponta para o nome de um componente de tela (registrado no app.js).
 */
const ROUTES = {
  home: 'HomeScreen',
  'plan-ride': 'PlanRideScreen',
  'add-stops': 'AddStopsScreen',
  'choose-ride': 'ChooseRideScreen',
  pickup: 'PickupScreen',
  ride: 'RideScreen',
  trips: 'TripsScreen',
  services: 'ServicesScreen',
  account: 'AccountScreen',
};

/** Lê a rota atual da URL: "#/trips" -> "trips" */
function getRouteFromUrl() {
  const name = window.location.hash.replace('#/', '');
  if (ROUTES[name]) {
    return name;
  }
  return 'home';
}

const router = Vue.reactive({
  current: getRouteFromUrl(),
});

/** Vai para outra tela: navigateTo('trips') */
function navigateTo(routeName) {
  window.location.hash = '#/' + routeName;
}

/**
 * Troca de tela SEM guardar a atual no histórico.
 * Usado quando uma tela é aberta sem os dados que precisa (ex.: recarregou a página).
 */
function redirectTo(routeName) {
  window.location.replace('#/' + routeName);
}

function goBack() {
  window.history.back();
}

/* Sempre que a URL muda, atualiza a tela e volta para o topo */
window.addEventListener('hashchange', () => {
  router.current = getRouteFromUrl();
  window.scrollTo(0, 0);
});
