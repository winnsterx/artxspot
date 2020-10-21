import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import LoginScreen from "./components/LoginScreen";
import Playlists from "./components/Playlists";
import { GlobalStyle } from "./styles";

function App() {
  const [token, setToken] = useState("");

  useEffect(() => {
    if (token === "" && window.location.hash !== "") {
      const hash = window.location.hash
        .substring(1)
        .split("&")
        .reduce(function (initial, item) {
          if (item) {
            var parts = item.split("=");
            initial[parts[0]] = decodeURIComponent(parts[1]);
          }
          return initial;
        }, {});

      setToken(hash.access_token);
    }
  }, [token]);

  return (
    <Router>
      <div className="App">
        <GlobalStyle />

        <Switch>
          <Route path="/callback">
            <Playlists token={token} />
          </Route>
          <Route exact path="/">
            <LoginScreen />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
