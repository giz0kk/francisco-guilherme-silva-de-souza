/**
 * Modal "Agendar viagem" (TELA 06).
 * Usa os campos nativos de data e hora do navegador.
 */
const ScheduleModal = {
  props: {
    visible: { type: Boolean, default: false },
  },
  emits: ['close', 'confirm'],
  data() {
    return {
      date: toDateInputValue(new Date()),
      time: getSuggestedTime(),
    };
  },
  computed: {
    today() {
      return toDateInputValue(new Date());
    },
    timeWindowText() {
      return formatTimeWindow(this.time);
    },
    isInPast() {
      return isPastDateTime(this.date, this.time);
    },
  },
  template: `
    <div v-if="visible" class="fixed inset-0 z-40 mx-auto max-w-md bg-black/70" @click="$emit('close')"></div>

    <Transition name="sheet">
      <div v-if="visible" class="fixed bottom-0 left-1/2 z-50 w-full max-w-md -translate-x-1/2 bg-white pb-10">
        <h2 class="border-b py-7 text-center text-3xl">Agendar viagem</h2>

        <div class="space-y-4 px-5 py-6">
          <label class="block">
            <span class="text-sm text-gray-500">Data</span>
            <input v-model="date" type="date" :min="today" class="mt-1 w-full rounded-lg bg-gray-100 p-4 text-center text-xl" />
          </label>
          <label class="block">
            <span class="text-sm text-gray-500">Horário de embarque</span>
            <input v-model="time" type="time" class="mt-1 w-full rounded-lg bg-gray-100 p-4 text-center text-xl" />
          </label>
          <p class="text-center text-gray-500">O motorista chega entre {{ timeWindowText }}</p>
          <p v-if="isInPast" class="text-center text-sm font-medium text-red-600">Escolha um horário no futuro.</p>
        </div>

        <div class="px-5">
          <PrimaryButton label="Definir horário de embarque" :disabled="isInPast" @click="confirm" />
        </div>
      </div>
    </Transition>
  `,
  methods: {
    confirm() {
      this.$emit('confirm', { date: this.date, time: this.time });
    },
  },
};
