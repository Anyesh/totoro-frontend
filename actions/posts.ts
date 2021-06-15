import { AxiosKwargs, cacheFetch, fetch, IAxiosResponse } from './axios-fetch'

export const fetchContent = async (token: string): Promise<IAxiosResponse> => {
  const url = '/post/all/'

  const kwargs: AxiosKwargs = {
    method: 'GET',
    token: token,
    headers: {},
    data: null,
    callback: () => {
      undefined
    },
  }
  const res = await cacheFetch(url, kwargs)
  return res
}

export const fetchPostDetail = async (token: string, pid: string): Promise<IAxiosResponse> => {
  const url = '/post/' + pid + '/'

  const kwargs: AxiosKwargs = {
    method: 'GET',
    token: token,
    headers: {},
    data: null,
    callback: () => {
      undefined
    },
  }
  const res = await cacheFetch(url, kwargs)
  return res
}

export const postNewContent = async (kwargs: AxiosKwargs): Promise<IAxiosResponse> => {
  const url = '/post/new/'

  const res = await fetch(url, kwargs)

  return res
}
