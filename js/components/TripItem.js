/**
 * Linha do histórico de viagens ("Minhas viagens").
 */
const TRIP_STATUS_TEXT = {
  cancelled: 'Viagem cancelada',
  scheduled: 'Agendada',
  in_progress: 'Em andamento',
  completed: '',
};

const TripItem = {
  props: {
    trip: { type: Object, required: true },
  },
  computed: {
    dateText() {
      return formatTripDate(this.trip.date);
    },
    priceText() {
      return formatCurrency(this.trip.price);
    },
    statusText() {
      return TRIP_STATUS_TEXT[this.trip.status];
    },
  },
  template: `
    <div class="flex items-center gap-4 py-5">
      <img src="assets/icons/trip-car.svg" alt="" class="h-12 w-12 shrink-0" />

      <div class="min-w-0 flex-1">
        <p class="truncate text-lg font-medium">{{ trip.destination }}</p>
        <p class="text-gray-500">{{ dateText }}</p>
      </div>

      <div class="text-right">
        <p class="text-lg font-bold">{{ priceText }}</p>
        <p v-if="statusText" class="text-sm text-gray-500">{{ statusText }}</p>
      </div>
    </div>
  `,
};
