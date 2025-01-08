<template>
  <VCard v-if="taxon.etymology || adjective || classifications.length">
    <VCardHeader> Gender, form, and etymology </VCardHeader>
    <VCardContent class="text-sm">
      <b
        v-html="humanTypeList"
        class="block"
      />

      <span
        v-if="inSpeciesGroup && adjectiveOrParticiple && adjective"
        class="flex-col gap-2 mt-4"
      >
        <i>{{ adjective }}</i>
      </span>

      <template v-if="taxon.etymology">
        <hr class="my-4" />
        Etymology: <span v-html="md.render(taxon.etymology)" />
      </template>
    </VCardContent>
  </VCard>
</template>

<script setup>
import { computed, ref, watch } from 'vue'
import { makeAPIRequest } from '@/utils'
import MarkdownIt from 'markdown-it'

const SPECIES_GROUP = 'SpeciesGroup'
const SPECIES_AND_INFRASPECIES = 'SpeciesAndInfraspecies'
const NAMES_PROP = ['masculine_name', 'feminine_name', 'neuter_name']

const TYPE_LIST = {
  'TaxonNameClassification::Latinized::Gender::Masculine': 'Masculine',
  'TaxonNameClassification::Latinized::Gender::Feminine': 'Feminine',
  'TaxonNameClassification::Latinized::Gender::Neuter': 'Neuter',
  'TaxonNameClassification::Latinized::PartOfSpeech::Adjective': 'Adjective',
  'TaxonNameClassification::Latinized::PartOfSpeech::Participle': 'Participle',
  'TaxonNameClassification::Latinized::PartOfSpeech::NounInApposition':
    'Noun in apposition',
  'TaxonNameClassification::Latinized::PartOfSpeech::NounInGenitiveCase':
    'Noun in genitive case'
}

const props = defineProps({
  taxon: {
    type: Object,
    required: true
  }
})

const md = new MarkdownIt({ html: true })

const adjective = computed(() =>
  NAMES_PROP.map((key) => props.taxon[key])
    .filter(Boolean)
    .join(', ')
)

const classifications = ref([])

const adjectiveOrParticiple = computed(() =>
  classifications.value.some(
    (item) =>
      item.type.includes('::PartOfSpeech::Adjective') ||
      item.type.includes('::PartOfSpeech::Participle')
  )
)

const humanTypeList = computed(() => {
  return classifications.value
    .map((item) => TYPE_LIST[item.type])
    .filter(Boolean)
    .join(', ')
})

const inSpeciesGroup = computed(() => {
  const rank = props.taxon.rank_string

  return rank.includes(SPECIES_GROUP) || rank.includes(SPECIES_AND_INFRASPECIES)
})

function loadClassifications() {
  const params = {
    taxon_name_id: [props.taxon.id]
  }
  makeAPIRequest
    .get('/taxon_name_classifications', { params })
    .then(({ data }) => {
      classifications.value = data.filter((item) =>
        item.type.includes('::Latinized::')
      )
    })
}

watch(() => props.taxon.id, loadClassifications, { immediate: true })
</script>
