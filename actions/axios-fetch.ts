import axiosInstance from '@config/axios-config'
import handleError, { errorResponse } from '@utils/handleError'
import axios, { Method } from 'axios'
import { OutgoingHttpHeader } from 'http'
import { IncomingHttpHeaders } from 'http2'
import cache from 'memory-cache'

export interface IAxiosResponse {
  data: Array<Record<string, unknown>> | Record<string, unknown> | unknown | null
  error: typeof errorResponse | null
}

export interface AxiosKwargs {
  method: Method
  data: unknown
  token: string
  headers: IncomingHttpHeaders
  callback: CallableFunction
}
export const cacheFetch = async (url: string, kwargs: AxiosKwargs): Promise<IAxiosResponse> => {
  const cachedResponse = cache.get(url)

  if (cachedResponse) {
    return cachedResponse
  } else {
    const hours = 24
    const response = await fetch(url, kwargs)

    cache.put(url, response, hours * 1000 * 60 * 60)

    return response
  }
}

export const fetch = async (url: string, kwargs: AxiosKwargs): Promise<IAxiosResponse> => {
  const AxiosResponse: IAxiosResponse = { data: null, error: null }

  try {
    const response = await axiosInstance(
      kwargs?.token,
      kwargs?.method,
      url,
      kwargs?.headers,
      kwargs?.data,
      kwargs?.callback
    )
    AxiosResponse.data = await response.data
  } catch (error) {
    const err = handleError(error)
    AxiosResponse.error = err
  }

  return AxiosResponse
}
