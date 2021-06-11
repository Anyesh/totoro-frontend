import { ROOT_API } from '@config'
import { isJwtExpired } from '@utils/jwt'
import axios, { AxiosResponse, Method } from 'axios'
import { IncomingHttpHeaders } from 'http'
import { getSession } from 'next-auth/client'

const axiosInstance = async (
  token: string,
  method: Method | null,
  url: string,
  headers: IncomingHttpHeaders,
  data: unknown,
  callback: CallableFunction
): Promise<AxiosResponse> => {
  let localToken = token
  // check for expired token
  if (isJwtExpired(token)) {
    const session = await getSession()

    if (session) {
      localToken = session.accessToken as string
    }
  }

  const axiosInstance = axios({
    url: url,
    method: method || 'GET',
    data: data,
    withCredentials: true,
    baseURL: ROOT_API,
    headers: { Authorization: 'Bearer ' + localToken, ...headers },
    onUploadProgress: (evt: ProgressEvent) => callback(evt),
  })
  return axiosInstance
}
export default axiosInstance

// Init Fetcher for SWR
export const fetcher = (url: string, token: string): Promise<AxiosResponse> =>
  axios.get(url, {
    headers: { Authorization: 'Bearer ' + token },
    baseURL: ROOT_API,
    withCredentials: true,
  })
