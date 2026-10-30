/**
 * Card quadrado de sugestão (Viagem, Pacote, Por hora).
 */
const SuggestionCard = {
  props: {
    suggestion: { type: Object, required: true },
  },
  emits: ['select'],
  template: `
    <button
      type="button"
      class="flex aspect-square w-full flex-col items-center justify-center rounded-xl bg-gray-100 hover:bg-gray-200"
      @click="$emit('select', suggestion)"
    >
      <img :src="suggestion.image" :alt="suggestion.label" class="object-contain" :class="suggestion.imageClass" />
      <span class="mt-2 text-sm font-medium">{{ suggestion.label }}</span>
    </button>
  `,
};
