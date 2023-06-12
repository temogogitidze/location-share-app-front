import { httpGetRequest } from '@/helpers/http/httpRequest'
import { httpPostRequest } from '@/helpers/http/httpRequest'

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

  const saveDriver = async (driverDetails) => {
    try {
      const response = await httpPostRequest('/driver', driverDetails)
      console.log(response)
      return response.status === 200
    } catch (error) {
      console.log(error)
      return error.response.status === 200
    }
  }

  return { startDriving, saveDriver }
}
