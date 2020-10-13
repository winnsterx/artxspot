import React, { useState } from "react";
import { Spin, Typography, Row } from "antd";
// import Link from "react-router-dom";

import request from "superagent";
import Artwork from "./Artwork";
import { artsyClientId, artsyClientSecret, artstSearchUrl } from "../config";

const { Title } = Typography;

function Generator({ tracks, redoPlaylist }) {
  const [artwork, setArtwork] = useState(null);

  function generateArt() {
    var apiUrl = "https://api.artsy.net/api/tokens/xapp_token",
      xappToken;

    let query = collectNames();

    request
      .post(apiUrl)
      .send({ client_id: artsyClientId, client_secret: artsyClientSecret })
      .then(function (response) {
        xappToken = response.body.token;
        console.log("xapptoken: ", xappToken);

        request
          .get(artstSearchUrl)
          .set("X-Xapp-Token", xappToken)
          .query({ q: query })
          .query({ type: "artwork" })
          .then((res) => {
            let artworks = res.body._embedded.results;
            console.log("artsy's relevant artwork: ", artworks);
            let chosen = artworks[Math.floor(Math.random() * artworks.length)];
            setArtwork(chosen);
          })
          .catch((err) => console.log(err));
      });
  }

  // Returns the songNames array of the first 20 songs
  function collectNames() {
    let songs = tracks.items;
    let songNames = [];
    let limit = 10;
    if (songs.length < limit) {
      limit = songs.length;
    }
    for (let i = 0; i < limit; i++) {
      let currSongName = songs[i].track.name;
      currSongName.slice(0, currSongName.indexOf("-")); // strips string after '-' to get just name
      let n = currSongName.indexOf("(");
      currSongName = currSongName.substring(
        0,
        n !== -1 ? n : currSongName.length
      ); // strips string after '-' to get just name
      songNames.push(currSongName);
    }
    return songNames.join(" ");
  }

  return (
    <div className="page">
      {artwork ? (
        <div>
          <Artwork artwork={artwork} />
        </div>
      ) : (
        <div className="page">
          <Row justify="center" align="middle" style={{ minHeight: "100%" }}>
            <Typography>
              <Title level={3}>generating...</Title>
              <Spin size="large" />
              {generateArt()}
            </Typography>
          </Row>
        </div>
      )}
    </div>
  );
}

export default Generator;
