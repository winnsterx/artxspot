import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import "./App.less";

// Lightweight wrapper for Spotify Web API, see
// https://github.com/JMPerez/spotify-web-api-js/blob/master/src/spotify-web-api.js

import Login from "./components/Login";
import Playlists from "./components/Playlists";
import Generator from "./components/Generator";

// Declaring variables after importing everything
// The ReactDOM is rendering <App/> in index.js

function App() {
  const [token, setToken] = useState("");
  const [tracks, setTracks] = useState([]);

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
        {/* <Switch>
          <Route path="/callback">
            {token ? <Redirect to="/playlists" /> : <Login />}
          </Route>
          <Route path="/playlists">
            <Playlists token={token} tracks={tracks} setTracks={setTracks} />
          </Route>
          <Route path="/artwork">
            <Generator tracks={tracks} redoPlaylist={} />
          </Route>
          <Route exact path="/">
            <Login />
          </Route>
        </Switch> */}
      </div>
    </Router>
  );
}

export default App;
