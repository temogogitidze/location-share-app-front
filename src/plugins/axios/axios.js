import axios from 'axios'

const defaultInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL
})

export default defaultInstance
