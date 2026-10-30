/**
 * TELA 01 — Início
 * Abas Corridas/Entregas, busca "Para onde?", botão de agendar ("Agora"),
 * destinos recentes, sugestões, cards e carrossel.
 * O modal de agendamento (TELA 06) abre a partir daqui.
 */
const HomeScreen = {
  data() {
    return {
      activeTab: 'rides',
      showSchedule: false,
      loading: true,
      recentPlaces: [],
      suggestions: [],
      savingsSections: [],
      promoSlides: [],
    };
  },
  computed: {
    scheduleText() {
      if (store.schedule) {
        return formatScheduleShort(store.schedule);
      }
      return 'Agora';
    },
    activeRide() {
      return store.activeRide;
    },
  },
  created() {
    this.loadData();
  },
  template: `
    <div class="pb-28">
      <!-- Abas -->
      <header class="flex justify-center gap-10 pt-14">
        <button
          type="button"
          class="flex items-center gap-3 border-b-4 pb-2 text-3xl font-medium"
          :class="activeTab === 'rides' ? 'border-black' : 'border-transparent text-gray-500'"
          @click="activeTab = 'rides'"
        >
          <img src="assets/images/car-suv.png" alt="" class="h-12 w-12 scale-150 object-contain" />
          Corridas
        </button>
        <button
          type="button"
          class="flex items-center gap-3 border-b-4 pb-2 text-3xl font-medium"
          :class="activeTab === 'delivery' ? 'border-black' : 'border-transparent text-gray-500'"
          @click="activeTab = 'delivery'"
        >
          <img src="assets/images/package-box.png" alt="" class="h-8 w-8 object-contain" />
          Entregas
        </button>
      </header>

      <!-- Corrida em andamento -->
      <div v-if="activeRide" class="px-5 pt-6">
        <button
          type="button"
          class="flex w-full items-center justify-between rounded-xl bg-black px-5 py-4 text-left text-white"
          @click="openRide"
        >
          <span>
            <span class="block font-semibold">Corrida em andamento</span>
            <span class="text-sm text-gray-300">{{ activeRide.driver.name }} · {{ activeRide.driver.vehicle }}</span>
          </span>
          <img src="assets/icons/arrow-right.svg" alt="" class="w-4 invert" />
        </button>
      </div>

      <!-- Busca + agendamento -->
      <div class="mx-5 mt-6 flex items-center rounded-full bg-gray-100 py-2 pl-5 pr-2">
        <button type="button" class="flex flex-1 items-center gap-3 text-left" @click="openPlanRide">
          <img src="assets/icons/search.svg" alt="" class="w-6" />
          <span class="text-2xl font-semibold text-gray-600">Para onde?</span>
        </button>
        <button type="button" class="flex items-center gap-2 rounded-full bg-white px-3 py-3" @click="showSchedule = true">
          <img src="assets/icons/clock.svg" alt="" class="w-5" />
          <span class="font-medium">{{ scheduleText }}</span>
          <img src="assets/icons/chevron-down.svg" alt="" class="w-3" />
        </button>
      </div>

      <!-- Aba Corridas -->
      <div v-if="activeTab === 'rides'">
        <p v-if="loading" class="py-10 text-center text-gray-500">Carregando...</p>

        <div v-else>
          <div class="mt-4 divide-y px-5">
            <PlaceListItem
              v-for="place in recentPlaces"
              :key="place.id"
              :place="place"
              :recent="true"
              @select="selectRecentPlace"
            />
          </div>

          <div class="mt-6 h-3 bg-gray-100"></div>

          <section class="px-5 pt-6">
            <div class="flex items-center justify-between">
              <h2 class="text-xl font-medium">Sugestões</h2>
              <button type="button" class="font-medium" @click="openServices">Ver tudo</button>
            </div>
            <div class="mt-5 grid grid-cols-3 gap-4">
              <SuggestionCard
                v-for="suggestion in suggestions"
                :key="suggestion.id"
                :suggestion="suggestion"
                @select="selectSuggestion"
              />
            </div>
          </section>

          <div class="mt-8 h-3 bg-gray-100"></div>

          <div class="pt-8">
            <SavingsSection :section="savingsSections[0]" @select="openCard" />
          </div>

          <div class="mt-8">
            <PromoCarousel :slides="promoSlides" @select="openCard" />
          </div>

          <div class="mt-8 h-3 bg-gray-100"></div>

          <div class="pt-8">
            <SavingsSection :section="savingsSections[1]" @select="openCard" />
          </div>
        </div>
      </div>

      <!-- Aba Entregas (ainda não existe no protótipo) -->
      <div v-else class="px-8 pt-16 text-center">
        <img src="assets/images/connect.png" alt="" class="mx-auto w-48" />
        <h2 class="mt-6 text-2xl font-semibold">Entregas em breve</h2>
        <p class="mt-2 text-gray-500">Envie pacotes por São Paulo em poucos toques.</p>
      </div>

      <BottomNav active="home" />

      <ScheduleModal :visible="showSchedule" @close="showSchedule = false" @confirm="confirmSchedule" />
    </div>
  `,
  methods: {
    async loadData() {
      this.recentPlaces = await api.getRecentPlaces();
      this.suggestions = await api.getSuggestions();
      this.savingsSections = await api.getSavingsSections();
      this.promoSlides = await api.getPromoSlides();
      this.loading = false;
    },

    openPlanRide() {
      navigateTo('plan-ride');
    },

    openServices() {
      navigateTo('services');
    },

    openRide() {
      navigateTo('ride');
    },

    /** Destino recente: vai direto para a escolha da corrida */
    selectRecentPlace(place) {
      setDestination(place);
      navigateTo('choose-ride');
    },

    selectSuggestion(suggestion) {
      if (suggestion.route === 'delivery') {
        this.activeTab = 'delivery';
      } else {
        navigateTo(suggestion.route);
      }
    },

    openCard(card) {
      navigateTo(card.route);
    },

    confirmSchedule(schedule) {
      setSchedule(schedule);
      this.showSchedule = false;
      showToast('Embarque agendado para ' + formatDateLabel(schedule.date) + ', ' + formatTimeWindow(schedule.time));
    },
  },
};
