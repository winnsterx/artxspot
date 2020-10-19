import React from "react";
import styled from "styled-components/macro";
import { theme, mixins, Main } from "../styles";
import { spotifyClientId, redirectUri } from "../config";

const { colors, fontSizes } = theme;

const LOGIN_URI =
  "https://accounts.spotify.com/authorize?client_id=" +
  spotifyClientId +
  "&scope=playlist-read-private%20playlist-read-collaborative%20playlist-modify-public%20user-read-recently-played%20playlist-modify-private%20ugc-image-upload%20user-follow-modify%20user-follow-read%20user-library-read%20user-library-modify%20user-read-private%20user-read-email%20user-top-read%20user-read-playback-state&response_type=token&redirect_uri=" +
  redirectUri;

const Login = styled(Main)`
  ${mixins.flexCenter};
  flex-direction: column;
  min-height: 100vh;
  h1 {
    font-size: ${fontSizes.xxl};
  }
`;

const LoginButton = styled.a`
  display: inline-block;
  background-color: ${colors.green};
  color: ${colors.white};
  border-radius: 30px;
  padding: 17px 35px;
  margin: 20px 0 70px;
  min-width: 160px;
  font-weight: 700;
  letter-spacing: 2px;
  text-transform: uppercase;
  text-align: center;
  &:hover,
  &:focus {
    background-color: ${colors.offGreen};
  }
`;

const LoginScreen = () => (
  <Login>
    <h1>Artsy x Spotify</h1>
    <LoginButton href={LOGIN_URI}>Log in to Spotify</LoginButton>
  </Login>
);

export default LoginScreen;
