import { ROOT_API } from '@config'
import axiosInstance from '@config/axios-config'
import { IUserDetail } from '@types'
import axios from 'axios'
import { signOut } from 'next-auth/client'

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

export const handleLogout = (): void => {
  signOut()
  // axios
  //   .post(ROOT_API + '/auth/logout/')
  //   .then((res) => signOut())
  //   .catch((err) => console.log(err))
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
  const req = await axiosInstance(token)
  const response = await req.get('/user/ping/')

  if (response?.data) {
    const postData = await response.data
    return postData
  } else {
    return null
  }
}
