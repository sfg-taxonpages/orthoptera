<template>
  <span>{{ currentTime }} / {{ durationTime }}</span>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  current: {
    type: Number,
    default: 0
  },

  duration: {
    type: Number,
    default: 0
  }
})

const currentTime = computed(() => formatTime(Math.floor(props.current)))
const durationTime = computed(() => formatTime(Math.floor(props.duration)))

function convertToDigits(num) {
  return ('' + num).padStart(2, '0')
}

function formatTime(seconds) {
  const hours = Math.floor(seconds / 3600)
  const minutes = convertToDigits(Math.floor((seconds % 3600) / 60)) || 0
  const secs = convertToDigits(seconds % 60) || 0

  return hours
    ? `${convertToDigits(hours)}:${minutes}:${secs}`
    : `${minutes}:${secs}`
}
</script>
