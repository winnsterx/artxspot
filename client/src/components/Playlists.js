import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Loader from "./Loader";

import styled from "styled-components/macro";
import { theme, mixins, media, Main } from "../styles";
import SpotifyWebApi from "spotify-web-api-js";
import Generator from "./Generator";

const spotifyApi = new SpotifyWebApi();
const { colors, fontSizes, spacing } = theme;

const Wrapper = styled.div`
  ${mixins.flexBetween};
  align-items: flex-start;
`;
const PlaylistsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  grid-gap: ${spacing.md};
  width: 100%;
  margin-top: 50px;
  ${media.tablet`
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  `};
  ${media.phablet`
    grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  `};
`;
const Playlist = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
`;
const PlaylistMask = styled.div`
  ${mixins.flexCenter};
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  font-size: 30px;
  color: ${colors.white};
  opacity: 0;
  transition: ${theme.transition};
`;
const PlaylistImage = styled.img`
  object-fit: cover;
`;
const PlaylistCover = styled(Link)`
  ${mixins.coverShadow};
  position: relative;
  width: 100%;
  margin-bottom: ${spacing.base};
  &:hover,
  &:focus {
    ${PlaylistMask} {
      opacity: 1;
    }
  }
`;
const PlaceholderArtwork = styled.div`
  ${mixins.flexCenter};
  position: relative;
  width: 100%;
  padding-bottom: 100%;
  background-color: ${colors.darkGrey};
  svg {
    width: 50px;
    height: 50px;
  }
`;
const PlaceholderContent = styled.div`
  ${mixins.flexCenter};
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
`;
const PlaylistName = styled(Link)`
  display: inline;
  border-bottom: 1px solid transparent;
  &:hover,
  &:focus {
    border-bottom: 1px solid ${colors.white};
  }
`;
const TotalTracks = styled.div`
  text-transform: uppercase;
  margin: 5px 0;
  color: ${colors.lightGrey};
  font-size: ${fontSizes.xs};
  letter-spacing: 1px;
`;

function Playlists({ token }) {
  const [playlists, setPlaylists] = useState([]);
  const [tracks, setTracks] = useState([]);
  const [redoPlaylist, setRedoPlaylist] = useState(false);

  useEffect(() => {
    if (!Object.keys(playlists).length) {
      getPlaylists();
    }
    console.log("Playlists fetched: ", playlists);
    console.log("Type of Playlists: ", typeof playlists);
    console.log("Tracks: ", tracks);
  });

  async function getPlaylists() {
    spotifyApi.setAccessToken(token);
    let pls = await getPlaylistsHelper();
    if (pls) {
      console.log("pls: ", pls);
      setPlaylists(pls.items);
    } else {
      console.log("Error in fetching playlists. Check request in Spotify API.");
    }
  }

  async function getPlaylistsHelper() {
    try {
      return await spotifyApi.getUserPlaylists({ limit: "48" });
    } catch (error) {
      return null;
    }
  }

  async function selectPlaylist(id) {
    console.log("Select playlist with id: ", id);
    let tks = await getPlaylistTracks(id);
    if (tks) {
      setTracks(tks);
      setRedoPlaylist(false);
    }
  }

  async function getPlaylistTracks(id) {
    console.log("Trying to get tracks for ", id);
    try {
      return await spotifyApi.getPlaylistTracks(id);
    } catch (error) {
      console.log("Error in fetching tracks: ", error);
      return null;
    }
  }

  return (
    <div>
      {tracks.length === 0 || (tracks.length !== 0 && redoPlaylist) ? (
        <Main>
          <h2>Your Playlists</h2>
          <Wrapper>
            <PlaylistsContainer>
              {playlists.length ? (
                playlists.map(({ id, images, name, tracks }, i) => (
                  <Playlist key={i} onClick={() => selectPlaylist(id)}>
                    <PlaylistCover>
                      <PlaylistImage src={images[0].url} alt="Album Art" />
                    </PlaylistCover>
                    <div>
                      <PlaylistName>{name}</PlaylistName>
                      <TotalTracks>{tracks.total} Tracks</TotalTracks>
                    </div>
                  </Playlist>
                ))
              ) : (
                <Loader />
              )}
            </PlaylistsContainer>
          </Wrapper>
        </Main>
      ) : (
        <Generator tracks={tracks} setRedoPlaylist={setRedoPlaylist} />
      )}
    </div>
  );
}

export default Playlists;
