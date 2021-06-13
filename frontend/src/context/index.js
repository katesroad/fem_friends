import GlobalStyles from 'components/Globalstyles'
import * as React from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom'

export default function AppProvider({ children }) {
  const client = new QueryClient()
  return (
    <QueryClientProvider client={client}>
      <GlobalStyles />
      <BrowserRouter>
        <Switch>
          {children}
          <Route component={() => <Redirect to="/" />} exact />
        </Switch>
      </BrowserRouter>
    </QueryClientProvider>
  )
}
