import { setCurrentStage, setErrorMessage, setMsg, setRegistraton } from '@actions/generalActions'
import { ROOT_API } from '@config'
import { LoginUserData, RegisterUserData } from '@interfaces/user'
import setAuthToken from '@utils/setAuthToken'
import axios from 'axios'
import { Dispatch } from 'redux'

export const registerUser = (userData: RegisterUserData) => (dispatch: Dispatch): void => {
  // clearing previous mess
  dispatch(setErrorMessage(''))
  dispatch(setMsg(''))
  axios
    .post(`${ROOT_API}/api/user/register`, userData)
    .then((res) => {
      dispatch(setMsg('Registration succesfull!'))
      dispatch(setRegistraton(res.data.success))
    })
    .catch((err) => {
      err.response
        ? dispatch(setErrorMessage(err.response.data))
        : dispatch(setErrorMessage({ msg: 'No Network!' }))
    })
}

export const loginUser = (userData: LoginUserData) => (dispatch: Dispatch): void => {
  // clearing previous mess
  dispatch(setErrorMessage({}))
  dispatch(setMsg({}))

  axios
    .post(`${ROOT_API}/api/user/login`, userData)
    .then((res) => {
      // Save to the local storage
      const { token } = res.data

      // SEt token to local
      localStorage.setItem('totoro_token', token)
      // Set token to auth header
      setAuthToken(token)

      // Set current stage to verify
      dispatch(setCurrentStage('VERIFY'))
    })
    .catch((err) => {
      err.response
        ? dispatch(setErrorMessage(err.response.data))
        : dispatch(setErrorMessage({ success: false, msg: 'No Network!' }))
    })
}