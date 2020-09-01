import React, { useState } from "react";
import { Spin, Typography, Row } from "antd";
import request from "superagent";
import Artwork from "./Artwork";

const { Title } = Typography;
const apiUrl = "https://api.artsy.net/api/search?type=";

function Generator({ tracks, tags }) {
  const [artwork, setArtwork] = useState(null);

  function generateArt() {
    request
      .get("/generate")
      .then((response) => {
        let query = collectNamesAndTags();
        request
          .get(apiUrl)
          .set("X-Xapp-Token", response.text)
          .query({ q: query })
          .query({ type: "artwork" })
          .then((res) => {
            let artworks = res.body._embedded.results;
            console.log("artsy's relevant artwork: ", artworks);
            console.log("token: ", response.text);
            let chosen = artworks[Math.floor(Math.random() * artworks.length)];
            setArtwork(chosen);
          })
          .catch((err) => console.log(err));
      })
      .catch((error) => console.log(error));
  }

  // Returns the songNames array of the first 20 songs
  function collectNamesAndTags() {
    let songs = tracks.items;
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
      tags.push(currSongName);
    }
    return tags.join(" ");
  }

  return (
    <div>
      {artwork ? (
        <Artwork artwork={artwork} />
      ) : (
        <div>
          <Row justify="center" align="bottom" style={{ minHeight: "45vh" }}>
            <Typography>
              <Title level={2}>Generating Cover Art...</Title>
              {generateArt()}
            </Typography>
          </Row>
          <Row justify="center">
            <Spin size="large" />
          </Row>
        </div>
      )}
    </div>
  );
}

export default Generator;
