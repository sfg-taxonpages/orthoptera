<template>
  <section>
    <div class="bg-base-foreground">
      <div class="container mx-auto">
        <div
          class="md:h-64 max-h-max grid grid-cols-2 md:grid-cols-none md:grid-flow-col justify-between items-center py-10 md:py-0 px-4 gap-10"
        >
          <RecentType
            v-for="(item, index) in TYPES"
            :active="currentTab === index"
            :key="item.label"
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
import { ref } from 'vue'
import IconAudio from '../Icon/IconAudio.vue'
import IconBug from '../Icon/IconBug.vue'
import IconImage from '../Icon/IconImage.vue'
import IconMicroscope from '../Icon/IconMicroscope.vue'
import IconReference from '../Icon/IconReference.vue'
import IconOk from '../Icon/IconOk.vue'

import RecentType from './Data/DataType.vue'

const currentTab = ref(0)

const TYPES = [
  {
    icon: IconOk,
    label: 'Valid species',
    count: 28950
  },
  {
    icon: IconMicroscope,
    label: 'Scientific names',
    count: 47350
  },
  {
    icon: IconReference,
    label: 'References',
    count: 15500
  },
  {
    icon: IconImage,
    label: 'Images',
    count: 107700
  },
  {
    icon: IconAudio,
    label: 'Sound recordings',
    count: 1940
  },
  {
    icon: IconBug,
    label: 'Specimen records',
    count: 108000
  }
]
</script>
