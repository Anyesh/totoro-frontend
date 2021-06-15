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

interface ImageAttr {
  url: string
  height: number
  width: number
}
export interface IContent {
  id: string
  title: string
  categories?: []
  created_at: string
  updated_at: string
  description?: string | null

  likes: Record<string, unknown>

  _author: {
    username: string
    user_id: string
    email: string
  }

  src: {
    original: ImageAttr
    thumbnail: ImageAttr
  }
}

export interface DRFPaginatedResult {
  next?: string
  previous?: string
  count: number
  data: Array<unknown>
}

export interface DRFResponse {
  result: DRFPaginatedResult
  message: string
  status: boolean
  status_code: number
}

export interface IContentArr extends DRFPaginatedResult {
  data: Array<IContent>
}

export interface IContentRecord extends DRFResponse {
  result: { data: IContent }
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
