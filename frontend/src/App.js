import * as React from 'react'
import { Route } from 'react-router-dom'
import AppProvider from 'context/index'
import { Spinner } from 'components/lib'

const ChallengeScreen = React.lazy(() => import('screens/challenge/index'))
const HomeScreen = React.lazy(() => import('screens/home/index'))

export default function App() {
  return (
    <AppProvider>
      <React.Suspense fallback={<Spinner />}>
        <Route path="/" exact component={HomeScreen} />
        <Route path="/challenge/:femId" exact component={ChallengeScreen} />
      </React.Suspense>
    </AppProvider>
  )
}
