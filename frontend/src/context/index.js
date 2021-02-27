// eslint-disable-next-line
import styled from "styled-components/macro";
import GlobalStyles from "components/Globalstyles";
import Header from "components/header";
import { Content, ThemedElement } from "components/lib";
import * as React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter, Route, Switch } from "react-router-dom";

export default function AppProvider({ children }) {
  const client = new QueryClient();
  return (
    <QueryClientProvider client={client}>
      <GlobalStyles />
      <BrowserRouter>
        <Header />
        <Switch>
          <Content
            as="main"
            css={`
              padding-bottom: 10vh;
            `}
          >
            {children}
            <Route
              component={() => (
                <ThemedElement
                  css={`
                    padding: 2rem 0;
                    text-align: center;
                  `}
                >
                  <h2>Can't find this page.</h2>
                </ThemedElement>
              )}
              exact
            />
          </Content>
        </Switch>
      </BrowserRouter>
    </QueryClientProvider>
  );
}
