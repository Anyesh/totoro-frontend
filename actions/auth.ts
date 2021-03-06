import { ROOT_API } from '@config'
import axiosInstance from '@config/axios-config'
import { IUserDetail } from '@types'
import isEmpty from '@validations/is-empty'
import axios from 'axios'
import { signOut } from 'next-auth/client'
import { toast } from 'react-toastify'
import { AxiosKwargs, fetch } from './axios-fetch'

interface ServerData {
  user: {
    pk: string
    username: string
  }
  access_token: string
  refresh_token: string
}

interface IDRFData {
  provider: string
  accessToken: string
  idToken: string | undefined
}

export const getInitialTokenFromDRF = async ({
  provider,
  accessToken,
  idToken,
}: IDRFData): Promise<Partial<ServerData>> => {
  try {
    const tokenPromise = await axios.post<ServerData>(`${ROOT_API}/social/${provider}/`, {
      access_token: accessToken, // note the differences in key and value variable names
      id_token: idToken,
    })

    const { access_token, refresh_token, user } = tokenPromise.data

    return {
      user,
      access_token,
      refresh_token,
    }
  } catch (error) {
    console.error('%cerror auth.ts line:44 ', 'color: red; display: block; width: 100%;', error)
    return {}
  }
}

export const refreshTokenFromDRF = async function (
  refreshToken: string
): Promise<string[] | null[]> {
  try {
    const response = await axios.post(ROOT_API + '/auth/token/refresh/', {
      refresh: refreshToken,
    })

    const { access, refresh } = response.data
    // still within this block, return true
    return [access, refresh]
  } catch (error) {
    console.error(
      '%cerror auth.ts line:61 ',
      'color: red; display: block; width: 100%;',
      error?.response
    )

    return [null, null]
  }
}

export const getUserDetails = async (token: string): Promise<IUserDetail | null> => {
  try {
    const response = await axiosInstance(token, 'GET', '/user/ping/', {}, null, () => {
      undefined
    })

    if (response?.data) {
      const userData = await response.data
      return userData
    } else {
      return null
    }
  } catch (error) {
    return null
  }
}

export const handleLogout = async ({
  token,
  refreshToken,
}: {
  token: string
  refreshToken: string
}): Promise<void> => {
  const url = '/auth/logout/'

  const kwargs: AxiosKwargs = {
    method: 'POST',
    token: token,
    headers: {},
    data: { refresh_token: refreshToken },
    callback: () => {
      undefined
    },
  }
  const res = await fetch(url, kwargs)
  if (!isEmpty(res.error)) {
    toast.dark(res.error?.message)
  } else {
    signOut()
    // toast.dark(res.data)
  }
}
