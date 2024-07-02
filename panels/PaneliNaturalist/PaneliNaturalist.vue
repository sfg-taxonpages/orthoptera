<template>
  <VCard>
    <VCardHeader>Observations</VCardHeader>
    <VCardContent class="min-h-[6rem]">
      <ClientOnly>
        <VSpinner v-if="isLoading" />
      </ClientOnly>

      <div
        v-if="!isLoading && !observations.length"
        class="text-xl text-center my-8 w-full"
      >
        No records found.
      </div>

      <div class="flex flex-row flex-wrap gap-2">
        <div
          v-for="observation in observations"
          :key="observation.id"
        >
          <a
            v-if="observation?.observation_photos[0]"
            :href="`https://www.inaturalist.org/observations/${observation.id}`"
          >
            <img
              :key="observation.observation_photos[0].photo.id"
              :src="observation.observation_photos[0].photo.url"
            />
          </a>
        </div>
      </div>
      <VPagination
        v-if="observations.length"
        class="mt-4"
        v-model="pagination.page"
        :total="pagination.total_results"
        :per="pagination.per_page"
        @update:modelValue="
          (value) => {
            loadObservations({ page: value, per_page: perPage })
          }
        "
      />
    </VCardContent>
  </VCard>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const props = defineProps({
  taxon: {
    type: Object,
    required: true
  },

  perPage: {
    type: Number,
    default: 60
  }
})

const isLoading = ref(false)
const observations = ref([])
const pagination = ref({
  page: 1,
  per_page: props.perPage,
  total_results: 0
})

function loadObservations(parameters = {}) {
  isLoading.value = true

  axios
    .get(`https://api.inaturalist.org/v1/observations`, {
      params: {
        taxon_name: props.taxon.expanded_name,
        ...parameters
      }
    })
    .then(({ data }) => {
      observations.value = data.results
      pagination.value = {
        page: data.page,
        per_page: data.per_page,
        total_results: data.total_results
      }
    })
    .finally(() => {
      isLoading.value = false
    })
}

onMounted(() => {
  loadObservations({ per_page: props.perPage })
})
</script>
