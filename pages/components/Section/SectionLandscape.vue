<template>
  <section>
    <div class="relative box-border">
      <ImageCarrousel>
        <div
          class="flex flex-col justify-center sm:items-center w-full h-full gap-4 bg-black bg-opacity-25"
        >
          <span class="text-3xl sm:text-4xl px-4 font-medium text-white">{{
            project_name
          }}</span>
          <span class="text-lg sm:text-xl text-white px-4"
            >Taxonomic database of the world's grasshoppers, locusts, katydids,
            crickets, and related insects</span
          >
          <div class="p-4 bg-black bg-opacity-25 w-full max-w-lg box-border">
            <AutocompleteOtu
              autofocus
              class="w-full"
              placeholder="Search by taxon name..."
            />
          </div>
        </div>
      </ImageCarrousel>
    </div>
  </section>
</template>

<script setup>
import ImageCarrousel from '../ImageCarrousel.vue'
const { project_name } = __APP_ENV__
</script>
