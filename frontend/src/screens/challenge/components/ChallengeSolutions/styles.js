import styled from "styled-components";
import "@reach/tooltip/styles.css";
import * as mediaQueries from "styles/media-queries";

const Avatar = styled.div`
  display: block;
  height: 36px;
  width: 36px;
  border-radius: 50%;
  background-position: center;
  background-size: 120% auto;
  background-repeat: no-repeat;
`;

const OutLink = styled.a.attrs(() => ({
  target: "_blank",
  rel: "noreferrer",
}))`
  color: inherit;
`;

const Author = styled(OutLink)`
  text-align: center;
  color: inherit;
`;
const SolutionLinks = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-left: 16px;
  & > a {
    font-size: 1.25rem;
    margin: 0 16px;
  }
`;

const SubmitedDate = styled.small`
  display: flex;
  align-items: center;
  & > svg {
    margin-right: 4px;
    font-size: 1.25rem;
  }
`;
const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const SolutionList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
`;

const SolutionTitle = styled.h2`
  margin: 4rem auto 2rem;
  ${mediaQueries.medium} {
    margin-top: 1rem;
  }
`;

const Button = styled.button`
  padding: 4px 16px;
  margin-left: 16px;
  border-radius: 4px;
  box-shadow: 0 3px 4px var(--shadow);
  background-color: var(--elements-background);
  &[disabled] {
    cursor: not-allowed;
    background-color: gray;
  }
`;

const Title = styled.h2`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  ${mediaQueries.medium} {
    button {
      display: none;
    }
  }
`;

const ButtonGroup = styled.p`
  display: none;
  text-align: right;
  ${mediaQueries.medium} {
    display: block;
    margin-bottom: 16px;
  }
`;

export {
  Avatar,
  OutLink,
  Wrapper,
  Author,
  SolutionLinks,
  SubmitedDate,
  SolutionList,
  SolutionTitle,
  Button,
  Title,
  ButtonGroup,
};
