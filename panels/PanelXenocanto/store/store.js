import { defineStore } from 'pinia'
import axios from 'axios'

export const useXenocantoStore = defineStore('panel:xenocanto', {
  state: () => ({
    currentRecord: null,
    currentTaxon: null,
    list: [],
    isLoading: false
  }),

  actions: {
    async loadRecords(taxon) {
      if (taxon.id === this.currentTaxon?.id) {
        return
      }

      const name = taxon.cached.replace(/\([^()]*\)/g, '').trim()

      this.currentTaxon = taxon
      this.isLoading = true
      this.list = []

      await axios
        .get('https://xeno-canto.org/api/2/recordings', {
          params: { query: name }
        })
        .then(({ data }) => {
          this.list = data?.recordings || []
          this.currentRecord = this.list[0]
        })
        .finally(() => (this.isLoading = false))
    }
  }
})
