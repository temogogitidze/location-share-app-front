import defaultInstance from '@/plugins/axios/axios'

export const httpGetRequest = (url, config = {}) => {
  return new Promise((resolve, reject) => {
    defaultInstance
      .get(url, config)
      .then((res) => resolve(res))
      .catch((err) => reject(err))
  })
}

export const httpPostRequest = (url, data, config = {}) => {
  return new Promise((resolve, reject) => {
    defaultInstance
      .post(url, data, config)
      .then((res) => resolve(res))
      .catch((err) => reject(err))
  })
}
