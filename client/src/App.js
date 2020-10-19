import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { GlobalStyle } from "./styles";

// import Login from "./components/Login";
import LoginScreen from "./components/LoginScreen";
// import "./App.less";

// Lightweight wrapper for Spotify Web API, see
// https://github.com/JMPerez/spotify-web-api-js/blob/master/src/spotify-web-api.js

import Playlists from "./components/Playlists";

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
    console.log("Token set:", token);
  }, [token]);

  return (
    <Router>
      <div className="App">
        <GlobalStyle />

        <Switch>
          <Route path="/callback">
            <Playlists token={token} />
          </Route>
          <Route path="/">
            <LoginScreen />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
