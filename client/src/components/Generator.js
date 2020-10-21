import React, { useEffect, useState } from "react";
import Loader from "./Loader";
import { Main } from "../styles";

import request from "superagent";
import Artwork from "./Artwork";
import { artsyClientId, artsyClientSecret, artstSearchUrl } from "../config";

function Generator({ tracks, setRedoPlaylist }) {
  const [artwork, setArtwork] = useState(null);

  useEffect(() => {
    if (!artwork) {
      generateArt();
    }
  });

  function generateArt() {
    var apiUrl = "https://api.artsy.net/api/tokens/xapp_token",
      xappToken;

    let query = collectNames();

    request
      .post(apiUrl)
      .send({ client_id: artsyClientId, client_secret: artsyClientSecret })
      .then(function (response) {
        xappToken = response.body.token;

        request
          .get(artstSearchUrl)
          .set("X-Xapp-Token", xappToken)
          .query({ q: query })
          .query({ type: "artwork" })
          .then((res) => {
            let artworks = res.body._embedded.results;
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
        <Artwork
          artwork={artwork}
          setRedoPlaylist={setRedoPlaylist}
          setArtwork={setArtwork}
        />
      ) : (
        <Main>
          <h2>Finding Artwork...</h2>
          <Loader />
        </Main>
      )}
    </div>
  );
}

export default Generator;
