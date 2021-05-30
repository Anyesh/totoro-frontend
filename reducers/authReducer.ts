import { SET_CURRENT_USER } from '@constants/actionTypes'
import { authState } from '@interfaces/general'
import isEmpty from '@validations/is-empty'

const initialState: authState = {
  isAuthenticated: false,
  stage: 'LOGIN',
  user: {},
}

export const authReducer = (
  state: authState = initialState,
  action: Record<string, unknown>
): authState => {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),

        user: action.payload,
      }

    default:
      return state
  }
}
