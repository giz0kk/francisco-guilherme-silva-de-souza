/**
 * TELA 02 — Escolher a corrida
 * Mapa com a rota, categorias (UberX, Uber Juntos, Uber Moto),
 * forma de pagamento e botão de confirmação.
 */
const ChooseRideScreen = {
  data() {
    return {
      rideOptions: [],
      payment: null,
      route: [],
      loading: true,
    };
  },
  computed: {
    destination() {
      return getDestination();
    },
    selectedRideId() {
      return store.selectedRideId;
    },
    selectedOption() {
      return this.rideOptions.find((option) => option.id === this.selectedRideId);
    },
    confirmText() {
      if (this.selectedOption) {
        return 'Confirmar ' + this.selectedOption.name;
      }
      return 'Confirmar';
    },
    extraStops() {
      return store.stops.length - 1;
    },
    /** Marcadores do mapa: início e fim da rota, com rótulos */
    mapMarkers() {
      if (this.route.length === 0) {
        return [];
      }
      const start = this.route[0];
      const end = this.route[this.route.length - 1];
      const minutes = this.selectedOption ? this.selectedOption.minutesAway + ' min · ' : '';

      return [
        { id: 'origin', type: 'origin', x: start[0], y: start[1], label: minutes + store.pickup.title },
        { id: 'destination', type: 'destination', x: end[0], y: end[1], label: this.destination.title },
      ];
    },
  },
  created() {
    if (!this.destination) {
      redirectTo('plan-ride');
      return;
    }
    this.loadData();
  },
  template: `
    <div v-if="destination" class="min-h-screen bg-white pb-6">
      <MapView :route="route" :markers="mapMarkers">
        <div class="absolute left-5 top-5">
          <BackButton :circle="true" />
        </div>
      </MapView>

      <div class="mx-auto mt-3 h-1 w-16 rounded-full bg-gray-300"></div>
      <p class="mt-5 px-5 text-center text-sm font-medium text-gray-500">
        As tarifas estão um pouco mais altas devido à alta demanda
      </p>
      <p v-if="extraStops > 0" class="mt-2 text-center text-sm font-medium text-uber-blue">
        + {{ extraStops }} parada(s) no caminho
      </p>

      <p v-if="loading" class="py-10 text-center text-gray-500">Carregando...</p>

      <div v-else class="mt-4">
        <RideOptionItem
          v-for="option in rideOptions"
          :key="option.id"
          :option="option"
          :selected="option.id === selectedRideId"
          @select="selectRide"
        />
      </div>

      <div class="mt-4 h-1 bg-gray-100"></div>

      <button v-if="payment" type="button" class="flex w-full items-center gap-4 px-5 py-6" @click="changePayment">
        <img :src="payment.icon" alt="" class="h-8 w-10" />
        <span class="flex-1 text-left text-lg font-medium">{{ payment.label }}</span>
        <img src="assets/icons/chevron-small.svg" alt="" class="w-2" />
      </button>

      <div class="px-5">
        <PrimaryButton :label="confirmText" :disabled="loading" @click="confirmRide" />
      </div>
    </div>
  `,
  methods: {
    async loadData() {
      this.rideOptions = await api.getRideOptions();
      const payments = await api.getPaymentMethods();
      this.payment = payments[0];
      const routes = await api.getRoutes();
      this.route = routes.pickupToDestination;
      this.loading = false;
    },

    selectRide(rideId) {
      selectRide(rideId);
    },

    changePayment() {
      showToast('Outras formas de pagamento estarão disponíveis em breve.');
    },

    confirmRide() {
      navigateTo('pickup');
    },
  },
};
