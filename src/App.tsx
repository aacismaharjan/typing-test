import React from "react";
import styled from "styled-components";
import { Route, Switch } from "react-router";
import StartTyping from "./pages/StartTyping";
import GameStats from "./pages/GameStats";
import GeneralSetting from "./pages/GeneralSetting";
import CustomTyping from "./pages/CustomTyping";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App() {
  return (
    <StyledApp>
      <Switch>
        <Route exact path="/" component={StartTyping} />
        <Route exact path="/start-typing" component={StartTyping} />
        <Route exact path="/custom-typing" component={CustomTyping} />
        <Route exact path="/game-stats" component={GameStats} />
        <Route exact path="/settings" component={GeneralSetting} />
      </Switch>
    </StyledApp>
  );
}

const StyledApp = styled.div`
  min-height: 100vh;
  background: rgba(52, 58, 64, 0.94);
`;

export default App;
