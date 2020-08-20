import React, { useState, useEffect } from "react";
import { Button, Card, Row, Col } from "antd";

import SpotifyWebApi from "spotify-web-api-js";

const spotifyApi = new SpotifyWebApi();

function Playlists({ token }) {
  const [playlists, setPlaylists] = useState({});
  const gridStyle = {
    width: "25%",
    textAlign: "center",
  };

  useEffect(() => {
    if (!Object.keys(playlists).length) {
      getPlaylists();
    }
    console.log("Playlists: ", playlists);
    console.log("playlists length: ", Object.keys(playlists).length);
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

  function selectPlaylist(playlist) {
    console.log("Playlist selected: ", playlist);
    spotifyApi
      .getPlaylistTracks(playlist.id)
      .then((response) => console.log("tracks: ", response))
      .catch((error) => console.log(error));
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
      Select Playlist:
      <Row gutter={16}> {buildPlaylists()}</Row>
    </div>
  );
}

export default Playlists;
