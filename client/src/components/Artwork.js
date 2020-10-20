import React from "react";
import { Row, Col, Typography, Button } from "antd";
import styled from "styled-components";
import { theme, mixins, media, Main } from "../styles";

const { Title } = Typography;

const Wrapper = styled.div`
  ${mixins.flexBetween};
  align-items: flex-start;
`;

const ArtworkContainer = styled.div`
  display: flex;
  text-align: center;
`;

const ArtworkImage = styled.img`
  object-fit: cover;
`;

const ArtworkInfo = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
`;

function Artwork({ artwork, setRedoPlaylist, setArtwork }) {
  const title = artwork.title;
  const description = artwork.description;
  const permalink = artwork._links.permalink.href;
  const thumbnail = artwork._links.thumbnail.href;

  function anotherPlaylist() {
    setRedoPlaylist(true);
  }

  function anotherArt() {
    setArtwork(null);
  }

  return (
    <div className="page">
      <Row justify="space-around" align="middle" style={{ minHeight: "100%" }}>
        <Col span={2} />
        <Col span={12}>
          <img src={thumbnail} alt={title} width="90%" />
        </Col>
        <Col span={1} />
        <Col span={7} style={{ textAlign: "left" }}>
          <Title level={2}>{title}</Title>
          <Title level={3}>{description.toLowerCase()}</Title>
          <Title level={3}>
            <a href={permalink}>learn more / get more a more HD look lolll</a>
          </Title>
          <Button
            type="primary"
            style={{
              fontWeight: "bold",
            }}
            size="large"
            onClick={anotherPlaylist}
          >
            another playlist
          </Button>
          <br /> <br />
          <Button
            type="primary"
            style={{
              fontWeight: "bold",
            }}
            size="large"
            onClick={anotherArt}
          >
            another art
          </Button>
        </Col>
        <Col span={2} />
      </Row>
    </div>
  );
}

export default Artwork;
