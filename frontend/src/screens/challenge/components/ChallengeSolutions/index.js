// eslint-disable-next-line
import styled from 'styled-components/macro'
import * as React from 'react'
import { useChallengeSolutions } from 'hooks/challenges-hooks'
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa'
import { FiCodesandbox } from 'react-icons/fi'
import { DiCodepen } from 'react-icons/di'
import { GrFormPrevious, GrFormNext } from 'react-icons/gr'
import Tooltip from '@reach/tooltip'
import { OutLink, Spinner } from 'components/lib'
import {
  Avatar,
  Wrapper,
  Author,
  SolutionLinks,
  SubmitedDate,
  Button,
  Title,
  ButtonGroup,
} from './styles'

function Solution({ author, updatedAt, repoURL, liveURL, total }) {
  let icon
  if (repoURL.indexOf('github') > -1) icon = <FaGithub />
  else if (repoURL.indexOf('condesanbox') > -1) icon = <FiCodesandbox />
  else if (repoURL.indexOf('') > -1) icon = <DiCodepen />
  else icon = <FaGithub />
  return (
    <Wrapper>
      <Tooltip label={author.username}>
        <Author
          href={`https://www.frontendmentor.io/profile/${author.username}`}
        >
          <Avatar
            css={`
              background-image: url(${author.avatar});
            `}
          />
        </Author>
      </Tooltip>
      <SolutionLinks>
        <Tooltip label="view code">
          <OutLink href={repoURL}>{icon}</OutLink>
        </Tooltip>
        <Tooltip label="view site">
          <OutLink href={liveURL}>
            <FaExternalLinkAlt />
          </OutLink>
        </Tooltip>
      </SolutionLinks>
      <Tooltip label="Submitted Date">
        <SubmitedDate>{new Date(updatedAt).toLocaleDateString()}</SubmitedDate>
      </Tooltip>
    </Wrapper>
  )
}

const PAGE_SIZE = 5
export default function ChallengeSolutions({ femId, total }) {
  const [atPage, setAtPage] = React.useState(0)
  const [canNext, setCanNext] = React.useState(() => {
    if (total && total <= PAGE_SIZE) return false
    else return true
  })
  const {
    data: solutions,
    status,
    error,
  } = useChallengeSolutions(femId, atPage * PAGE_SIZE)

  React.useEffect(() => {
    if (solutions && solutions.length < PAGE_SIZE) {
      setCanNext(false)
    } else {
      setCanNext(true)
    }
  }, [solutions])

  const handleClickNext = (e) => {
    if (canNext) {
      setAtPage((atPage) => atPage + 1)
    }
    return false
  }
  const handleClickPrev = (e) => {
    if (atPage >= 1) {
      setAtPage((atPage) => atPage - 1)
    }
  }

  const title = (
    <Title>
      Solutions
      {total > 5 ? (
        <span>
          <Button
            disabled={atPage === 0 ? 'disabled' : false}
            onClick={handleClickPrev}
          >
            <GrFormPrevious />
          </Button>
          <Button
            disabled={canNext ? false : 'disabled'}
            onClick={handleClickNext}
          >
            <GrFormNext />
          </Button>
        </span>
      ) : null}
    </Title>
  )

  // not success, the status can either be failed or loading
  if (status !== 'success') {
    return (
      <div>
        {title}
        {status === 'loading' ? <Spinner /> : <p>{JSON.stringify(error)}</p>}
      </div>
    )
  }

  return (
    <div>
      {title}
      {total > 5 ? (
        <ButtonGroup>
          <span>
            <Button
              disabled={atPage === 0 ? 'disabled' : false}
              onClick={handleClickPrev}
            >
              <GrFormPrevious />
            </Button>
            <Button
              disabled={canNext ? false : 'disabled'}
              onClick={handleClickNext}
            >
              <GrFormNext />
            </Button>
          </span>
        </ButtonGroup>
      ) : null}
      {solutions.length === 0 ? (
        <p>No data</p>
      ) : (
        <ul
          css={`
            display: flex;
            flex-wrap: wrap;
            width: 100%;
          `}
        >
          {solutions.map((solution) => (
            <li
              key={solution.id}
              css={`
                display: flex;
                width: 100%;
                padding: 0.5rem 1rem;
                border-radius: 0.5rem;
                margin-bottom: 0.5rem;
                box-shadow: 0 3px 4px var(--shadow);
                color: var(--text-color);
                background-color: var(--elements-background);
                overflow: hidden;
              `}
            >
              <Solution {...solution} key={solution.id} />
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
