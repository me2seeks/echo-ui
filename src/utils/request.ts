import { useMainStore } from '@/store/index'
import axios from 'axios'

const service = axios.create({
  baseURL: 'http://10.2.12.14:32655',
  // baseURL: 'http://localhost:1000',
  timeout: 5000,
})

service.interceptors.request.use((config) => {
  const main = useMainStore()
  const headers = new axios.AxiosHeaders(config.headers)

  headers.set('Content-Type', 'application/json')
  headers.set('Authorization', `Bearer ${main.token}`)
  config.headers = headers
  return config
})

service.interceptors.response.use(
  (response) => {
    return response.data
  },
  (error) => {
    console.error(error)
    return Promise.reject(error)
  }
)

export default service
