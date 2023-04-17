<template>
  <section>
    <div class="bg-base-foreground">
      <div class="container mx-auto">
        <div
          class="md:h-64 max-h-max grid grid-cols-2 md:grid-cols-none md:grid-flow-col justify-between items-center py-10 md:py-0 px-4 gap-10"
        >
          <DataType
            v-for="(item, key) in dataTypes"
            :key="key"
            :icon="item.icon"
            :label="item.label"
            :count="item.count"
          />
        </div>
      </div>
    </div>
    <div class="bg-base-foreground">
      <div class="container mx-auto"></div>
    </div>
  </section>
</template>

<script setup>
import { shallowRef, triggerRef } from 'vue'
import { makeAPIRequest } from '@/utils/request'

import IconAudio from '../Icon/IconAudio.vue'
import IconBug from '../Icon/IconBug.vue'
import IconImage from '../Icon/IconImage.vue'
import IconMicroscope from '../Icon/IconMicroscope.vue'
import IconReference from '../Icon/IconReference.vue'
import IconOk from '../Icon/IconOk.vue'
import IconCitation from '../Icon/iconCitation.vue'

import DataType from './Data/DataType.vue'

const dataTypes = shallowRef({
  'Valid species': {
    icon: IconOk,
    label: 'Valid species',
    count: 29410
  },
  'Taxon names': {
    icon: IconMicroscope,
    label: 'Scientific names',
    count: 47350
  },
  'Project sources': {
    icon: IconReference,
    label: 'References',
    count: 15500
  },
  Citations: {
    icon: IconCitation,
    label: 'Citations',
    count: 250000
  },
  Images: {
    icon: IconImage,
    label: 'Images',
    count: 107700
  },
  'Media Sounds': {
    icon: IconAudio,
    label: 'Sound recordings',
    count: 2030
  },
  'Collection objects': {
    icon: IconBug,
    label: 'Specimen records',
    count: 108000
  }
})

makeAPIRequest('/stats').then((response) => {
  const { data } = response.data

  for (const key in data) {
    if (dataTypes.value[key]) {
      dataTypes.value[key].count = data[key]
    }
  }

  triggerRef(dataTypes)
})
</script>
