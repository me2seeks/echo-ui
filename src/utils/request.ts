import { useUserStore } from '@/store/user'
import axios from 'axios'

const service = axios.create({
  baseURL: 'http://10.2.12.14:32655',
  // baseURL: 'http://localhost:1000',
  timeout: 5000,
})

service.interceptors.request.use((config) => {
  const userStore = useUserStore()
  const headers = new axios.AxiosHeaders(config.headers)

  headers.set('Content-Type', 'application/json')
  headers.set('Authorization', `Bearer ${userStore.token}`)
  config.headers = headers
  console.log(config.headers)
  return config
})

service.interceptors.response.use(
  (response) => {
    console.log(response)
    return response.data
  },
  (error) => {
    console.error(error)
    return Promise.reject(error)
  }
)

export default service
