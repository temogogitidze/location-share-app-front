import { ref } from 'vue'
import { httpPostRequest } from '@/helpers/http/httpRequest'

export const useLocation = () => {
  const trip = ref([])

  const handleConfirmTrip = async (location) => {
    const { data } = await httpPostRequest('/trip', {
      origin: location.current.geometry,
      destination: location.destination.geometry,
      destination_name: location.destination.name
    })
    trip.value = data
  }

  return { handleConfirmTrip, trip }
}
