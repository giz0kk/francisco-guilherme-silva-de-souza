/**
 * Seção com título e cards que rolam para o lado ("Formas de economizar com a Uber").
 */
const SavingsSection = {
  props: {
    section: { type: Object, required: true },
  },
  emits: ['select'],
  template: `
    <section>
      <h2 class="px-5 text-xl font-medium">{{ section.title }}</h2>

      <div class="no-scrollbar mt-5 flex gap-5 overflow-x-auto px-5">
        <button
          v-for="card in section.cards"
          :key="card.id"
          type="button"
          class="shrink-0 text-left"
          :class="card.size === 'large' ? 'w-64' : 'w-40'"
          @click="$emit('select', card)"
        >
          <img :src="card.image" alt="" class="h-32 w-full rounded-xl object-cover" />
          <p class="mt-4 flex items-center gap-3 whitespace-nowrap text-lg font-medium">
            {{ card.title }}
            <img src="assets/icons/arrow-right.svg" alt="" class="w-4" />
          </p>
          <p class="mt-1 text-gray-500">{{ card.subtitle }}</p>
        </button>
      </div>
    </section>
  `,
};
