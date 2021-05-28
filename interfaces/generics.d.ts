export interface authState {
  isAuthenticated: boolean
  stage: String
  isRegistered: boolean
  user: object
}

export interface IStore {
  auth: authState
}
