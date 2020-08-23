import React, { useState, useEffect } from "react";
import { Input, Tag, Row, Button } from "antd";

function Playlist() {
  const [tags, setTags] = useState([]);
  const [value, setValue] = useState("");
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
    console.log("Tags: ", tags);
    console.log("Completed: ", complete);
    if (tags.length === 5 && complete === false) {
      setComplete(true);
    }

    if (tags.length < 5 && complete === true) {
      setComplete(false);
    }
  });

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
    console.log("generate art");
  }

  function typing(e) {
    setValue(e.target.value);
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
          value={value}
          onChange={typing}
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
