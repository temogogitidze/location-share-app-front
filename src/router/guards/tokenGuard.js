import { httpGetRequest } from '@/helpers/http/HttpRequest'

export const checkTokenAuthenticity = () => {
  return new Promise((resolve, reject) => {
    httpGetRequest('/user', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
      .then(() => {
        resolve(true)
      })
      .catch((err) => {
        console.log(err)
        reject(err)
      })
  })
}
