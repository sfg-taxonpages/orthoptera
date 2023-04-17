<template>
  <div class="flex items-center gap-2 bg-base-foreground flex-col relative">
    <component
      class="h-14 w-14 z-10 text-primary-color dark:text-base-content"
      :is="icon"
    />
    <div class="leading-3 text-center mt-3">
      <span class="font-medium text-2xl block line">
        <AnimateNumber :number="count" />
      </span>
      <span class="uppercase text-sm">{{ label }}</span>
    </div>
  </div>
</template>

<script setup>
import AnimateNumber from '../../AnimateNumber.vue'
defineProps({
  icon: {
    type: Object,
    required: true
  },
  count: {
    type: Number,
    default: 0
  },
  label: {
    type: String,
    required: true
  },
  active: {
    type: Boolean,
    default: false
  }
})
</script>
