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
    <div class="bg-black bg-opacity-25 absolute h-full w-full top-0"></div>
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
import stenopolaPuncticeps from './images/stenopola_puncticeps.jpg'
import zoniopodaTarsata from './images/zoniopoda_tarsata.jpg'
import chromacrisSpeciosa from './images/chromacrisSpeciosa.jpg'
import chibchacrisFernandezi from './images/chibchacrisFernandezi.jpg'
import chlorobaliusLeucoviridis from './images/chlorobaliusLeucoviridis.jpg'
import aerotegminaVociferator from './images/aerotegminaVociferator.jpg'
import liladownsiaFraile from './images/liladownsiaFraile.jpg'
import lebinthusLuae from './images/lebinthusLuae.jpg'

const props = defineProps({
  duration: {
    type: Number,
    default: 5000
  }
})

const images = [
  {
    label: 'Lebinthus luae',
    copyright: 'Ming Kai Tan',
    src: lebinthusLuae,
    otuId: 25561
  },
  {
    label: 'Liladownsia fraile',
    copyright: 'Ricardo Mariño-Pérez',
    src: liladownsiaFraile,
    otuId: 10242
  },
  {
    label: 'Aerotegmina vociferator',
    copyright: 'Claudia Hemp',
    src: aerotegminaVociferator,
    otuId: 48040
  },
  {
    label: 'Chlorobalius leucoviridis',
    copyright: 'David Rentz',
    src: chlorobaliusLeucoviridis,
    otuId: 47940
  },

  {
    label: 'Chromacris speciosa',
    src: chromacrisSpeciosa,
    copyright: 'Cigliano, M.M',
    otuId: 17262
  },
  {
    label: 'Chibchacris Fernandezi',
    src: chibchacrisFernandezi,
    copyright: 'Cigliano, M.M',
    otuId: 10351
  },
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

const currentIndex = ref(Math.floor(Math.random() * images.length))
const currentImage = computed(() => images[currentIndex.value])

onMounted(() => {
  intervalId = setInterval(() => {
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
  transition: opacity 1s ease-in-out;
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
