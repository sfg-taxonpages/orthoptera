<template>
  <section>
    <div class="relative box-border">
      <ImageCarrousel class="" />
      <div
        class="top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4 absolute flex flex-col items-center box-border w-full md:w-auto p-4"
      >
        <h1
          class="text-2xl sm:text-3xl lg:text-5xl text-white text-center font-medium"
        >
          Orthoptera Species File
        </h1>
        <h1
          class="text-xl sm:text-2xl lg:text-3xl text-white text-center py-12 font-medium"
        >
          Taxonomic database of the world's grasshoppers, katydids, crickets,
          and related insects
        </h1>
        <div class="p-4 bg-black bg-opacity-25 w-full max-w-lg box-border">
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
