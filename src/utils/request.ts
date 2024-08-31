import axios from 'axios'

const service = axios.create({
  baseURL: 'http://10.2.12.14:9999',
  timeout: 5000,
})

service.interceptors.response.use(
  (response) => {
    console.log(response)
    const res = response.data
    if (res.code !== 200) {
      console.error(res.msg)
    }
    return res
  },
  (error) => {
    console.error(error)
    return Promise.reject(error)
  }
)

export default service
