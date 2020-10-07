import React, { useState, useEffect } from "react";
import { Card, Row, Col } from "antd";
import { Redirect } from "react-router-dom";

import SpotifyWebApi from "spotify-web-api-js";
// import Generator from "./Generator";

const spotifyApi = new SpotifyWebApi();
const { Meta } = Card;

function Playlists({ token, tracks, setTracks }) {
  const [playlists, setPlaylists] = useState({});

  useEffect(() => {
    if (!Object.keys(playlists).length) {
      getPlaylists();
    }
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
      console.log(error);
      return null;
    }
  }

  async function selectPlaylist(playlist) {
    console.log("Select playlist: ", playlist);
    let tracks = await getPlaylistTracks(playlist.id);
    if (tracks) {
      console.log("tracks: ", tracks);
      setTracks(tracks);
    }
  }

  async function getPlaylistTracks(id) {
    try {
      return await spotifyApi.getPlaylistTracks(id);
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  function buildPlaylistsRow(currRow) {
    console.log("Building playlist row.");
    let arr = [];
    let end = Math.min(currRow * 3 + 3, playlists.length);
    arr.push(<Col span={2} />);
    for (let j = currRow * 3; j < end; j++) {
      let curr = playlists[j];
      if (j === currRow * 3 + 1) arr.push(<Col span={1} />);
      arr.push(
        <Col span={6}>
          <div onClick={() => selectPlaylist(curr)}>
            <Card
              size="small"
              hoverable
              cover={
                <img
                  alt={curr.name + "'s cover photo"}
                  src={curr.images[0].url}
                  className="card-cover"
                />
              }
            >
              <Meta title={curr.name} />
            </Card>
          </div>
        </Col>
      );
      if (j === currRow * 3 + 1) arr.push(<Col span={1} />);
    }
    arr.push(<Col span={2} />);

    return arr;
  }

  function buildPlaylists() {
    console.log("Building playlists again: ", token);
    let arr = [];
    let numPlaylists = playlists.length;
    let numCols = 3;
    let numRows = Math.ceil(numPlaylists / numCols);
    for (let i = 0; i < numRows; i++) {
      arr.push(<Row style={{ marginTop: "2%" }}>{buildPlaylistsRow(i)}</Row>);
    }
    return arr;
  }

  return (
    <div className="page">
      {console.log(tracks)}
      {tracks.length === 0 ? (
        // clicking a playlist, tracks.length > 0
        // but window.location.pathname === "/playlist"
        <div>{buildPlaylists()}</div>
      ) : (
        <Redirect to="/artwork" />
      )}
    </div>
  );
}

export default Playlists;
