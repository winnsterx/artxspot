import React, { useState, useEffect } from "react";
import { Spin, Typography, Row } from "antd";

const { Title } = Typography;

function Generator({ tracks, tags }) {
  function generateArt() {
    // checkout runaway ML
    // just broke up yesterday lol
  }
  return (
    <div>
      <Row justify="center" align="bottom" style={{ minHeight: "45vh" }}>
        <Typography>
          <Title level={2}>Generating Cover Art...</Title>
          {console.log("tracks: ", tracks)}
          {console.log("tags: ", tags)}
        </Typography>
      </Row>
      <Row justify="center">
        <Spin size="large" />
      </Row>
    </div>
  );
}

export default Generator;
