<template>
  <VCard>
    <VCardContent>
      <ClientOnly>
        <VSpinner v-if="isLoading" />
      </ClientOnly>
      <VTable>
        <VTableHeader>
          <VTableHeaderRow>
            <VTableHeaderCell
              v-for="header in Object.values(attributes)"
              :key="header"
              >{{ header }}</VTableHeaderCell
            >
          </VTableHeaderRow>
        </VTableHeader>
        <VTableBody>
          <VTableBodyRow
            v-for="item in list"
            :key="item.id"
          >
            <VTableBodyCell
              v-for="attr in Object.keys(attributes)"
              :key="attr"
              v-html="item[attr]"
            />
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

const props = defineProps({
  per: {
    type: Number,
    default: 10
  },

  attributes: {
    type: Object,
    required: true
  },

  parameters: {
    type: Object,
    required: true
  },

  route: {
    type: String,
    required: true
  }
})

const list = ref([])
const isLoading = ref(false)
const pagination = ref({ page: 1, total: 0, per: props.per })

async function loadList(page = 1) {
  isLoading.value = true

  makeAPIRequest
    .get(props.route, {
      params: {
        ...props.parameters,
        per: props.per,
        page
      }
    })
    .then(({ data, headers }) => {
      pagination.value = getPagination(headers)
      list.value = data
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
