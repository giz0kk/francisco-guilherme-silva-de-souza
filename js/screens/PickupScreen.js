/**
 * TELA 05 — Escolher o local de embarque
 * O usuário escolhe a zona de embarque (no mapa ou na lista) e confirma.
 * Ao confirmar, a corrida é pedida e abre a tela da corrida em andamento.
 */
const PickupScreen = {
  data() {
    return {
      zones: [],
      sending: false,
    };
  },
  computed: {
    pickup() {
      return store.pickup;
    },
    selectedZoneId() {
      return store.selectedZoneId;
    },
    selectedZone() {
      return this.zones.find((zone) => zone.id === this.selectedZoneId);
    },
    /** Cada zona vira um marcador; a selecionada mostra o nome em um balão */
    mapMarkers() {
      return this.zones.map((zone) => ({
        id: zone.id,
        type: 'zone',
        x: zone.x,
        y: zone.y,
        selected: zone.id === this.selectedZoneId,
        label: zone.id === this.selectedZoneId ? zone.name : '',
      }));
    },
  },
  created() {
    if (!getDestination()) {
      redirectTo('plan-ride');
      return;
    }
    this.loadZones();
  },
  template: `
    <div class="min-h-screen bg-white pb-6">
      <MapView height-class="h-96" :markers="mapMarkers" @select-marker="selectZone($event.id)">
        <div class="absolute left-5 top-5">
          <BackButton :circle="true" />
        </div>
      </MapView>

      <h1 class="border-b py-6 text-center text-lg font-medium">Escolha o local de embarque</h1>

      <div class="flex items-center justify-between border-b px-5 py-4">
        <span class="text-lg font-medium">{{ pickup.title }}</span>
        <button type="button" class="rounded-full bg-gray-100 px-4 py-2 font-medium" @click="searchPickup">Buscar</button>
      </div>

      <div class="bg-gray-50 py-4">
        <button
          v-for="zone in zones"
          :key="zone.id"
          type="button"
          class="flex w-full items-center gap-3 px-5 py-3 text-left text-lg font-medium"
          :class="zone.id === selectedZoneId ? 'text-uber-blue' : 'text-gray-500'"
          @click="selectZone(zone.id)"
        >
          <span class="h-4 w-4 shrink-0 rounded-full border-2" :class="zone.id === selectedZoneId ? 'border-uber-blue bg-uber-blue' : 'border-gray-400'"></span>
          {{ zone.name }}
        </button>
      </div>

      <div class="mt-5 px-5">
        <PrimaryButton
          :label="sending ? 'Procurando motorista...' : 'Confirmar embarque'"
          :disabled="!selectedZone || sending"
          @click="confirmPickup"
        />
      </div>
    </div>
  `,
  methods: {
    async loadZones() {
      this.zones = await api.getPickupZones();
    },

    selectZone(zoneId) {
      selectZone(zoneId);
    },

    searchPickup() {
      navigateTo('plan-ride');
    },

    async confirmPickup() {
      this.sending = true;

      const ride = await api.requestRide({
        pickup: store.pickup,
        pickupZone: this.selectedZone.name,
        destination: getDestination(),
        rideOptionId: store.selectedRideId,
        paymentMethod: 'Dinheiro',
        schedule: store.schedule,
      });

      this.sending = false;

      // Corrida agendada: só vai para o histórico
      if (ride.status === 'scheduled') {
        clearRideRequest();
        showToast('Sua corrida foi agendada!');
        navigateTo('trips');
        return;
      }

      startRide(ride);
      redirectTo('ride');
    },
  },
};
