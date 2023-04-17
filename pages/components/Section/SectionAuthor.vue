<template>
  <section class="bg-base-foreground">
    <div class="container mx-auto p-4 sm:py-10 relative box-border">
      <div class="prose !container dark:prose-invert">
        <div>
          <p>
            The Orthoptera Species File (OSF) is a taxonomic database of the
            world’s Orthoptera (grasshoppers, katydids, crickets, and related
            insects) both living and fossil. It has full taxonomic and synonymic
            information for all taxa, with complete taxonomic references,
            images, sound recordings, and specimen records.
          </p>
          <p>
            The core purpose of the OSF is to provide a resource that makes
            research on Orthoptera more efficient as well as to cover the needs
            of policy-makers, environmental managers and the wider public for a
            consistent and up-to-date classification of the world’s Orthoptera
            species.
          </p>
          <p>
            It is open to contributions from anyone with specimen records and
            images.
          </p>

          <h2>Authors</h2>
          <ul class="my-4">
            <li
              v-for="item in AUTHORS"
              :key="item.person"
            >
              <span class="block"
                ><span class="font-bold">{{ item.person }}</span> -
                {{ item.position }}</span
              >
              <span>{{ item.location }}</span>
            </li>
          </ul>

          <div>
            <h3>Major Contributors</h3>
            <ul>
              <li
                v-for="item in CONTRIBUTORS"
                :key="item.person"
              >
                <span class="font-bold">{{ item.person }}</span> -
                {{ item.location }}
              </li>
            </ul>
          </div>
          <div class="my-4">
            <h3>Assistant editor</h3>
            <ul>
              <li
                v-for="item in CONTRIBUTORS"
                :key="item.person"
              >
                {{ item.person }} - {{ item.location }}
              </li>
            </ul>
            <hr class="border-b-base-border" />
            <p>
              With the cooperation of
              <a href="https://orthsoc.org/">The Orthopterists' Society</a>
            </p>
          </div>
        </div>

        <OSFLogo
          class="hidden lg:block opacity-10 w-[40rem] text-primary-color absolute right-0 bottom-48 dark:text-base-content"
        />
      </div>
    </div>
  </section>
</template>

<script setup>
import OSFLogo from '../OSFLogo.vue'
const AUTHORS = [
  {
    person: 'Maria Marta Cigliano',
    position: 'Project Director & Author',
    location:
      'División Entomología. Museo de La Plata, CEPAVE - CONICET, Argentina'
  },
  {
    person: 'Holger Braun',
    position: 'Author & Editor',
    location: 'División Entomología, Museo de La Plata, Argentina'
  },
  {
    person: 'David C. Eades',
    position:
      'Founder of the Species File Group, Data base Developer of Species File Software',
    location: 'Illinois Natural History Survey, USA'
  },
  {
    person: 'Daniel Otte',
    position: 'Founder and Original Author',
    location: 'Academy of Natural Sciences of Philadelphia, USA'
  }
]

const CONTRIBUTORS = [
  {
    person: 'Piotr Naskrecki',
    location: 'Museum of Comparative Zoology, Harvard University'
  },
  {
    person: 'Hernán Lucas Pereira',
    location: 'CEPAVE - CONICET, Argentina'
  }
]

const ASSISTANT_EDITORS = [
  {
    person: 'María Belén Cabrera',
    location: 'División Entomología, Museo de La Plata, Argentina'
  }
]
</script>
