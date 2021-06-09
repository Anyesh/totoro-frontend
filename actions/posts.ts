import axiosInstance from '@config/axios-config'
import { AxiosRequestConfig } from 'axios'
import { cacheFetch, IAxiosResponse } from './axios-fetch'

export const fetchContent = async (): Promise<IAxiosResponse> => {
  const url = 'https://api.pexels.com/v1/search?query=nature&per_page=20'

  const headers = {
    Authorization:
      process.env.PEXEL_KEY || '563492ad6f91700001000001fe2538f16d4147ff9f71b738107108be',
  }
  const res = await cacheFetch(url, headers)
  return res
}

export const postNewContent = async (
  post: unknown,
  token: string,
  config: AxiosRequestConfig
): Promise<unknown | null> => {
  const req = await axiosInstance(token)

  try {
    const response = await req.post('/post/new/', post, config)

    if (response?.data) {
      const postResponse = await response.data
      return postResponse
    } else {
      return null
    }
  } catch (error) {
    return null
  }
}
