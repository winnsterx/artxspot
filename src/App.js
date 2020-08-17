import React, { useState, useEffect } from "react";
// import axios from "axios";

import { Button } from "antd";

import "./App.css";

// The ReactDOM is rendering <App/> in index.js

function App() {
  var [login, setLogin] = useState(false);
  var [token, setToken] = useState("");

  // var client_id = "29e77da78fb34f17bbc5f5bab141a50d"; // Your client id
  // var client_secret = "164c8c38eba044e49c570a06e8372192"; // Your secret
  // var redirect_uri = "http://localhost:3000/callback"; // Your redirect uri

  useEffect(() => {
    if (token === "" && login === true) {
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
      console.log("Hash is obtained: " + hash.access_token);
      setToken(hash.access_token);
    }
    console.log("Logged in: ", login);
    console.log("Token: ", token);
  }, [token, login]);

  function requestAccess() {
    console.log("requested access");
    if (!login) {
      window.location.href =
        "https://accounts.spotify.com/authorize?client_id=29e77da78fb34f17bbc5f5bab141a50d&scope=playlist-read-private%20playlist-read-collaborative%20playlist-modify-public%20user-read-recently-played%20playlist-modify-private%20ugc-image-upload%20user-follow-modify%20user-follow-read%20user-library-read%20user-library-modify%20user-read-private%20user-read-email%20user-top-read%20user-read-playback-state&response_type=token&redirect_uri=http://localhost:3000/callback";

      setLogin(true);
    }
  }

  return (
    <div className="App">
      <Button type="primary" onClick={requestAccess}>
        Grant Spotify Permission
      </Button>
      {if (window.location.hash is what we want) {
        retrieve the access_token
      }}
    </div>
  );
}

export default App;
