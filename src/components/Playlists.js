import React, { useState, useEffect } from "react";
import { Button, Select } from "antd";

import SpotifyWebApi from "spotify-web-api-js";

const spotifyApi = new SpotifyWebApi();
const { Option } = Select;

function Playlists({ token }) {
  const [playlists, setPlaylists] = useState({});

  useEffect(() => {
    console.log("Playlists: ", playlists);
  });

  function getPlaylists() {
    spotifyApi.setAccessToken(token);
    const tmp = spotifyApi
      .getUserPlaylists()
      .then((response) => {
        console.log(response);
        return response;
      })
      .catch((error) => console.log(error));
    // PROBLEM: IT IS NOT RETURNING THE PROMISED ITEM
    // STACKOVERFLOW: RETURN FROM PROMISE THEN AXIOS
    console.log("tmp: ", Promise.resolve(tmp));
    setPlaylists(tmp);
  }

  function selectPlaylist(playlist) {
    console.log(playlist);
  }

  return (
    <div>
      Select Playlist:
      <Select
        showSearch
        placeholder="Select a Playlist"
        onChange={selectPlaylist}
        style={{ width: 200 }}
      >
        <Option value="number 1">Playlist 1</Option>
      </Select>
      <Button onClick={getPlaylists}>getplaylists</Button>
    </div>
  );
}

export default Playlists;
