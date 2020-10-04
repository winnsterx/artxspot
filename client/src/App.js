import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Button, Layout, Row, Col } from "antd";
import { spotifyClientId, redirectUri } from "./config";

import "./App.less";

// Lightweight wrapper for Spotify Web API, see
// https://github.com/JMPerez/spotify-web-api-js/blob/master/src/spotify-web-api.js

import Playlists from "./components/Playlists";

// Declaring variables after importing everything
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

      setToken(hash.access_token);
    }
    console.log(
      "Token acquired correctly: ",
      token,
      " and window location: ",
      window.location.hash
    );
  }, [token]);

  function requestAccess() {
    console.log("Authorize request received.");
    console.log("Window href: ", window.location.href);
    window.location.href =
      "https://accounts.spotify.com/authorize?client_id=" +
      spotifyClientId +
      "&scope=playlist-read-private%20playlist-read-collaborative%20playlist-modify-public%20user-read-recently-played%20playlist-modify-private%20ugc-image-upload%20user-follow-modify%20user-follow-read%20user-library-read%20user-library-modify%20user-read-private%20user-read-email%20user-top-read%20user-read-playback-state&response_type=token&redirect_uri=" +
      redirectUri;
  }

  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/callback">
            <Layout>
              {console.log("Token inside Route: ", token)}
              <Playlists token={token} />
            </Layout>
          </Route>
          <Route path="/">
            {console.log("Routing to homepage")}
            <Layout>
              <Content>
                {/* The style minHeight is necessary to ensure the row takes up the whole page */}
                <Row
                  type="flex"
                  justify="center"
                  align="middle"
                  style={{ minHeight: "100%" }}
                >
                  <Col>
                    <Button
                      type="primary"
                      style={{
                        fontWeight: "bold",
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
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
