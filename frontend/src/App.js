import * as React from "react";
import { Route } from "react-router-dom";
import AppProvider from "context/index";
import HomeScreen from "screens/home/index";
import ChallengeScreen from "screens/challenge/index";

export default function App() {
  return (
    <AppProvider>
      <Route path="/" component={HomeScreen} exact />
      <Route path="/challenge/:femId" component={ChallengeScreen} exact />
    </AppProvider>
  );
}
