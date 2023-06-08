import defaultInstance from '@/plugins/axios/axios'

export const httpGetRequest = (url, config = {}) => {
  return defaultInstance.get(url, config)
}

export const httpPostRequest = (url, data, config = {}) => {
  return defaultInstance.post(url, data, config)
}
