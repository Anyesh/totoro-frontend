import { ROOT_API } from '@config'
import { isJwtExpired } from '@utils/jwt'
import axios, { AxiosInstance } from 'axios'
import { getSession } from 'next-auth/client'

const axiosInstance = async (token: string): Promise<AxiosInstance> => {
  let localToken = token
  // check for expired token
  if (isJwtExpired(token)) {
    const session = await getSession()

    if (session) {
      localToken = session.accessToken as string
    }
  }
  const axiosInstance = axios.create({
    withCredentials: true,
    baseURL: ROOT_API,
    headers: { Authorization: 'Bearer ' + localToken },
  })
  return axiosInstance
}
export default axiosInstance
