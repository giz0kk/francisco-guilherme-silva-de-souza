/**
 * Linha de endereço (ícone + nome + endereço).
 * - recent = true: estilo da Home (ícone de pino e seta à direita)
 * - recent = false: estilo da busca (ícone de relógio)
 */
const PlaceListItem = {
  props: {
    place: { type: Object, required: true },
    recent: { type: Boolean, default: false },
  },
  emits: ['select'],
  template: `
    <button type="button" class="flex w-full items-center gap-5 py-4 text-left hover:bg-gray-50" @click="$emit('select', place)">
      <img
        :src="recent ? 'assets/icons/recent-place.svg' : 'assets/icons/clock-circle.svg'"
        alt=""
        class="h-11 w-11 shrink-0"
      />
      <div class="min-w-0 flex-1">
        <p class="truncate font-medium" :class="recent ? 'text-xl' : 'text-base'">{{ place.title }}</p>
        <p class="truncate text-gray-500">{{ place.subtitle }}</p>
      </div>
      <img v-if="recent" src="assets/icons/chevron-right.svg" alt="" class="h-4" />
    </button>
  `,
};
