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
            <h3 class="mt-2 mb-0">OSF Grants 2025</h3>
            <span class="text-base-soft">2024-12-16</span>
            <p>
              Information on projects funded for 2025 can be found
              <RouterLink to="grants">here</RouterLink>
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
