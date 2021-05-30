export interface authState {
  isAuthenticated: boolean
  stage: string
  user
}

export interface IStore {
  authentication: authState
}

export interface IType {
  type: string
  payload
}
