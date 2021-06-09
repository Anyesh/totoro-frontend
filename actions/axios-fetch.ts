import handleError, { errorResponse } from '@utils/handleError'
import axios from 'axios'
import cache from 'memory-cache'

export interface IAxiosResponse {
  data: Array<Record<string, unknown>> | Record<string, unknown> | unknown | null
  error: typeof errorResponse | null
}
export const cacheFetch = async (
  url: string,
  headers: Record<string, unknown> | null = null
): Promise<IAxiosResponse> => {
  const cachedResponse = cache.get(url)

  if (cachedResponse) {
    return cachedResponse
  } else {
    const hours = 24
    const response = await fetch(url, headers)

    cache.put(url, response, hours * 1000 * 60 * 60)

    return response
  }
}

export const fetch = async (
  url: string,
  headers: Record<string, unknown> | null = null
): Promise<IAxiosResponse> => {
  const AxiosResponse: IAxiosResponse = { data: null, error: null }

  try {
    const response = await axios.get(url, { headers: headers ? headers : {} })
    AxiosResponse.data = await response.data
  } catch (error) {
    const err = handleError(error)
    AxiosResponse.error = err
  }

  return AxiosResponse
}

export const pFetch = async (
  url: string,
  headers: Record<string, unknown> | null = null,
  body: Record<string, unknown> | null = null
): Promise<IAxiosResponse> => {
  const AxiosResponse: IAxiosResponse = { data: null, error: null }

  try {
    const response = await axios.post(url, body, { headers: headers ? headers : {} })
    AxiosResponse.data = await response.data
  } catch (error) {
    const err = handleError(error)
    AxiosResponse.error = err
  }

  return AxiosResponse
}
