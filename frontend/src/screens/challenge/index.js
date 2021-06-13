import * as React from 'react'
import { useHistory, useParams } from 'react-router-dom'
import AppHeader from 'components/header'
import { useChallenge } from 'hooks/challenges-hooks'
import { Spinner } from 'components/lib'
import ChallengeInfo from './components/ChallengeInfo'
import ChallengeSolutions from './components/ChallengeSolutions'
import { NameFilterAtHeader, ChalengesWrap } from './components/styled'

export default function ChallengeScreen() {
  const history = useHistory()
  const { femId } = useParams()
  const { data: challenge, status, error } = useChallenge(femId)
  const [total, setTotal] = React.useState(0)
  React.useEffect(() => {
    if (challenge) {
      setTotal(challenge.solutions)
    }
  }, [challenge])
  const onSearch = (challengeName) => {
    history.push({
      search: `search=${encodeURIComponent(challengeName)}`,
      pathname: '/',
    })
  }
  return (
    <>
      <AppHeader>
        <NameFilterAtHeader onSearch={onSearch} />
      </AppHeader>
      <ChalengesWrap>
        {status === 'loading' ? <Spinner /> : null}
        {status === 'failed' ? <p>{JSON.stringify(error)}</p> : null}
        {status === 'success' ? <ChallengeInfo challenge={challenge} /> : null}
        <ChallengeSolutions femId={femId} total={total} />
      </ChalengesWrap>
    </>
  )
}
