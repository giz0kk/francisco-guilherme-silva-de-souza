/**
 * Carrossel do card azul-marinho da Home.
 * Mostra um slide por vez; troca sozinho a cada 5 segundos ou pelos pontinhos.
 */
const PromoCarousel = {
  props: {
    slides: { type: Array, required: true },
  },
  emits: ['select'],
  data() {
    return {
      activeIndex: 0,
      timer: null,
    };
  },
  computed: {
    activeSlide() {
      return this.slides[this.activeIndex];
    },
  },
  mounted() {
    this.timer = setInterval(this.nextSlide, 5000);
  },
  beforeUnmount() {
    clearInterval(this.timer);
  },
  template: `
    <div v-if="activeSlide" class="relative mx-5 h-48 overflow-hidden rounded-2xl bg-uber-navy">
      <button type="button" class="flex h-full w-full text-left" @click="$emit('select', activeSlide)">
        <div class="z-10 flex w-2/3 flex-col p-5">
          <p class="text-2xl font-semibold text-white">{{ activeSlide.title }}</p>
          <p class="mt-auto mb-8 flex items-center gap-3 font-medium text-white">
            {{ activeSlide.cta }}
            <img src="assets/icons/arrow-right.svg" alt="" class="w-4 invert" />
          </p>
        </div>
        <img :src="activeSlide.artwork" alt="" class="absolute right-0 top-0 h-full w-1/3 object-cover object-left" />
      </button>

      <div class="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
        <button
          v-for="(slide, index) in slides"
          :key="slide.id"
          type="button"
          class="h-3 w-3 rounded-full"
          :class="index === activeIndex ? 'bg-purple-300' : 'bg-white/40'"
          @click="activeIndex = index"
        ></button>
      </div>
    </div>
  `,
  methods: {
    nextSlide() {
      this.activeIndex = (this.activeIndex + 1) % this.slides.length;
    },
  },
};
