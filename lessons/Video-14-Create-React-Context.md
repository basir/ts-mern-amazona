# Video-14-Create-React-Context

1. Store.ts

   ```js

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
      type Action =  { type: 'SWITCH_MODE' }


      function reducer(state: AppState, action: Action): AppState {
        switch (action.type) {
          case 'SWITCH_MODE':
            return { ...state, mode: state.mode === 'dark' ? 'light' : 'dark' }

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

   ```

2. main.ts

   ```js
   <StoreProvider>
     <RouterProvider router={router} />
     ...
   </StoreProvider>
   ```

3. App.tsx

   ```js
   useEffect(() => {
     document.body.setAttribute('data-bs-theme', mode)
   }, [mode])
   const switchModeHandler = () => {
     ctxDispatch({ type: 'SWITCH_MODE' })
   }
   ...
   <Button variant={mode} onClick={switchModeHandler}>
                  <i
                    className={mode === 'light' ? 'fa fa-sun' : 'fa fa-moon'}
                  ></i>
                </Button>
   ```

4. Use bootstrap 5.3 or above
