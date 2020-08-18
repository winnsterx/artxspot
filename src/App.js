import React, { useState, useEffect } from "react";
// import axios from "axios";

import { Button } from "antd";

import "./App.css";

// The ReactDOM is rendering <App/> in index.js

function App() {
  const [login, setLogin] = useState(false);
  const [token, setToken] = useState("");
  const [auth, setAuth] = useState(false);

  // const client_id = "29e77da78fb34f17bbc5f5bab141a50d"; // Your client id
  // const client_secret = "164c8c38eba044e49c570a06e8372192"; // Your secret
  // const redirect_uri = "http://localhost:3000/callback"; // Your redirect uri

  useEffect(() => {
    if (token === "" && window.location.hash != "") {
      console.log("Fetching the token now that we are logged in");
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
  }, [token, login]);

  function requestAccess() {
    console.log("Authorize request received.");
    window.location.href =
      "https://accounts.spotify.com/authorize?client_id=29e77da78fb34f17bbc5f5bab141a50d&scope=playlist-read-private%20playlist-read-collaborative%20playlist-modify-public%20user-read-recently-played%20playlist-modify-private%20ugc-image-upload%20user-follow-modify%20user-follow-read%20user-library-read%20user-library-modify%20user-read-private%20user-read-email%20user-top-read%20user-read-playback-state&response_type=token&redirect_uri=http://localhost:3000/callback";
  }

  return (
    <div className="App">
      {window.location.hash || token ? (
        <Button>Authorized with the Access Token</Button>
      ) : (
        <Button type="primary" onClick={requestAccess}>
          Grant Spotify Permission
        </Button>
      )}
    </div>
  );
}

export default App;
