<template>
  <div class="container mx-auto py-4">
    <h1 class="text-4xl font-bold">Recent</h1>
    <div class="flex flex-col gap-4 mt-4">
      <VCard>
        <VCardContent>
          <VTable>
            <VTableHeader>
              <VTableHeaderRow>
                <VTableHeaderCell>Taxon name</VTableHeaderCell>
                <VTableHeaderCell>Author</VTableHeaderCell>
              </VTableHeaderRow>
            </VTableHeader>
            <VTableBody>
              <VTableBodyRow
                v-for="item in taxonNames"
                :key="item.id"
              >
                <VTableBodyCell v-html="item.cached_html" />
                <VTableBodyCell v-html="item.cached_author_year" />
              </VTableBodyRow>
            </VTableBody>
          </VTable>
        </VCardContent>
      </VCard>

      <VCard>
        <VCardContent>
          <VTable>
            <VTableHeader>
              <VTableHeaderRow>
                <VTableHeaderCell>Source</VTableHeaderCell>
              </VTableHeaderRow>
            </VTableHeader>
            <VTableBody>
              <VTableBodyRow
                v-for="item in sources"
                :key="item.id"
              >
                <VTableBodyCell v-html="item.cached" />
              </VTableBodyRow>
            </VTableBody>
          </VTable>
        </VCardContent>
      </VCard>
    </div>
  </div>
</template>

<script setup>
import { ref, onBeforeMount } from 'vue'
import { makeAPIRequest } from '@/utils'

const taxonNames = ref([])
const sources = ref([])

async function loadTaxonNames() {
  try {
    const { data } = await makeAPIRequest.get('/taxon_names', {
      params: {
        validity: true,
        recent_target: 'created_at',
        recent: true,
        per: 10
      }
    })

    taxonNames.value = data
  } catch (e) {}
}

async function loadSources() {
  try {
    const { data } = await makeAPIRequest.get('/sources', {
      params: {
        in_project: true,
        recent: true,
        recent_target: 'created_at',
        per: 10
      }
    })

    sources.value = data
  } catch (e) {}
}

onBeforeMount(() => {
  loadTaxonNames()
  loadSources()
})
</script>
