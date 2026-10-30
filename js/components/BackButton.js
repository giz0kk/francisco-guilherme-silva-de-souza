/**
 * Botão de voltar.
 * - circle = true: círculo branco usado em cima do mapa
 * - to = 'home':   vai para essa rota em vez de voltar no histórico
 */
const BackButton = {
  props: {
    circle: { type: Boolean, default: false },
    to: { type: String, default: '' },
  },
  template: `
    <button
      type="button"
      class="flex items-center justify-center"
      :class="circle ? 'h-14 w-14 rounded-full bg-white shadow-md' : 'h-10 w-10'"
      aria-label="Voltar"
      @click="handleClick"
    >
      <img src="assets/icons/back-arrow.svg" alt="" class="w-6" />
    </button>
  `,
  methods: {
    handleClick() {
      if (this.to) {
        navigateTo(this.to);
      } else {
        goBack();
      }
    },
  },
};
