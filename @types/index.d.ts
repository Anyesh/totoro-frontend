import { IncomingMessage } from 'http'
import { NextPageContext } from 'next'
// #endregion Global Imports
import { User } from 'next-auth'
import { AppInitialProps } from 'next/app'
import { Store } from 'redux'
import { ThunkDispatch } from 'redux-thunk'

export interface IUserDetail {
  details: string
}
export interface IAuthUserData {
  user_id?: string
  username?: string
}

export interface AuthenticatedUser extends User {
  accessToken?: string
  refreshToken?: string
}
interface AppStore extends Store {
  dispatch: ThunkDispatch
}

export interface AppWithStore extends AppInitialProps {
  store: AppStore
}

export interface ReduxNextPageContext extends NextPageContext {
  store: AppStore
}

declare namespace IErrorPage {
  export interface InitialProps {
    namespacesRequired: string[]
  }
}

export { IErrorPage }

export interface RegisterUserData {
  username: string
  email: string
  password: string
}

export interface LoginUserData {
  username: string
  password: string
}

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

export interface CookieMessage extends IncomingMessage {
  cookies: { [name: string]: string }
}

export interface CookiesPageContext extends NextPageContext {
  req: CookieMessage | undefined
}

export interface ISession {
  session: Session
  loading: boolean
}
export interface TToken {
  exp: number
}

export interface IContent {
  id: string
  alt_description: string
  categories?: []
  avg_color: string
  create_at: string
  update_at: string
  description?: string | null
  height: number
  width: number
  links: {
    self: string
    html: string
  }
  photographer: string
  photographer_id: string
  photographer_url: string

  src: {
    original: string
    large: string
    small: string
    tiny: string
  }
}

export interface PexelContent {
  photos: Array<IContent>
  next_page: string
  page: number
  per_page: number
  total_results: number
}

export interface IUnsplashContent {
  id: string
  alt_description: string
  categories?: []
  color: string
  create_at: string
  update_at: string
  description?: string | null
  height: number
  width: number
  links: {
    self: string
    html: string
  }
  users: {
    id: string
    update_at: string
    username: string
  }
  urls: {
    full: string
    raw: string
    regular: string
    small: string
    thumb: string
  }
}
