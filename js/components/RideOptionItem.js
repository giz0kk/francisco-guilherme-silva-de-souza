/**
 * Linha de categoria de corrida (UberX, Uber Juntos, Uber Moto).
 * A opção selecionada fica com fundo cinza e o nome maior.
 */
const RideOptionItem = {
  props: {
    option: { type: Object, required: true },
    selected: { type: Boolean, default: false },
  },
  emits: ['select'],
  computed: {
    priceText() {
      return formatCurrency(this.option.price);
    },
  },
  template: `
    <button
      type="button"
      class="flex w-full items-center gap-4 px-5 py-5 text-left"
      :class="selected ? 'bg-gray-100' : 'bg-white hover:bg-gray-50'"
      @click="$emit('select', option.id)"
    >
      <img :src="option.image" :alt="option.name" class="h-16 w-20 shrink-0 scale-125 object-contain" />

      <div class="min-w-0 flex-1">
        <div class="flex items-start justify-between gap-3">
          <p :class="selected ? 'text-xl font-semibold' : 'font-medium'">
            {{ option.name }}
            <span v-if="selected" class="ml-1 text-sm font-medium">
              <img src="assets/icons/person.svg" alt="" class="inline w-3" /> {{ option.seats }}
            </span>
          </p>
          <p class="whitespace-nowrap text-lg font-semibold">{{ priceText }}</p>
        </div>
        <p class="mt-1 text-sm">{{ option.arrivalTime }} · {{ option.minutesAway }} min de distância</p>
        <p v-if="option.promo" class="mt-1 font-semibold text-uber-blue">{{ option.promo }}</p>
      </div>
    </button>
  `,
};
