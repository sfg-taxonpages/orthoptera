<template>
  <div class="flex gap-4">
    <div class="bg-base-background p-4 flex flex-col gap-4">
      <VButton
        v-if="!isPlaying"
        class="rounded-full px-6 py-6 w-8 h-8"
        primary
        @click="play"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="size-8"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z"
          />
        </svg>
      </VButton>
      <VButton
        v-else
        class="rounded-full px-6 py-6 w-8 h-8"
        primary
        @click="stop"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="size-8"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M15.75 5.25v13.5m-7.5-13.5v13.5"
          />
        </svg>
      </VButton>
      <AudioTime
        class="text-xs text-center"
        :duration="audioDuration"
        :current="currentTime"
      />
    </div>
    <div class="flex flex-col justify-between">
      <img :src="record.sono.small" />
      <img :src="record.osci.small" />
      <AudioProgress
        :current="currentTime"
        :duration="audioDuration"
        @update="setTimePosition"
      />
    </div>
    <audio
      :src="audioUrl"
      preload="none"
      ref="audioRef"
      @playing="() => (isPlaying = true)"
      @pause="() => (isPlaying = false)"
      @timeupdate="handleUpdate"
    />
  </div>
</template>

<script setup>
import { ref, watch, nextTick } from 'vue'
import AudioProgress from './AudioProgress.vue'
import AudioTime from './AudioTime.vue'

const props = defineProps({
  record: {
    type: Object,
    required: true
  }
})

const audioRef = ref(null)
const isPlaying = ref(false)
const audioDuration = ref(convertToSeconds(props.record.length))
const currentTime = ref(0)
const audioUrl = ref(getAudioLink(props.record))

watch(
  () => props.record.id,
  () => {
    audioDuration.value = convertToSeconds(props.record.length)
    currentTime.value = 0
    audioUrl.value = getAudioLink(props.record)

    nextTick(() => {
      audioRef.value.play()
    })
  }
)

function getAudioLink(record) {
  const string = record.sono.small || record.osci.small
  const regex = /uploaded\/([^\/]+)\//
  const match = string.match(regex)

  if (match) {
    const [_, id] = match

    return `//xeno-canto.org/sounds/uploaded/${id}/${record['file-name']}`
  } else {
    return record.file
  }
}

function play() {
  audioRef.value.play()
}

function stop() {
  audioRef.value.pause()
}

function setTimePosition(time) {
  audioRef.value.pause()
  currentTime.value = time
  audioRef.value.currentTime = time
  nextTick(() => {
    audioRef.value.play()
  })
}

function convertToSeconds(time) {
  const [minutes, seconds] = time.split(':')

  return Number(minutes) * 60 + Number(seconds)
}

function handleUpdate(e) {
  currentTime.value = e.target.currentTime
}
</script>
