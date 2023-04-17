<template>
  <section>
    <div class="relative">
      <img
        class="object-cover overflow-hidden h-[550px] w-full"
        :src="dichroplusMaculipennis"
        alt="Dichroplus maculipennis"
      />
      <div class="bg-black bg-opacity-50 absolute h-full w-full top-0"></div>
      <div
        class="top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4 absolute flex flex-col items-center"
      >
        <h1
          class="text-2xl sm:text-4xl text-white text-center py-12 font-medium"
        >
          Taxonomic database of the world's Orthoptera (grasshoppers, katydids,
          crickets, and related insects)
        </h1>
        <div class="p-4 bg-black bg-opacity-25 w-96">
          <AutocompleteOtu class="w-full" />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import dichroplusMaculipennis from '../images/dichroplus_maculipennis.jpg'
</script>
