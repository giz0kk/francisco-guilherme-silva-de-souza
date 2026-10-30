/**
 * Mensagem rápida no topo da tela.
 * Para mostrar uma mensagem: showToast('Texto') (função do store.js).
 */
const AppToast = {
  computed: {
    toast() {
      return store.toast;
    },
  },
  template: `
    <Transition name="fade">
      <div
        v-if="toast.visible"
        class="fixed top-4 left-1/2 z-50 w-11/12 max-w-sm -translate-x-1/2 rounded-xl bg-black px-5 py-4 font-medium text-white shadow-lg"
        @click="hideToast"
      >
        {{ toast.message }}
      </div>
    </Transition>
  `,
  methods: {
    hideToast() {
      hideToast();
    },
  },
};
