<template>
  <div class="container mx-auto py-4">
    <h1 class="text-4xl font-bold">Recent</h1>
    <div class="flex flex-col gap-4 mt-4">
      <RecentTaxonTable
        :parameters="{
          validity: true,
          recent: true,
          taxon_name_type: 'Protonym',
          recent_target: 'created_at'
        }"
      />

      <RecentTable
        :attributes="{
          cached: 'Source'
        }"
        route="/sources"
        :parameters="{
          in_project: true,
          recent: true,
          recent_target: 'created_at'
        }"
      />
    </div>
  </div>
</template>

<script setup>
import RecentTable from './components/RecentTable.vue'
import RecentTaxonTable from './components/RecentTaxonTable.vue'
</script>
