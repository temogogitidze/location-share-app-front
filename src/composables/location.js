import { httpPostRequest } from '@/helpers/http/httpRequest'
import { useRouter } from 'vue-router'

export const useLocation = () => {
  const router = useRouter()

  const handleConfirmTrip = async (location) => {
    try {
      await httpPostRequest('/trip', {
        origin: location.current.geometry,
        destination: location.destination.geometry,
        destination_name: location.destination.name
      })
      router.push({ name: 'trip' })
    } catch (error) {
      console.error(error)
    }
  }

  return { handleConfirmTrip }
}
