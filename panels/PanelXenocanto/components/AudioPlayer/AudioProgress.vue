<template>
  <div
    class="h-2 w-full bg-base-background cursor-pointer"
    @click="updateProgressBar"
  >
    <div
      class="h-full relative bg-primary-color"
      :style="{ width: progressPorcent + '%' }"
    >
      <div
        class="absolute -right-2 bg-primary-color h-4 w-4 rounded-full -top-1"
        @mousedown="startDrag"
        @mousemove="handleDrag"
        @mouseup="endDrag"
        @mouseleave="endDrag"
      />
    </div>
  </div>
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

const emit = defineEmits(['update'])

const progressPorcent = computed(() =>
  Math.floor((props.current / props.duration) * 100)
)

function updateProgressBar(event) {
  const progressBar = event.currentTarget
  const rect = progressBar.getBoundingClientRect()
  const offsetX = event.clientX - rect.left
  const totalWidth = rect.width
  const progressPercentage = (offsetX / totalWidth) * 100
  const seconds = (progressPercentage / 100) * props.duration

  emit('update', Math.floor(seconds))
}
</script>
