import { defineStore } from 'pinia'
import { httpPostRequest } from '@/helpers/http/httpRequest'

export const useUserStore = defineStore('user', () => {
  const handleLogin = (credentials) => {
    if (credentials.phone) {
      return httpPostRequest('/login', {
        phone: credentials.phone
          .replaceAll(' ', '')
          .replace('(', '')
          .replace(')', '')
          .replaceAll('-', '')
      })
        .then((res) => {
          const { data } = res
          console.log(data)
        })
        .catch((err) => {
          const { errors } = err.response.data
          console.log(errors)
        })
    }
  }

  return { handleLogin }
})
