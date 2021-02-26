import styled from "styled-components";
import * as mediaQueries from "styles/media-queries";

export const PageHeader = styled.section`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  margin-bottom: calc(4vw + 3rem);
  ${mediaQueries.medium} {
    margin-bottom: 4rem;
  }
`;

export const Filter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  width: 100%;
  ${mediaQueries.medium} {
    width: auto;
  }
`;

export const Title = styled.h2`
  display: none;
  line-height: 1;
  ${mediaQueries.medium} {
    display: inline-block;
  }
`;
