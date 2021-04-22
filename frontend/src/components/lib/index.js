import { Link } from "react-router-dom";
import * as mediaQueries from "styles/media-queries";
import styled, { css } from "styled-components";

export * from "./spinner";

const themeStyles = css`
  color: var(--text-color);
  background-color: var(--elements-background);
`;
const ThemedElement = styled.div`
  ${themeStyles}
`;
ThemedElement.displayName = "ThemedElement";

const NavLink = styled(Link)`
  text-decoration: none;
`;

const Content = styled.div`
  padding-left: 16px;
  padding-right: 16px;
  ${mediaQueries.medium} {
    padding-left: 32px;
    padding-right: 32px;
  }
  ${mediaQueries.large} {
    padding-left: 64px;
    padding-right: 64px;
  }
  ${mediaQueries.xlarge} {
    width: 88%;
    max-width: 1560px;
    padding-left: 0;
    padding-right: 0;
    margin-left: auto;
    margin-right: auto;
  }
`;
Content.displayName = "Content";

const OutLink = styled.a.attrs(() => ({
  target: "_blank",
  rel: "noreferrer",
}))`
  color: inherit;
`;

const Button = styled.button`
  ${themeStyles}
`;
Button.displayName = "Button";

const LinkButton = styled(Link)`
  ${themeStyles}
`;
LinkButton.displayName = "LinkButton";

export { NavLink, Content, OutLink, themeStyles, ThemedElement, Button };
