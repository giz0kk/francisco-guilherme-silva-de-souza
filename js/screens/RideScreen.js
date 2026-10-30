/**
 * Corrida em andamento (tela nova, inspirada no app real da Uber).
 *
 * A corrida passa por 4 fases, simuladas com um setInterval:
 * 1. 'arriving' -> o carro anda pela rota até o local de embarque
 * 2. 'arrived'  -> o motorista espera alguns segundos (mostra o PIN)
 * 3. 'on_trip'  -> o carro anda do embarque até o destino
 * 4. 'finished' -> o passageiro avalia o motorista
 *
 * Quando houver back-end, a posição do carro virá do servidor em vez da simulação.
 */
const STEP_INTERVAL_MS = 1500; // tempo entre um ponto da rota e o próximo
const WAIT_STEPS = 3;          // quantos "passos" o motorista espera no embarque

const RideScreen = {
  data() {
    return {
      approachRoute: [], // motorista -> embarque
      tripRoute: [],     // embarque -> destino
      timer: null,
      rating: 0,
    };
  },
  computed: {
    ride() {
      return store.activeRide;
    },
    phase() {
      return this.ride.phase;
    },
    step() {
      return this.ride.step;
    },
    isOnTheWay() {
      return this.phase === 'arriving' || this.phase === 'arrived';
    },

    /** Ponto onde o carro está agora */
    carPoint() {
      if (this.phase === 'arriving') {
        return this.approachRoute[this.step];
      }
      if (this.phase === 'arrived') {
        return this.approachRoute[this.approachRoute.length - 1];
      }
      if (this.phase === 'on_trip') {
        return this.tripRoute[this.step];
      }
      return this.tripRoute[this.tripRoute.length - 1];
    },

    /** Parte da rota que ainda falta percorrer (linha preta no mapa) */
    remainingRoute() {
      if (this.phase === 'arriving') {
        return this.approachRoute.slice(this.step);
      }
      if (this.phase === 'on_trip') {
        return this.tripRoute.slice(this.step);
      }
      return [];
    },

    mapMarkers() {
      if (this.approachRoute.length === 0) {
        return [];
      }
      const markers = [];

      if (this.isOnTheWay) {
        const pickupPoint = this.approachRoute[this.approachRoute.length - 1];
        markers.push({ id: 'pickup', type: 'origin', x: pickupPoint[0], y: pickupPoint[1], label: 'Embarque' });
      } else {
        const endPoint = this.tripRoute[this.tripRoute.length - 1];
        markers.push({ id: 'destination', type: 'destination', x: endPoint[0], y: endPoint[1], label: this.ride.destination });
      }

      markers.push({ id: 'car', type: 'car', x: this.carPoint[0], y: this.carPoint[1] });
      return markers;
    },

    /** Cada ponto restante da rota conta como 1 minuto (simulação) */
    minutesLeft() {
      return Math.max(this.remainingRoute.length - 1, 1);
    },

    arrivalTime() {
      const date = new Date();
      date.setMinutes(date.getMinutes() + this.minutesLeft);
      return formatClock(date);
    },

    /** Porcentagem da barra de progresso */
    progress() {
      if (this.phase === 'arriving') {
        return (this.step / (this.approachRoute.length - 1)) * 100;
      }
      if (this.phase === 'on_trip') {
        return (this.step / (this.tripRoute.length - 1)) * 100;
      }
      return 100;
    },

    title() {
      if (this.phase === 'arriving') {
        return 'Chegando em ' + this.minutesLeft + ' min';
      }
      if (this.phase === 'arrived') {
        return 'Seu motorista chegou';
      }
      return 'Indo para ' + this.ride.destination;
    },

    subtitle() {
      if (this.phase === 'arriving') {
        return 'Encontre ' + this.ride.driver.name + ' em: ' + this.ride.pickupZone;
      }
      if (this.phase === 'arrived') {
        return this.ride.driver.name + ' vai esperar até 5 min em: ' + this.ride.pickupZone;
      }
      return 'Chegada prevista às ' + this.arrivalTime;
    },

    priceText() {
      return formatCurrency(this.ride.price);
    },

    driverInitial() {
      return this.ride.driver.name.charAt(0);
    },

    pinDigits() {
      return this.ride.pin.split('');
    },
  },
  async created() {
    if (!this.ride) {
      redirectTo('home');
      return;
    }
    const routes = await api.getRoutes();
    this.approachRoute = routes.driverToPickup;
    this.tripRoute = routes.pickupToDestination;
    this.startSimulation();
  },
  beforeUnmount() {
    this.stopSimulation();
  },
  template: `
    <div v-if="ride" class="min-h-screen bg-white pb-10">
      <MapView height-class="h-96" :route="remainingRoute" :markers="mapMarkers">
        <div class="absolute left-5 top-5">
          <BackButton :circle="true" to="home" />
        </div>
      </MapView>

      <!-- Corrida finalizada: avaliação -->
      <div v-if="phase === 'finished'" class="px-5 pt-8 text-center">
        <p class="text-gray-500">{{ ride.destination }} · {{ priceText }}</p>
        <h1 class="mt-2 text-2xl font-semibold">Você chegou!</h1>
        <p class="mt-1 text-gray-500">Como foi sua viagem com {{ ride.driver.name }}?</p>

        <div class="mx-auto mt-6 flex h-20 w-20 items-center justify-center rounded-full bg-gray-200 text-3xl font-semibold">
          {{ driverInitial }}
        </div>

        <div class="mt-6">
          <RatingStars v-model="rating" />
        </div>

        <div class="mt-8 space-y-3">
          <PrimaryButton label="Enviar avaliação" :disabled="rating === 0" @click="finish" />
          <button type="button" class="w-full py-3 font-medium text-gray-500" @click="finish">Agora não</button>
        </div>
      </div>

      <!-- Corrida acontecendo -->
      <div v-else>
        <div class="h-1 bg-gray-200">
          <div class="progress-bar h-1 bg-uber-blue" :style="{ width: progress + '%' }"></div>
        </div>

        <div class="px-5 pt-5">
          <h1 class="text-2xl font-semibold">{{ title }}</h1>
          <p class="mt-1 text-gray-500">{{ subtitle }}</p>

          <!-- PIN (o passageiro informa ao motorista ao entrar no carro) -->
          <div v-if="isOnTheWay" class="mt-4 flex items-center justify-between rounded-xl bg-gray-100 px-4 py-3">
            <span class="font-medium">Seu PIN</span>
            <span class="flex gap-1">
              <span v-for="(digit, index) in pinDigits" :key="index" class="flex h-9 w-8 items-center justify-center rounded bg-uber-blue font-bold text-white">
                {{ digit }}
              </span>
            </span>
          </div>
        </div>

        <!-- Motorista e veículo -->
        <div class="mt-5 flex items-center gap-4 border-y px-5 py-5">
          <div class="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-gray-200 text-xl font-semibold">
            {{ driverInitial }}
          </div>
          <div class="flex-1">
            <p class="text-lg font-semibold">{{ ride.driver.name }} <span class="text-sm font-normal text-gray-500">★ {{ ride.driver.rating }}</span></p>
            <p class="text-gray-500">{{ ride.driver.vehicle }} · {{ ride.driver.color }}</p>
          </div>
          <div class="text-right">
            <p class="rounded border-2 border-black px-2 py-1 font-mono font-bold">{{ ride.driver.plate }}</p>
            <p class="mt-1 text-xs text-gray-500">{{ ride.rideName }}</p>
          </div>
        </div>

        <!-- Ações -->
        <div class="flex gap-3 px-5 pt-5">
          <button type="button" class="flex-1 rounded-full bg-gray-100 px-4 py-3 text-left text-gray-500" @click="sendMessage">
            Enviar mensagem para {{ ride.driver.name }}
          </button>
          <button type="button" class="rounded-full bg-gray-100 px-5 py-3 font-medium" @click="callDriver">Ligar</button>
        </div>

        <div class="grid grid-cols-2 gap-3 px-5 pt-3">
          <button type="button" class="rounded-xl bg-gray-100 py-3 font-medium" @click="shareTrip">Compartilhar viagem</button>
          <button type="button" class="rounded-xl bg-gray-100 py-3 font-medium" @click="openSafety">Segurança</button>
        </div>

        <!-- Detalhes da viagem -->
        <div class="mt-6 space-y-4 border-t px-5 pt-5">
          <div class="flex items-start gap-4">
            <span class="mt-2 h-2 w-2 shrink-0 rounded-full bg-black"></span>
            <div>
              <p class="font-medium">{{ ride.pickup }}</p>
              <p class="text-sm text-gray-500">{{ ride.pickupZone }}</p>
            </div>
          </div>
          <div class="flex items-start gap-4">
            <span class="mt-2 h-2 w-2 shrink-0 bg-black"></span>
            <p class="font-medium">{{ ride.destination }}</p>
          </div>
          <div class="flex items-center justify-between border-t pt-4">
            <span class="flex items-center gap-3">
              <img src="assets/images/cash.png" alt="" class="h-6 w-8" />
              {{ ride.paymentMethod }}
            </span>
            <span class="text-lg font-semibold">{{ priceText }}</span>
          </div>
        </div>

        <div v-if="isOnTheWay" class="px-5 pt-6">
          <button type="button" class="w-full rounded-xl border border-red-200 py-4 font-medium text-red-600" @click="cancelRide">
            Cancelar corrida
          </button>
        </div>
      </div>
    </div>
  `,
  methods: {
    startSimulation() {
      if (this.phase !== 'finished') {
        this.timer = setInterval(this.nextStep, STEP_INTERVAL_MS);
      }
    },

    stopSimulation() {
      clearInterval(this.timer);
    },

    /** Avança a corrida um passo (chamado a cada STEP_INTERVAL_MS) */
    nextStep() {
      if (this.phase === 'arriving') {
        if (this.step < this.approachRoute.length - 1) {
          setRideProgress('arriving', this.step + 1);
        } else {
          setRideProgress('arrived', 0);
        }
      } else if (this.phase === 'arrived') {
        if (this.step < WAIT_STEPS) {
          setRideProgress('arrived', this.step + 1);
        } else {
          setRideProgress('on_trip', 0);
        }
      } else if (this.phase === 'on_trip') {
        if (this.step < this.tripRoute.length - 1) {
          setRideProgress('on_trip', this.step + 1);
        } else {
          setRideProgress('finished', 0);
          this.stopSimulation();
        }
      }
    },

    async finish() {
      await api.finishRide(this.ride.id, this.rating);
      finishActiveRide();
      showToast(this.rating > 0 ? 'Obrigado pela avaliação!' : 'Viagem finalizada.');
      navigateTo('trips');
    },

    async cancelRide() {
      if (!confirm('Tem certeza que deseja cancelar a corrida?')) {
        return;
      }
      this.stopSimulation();
      await api.cancelRide(this.ride.id);
      finishActiveRide();
      showToast('Corrida cancelada.');
      navigateTo('home');
    },

    sendMessage() {
      showToast('O chat com o motorista estará disponível em breve.');
    },

    callDriver() {
      showToast('Ligando para ' + this.ride.driver.name + '...');
    },

    shareTrip() {
      showToast('Link da viagem copiado para compartilhar.');
    },

    openSafety() {
      showToast('Central de segurança: em caso de emergência ligue 190.');
    },
  },
};
