import { Provider } from 'react-redux'
import { RouterProvider } from 'react-router-dom'
import { QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { store } from './store/store'
import { queryClient } from './lib/queryClient'
import { router } from './router'
import { injectStoreForHttpClient } from './lib/httpClient'

// Give the HTTP client access to the Redux store so it can sync
// credentials after a token refresh and dispatch clearCredentials
// when the session expires.
injectStoreForHttpClient(store)

function App() {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </Provider>
  )
}

export default App
