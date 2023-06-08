import { httpGetRequest } from '@/helpers/http/HttpRequest'

export function useAuth() {
  const fetchUser = () => {
    return new Promise((resolve, reject) => {
      httpGetRequest('/user', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
        .then((res) => {
          resolve(true)
        })
        .catch((err) => {
          reject(err)
        })
    })
  }

  return { fetchUser }
}
