<template>
  <section>
    <div class="mx-auto py-6 prose !container dark:prose-invert">
      <h2 class="px-4 sm:px-0">Announcements</h2>
      <div class="flex gap-4 flex-col">
        <VCard v-for="{ title, text, date } in announcements">
          <VCardContent>
            <h3 class="mt-2 mb-0">{{ title }}</h3>
            <span class="text-base-soft">{{ date }}</span>
            <p v-html="text" />
          </VCardContent>
        </VCard>
      </div>
    </div>
  </section>
</template>

<script setup>
const announcements = [
  {
    title: 'OSF Powered by TaxonWorks',
    date: '2023-04-17',
    text: `OSF lives in TaxonWorks, the new infrastructure that powers OSF.
                The interfaces of TaxonWorks include a wide range of additional
                filtering and reporting functionalities. Please contact us
                (contact mail) if you need extended access to the data. Over
                time we expect this site to gradually mirror these extended
                functionalities of TaxonWorks.`
  },
  {
    title: 'OSF Grants 2023',
    date: '2023-01-03',
    text: `Information on call for grants' submissions can be found
              <a href="/taxonpages_osf/#/grants">here</a>`
  }
]
</script>
