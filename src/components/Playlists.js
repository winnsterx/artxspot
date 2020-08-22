import React, { useState, useEffect } from "react";
import { Card, Row, Col } from "antd";
import Playlist from "./Playlist";

import SpotifyWebApi from "spotify-web-api-js";

const spotifyApi = new SpotifyWebApi();

function Playlists({ token }) {
  const [playlists, setPlaylists] = useState({});
  const [tracks, setTracks] = useState([]);

  useEffect(() => {
    if (!Object.keys(playlists).length) {
      getPlaylists();
    }
    console.log("Playlists: ", playlists);
    console.log("playlists length: ", Object.keys(playlists).length);
    console.log("tracks: ", tracks);
  });

  async function getPlaylists() {
    spotifyApi.setAccessToken(token);
    let pls = await getPlaylistsHelper();
    if (pls) {
      setPlaylists(pls.items);
    } else {
      console.log("Error in fetching playlists. Check request in Spotify API.");
    }
  }

  async function getPlaylistsHelper() {
    try {
      return await spotifyApi.getUserPlaylists();
    } catch (error) {
      return null;
    }
  }

  async function selectPlaylist(playlist) {
    console.log("Playlist ID: ", playlist);
    let tracks = await getPlaylistTracks(playlist.id);
    if (tracks) {
      setTracks(tracks);
    } else {
      console.log(
        "Error in fetching playlist's tracks. Check request in Spotify API."
      );
    }
  }

  async function getPlaylistTracks(id) {
    try {
      return await spotifyApi.getPlaylistTracks(id);
    } catch (error) {
      return null;
    }
  }

  function buildPlaylists() {
    let arr = [];
    for (let i = 0; i < playlists.length; i++) {
      let curr = playlists[i];
      arr.push(
        <Col span={8}>
          <div onClick={() => selectPlaylist(curr)}>
            <Card
              size="small"
              title={curr.name}
              hoverable
              cover={<img alt="example" src={curr.images[0].url} />}
            ></Card>
          </div>
        </Col>
      );
    }
    return arr;
  }

  return (
    <div>
      {/* {tracks.length === 0 ? (
        <Row gutter={16}> {buildPlaylists()}</Row>
      ) : (
        <Playlist />
      )} */}
      <Playlist />
    </div>
  );
}

export default Playlists;
