import { httpPostRequest } from '@/helpers/http/httpRequest'
import { useRouter } from 'vue-router'
import { useTripStore } from '@/stores/trip'

export const useLocation = () => {
  const router = useRouter()
  const trip = useTripStore()

  const handleConfirmTrip = async (location) => {
    try {
      const response = await httpPostRequest('/trip', {
        origin: location.current.geometry,
        destination: location.destination.geometry,
        destination_name: location.destination.name
      })
      trip.$patch(response.data)
      router.push({ name: 'trip' })
    } catch (error) {
      console.error(error)
    }
  }

  return { handleConfirmTrip }
}
