import { applyMiddleware, createStore, Store as ReduxStore } from 'redux'
import { createLogger } from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import rootReducers from './reducers'

const dev: boolean = process.env.NODE_ENV !== 'production'

const initialState = {}

const { composeWithDevTools } = dev
  ? require('redux-devtools-extension')
  : require('redux-devtools-extension/logOnlyInProduction')

export type Store = ReduxStore<typeof initialState>

const middlewares = dev ? [thunkMiddleware, createLogger()] : []

export const makeStore = (state: typeof initialState) => {
  return createStore(rootReducers, state, composeWithDevTools(applyMiddleware(...middlewares)))
}
