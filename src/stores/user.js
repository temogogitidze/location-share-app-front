import { defineStore } from 'pinia'
import { httpPostRequest } from '@/helpers/http/httpRequest'
import { httpGetRequest } from '@/helpers/http/httpRequest'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

export const useUserStore = defineStore('user', () => {
  const waitingForVerification = ref(false)
  const router = useRouter()

  const handleLogin = (formattedCredentials) => {
    if (formattedCredentials.phone) {
      return new Promise((resolve, reject) => {
        httpPostRequest('/login', formattedCredentials)
          .then((res) => {
            const { data } = res
            console.log(data)
            // if specific data is needed in component
            resolve(data)
            waitingForVerification.value = true
          })
          .catch((err) => {
            const { errors } = err.response.data
            console.log(errors)
            // if specific data is needed in component
            reject(errors)
          })
      })
    }
  }

  const handleVerification = (formattedCredentials) => {
    return new Promise(() => {
      httpPostRequest('/login/verify', formattedCredentials)
        .then((res) => {
          const { data } = res
          localStorage.setItem('token', data)
          router.push({ name: 'landing' })
        })
        .catch((err) => {
          console.log(err)
        })
    })
  }

  const fetchUser = () => {
    return new Promise((resolve, reject) => {
      httpGetRequest('/user')
        .then((res) => {
          resolve(true)
        })
        .catch((err) => {
          reject(err)
        })
    })
  }

  return { handleLogin, handleVerification, fetchUser, waitingForVerification }
})
