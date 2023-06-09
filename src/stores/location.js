import { reactive } from 'vue'
import { defineStore } from 'pinia'
import { getUserLocation } from '@/helpers/location/location'

export const useLocationStore = defineStore('location', () => {
  const destination = reactive({
    name: '',
    address: '',
    geometry: {
      lat: null,
      lng: null
    }
  })

  const current = reactive({
    geometry: {
      lat: null,
      lng: null
    }
  })

  const updateCurrentLocation = async () => {
    const userLocation = await getUserLocation()
    current.geometry = {
      lat: userLocation.coords.latitude,
      lng: userLocation.coords.longitude
    }
  }

  return { destination, current, updateCurrentLocation }
})
