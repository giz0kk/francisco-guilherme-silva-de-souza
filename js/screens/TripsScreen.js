/**
 * TELA 07 — Minhas viagens (Atividade)
 * Abas Todas / Pessoal / Trabalho e viagens agrupadas por mês.
 */
const TripsScreen = {
  data() {
    return {
      tabs: [
        { id: 'todas', label: 'Todas' },
        { id: 'pessoal', label: 'Pessoal' },
        { id: 'trabalho', label: 'Trabalho' },
      ],
      activeTab: 'todas',
      trips: [],
      loading: true,
    };
  },
  computed: {
    filteredTrips() {
      if (this.activeTab === 'todas') {
        return this.trips;
      }
      return this.trips.filter((trip) => trip.category === this.activeTab);
    },
    groups() {
      return groupTripsByMonth(this.filteredTrips);
    },
  },
  created() {
    this.loadTrips();
  },
  template: `
    <div class="min-h-screen bg-white pb-10">
      <header class="px-4 pt-4">
        <BackButton to="home" />
        <h1 class="mt-6 px-1 text-3xl font-semibold">Minhas viagens</h1>
      </header>

      <div class="mt-8 flex">
        <button
          v-for="tab in tabs"
          :key="tab.id"
          type="button"
          class="w-1/3 border-b-4 pb-3 text-lg font-semibold"
          :class="tab.id === activeTab ? 'border-uber-green text-black' : 'border-transparent text-gray-500'"
          @click="activeTab = tab.id"
        >
          {{ tab.label }}
        </button>
      </div>

      <p v-if="loading" class="py-10 text-center text-gray-500">Carregando...</p>

      <p v-else-if="groups.length === 0" class="py-10 text-center text-gray-500">Nenhuma viagem por aqui ainda.</p>

      <div v-else class="divide-y px-5">
        <section v-for="group in groups" :key="group.label" class="pt-6">
          <h2 class="text-lg font-bold">{{ group.label }}</h2>
          <TripItem v-for="trip in group.trips" :key="trip.id" :trip="trip" />
        </section>
      </div>
    </div>
  `,
  methods: {
    async loadTrips() {
      this.trips = await api.getTrips();
      this.loading = false;
    },
  },
};
