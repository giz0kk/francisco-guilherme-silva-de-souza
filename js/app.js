/**
 * Ponto de entrada: cria o app Vue, registra componentes e telas e monta em #app.
 */
const App = {
  computed: {
    /** Nome do componente da tela atual (ex.: 'HomeScreen') */
    currentScreen() {
      return ROUTES[router.current];
    },
  },
  template: `
    <div class="relative mx-auto min-h-screen max-w-md overflow-x-hidden bg-white shadow-xl">
      <component :is="currentScreen" :key="currentScreen" />
      <AppToast />
    </div>
  `,
};

const app = Vue.createApp(App);

// Componentes reutilizáveis
app.component('AppToast', AppToast);
app.component('BackButton', BackButton);
app.component('PrimaryButton', PrimaryButton);
app.component('BottomNav', BottomNav);
app.component('MapView', MapView);
app.component('PlaceListItem', PlaceListItem);
app.component('SuggestionCard', SuggestionCard);
app.component('SavingsSection', SavingsSection);
app.component('PromoCarousel', PromoCarousel);
app.component('RideOptionItem', RideOptionItem);
app.component('TripItem', TripItem);
app.component('ScheduleModal', ScheduleModal);
app.component('RatingStars', RatingStars);

// Telas
app.component('HomeScreen', HomeScreen);
app.component('PlanRideScreen', PlanRideScreen);
app.component('AddStopsScreen', AddStopsScreen);
app.component('ChooseRideScreen', ChooseRideScreen);
app.component('PickupScreen', PickupScreen);
app.component('RideScreen', RideScreen);
app.component('TripsScreen', TripsScreen);
app.component('ServicesScreen', ServicesScreen);
app.component('AccountScreen', AccountScreen);

app.mount('#app');
