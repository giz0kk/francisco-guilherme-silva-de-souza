/**
 * Serviços — não existe no protótipo; abre pela aba "Serviços" e pelo "Ver tudo".
 */
const ServicesScreen = {
  data() {
    return {
      suggestions: [],
    };
  },
  async created() {
    this.suggestions = await api.getSuggestions();
  },
  template: `
    <div class="min-h-screen bg-white px-5 pb-28 pt-14">
      <h1 class="text-3xl font-semibold">Serviços</h1>
      <p class="mt-2 text-gray-500">Vá a qualquer lugar, peça qualquer coisa</p>

      <div class="mt-8 grid grid-cols-3 gap-4">
        <SuggestionCard
          v-for="suggestion in suggestions"
          :key="suggestion.id"
          :suggestion="suggestion"
          @select="selectSuggestion"
        />
      </div>

      <BottomNav active="services" />
    </div>
  `,
  methods: {
    selectSuggestion(suggestion) {
      if (suggestion.route === 'delivery') {
        showToast('Entregas estarão disponíveis em breve.');
      } else {
        navigateTo(suggestion.route);
      }
    },
  },
};
