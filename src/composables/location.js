import { httpPostRequest } from '@/helpers/http/httpRequest'

export const useLocation = () => {
  const handleConfirmTrip = (location) => {
    httpPostRequest('/trip', {
      origin: location.current.geometry,
      destination: location.destination.geometry,
      destination_name: location.destination.name
    })
  }

  return { handleConfirmTrip }
}
