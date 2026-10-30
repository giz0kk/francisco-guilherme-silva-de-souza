/**
 * Barra de navegação inferior (Início, Serviços, Atividade, Conta).
 * Os ícones são SVG com fill="currentColor", então mudam de cor junto com o texto.
 */
const BottomNav = {
  props: {
    active: { type: String, required: true },
  },
  data() {
    return {
      items: [
        { route: 'home', label: 'Início' },
        { route: 'services', label: 'Serviços' },
        { route: 'trips', label: 'Atividade' },
        { route: 'account', label: 'Conta' },
      ],
    };
  },
  template: `
    <nav class="fixed bottom-0 left-1/2 z-30 flex h-20 w-full max-w-md -translate-x-1/2 justify-around border-t-2 border-gray-200 bg-white pt-3">
      <button
        v-for="item in items"
        :key="item.route"
        type="button"
        class="flex w-20 flex-col items-center gap-1"
        :class="item.route === active ? 'text-black' : 'text-gray-400'"
        @click="navigateTo(item.route)"
      >
        <svg v-if="item.route === 'home'" class="h-6 w-6" viewBox="0 0 20 23" fill="currentColor">
          <path d="M0 23V7.67L10 0L20 7.67V23H12.5V14.06H7.5V23H0Z" />
        </svg>
        <svg v-if="item.route === 'services'" class="h-6 w-6" viewBox="0 0 21 21" fill="currentColor">
          <rect x="0" y="0" width="5" height="5" /><rect x="8" y="0" width="5" height="5" /><rect x="16" y="0" width="5" height="5" />
          <rect x="0" y="8" width="5" height="5" /><rect x="8" y="8" width="5" height="5" /><rect x="16" y="8" width="5" height="5" />
          <rect x="0" y="16" width="5" height="5" /><rect x="8" y="16" width="5" height="5" /><rect x="16" y="16" width="5" height="5" />
        </svg>
        <svg v-if="item.route === 'trips'" class="h-6 w-6" viewBox="0 0 18 23" fill="currentColor">
          <path d="M0 23V0H18V23L12 20L9 23L5.5 20L0 23Z" />
          <rect x="4" y="5" width="10" height="3" fill="white" /><rect x="4" y="11" width="10" height="3" fill="white" />
        </svg>
        <svg v-if="item.route === 'account'" class="h-6 w-6" viewBox="0 0 21 21" fill="currentColor">
          <path d="M10.5 0a5.25 5.25 0 1 1 0 10.5 5.25 5.25 0 0 1 0-10.5Zm0 13.12c5.8 0 10.5 2.35 10.5 5.26V21H0v-2.62c0-2.91 4.7-5.26 10.5-5.26Z" />
        </svg>
        <span class="text-sm font-medium">{{ item.label }}</span>
      </button>
    </nav>
  `,
  methods: {
    navigateTo(route) {
      navigateTo(route);
    },
  },
};
