import { ROOT_API } from '@config'
import axios from 'axios'

const axiosInstance = axios.create({
  withCredentials: true,
  baseURL: ROOT_API,
})

axiosInstance.defaults.withCredentials = true
axiosInstance.defaults.xsrfCookieName = 'csrftoken'
axiosInstance.defaults.xsrfHeaderName = 'X-CSRFToken'

export default axiosInstance
