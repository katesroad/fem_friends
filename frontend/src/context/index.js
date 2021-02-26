// eslint-disable-next-line
import GlobalStyles from "components/Globalstyles";
import Header from "components/header";
import { Content } from "components/lib";
import * as React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";

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
            <Route path="*" component={() => <Redirect to="/" />} />
          </Content>
        </Switch>
      </BrowserRouter>
    </QueryClientProvider>
  );
}
