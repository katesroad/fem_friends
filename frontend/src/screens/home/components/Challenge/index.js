// eslint-disable-next-line
import styled from "styled-components/macro";
import * as React from "react";
import { Link } from "react-router-dom";
import {
  ChallengeName,
  InfoItem,
  InfoItemName,
  ChallengeIntro,
} from "./styles";

export default function Challenge({ ...challenge }) {
  return (
    <Link
      to={`/challenge/${challenge.id}`}
      css={`
        display: block;
        height: 100%;
        color: var(--text-color);
        background-color: var(--elements-background);
        overflow: hidden;
        border-radius: 0.5rem;
        box-shadow: 0 3px 4px var(--shadow);
      `}
    >
      <img src={challenge.heroImage} alt={challenge.title} />
      <ChallengeIntro>
        <ChallengeName>{challenge.title}</ChallengeName>
        <InfoItem>
          <InfoItemName>Languages:</InfoItemName>
          {challenge.languages.join(",")}
        </InfoItem>
        <InfoItem
          css={`
            display: flex;
            justify-content: space-between;
            align-items: center;
          `}
        >
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
    </Link>
  );
}
