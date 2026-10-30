/**
 * Mapa (imagem estática de São Paulo) com rota e marcadores.
 *
 * props:
 * - route:   lista de pontos [[x, y], ...] em porcentagem -> desenha a linha preta
 * - markers: lista de marcadores { id, type, x, y, label, selected }
 *            type: 'origin' (bolinha), 'destination' (quadrado), 'car',
 *                  'user' (ponto azul) ou 'zone' (zona de embarque clicável)
 * - heightClass: altura do mapa usando uma classe do Tailwind (ex.: 'h-80')
 *
 * Quando houver back-end, este componente pode ser trocado por um mapa real.
 */
const MapView = {
  props: {
    route: { type: Array, default: () => [] },
    markers: { type: Array, default: () => [] },
    heightClass: { type: String, default: 'h-80' },
  },
  emits: ['select-marker'],
  computed: {
    /** Transforma [[25, 22], [28, 40]] em "25,22 28,40" (formato do <polyline>) */
    routePoints() {
      return this.route.map((point) => point[0] + ',' + point[1]).join(' ');
    },
  },
  template: `
    <div class="relative w-full overflow-hidden bg-gray-200" :class="heightClass">
      <img src="assets/images/map.png" alt="Mapa" class="absolute inset-0 h-full w-full object-cover" />

      <!-- Rota: o viewBox 0-100 faz os pontos funcionarem como porcentagem -->
      <svg v-if="route.length > 1" class="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        <polyline
          :points="routePoints"
          fill="none"
          stroke="black"
          stroke-width="4"
          stroke-linejoin="round"
          stroke-linecap="round"
          vector-effect="non-scaling-stroke"
        />
      </svg>

      <!-- Marcadores -->
      <div
        v-for="marker in markers"
        :key="marker.id"
        class="map-marker absolute h-0 w-0"
        :style="{ left: marker.x + '%', top: marker.y + '%' }"
      >
        <div class="-translate-x-1/2 -translate-y-1/2">
          <span v-if="marker.type === 'origin'" class="flex h-4 w-4 items-center justify-center rounded-full bg-black">
            <span class="h-1 w-1 rounded-full bg-white"></span>
          </span>

          <span v-if="marker.type === 'destination'" class="flex h-4 w-4 items-center justify-center bg-black">
            <span class="h-1 w-1 bg-white"></span>
          </span>

          <span v-if="marker.type === 'user'" class="map-pulse block h-4 w-4 rounded-full border-2 border-white bg-uber-blue"></span>

          <img v-if="marker.type === 'car'" src="assets/images/car-top.png" alt="Carro" class="h-16 w-14 max-w-none object-contain" />

          <button
            v-if="marker.type === 'zone'"
            type="button"
            class="flex h-6 w-6 items-center justify-center rounded-full border-2 border-uber-blue"
            :class="marker.selected ? 'bg-uber-blue' : 'bg-white'"
            @click="$emit('select-marker', marker)"
          >
            <span class="h-2 w-2" :class="marker.selected ? 'bg-white' : 'bg-uber-blue'"></span>
          </button>
        </div>

        <!-- Rótulo acima do marcador -->
        <div
          v-if="marker.label"
          class="absolute bottom-4 left-0 -translate-x-1/2 max-w-56 truncate px-3 py-2 text-sm font-medium shadow-md"
          :class="marker.type === 'zone' ? 'rounded-full bg-uber-blue text-white' : 'bg-white'"
        >
          {{ marker.label }}
        </div>
      </div>

      <!-- Espaço para botões por cima do mapa (ex.: voltar) -->
      <slot></slot>
    </div>
  `,
};
