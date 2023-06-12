import { httpGetRequest } from '@/helpers/http/httpRequest'

export const useDriver = () => {
  const startDriving = async () => {
    try {
      const response = await httpGetRequest('/driver')
      console.log(response)

      return !!response.data.driver
    } catch (error) {
      console.log(error)
    }
  }

  return { startDriving }
}
