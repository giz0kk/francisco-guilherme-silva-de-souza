/**
 * Cinco estrelas clicáveis para avaliar o motorista.
 * Uso: <RatingStars v-model="rating" />
 */
const RatingStars = {
  props: {
    modelValue: { type: Number, default: 0 },
  },
  emits: ['update:modelValue'],
  template: `
    <div class="flex justify-center gap-2">
      <button
        v-for="star in 5"
        :key="star"
        type="button"
        class="text-5xl"
        :class="star <= modelValue ? 'text-black' : 'text-gray-300'"
        :aria-label="star + ' estrelas'"
        @click="$emit('update:modelValue', star)"
      >
        ★
      </button>
    </div>
  `,
};
