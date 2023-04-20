<template>
  <section>
    <div class="relative box-border">
      <ImageCarrousel class="" />
      <div
        class="top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4 absolute flex flex-col items-center box-border w-full md:w-auto p-4"
      >
        <h1
          class="text-2xl sm:text-3xl md:text-4xl text-white text-center py-12 font-medium"
        >
          Taxonomic database of the world's Orthoptera (grasshoppers, katydids,
          crickets, and related insects)
        </h1>
        <div class="p-4 bg-black bg-opacity-25 w-full sm:w-96 box-border">
          <AutocompleteOtu
            autofocus
            class="w-full"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import ImageCarrousel from '../ImageCarrousel.vue'
</script>
