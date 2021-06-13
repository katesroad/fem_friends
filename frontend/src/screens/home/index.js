import { matchSorter } from 'match-sorter'
import { useQueryClient } from 'react-query'
import * as qs from 'query-string'
import * as React from 'react'
import { FullscreenSpinner } from 'components/lib'
import AppHeader from 'components/header'
import { useChallenges } from 'hooks/challenges-hooks'
import NameFilter from 'components/Filter'
import { useHistory, useLocation } from 'react-router-dom'
import { ChallengesWrap, PageContent } from './components/styled'
import Challenge from './components/Challenge'

export default function HomeScreen() {
  const location = useLocation()
  const history = useHistory()
  const [search, setSearch] = React.useState(() => {
    try {
      return qs.parse(location.search).search
    } catch (e) {
      return ''
    }
  })
  const { status, error, data } = useChallenges()
  const onSearch = (search) => setSearch(search)
  const [challenges, setChallenges] = React.useState([])

  const queryClient = useQueryClient()
  React.useEffect(() => {
    const cacheData = queryClient.getQueryData('challenges') || []
    let result = cacheData
    if (search) {
      result = matchSorter(cacheData || [], search, { keys: ['title'] })
    } else {
      result = cacheData
    }
    setChallenges(result)
    // update query string in brower URL bar
    const params = { pathname: '/' }
    if (search) {
      params.search = `search=${encodeURIComponent(search)}`
    }
    history.replace(params)
  }, [data, search])

  if (['idle', 'loading'].includes(status)) {
    return <FullscreenSpinner />
  }

  if (status === 'error') return <p>{JSON.stringify(error)}</p>

  return (
    <>
      <AppHeader />
      <PageContent>
        <div className="page-header">
          <h2>FEM challenges</h2>
          <div className="filte-wrap">
            <NameFilter name={search} onSearch={onSearch} />
          </div>
        </div>
        <ChallengesWrap>
          {challenges.length ? (
            challenges.map((challenge) => (
              <li key={challenge.id}>
                <Challenge {...challenge} />
              </li>
            ))
          ) : (
            <p>No data with given challenge name {search}</p>
          )}
        </ChallengesWrap>
      </PageContent>
    </>
  )
}
