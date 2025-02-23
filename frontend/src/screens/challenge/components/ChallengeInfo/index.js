// eslint-disable-next-line
import styled from 'styled-components/macro'
import * as React from 'react'
import {
  ChallengeName,
  InfoItem,
  InfoItemName,
  ChallengeIntro,
  Wrapper,
  ChallengeImg,
} from './styles'

export default function Challenge({ challenge }) {
  if (!challenge)
    return (
      <Wrapper className="content-centered">
        <h2>Challenge does not exist </h2>
      </Wrapper>
    )
  return (
    <Wrapper
      href={`https://www.frontendmentor.io/challenges/${challenge.slug}`}
    >
      <ChallengeImg
        css={`
          background-image: url(${challenge.heroImage});
        `}
      />
      <ChallengeIntro>
        <ChallengeName>{challenge.title}</ChallengeName>
        <InfoItem>
          <InfoItemName>Languages:</InfoItemName>
          {challenge.languages.join(',')}
        </InfoItem>
        <InfoItem className="is-spreaded">
          <span>
            <InfoItemName>Difficulty:</InfoItemName>
            {challenge.difficulty}
          </span>
          <span>
            <InfoItemName>Solutions:</InfoItemName>
            {challenge.solutions}
          </span>
        </InfoItem>
      </ChallengeIntro>
    </Wrapper>
  )
}
