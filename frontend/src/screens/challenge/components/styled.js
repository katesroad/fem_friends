import NameFilter from "components/Filter";
import { Content } from "components/lib";
import styled from "styled-components";
import * as mediaQueries from "styles/media-queries";

export const NameFilterAtHeader = styled(NameFilter)`
  display: none;
  box-shadow: none !important;
  font-size: 14px;
  input:focus {
    border-radius: 6px;
    border: 1px solid var(--shadow);
  }
  ${mediaQueries.small} {
    display: flex;
  }
`;

export const ChalengesWrap = styled(Content).attrs(() =>({as:'main'}))`
  ${mediaQueries.large} {
    display: grid;
    grid-template-columns: 4fr 2fr;
    grid-auto-rows: minmax(380px, auto);
    gap: 2.5rem;
    padding-bottom: 2rem;
  }
`;
