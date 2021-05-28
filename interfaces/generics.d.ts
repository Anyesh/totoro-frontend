export interface authState {
  isAuthenticated: boolean
  stage: string
  isRegistered: boolean | unknown
  user
}

export interface IStore {
  auth: authState
}

export interface IType {
  type: string
  payload
}
