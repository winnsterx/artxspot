import React, { useState, useEffect } from "react";
import { Input, Tag, Row } from "antd";
import SpotifyWebApi from "spotify-web-api-js";

const spotifyApi = new SpotifyWebApi();
const { Search } = Input;

function Playlist() {
  const [tags, setTags] = useState([]);
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
  });

  function generateTag(e) {
    setTags(tags.concat(e.target.value));
  }

  function removeTag(e) {
    let tagRemoved =
      e.target.parentNode.parentNode.textContent ||
      e.target.parentNode.parentNode.parentNode.textContent;
    console.log("To be removed: ", tagRemoved);
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

  return (
    <div>
      <Row type="flex" justify="center" align="middle">
        <Input
          allowClear
          size="large"
          placeholder="Input five words"
          onPressEnter={generateTag}
          style={{ width: "50%" }}
        />
      </Row>
      <Row type="flex" justify="center" align="middle">
        {renderTags()}
      </Row>
    </div>
  );
}

export default Playlist;
