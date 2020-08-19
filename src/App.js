import React, { useState, useEffect } from "react";
import { clientId, redirectUri } from "./config";

// import axios from "axios";
import { Button, Layout, Row, Col } from "antd";
import "./App.less";

// Lightweight wrapper for Spotify Web API, see
// https://github.com/JMPerez/spotify-web-api-js/blob/master/src/spotify-web-api.js
import SpotifyWebApi from "spotify-web-api-js";

// Declaring variables after importing everything
const spotifyApi = new SpotifyWebApi();
const { Footer, Content } = Layout;

// The ReactDOM is rendering <App/> in index.js

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
      spotifyApi.setAccessToken(hash.access_token);
      setToken(hash.access_token);
    }
  }, [token]);

  function requestAccess() {
    console.log("Authorize request received.");
    window.location.href =
      "https://accounts.spotify.com/authorize?client_id=" +
      clientId +
      "&scope=playlist-read-private%20playlist-read-collaborative%20playlist-modify-public%20user-read-recently-played%20playlist-modify-private%20ugc-image-upload%20user-follow-modify%20user-follow-read%20user-library-read%20user-library-modify%20user-read-private%20user-read-email%20user-top-read%20user-read-playback-state&response_type=token&redirect_uri=" +
      redirectUri;
  }

  function getPlaylists() {
    const playlists = spotifyApi
      .getUserPlaylists()
      .then((response) => {
        console.log(response);
      })
      .catch((error) => console.log(error));

    return playlists;
  }

  return (
    <div className="App">
      {window.location.hash || token ? (
        <Button onClick={getPlaylists}>Authorized with the Access Token</Button>
      ) : (
        <Layout>
          <Content>
            {/* The style minHeight is necessary to ensure the row takes up the whole page */}
            <Row
              type="flex"
              justify="center"
              align="middle"
              style={{ minHeight: "90vh" }}
            >
              <Col>
                <Button
                  type="primary"
                  style={{
                    fontWeight: "bold",
                    // padding: "10px 50px",
                  }}
                  size="large"
                  onClick={requestAccess}
                >
                  LOG IN WITH SPOTIFY
                </Button>
              </Col>
            </Row>
          </Content>
          <Footer
            style={{
              textAlign: "right",
              backgroundColor: "#1DA57A",
              fontWeight: "bold",
              color: "white",
            }}
          >
            For funzies, by @winnayx (2020)
          </Footer>
        </Layout>
      )}
    </div>
  );
}

export default App;
