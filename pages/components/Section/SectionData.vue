<template>
  <section>
    <div class="bg-base-foreground">
      <div class="container mx-auto">
        <div
          class="max-h-max grid grid-cols-2 sm:grid-cols-4 grid-col auto-cols-fr xl:grid-flow-col lg:py-18 xl:py-28 py-10 gap-10"
        >
          <DataType
            class="px-4"
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
import { onMounted, shallowRef, triggerRef } from 'vue'
import { makeAPIRequest } from '@/utils/request'

import IconAudio from '../Icon/IconAudio.vue'
import IconBug from '../Icon/IconBug.vue'
import IconImage from '../Icon/IconImage.vue'
import IconMicroscope from '../Icon/IconMicroscope.vue'
import IconReference from '../Icon/IconReference.vue'
import IconOk from '../Icon/IconOk.vue'
import IconCitation from '../Icon/iconCitation.vue'

import DataType from './Data/DataType.vue'

const TYPES = {
  validSpecies: 'Valid species',
  validExtantSpecies: 'Valid extant species',
  taxonNames: 'Taxon names',
  projectSources: 'Project sources',
  mediaSounds: 'Sounds',
  collectionObjects: 'Collection objects',
  citations: 'Citations',
  images: 'Images'
}

const dataTypes = shallowRef({
  [TYPES.validSpecies]: {
    icon: IconOk,
    label: 'Valid species',
    count: 30914
  },
  [TYPES.validExtantSpecies]: {
    icon: IconOk,
    label: 'Valid extant species',
    count: 29944
  },
  [TYPES.taxonNames]: {
    icon: IconMicroscope,
    label: 'Scientific names',
    count: 77501
  },
  [TYPES.projectSources]: {
    icon: IconReference,
    label: 'References',
    count: 17238
  },
  [TYPES.citations]: {
    icon: IconCitation,
    label: 'Citations',
    count: 532717
  },
  [TYPES.images]: {
    icon: IconImage,
    label: 'Images',
    count: 120573
  },
  [TYPES.mediaSounds]: {
    icon: IconAudio,
    label: 'Sound recordings',
    count: 202
  },
  [TYPES.collectionObjects]: {
    icon: IconBug,
    label: 'Specimen records',
    count: 100246
  }
})

const VALID_SPECIES_PARAMS = {
  validity: true,
  descendants: true,
  rank: ['NomenclaturalRank::Iczn::SpeciesGroup::Species']
}

function countTaxonNames(params) {
  return makeAPIRequest('/taxon_names.json', {
    params: { page: 1, per: 1, ...params }
  }).then(({ headers }) => Number(headers['pagination-total']))
}

async function loadStats() {
  const { data } = (await makeAPIRequest('/stats')).data

  for (const key in data) {
    if (dataTypes.value[key]) {
      dataTypes.value[key].count = data[key]
    }
  }
}

async function loadSpeciesCount() {
  const [validCount, fossilCount] = await Promise.all([
    countTaxonNames(VALID_SPECIES_PARAMS),
    countTaxonNames({
      ...VALID_SPECIES_PARAMS,
      taxon_name_id: [913531],
      taxon_name_classification: ['TaxonNameClassification::Iczn::Fossil']
    })
  ])

  dataTypes.value[TYPES.validSpecies].count = validCount
  dataTypes.value[TYPES.validExtantSpecies].count = validCount - fossilCount
}

onMounted(async () => {
  await Promise.allSettled([loadStats(), loadSpeciesCount()])
  triggerRef(dataTypes)
})
</script>
