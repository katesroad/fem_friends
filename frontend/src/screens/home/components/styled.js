import styled from 'styled-components'
import { Content } from 'components/lib'
import * as mediaQueries from 'styles/media-queries'

export const ChallengesWrap = styled.ul`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  grid-auto-rows: minmax(380px, auto);
  gap: 2.5rem;
  padding-bottom: 2rem;
`

export const PageContent = styled(Content).attrs(() => ({ as: 'main' }))`
  padding-bottom: 10vh;

  .page-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    margin-bottom: calc(4vw + 3rem);
    ${mediaQueries.medium} {
      margin-bottom: 4rem;
    }
    h2 {
      display: none;
      line-height: 1;
      ${mediaQueries.medium} {
        display: inline-block;
      }
    }
    .filter-wrap {
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      width: 100%;
      ${mediaQueries.medium} {
        width: auto;
      }
    }
  }
`
