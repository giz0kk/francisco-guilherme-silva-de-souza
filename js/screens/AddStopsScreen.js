/**
 * TELA 04 — Adicionar paradas
 * Até 5 paradas: adicionar, remover e digitar o endereço de cada uma.
 */
const AddStopsScreen = {
  data() {
    return {
      maxStops: MAX_STOPS,
      mapMarkers: [
        { id: 'car', type: 'car', x: 40, y: 45 },
        { id: 'user', type: 'user', x: 50, y: 50 },
      ],
    };
  },
  computed: {
    pickup() {
      return store.pickup;
    },
    stops() {
      return store.stops;
    },
    canAddStop() {
      return store.stops.length < MAX_STOPS;
    },
  },
  created() {
    // Se ainda não houver nenhuma parada, começa com um campo vazio
    if (store.stops.length === 0) {
      addStop();
    }
  },
  template: `
    <div class="min-h-screen bg-white pb-28">
      <header class="px-4 pt-4">
        <BackButton />

        <div class="mt-4 space-y-3">
          <!-- Partida -->
          <div class="flex items-center gap-4">
            <span class="flex w-6 justify-center"><span class="h-2 w-2 rounded-full bg-gray-400"></span></span>
            <p class="flex-1 truncate bg-gray-100 px-4 py-3 text-gray-500">{{ pickup.title }}</p>
            <span class="w-6"></span>
          </div>

          <!-- Paradas -->
          <div v-for="(stop, index) in stops" :key="stop.id" class="flex items-center gap-4">
            <span class="flex w-6 justify-center">
              <span class="flex h-5 w-5 items-center justify-center bg-black text-xs text-white">{{ index + 1 }}</span>
            </span>
            <input
              v-model="stop.title"
              type="text"
              class="flex-1 bg-gray-100 px-4 py-3 outline-none focus:ring-2 focus:ring-black"
              placeholder="Adicionar parada"
              @keyup.enter="confirmStops"
            />
            <button type="button" class="w-6" aria-label="Remover parada" @click="removeStop(index)">
              <img src="assets/icons/remove.svg" alt="" class="w-5" />
            </button>
          </div>
        </div>

        <button v-if="canAddStop" type="button" class="ml-10 mt-4 font-medium text-uber-blue" @click="addStop">
          + Adicionar parada
        </button>

        <p class="mt-4 pb-6 text-gray-500">Agora você pode adicionar até {{ maxStops }} paradas</p>
      </header>

      <MapView height-class="h-96" :markers="mapMarkers" />

      <div class="fixed bottom-0 left-1/2 w-full max-w-md -translate-x-1/2 bg-white p-5">
        <PrimaryButton label="Concluir" @click="confirmStops" />
      </div>
    </div>
  `,
  methods: {
    addStop() {
      addStop();
    },

    removeStop(index) {
      removeStop(index);
    },

    confirmStops() {
      removeEmptyStops();
      if (store.stops.length === 0) {
        addStop();
        showToast('Adicione pelo menos uma parada.');
        return;
      }
      navigateTo('choose-ride');
    },
  },
};
