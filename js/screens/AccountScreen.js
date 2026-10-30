/**
 * Conta — não existe no protótipo; perfil simples para a aba "Conta".
 */
const AccountScreen = {
  data() {
    return {
      user: null,
      menu: [
        { label: 'Minhas viagens', route: 'trips' },
        { label: 'Carteira', route: '' },
        { label: 'Configurações', route: '' },
        { label: 'Ajuda', route: '' },
      ],
    };
  },
  async created() {
    this.user = await api.getUser();
  },
  template: `
    <div class="min-h-screen bg-white pb-28 pt-14">
      <div v-if="user" class="flex items-center justify-between px-5">
        <div>
          <h1 class="text-3xl font-semibold">{{ user.name }}</h1>
          <p class="mt-2 text-gray-500">★ {{ user.rating }}</p>
        </div>
        <span class="h-16 w-16 rounded-full bg-gray-200"></span>
      </div>

      <div class="mt-8 h-3 bg-gray-100"></div>

      <div class="divide-y">
        <button
          v-for="item in menu"
          :key="item.label"
          type="button"
          class="flex w-full items-center justify-between px-5 py-5 text-lg font-medium"
          @click="openItem(item)"
        >
          {{ item.label }}
          <img src="assets/icons/chevron-right.svg" alt="" class="h-4" />
        </button>
      </div>

      <BottomNav active="account" />
    </div>
  `,
  methods: {
    openItem(item) {
      if (item.route) {
        navigateTo(item.route);
      } else {
        showToast(item.label + ' estará disponível em breve.');
      }
    },
  },
};
