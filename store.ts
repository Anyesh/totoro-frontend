import { useMemo } from 'react'
import { applyMiddleware, createStore, Store as ReduxStore } from 'redux'
import { createLogger } from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import rootReducers from './reducers'

const initialState = {}

export type Store = ReduxStore<typeof initialState>

let store: Store | undefined = undefined

const dev: boolean = process.env.NODE_ENV !== 'production'

const { composeWithDevTools } = dev
  ? require('redux-devtools-extension')
  : require('redux-devtools-extension/logOnlyInProduction')

const middlewares = dev ? [thunkMiddleware, createLogger()] : []

function initStore(state: typeof initialState) {
  return createStore(rootReducers, state, composeWithDevTools(applyMiddleware(...middlewares)))
}
export const makeStore = (preloadedState: typeof initialState): Store => {
  let _store = store ?? initStore(preloadedState)

  // After navigating to a page with an initial Redux state, merge that state
  // with the current state in the store, and create a new store
  if (preloadedState && store) {
    _store = initStore({
      ...store.getState(),
      ...preloadedState,
    })
    // Reset the current store
    store = undefined
  }

  // For SSG and SSR always create a new store
  if (typeof window === 'undefined') return _store
  // Create the store once in the client
  if (!store) store = _store

  return _store
}

export function useStore(state: typeof initialState): Store {
  const store = useMemo(() => makeStore(initialState), [state])
  return store
}
