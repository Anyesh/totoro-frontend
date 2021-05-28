import {
  GET_ERRORS,
  GET_MSG,
  SET_CURRENT_STAGE,
  SET_CURRENT_USER,
  SET_REGISTRATION_STATUS,
} from '@constants/actionTypes'
import { IType } from '@interfaces/generics'

// Set loggged in user
export const setCurrentUser = (data: unknown): IType => {
  return {
    type: SET_CURRENT_USER,
    payload: data,
  }
}

//Set current STAGE
export const setCurrentStage = (data: unknown): IType => {
  return {
    type: SET_CURRENT_STAGE,
    payload: data,
  }
}

//Set error message
export const setErrorMessage = (data: unknown): IType => {
  return {
    type: GET_ERRORS,
    payload: data,
  }
}

// Set messages
export const setMsg = (data: unknown): IType => {
  return {
    type: GET_MSG,
    payload: data,
  }
}

// Set Reg Status
export const setRegistraton = (data: unknown): IType => {
  return {
    type: SET_REGISTRATION_STATUS,
    payload: data,
  }
}
