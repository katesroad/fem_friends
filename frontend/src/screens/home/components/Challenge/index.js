import * as React from "react";
import {
  ChallengeName,
  InfoItem,
  InfoItemName,
  ChallengeIntro,
  Wrapper,
} from "./styles";

export default function Challenge({ ...challenge }) {
  return (
    <Wrapper to={`/challenge/${challenge.id}`}>
      <img src={challenge.heroImage} alt={challenge.title} />
      <ChallengeIntro>
        <ChallengeName>{challenge.title}</ChallengeName>
        <InfoItem>
          <InfoItemName>Languages:</InfoItemName>
          {challenge.languages.join(",")}
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
  );
}
