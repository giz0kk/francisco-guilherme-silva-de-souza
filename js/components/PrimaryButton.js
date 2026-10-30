/**
 * Botão preto principal ("Confirmar UberX", "Confirmar embarque"...).
 */
const PrimaryButton = {
  props: {
    label: { type: String, required: true },
    disabled: { type: Boolean, default: false },
  },
  emits: ['click'],
  template: `
    <button
      type="button"
      class="h-16 w-full rounded bg-black text-lg font-semibold text-white hover:bg-gray-800 disabled:bg-gray-400"
      :disabled="disabled"
      @click="$emit('click')"
    >
      {{ label }}
    </button>
  `,
};
