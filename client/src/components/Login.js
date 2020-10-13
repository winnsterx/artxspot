import React from "react";
import { Button, Layout, Row, Col } from "antd";
import { spotifyClientId, redirectUri } from "../config";

const { Footer, Content } = Layout;

function Login() {
  function requestAccess() {
    window.location.href =
      "https://accounts.spotify.com/authorize?client_id=" +
      spotifyClientId +
      "&scope=playlist-read-private%20playlist-read-collaborative%20playlist-modify-public%20user-read-recently-played%20playlist-modify-private%20ugc-image-upload%20user-follow-modify%20user-follow-read%20user-library-read%20user-library-modify%20user-read-private%20user-read-email%20user-top-read%20user-read-playback-state&response_type=token&redirect_uri=" +
      redirectUri;
  }

  return (
    <div className="page">
      <Layout>
        <Content>
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
                login to spotify
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
    </div>
  );
}

export default Login;
