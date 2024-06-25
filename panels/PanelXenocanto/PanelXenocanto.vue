<template>
  <VCard>
    <VCardHeader>
      <span>
        xeno-canto <span v-if="list.length">({{ list.length }})</span>
      </span>
    </VCardHeader>
    <VCardContent :class="isLoading && 'min-h-[6rem]'">
      <ClientOnly>
        <VSpinner v-if="isLoading" />
      </ClientOnly>

      <template v-if="!isLoading">
        <div
          v-if="currentRecord"
          class="flex flex-col md:flex-row flex-wrap gap-4 justify-start"
        >
          <AudioPlayer :record="currentRecord" />
          <RecordInformation :record="currentRecord" />
        </div>

        <VTable class="my-4 overflow-x-auto">
          <VTableHeader>
            <VTableHeaderRow>
              <VTableHeaderCell class="w-2">Audio</VTableHeaderCell>
              <VTableHeaderCell class="w-2">Taxon</VTableHeaderCell>
              <VTableHeaderCell class="w-12">Country</VTableHeaderCell>
              <VTableHeaderCell>Locality</VTableHeaderCell>
              <VTableHeaderCell class="w-2">Page</VTableHeaderCell>
            </VTableHeaderRow>
          </VTableHeader>
          <VTableBody>
            <VTableBodyRow
              v-for="item in pages[currentPage]"
              :key="item.id"
              :class="[
                currentRecord.id === item.id && 'bg-primary-color bg-opacity-20'
              ]"
            >
              <VTableBodyCell>
                <ButtonPlay @click="() => (currentRecord = item)" />
              </VTableBodyCell>
              <VTableBodyCell>{{ getRecordTaxonName(item) }}</VTableBodyCell>
              <VTableBodyCell>{{ item.cnt }}</VTableBodyCell>
              <VTableBodyCell>{{ item.loc }}</VTableBodyCell>
              <VTableBodyCell>
                <a
                  :href="item.url"
                  target="_blank"
                  >Link</a
                >
              </VTableBodyCell>
            </VTableBodyRow>
          </VTableBody>
        </VTable>
        <VPagination
          :total="list.length"
          :per="MAX_PER_PAGE"
          v-model="currentPage"
        />
      </template>
    </VCardContent>
  </VCard>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import ButtonPlay from './components/ButtonPlay.vue'
import AudioPlayer from './components/AudioPlayer/AudioPlayer.vue'
import RecordInformation from './components/RecordInformation.vue'

const MAX_PER_PAGE = 10

const props = defineProps({
  taxon: {
    type: Object,
    required: true
  }
})

const isLoading = ref(true)
const list = ref([])
const currentPage = ref(1)
const currentRecord = ref(null)

const pages = computed(() => {
  const tmp = [...list.value]
  const newList = [[]]

  while (tmp.length > 0) {
    newList.push(tmp.splice(0, MAX_PER_PAGE))
  }

  return newList
})

function getRecordTaxonName(record) {
  return [record.gen, record.sp, record.ssp].filter(Boolean).join(' ')
}

onMounted(() => {
  const name = props.taxon.cached.replace(/\([^()]*\)/g, '').trim()

  fetch(`https://xeno-canto.org/api/2/recordings?query=${name}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then((response) => response.json())
    .then((data) => {
      list.value = data?.recordings || []
      currentRecord.value = list.value[0]
    })
    .finally(() => (isLoading.value = false))
})
</script>
