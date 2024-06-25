<template>
  <div class="flex flex-col justify-between">
    <div class="flex flex-col gap-2">
      <div class="text-lg">
        <a
          :href="record.url"
          target="_blank"
          >{{ record.gen }} {{ record.sp }}
          <span v-if="record.en">({{ record.en }})</span> -
          <span class="first-letter:uppercase">{{ record.type }}</span>
        </a>
        <div class="text-sm">{{ record.rec }}</div>
      </div>
      <div>
        <b class="text-sm block">Location</b>
        <span class="text-sm">{{ record.cnt }}, {{ record.loc }}</span>
      </div>
    </div>
    <div>
      <VButton
        class="text-sm grow-0"
        primary
        @click="downloadFile"
      >
        Download
      </VButton>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  record: {
    type: Object,
    required: true
  }
})

function downloadFile() {
  window.open(props.record.file)
}
</script>
