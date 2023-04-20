<template>
  <div class="overflow-hidden h-[550px] w-full">
    <Transition name="fade">
      <img
        class="object-cover overflow-hidden h-[550px] w-full absolute"
        :key="currentImage.src"
        :src="currentImage.src"
        alt="Dichroplus maculipennis"
      />
    </Transition>
    <div class="bg-black bg-opacity-50 absolute h-full w-full top-0"></div>
    <div class="absolute bottom-2 right-4">
      <span class="z-10 text-white text-sm drop-shadow">
        <RouterLink
          class="text-white"
          :to="{ name: 'otus-id', params: { id: currentImage.otuId } }"
        >
          {{ currentImage.label }} © {{ currentImage.copyright }}
        </RouterLink>
      </span>
    </div>
  </div>
</template>

<script setup>
import { onMounted, onBeforeUnmount, ref, computed } from 'vue'
import coryacrisAngustipennis from './images/coryacris_angustipennis.jpg'
import dichroplusMaculipennis from './images/dichroplus_maculipennis.jpg'
import neopediesNoroestensis from './images/neopedies_noroestensis.jpg'
import parascopasObesus from './images/parascopas_obesus.jpg'
import pediellaAncashensis from './images/pediella_ancashensis.jpg'
import stenopolaPuncticeps from './images/stenopola_puncticeps.jpg'
import zoniopodaTarsata from './images/zoniopoda_tarsata.jpg'

const props = defineProps({
  duration: {
    type: Number,
    default: 5000
  }
})

const images = [
  {
    label: 'Coryacris angustipennis',
    src: coryacrisAngustipennis,
    copyright: 'Cigliano, M.M',
    otuId: 17272
  },
  {
    label: 'Dichroplus maculipennis',
    copyright: 'Cigliano, M.M',
    src: dichroplusMaculipennis,
    otuId: 10278
  },
  {
    label: 'Neopedies noroestensis',
    copyright: 'Cigliano, M.M',
    src: neopediesNoroestensis,
    otuId: 10447
  },
  {
    label: 'Parascopas obesus',
    copyright: 'Cigliano, M.M',
    src: parascopasObesus,
    otuId: 11211
  },
  {
    label: 'Pediella ancashensis',
    copyright: 'Cigliano, Amédégnato, Pocco & Lange',
    src: pediellaAncashensis,
    otuId: 10321
  },
  {
    label: 'Stenopola puncticeps',
    copyright: 'Cigliano, M.M',
    src: stenopolaPuncticeps,
    otuId: 14255
  },
  {
    label: 'Zoniopoda tarsata',
    copyright: 'Cigliano, M.M',
    src: zoniopodaTarsata,
    otuId: 17336
  }
]

let intervalId

const currentIndex = ref(0)
const currentImage = computed(() => images[currentIndex.value])

onMounted(() => {
  intervalId = setInterval(() => {
    console.log((currentIndex.value + 1) % images.length)
    currentIndex.value = (currentIndex.value + 1) % images.length
  }, props.duration)
})

onBeforeUnmount(() => {
  clearInterval(intervalId)
})
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.75s ease-in-out;
}
.fade-enter-from {
  opacity: 0;
}
.fade-enter-to {
  opacity: 1;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
