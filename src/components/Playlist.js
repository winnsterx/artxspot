import React, { useState, useEffect } from "react";
import { Input, Tag, Row, Button } from "antd";
import SpotifyWebApi from "spotify-web-api-js";

const spotifyApi = new SpotifyWebApi();
const { Search } = Input;

function Playlist() {
  const [tags, setTags] = useState([]);
  const [complete, setComplete] = useState(false);
  const colors = [
    "magenta",
    "red",
    "volcano",
    "orange",
    "gold",
    "lime",
    "green",
    "cyan",
    "blue",
    "geekblue",
    "purple",
  ];

  useEffect(() => {
    console.log("tags: ", tags);
    if (tags.length === 5 && complete === false) {
      setComplete(true);
    }

    if (tags.length < 5 && complete === true) {
      setComplete(false);
    }
  });

  function addTag(e) {
    if (tags.includes(e.target.value)) {
      alert("Add a different word!");
    } else {
      setTags(tags.concat(e.target.value));
    }
  }

  function removeTag(e) {
    let tagRemoved =
      e.target.parentNode.parentNode.textContent ||
      e.target.parentNode.parentNode.parentNode.textContent;
    setTags(tags.filter((e) => e !== tagRemoved));
  }

  function renderTags() {
    let tags_arr = [];
    for (let i = 0; i < tags.length; i++) {
      let color = colors[Math.floor(Math.random() * colors.length)];
      tags_arr.push(
        <Tag color={color} closable onClose={removeTag}>
          {tags[i]}
        </Tag>
      );
    }
    return tags_arr;
  }

  function generateArt() {
    console.log("generate art");
  }

  return (
    <div style={{ height: "100vh" }}>
      <Row
        type="flex"
        justify="center"
        align="bottom"
        style={{ height: "50%" }}
      >
        <Input
          allowClear
          size="large"
          placeholder="Input five words"
          onPressEnter={addTag}
          style={{ width: "40%" }}
          disabled={complete}
        />
      </Row>
      <br />
      <Row type="flex" justify="center" align="top" style={{ height: "3%" }}>
        {renderTags()}
      </Row>
      <br />
      <Row type="flex" justify="center" align="top" style={{ height: "47%" }}>
        <Button type="primary" disabled={!complete} onClick={generateArt}>
          Generate Cover Art!
        </Button>
      </Row>
    </div>
  );
}

export default Playlist;
