// eslint-disable-next-line
import { OutLink } from 'components/lib'
import styled from 'styled-components/macro'
import * as mediaQueries from 'styles/media-queries'

const ChallengeName = styled.h2`
  margin-top: 0.5rem;
  margin-bottom: 1.25rem;
  font-weight: var(--weight-bolder);
`

const InfoItem = styled.p`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  margin-bottom: 1rem;
  font-size: 0.9rem;
  &.is-spreaded {
    justify-content: space-between;
  }
`

const InfoItemName = styled.strong`
  margin-right: 0.4rem;
  font-weight: var(--weight-bolder);
  text-transform: capitalize;
  &::nth-child(2) {
    margin-left: 0.4rem;
  }
`

const ChallengeIntro = styled.div`
  padding: 1rem 1.5rem;
`

const Wrapper = styled(OutLink)`
  display: block;
  width: 100%;
  border-radius: 0.5rem;
  margin-bottom: 2rem;
  box-shadow: 0 3px 4px var(--shadow);
  color: var(--text-color);
  background-color: var(--elements-background);
  overflow: hidden;
  ${mediaQueries.small} {
    display: flex;
    align-items: center;
    justify-content: space-between;
    img {
      max-width: 50%;
    }
  }
  &.content-centered {
    justify-content: center;
  }
`

const ChallengeImg = styled.div`
  padding-bottom: 40%;
  width: 100%;
  background-position: center;
  background-size: 120% auto;
  background-repeat: no-repeat;
  ${mediaQueries.medium} {
    padding-bottom: 0;
    height: 377px;
    background-size: 100%;
  }
`

export {
  ChallengeName,
  InfoItem,
  InfoItemName,
  ChallengeIntro,
  Wrapper,
  ChallengeImg,
}
