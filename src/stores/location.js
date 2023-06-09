import { reactive } from 'vue'
import { defineStore } from 'pinia'

export const useLocationStore = defineStore('location', () => {
  const destination = reactive({
    name: '',
    address: '',
    geometry: {
      lat: null,
      lng: null
    }
  })

  return { destination }
})
