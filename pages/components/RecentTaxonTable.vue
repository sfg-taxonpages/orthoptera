<template>
  <VCard>
    <VCardContent>
      <ClientOnly>
        <VSpinner v-if="isLoading" />
      </ClientOnly>
      <VTable>
        <VTableHeader>
          <VTableHeaderRow>
            <VTableHeaderCell>Taxon name</VTableHeaderCell>
          </VTableHeaderRow>
        </VTableHeader>
        <VTableBody>
          <VTableBodyRow
            v-for="item in list"
            :key="item.id"
          >
            <VTableBodyCell>
              <RouterLink
                v-if="item.otu"
                :to="{ name: 'otus-id', params: { id: item.otu.id } }"
                v-html="[item.cached_html, item.cached_author_year].join(' ')"
              />
              <span
                v-else
                v-html="[item.cached_html, item.cached_author_year].join(' ')"
              />
            </VTableBodyCell>
          </VTableBodyRow>
        </VTableBody>
      </VTable>
      <VPagination
        class="mt-4"
        v-model="pagination.page"
        :total="pagination.total"
        :per="pagination.per"
        @update:modelValue="
          (page) => {
            loadList(page)
          }
        "
      />
    </VCardContent>
  </VCard>
</template>

<script setup>
import { ref, onBeforeMount } from 'vue'
import { makeAPIRequest } from '@/utils'
import { RouterLink } from 'vue-router'

const props = defineProps({
  per: {
    type: Number,
    default: 10
  },

  parameters: {
    type: Object,
    required: true
  }
})

const list = ref([])
const isLoading = ref(false)
const pagination = ref({ page: 1, total: 0, per: props.per })

async function loadList(page = 1) {
  isLoading.value = true

  makeAPIRequest
    .get('/taxon_names', {
      params: {
        ...props.parameters,
        extend: ['otus'],
        per: props.per,
        page
      }
    })
    .then(async ({ data, headers }) => {
      pagination.value = getPagination(headers)

      const response = await makeAPIRequest.get('/otus', {
        params: {
          taxon_name_id: data.map((item) => item.id)
        }
      })

      list.value = data.map((taxon) => ({
        ...taxon,
        otu: response.data.find((otu) => otu.taxon_name_id === taxon.id)
      }))
    })
    .finally(() => {
      isLoading.value = false
    })
}

function getPagination(headers) {
  return {
    page: Number(headers['pagination-page']),
    per: Number(headers['pagination-per-page']),
    total: Number(headers['pagination-total'])
  }
}

onBeforeMount(loadList)
</script>
