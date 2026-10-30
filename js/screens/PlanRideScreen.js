/**
 * TELA 03 — Planejar corrida
 * Campos de partida e destino, botão "+" para adicionar paradas
 * e lista de endereços que filtra enquanto o usuário digita.
 */
const PlanRideScreen = {
  data() {
    return {
      pickupText: store.pickup.title,
      destinationText: '',
      editingPickup: false, // true quando o usuário está digitando no campo de partida
      addresses: [],
    };
  },
  created() {
    this.search('');
  },
  mounted() {
    this.$refs.destinationInput.focus();
  },
  template: `
    <div class="min-h-screen bg-white">
      <header class="px-4 pb-4 pt-4">
        <div class="flex items-center justify-between">
          <BackButton />
          <button type="button" class="flex items-center gap-2" @click="switchRider">
            <span class="h-7 w-7 rounded-full bg-gray-300"></span>
            Trocar passageiro
            <img src="assets/icons/chevron-small.svg" alt="" class="w-2 rotate-90" />
          </button>
          <span class="w-10"></span>
        </div>

        <div class="mt-6 flex items-center gap-4">
          <!-- Indicador de rota: bolinha (partida) e quadrado (destino) -->
          <div class="flex flex-col items-center px-2">
            <span class="h-2 w-2 rounded-full bg-black"></span>
            <span class="h-10 w-px bg-gray-400"></span>
            <span class="h-2 w-2 bg-gray-400"></span>
          </div>

          <div class="flex-1 space-y-3">
            <input
              v-model="pickupText"
              type="text"
              class="w-full bg-gray-200 px-4 py-2 outline-none focus:ring-2 focus:ring-black"
              placeholder="Local de partida"
              @focus="editingPickup = true"
              @input="search(pickupText)"
            />
            <input
              ref="destinationInput"
              v-model="destinationText"
              type="text"
              class="w-full bg-gray-100 px-4 py-2 outline-none focus:ring-2 focus:ring-black"
              placeholder="Para onde?"
              @focus="editingPickup = false"
              @input="search(destinationText)"
              @keyup.enter="useTypedDestination"
            />
          </div>

          <button type="button" aria-label="Adicionar paradas" @click="openAddStops">
            <img src="assets/icons/plus-circle.svg" alt="" class="h-11 w-11" />
          </button>
        </div>
      </header>

      <button type="button" class="flex w-full items-center gap-5 px-5 py-3" @click="showAllPlaces">
        <img src="assets/icons/star-circle.svg" alt="" class="h-10 w-10" />
        Locais salvos
      </button>

      <div class="h-1 bg-gray-100"></div>

      <div class="divide-y px-5">
        <PlaceListItem v-for="address in addresses" :key="address.id" :place="address" @select="selectAddress" />
      </div>

      <p v-if="addresses.length === 0" class="px-5 py-8 text-center text-gray-500">
        Nenhum local encontrado. Aperte Enter para usar o texto digitado.
      </p>
    </div>
  `,
  methods: {
    async search(text) {
      this.addresses = await api.searchAddresses(text);
    },

    /** Clique em um endereço: preenche o campo que estava sendo editado */
    selectAddress(place) {
      if (this.editingPickup) {
        setPickup(place);
        this.pickupText = place.title;
        this.$refs.destinationInput.focus();
      } else {
        setDestination(place);
        navigateTo('choose-ride');
      }
    },

    /** Enter no campo de destino: usa o texto digitado como destino */
    useTypedDestination() {
      if (this.destinationText.trim() !== '') {
        setDestination({ id: Date.now(), title: this.destinationText, subtitle: '' });
        navigateTo('choose-ride');
      }
    },

    openAddStops() {
      if (this.destinationText.trim() !== '') {
        setDestination({ id: Date.now(), title: this.destinationText, subtitle: '' });
      }
      navigateTo('add-stops');
    },

    showAllPlaces() {
      this.destinationText = '';
      this.search('');
    },

    switchRider() {
      showToast('Trocar passageiro estará disponível em breve.');
    },
  },
};
