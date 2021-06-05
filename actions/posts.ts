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
