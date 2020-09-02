import React, { useState, useEffect } from "react";
import { Input, Tag, Row, Button } from "antd";
import Generator from "./Generator";

function Playlist({ tracks }) {
  const [tags, setTags] = useState([]);
  const [value, setValue] = useState("");
  const [complete, setComplete] = useState(false);
  const [generate, setGenerate] = useState(false);
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
    if (tags.length === 5 && complete === false) {
      setComplete(true);
    }

    if (tags.length < 5 && complete === true) {
      setComplete(false);
    }
  }, [tags, complete]);

  function addTag(e) {
    let tmp = e.target.value;
    setValue("");
    if (tags.includes(tmp)) {
      alert("Add a different word!");
    } else {
      console.log("e target: ", e.target.value);
      setTags(tags.concat(tmp));
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
    setGenerate(true);
  }

  function typing(e) {
    setValue(e.target.value);
  }

  return (
    <div className="page">
      {generate ? (
        <Generator tracks={tracks} tags={tags} />
      ) : (
        <div className="page">
          {/* minHeight in Style checks that the row is occupying the area of the page correctly */}
          <Row
            type="flex"
            justify="center"
            align="bottom"
            style={{ minHeight: "45vh" }}
          >
            <Input
              allowClear
              size="large"
              placeholder="Input five words"
              value={value}
              onChange={typing}
              onPressEnter={addTag}
              style={{ width: "40%" }}
              disabled={complete}
            />
          </Row>
          <br />
          <Row type="flex" justify="center" align="top">
            {renderTags()}
          </Row>
          <br />
          <Row type="flex" justify="center" align="top">
            <Button type="primary" disabled={!complete} onClick={generateArt}>
              generate cover art
            </Button>
          </Row>
        </div>
      )}
    </div>
  );
}

export default Playlist;
