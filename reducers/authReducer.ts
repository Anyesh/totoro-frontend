import {
  SET_CURRENT_STAGE,
  SET_CURRENT_USER,
  SET_REGISTRATION_STATUS,
} from '@constants/actionTypes'
import { authState } from '@interfaces/generics'
import isEmpty from '@validations/is-empty'

const initialState: authState = {
  isAuthenticated: false,
  stage: 'LOGIN',
  isRegistered: false,
  user: {},
}

export const authReducer = (state: authState = initialState, action: any): authState => {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),

        user: action.payload,
      }

    case SET_CURRENT_STAGE:
      return {
        ...state,
        stage: action.payload,
      }

    case SET_REGISTRATION_STATUS:
      return {
        ...state,
        isRegistered: action.payload,
      }

    default:
      return state
  }
}
