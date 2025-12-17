<template>
  <section>
    <div
      class="mx-auto py-6 prose !container dark:prose-invert"
      id="announcements"
    >
      <h2 class="px-4 sm:px-0">Announcements</h2>
      <div class="flex gap-4 flex-col">
        <VCard>
          <VCardContent>
            <h3 class="mt-2 mb-0">OSF Grants 2026</h3>
            <span class="text-base-soft">2025-10-08</span>
            <p>
              Information on Grants funded for 2026 can be found
              <RouterLink to="grants">here</RouterLink>
            </p>
          </VCardContent>
        </VCard>

        <VCard>
          <VCardContent>
            <h3 class="mt-2 mb-0">New! Advanced Bibliography Search</h3>
            <span class="text-base-soft">2025-10-01</span>
            <p>
              Search anywhere in a citation and filter by author, type, or year.
            </p>
          </VCardContent>
        </VCard>

        <VCard>
          <VCardContent>
            <h3 class="mt-2 mb-0">New! Darwin Core Search</h3>
            <span class="text-base-soft">2025-10-01</span>
            <p>
              Filter OTUs by scientific name, author, type, and distribution.
            </p>
          </VCardContent>
        </VCard>

        <VCard>
          <VCardContent>
            <h3 class="mt-2 mb-0">OSF Powered by TaxonWorks</h3>
            <span class="text-base-soft">2023-04-17</span>
            <p>
              OSF lives in TaxonWorks, the new infrastructure that powers OSF.
              The interfaces of TaxonWorks include a wide range of additional
              filtering and reporting functionalities. Please contact us
              (<address-maker
                class="font-medium"
                :items="['cigliano', 'fcnym', 'unlp', 'edu', 'ar']"
              />;
              <address-maker
                class="font-medium"
                :items="['braun', 'fcnym', 'unlp', 'edu', 'ar']"
              />) if you need extended access to the data. Over time we expect
              this site to gradually mirror these extended functionalities of
              TaxonWorks.
            </p>
          </VCardContent>
        </VCard>
      </div>
    </div>
  </section>
</template>
