import React from 'react'

type AppState = {
  mode: string
}

const initialState: AppState = {
  mode: localStorage.getItem('mode')
    ? localStorage.getItem('mode')!
    : window.matchMedia &&
      window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light',
}

type Action = { type: 'SWITCH_MODE' }

function reducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case 'SWITCH_MODE':
      return { mode: state.mode === 'dark' ? 'light' : 'dark' }
    default:
      return state
  }
}

const defaultDispatch: React.Dispatch<Action> = () => initialState

const Store = React.createContext({
  state: initialState,
  dispatch: defaultDispatch,
})

function StoreProvider(props: React.PropsWithChildren<{}>) {
  const [state, dispatch] = React.useReducer<React.Reducer<AppState, Action>>(
    reducer,
    initialState
  )

  return <Store.Provider value={{ state, dispatch }} {...props} />
}

export { Store, StoreProvider }
