import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Layout } from "antd";

import Login from "./components/Login";

import "./App.less";

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
    console.log(
      "Token acquired correctly: ",
      token,
      " and window location: ",
      window.location.hash
    );
  }, [token]);

  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/callback">
            <Layout>
              <Playlists token={token} />
            </Layout>
          </Route>
          <Route path="/">
            <Login />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
