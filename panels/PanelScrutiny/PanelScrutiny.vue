<template>
  <VCard v-if="scrutinies.length">
    <VCardHeader>Scrutiny</VCardHeader>
    <VCardContent>
      <ul class="text-sm">
        <li v-for="item in scrutinies">
          {{ item.value }}
        </li>
      </ul>
    </VCardContent>
  </VCard>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { makeAPIRequest } from '@/utils'

const SCRUTINY_ID = 3102

const props = defineProps({
  taxonId: {
    type: Number,
    required: true
  }
})

const scrutinies = ref([])

onMounted(() => {
  const payload = {
    attribute_subject_id: props.taxonId,
    controlled_vocabulary_term_id: SCRUTINY_ID
  }

  makeAPIRequest
    .get('/data_attributes.json', { params: payload })
    .then(async (response) => {
      scrutinies.value = response.data
    })
})
</script>
