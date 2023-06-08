import { defineStore } from 'pinia'
import { httpPostRequest } from '@/helpers/http/httpRequest'
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
          console.log(res)
          const { data } = { res }
          localStorage.setItem('token', data)
          router.push({ name: 'landing' })
        })
        .catch((err) => {
          console.log(err)
        })
    })
  }
  // 5|wdwVk6P9ZZnLymvJF3rPjdIL7WlyKR03p569JdHE
  return { handleLogin, handleVerification, waitingForVerification }
})
