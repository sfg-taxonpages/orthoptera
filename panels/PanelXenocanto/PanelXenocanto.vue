<template>
  <VCard>
    <VCardHeader>
      <span>
        xeno-canto
        <span v-if="store.list.length">({{ store.list.length }})</span>
      </span>
    </VCardHeader>
    <VCardContent class="min-h-[6rem]">
      <ClientOnly>
        <VSpinner v-if="store.isLoading" />
      </ClientOnly>

      <div
        v-if="!store.isLoading && !store.list.length"
        class="text-xl text-center my-8"
      >
        No records found.
      </div>

      <template v-if="!store.isLoading && store.list.length">
        <div
          v-if="store.currentRecord"
          class="flex flex-col md:flex-row flex-wrap gap-4 justify-start"
        >
          <AudioPlayer :record="store.currentRecord" />
          <RecordInformation :record="store.currentRecord" />
        </div>

        <VTable class="my-4 overflow-x-auto">
          <VTableHeader>
            <VTableHeaderRow>
              <VTableHeaderCell class="w-2">Audio</VTableHeaderCell>
              <VTableHeaderCell class="w-2">Taxon</VTableHeaderCell>
              <VTableHeaderCell class="w-12">Country</VTableHeaderCell>
              <VTableHeaderCell>Locality</VTableHeaderCell>
              <VTableHeaderCell>Author</VTableHeaderCell>
              <VTableHeaderCell class="w-24">License</VTableHeaderCell>
              <VTableHeaderCell class="w-2">Page</VTableHeaderCell>
            </VTableHeaderRow>
          </VTableHeader>
          <VTableBody>
            <VTableBodyRow
              v-for="item in pages[currentPage]"
              :key="item.id"
              :class="[
                store.currentRecord.id === item.id &&
                  'bg-primary-color bg-opacity-20'
              ]"
            >
              <VTableBodyCell>
                <ButtonPlay @click="() => (store.currentRecord = item)" />
              </VTableBodyCell>
              <VTableBodyCell>{{ getRecordTaxonName(item) }}</VTableBodyCell>
              <VTableBodyCell>{{ item.cnt }}</VTableBodyCell>
              <VTableBodyCell>{{ item.loc }}</VTableBodyCell>
              <VTableBodyCell>{{ item.rec }}</VTableBodyCell>
              <VTableBodyCell>
                <a
                  :href="item.lic"
                  target="_blank"
                >
                  <img
                    v-if="isCreativeCommons(item.lic)"
                    :src="getCCLicenseFromUrl(item.lic)"
                  />
                  <span v-else>{{ item.lic }}</span></a
                >
              </VTableBodyCell>
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
          :total="store.list.length"
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
import { useXenocantoStore } from './store/store'

const MAX_PER_PAGE = 10

const props = defineProps({
  taxon: {
    type: Object,
    required: true
  }
})

const currentPage = ref(1)
const store = useXenocantoStore()

const pages = computed(() => {
  const tmp = [...store.list]
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
  store.loadRecords(props.taxon)
})

function makeCCImgUrl(license) {
  return `http://mirrors.creativecommons.org/presskit/buttons/80x15/svg/${license}.svg`
}

function isCreativeCommons(url) {
  return url.includes('creativecommons')
}

function getCCLicenseFromUrl(url) {
  const regex = /licenses\/([a-z-]+)\/\d+\.\d+/
  const match = url.match(regex)

  const [_, license] = match

  return makeCCImgUrl(license)
}
</script>
