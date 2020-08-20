import React, { useState, useEffect } from "react";
import { Input } from "antd";
import SpotifyWebApi from "spotify-web-api-js";

const spotifyApi = new SpotifyWebApi();

function Playlist() {
  function generateTag(e) {
    e.preventDefault();
    console.log(e);
  }
  return (
    <div>
      <Input
        size="large"
        placeholder="Input five words that you think describe this playlist"
        onPressEnter={(e) => generateTag(e)}
      />
    </div>
  );
}

export default Playlist;
