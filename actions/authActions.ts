import { setCurrentUser } from '@actions/generalActions'
import axiosInstance from '@config/axios-config'
import { LoginUserData } from '@interfaces/user'
import { getCSRF } from '@utils/csrf'
import { Dispatch } from 'redux'

export const loginUser = (userData: LoginUserData) => async (dispatch: Dispatch): Promise<void> => {
  const data = JSON.stringify(userData)
  let headers: Record<string, unknown> = {}

  const { token, success, msg } = await getCSRF()
  console.log(msg)

  headers = { 'Content-Type': 'application/json', 'X-CSRFToken': token }

  try {
    const res = await axiosInstance.post(`/api/user/login/`, data, { headers })
    dispatch(setCurrentUser(userData))
  } catch (err) {
    console.log(err)
  }
}
