import { ref, reactive } from 'vue'
import { defineStore } from 'pinia'
import { httpPostRequest } from '@/helpers/http/httpRequest'
import { useLocationStore } from '@/stores/location'
import { useRouter } from 'vue-router'

export const useTripStore = defineStore('trip', () => {
  const location = useLocationStore()
  const router = useRouter()

  const id = ref(null)
  const user_id = ref(null)

  const origin = reactive({
    lat: null,
    lng: null
  })

  const destination = reactive({
    lat: null,
    lng: null
  })

  const destination_name = ref('')

  const reset = () => {
    id.value = null
    user_id.value = null

    origin.lat = null
    origin.lng = null

    destination.lat = null
    destination.lng = null

    destination_name.value = ''
  }

  const acceptTrip = async (id) => {
    await location.updateCurrentLocation()

    try {
      const response = await httpPostRequest('/trip/' + id + '/accept', {
        driver_location: location.current.geometry
      })
      location.$patch({
        destination: {
          name: 'Passenger',
          geometry: response.data.origin
        }
      })

      router.push({ name: 'driving' })
    } catch (error) {
      console.error(error)
    }
  }

  return { id, user_id, origin, destination, destination_name, reset, acceptTrip }
})
