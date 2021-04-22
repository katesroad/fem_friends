// eslint-disable-next-line
import styled from "styled-components/macro";
import { Link } from "react-router-dom";

const ChallengeName = styled.h3`
  margin-top: 0.5rem;
  margin-bottom: 1.25rem;
  font-weight: var(--weight-bolder);
`;

const InfoItem = styled.p`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  margin-bottom: 1rem;
  font-size: 0.9rem;
  &.is-spreaded {
    justify-content: space-between;
  }
`;

const InfoItemName = styled.strong`
  margin-right: 0.4rem;
  font-weight: var(--weight-bolder);
  text-transform: capitalize;
  &::nth-child(2) {
    margin-left: 0.4rem;
  }
`;

const ChallengeIntro = styled.div`
  padding: 1rem 1.5rem;
`;

export const Wrapper = styled(Link)`
  display: block;
  height: 100%;
  color: var(--text-color);
  background-color: var(--elements-background);
  overflow: hidden;
  border-radius: 0.5rem;
  box-shadow: 0 3px 4px var(--shadow);
`;

export { ChallengeName, InfoItem, InfoItemName, ChallengeIntro };
