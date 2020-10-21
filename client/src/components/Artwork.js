import React from "react";
import styled from "styled-components";
import { theme, mixins, media, Main } from "../styles";
const { colors, fontSizes, spacing } = theme;

const Wrapper = styled.div`
  ${mixins.flexBetween};
  align-items: flex-start;
`;

const ArtworkContainer = styled.div``;

const ArtworkImage = styled.img``;

const ArtCover = styled.div`
  width: 50%;
  display: inline-block;
`;
const ArtworkInfo = styled.div`
  width: 50%;
  padding: 0 5% 0 5%;
  display: inline-block;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
`;

const AnotherButton = styled.button`
  ${mixins.greenButton};
  margin-top: 10px;
  margin-right: 10px;
  padding: 12px 30px;
  background-color: ${colors.green};
  pointer-events: auto;
  cursor: pointer;
  &:hover,
  &:focus {
    background-color: ${colors.offGreen};
  }
`;

const Name = styled.h2`
  font-size: 40px;
  font-weight: 700;
  ${media.tablet`
    font-size: 40px;
  `};
  ${media.phablet`
    font-size: 8vw;
  `};
`;

const Description = styled.h2`
  color: ${colors.green};
  font-weight: 700;
  font-size: 25px;
`;

const ArtsyLink = styled.h3`
  color: ${colors.white};
  font-weight: 700;
  font-size: 25px;
`;

function Artwork({ artwork, setRedoPlaylist, setArtwork }) {
  const title = artwork.title;
  const description = artwork.description;
  const permalink = artwork._links.permalink.href;
  const thumbnail = artwork._links.thumbnail.href;

  function anotherPlaylist() {
    console.log("Another playlist");
    setRedoPlaylist(true);
  }

  function anotherArt() {
    console.log("Another artwork");
    setArtwork(null);
  }

  return (
    <Main>
      <ArtworkContainer>
        <ArtCover>
          <ArtworkImage src={thumbnail} />
        </ArtCover>
        <ArtworkInfo>
          <Name>{title}</Name>
          <Description>{description}</Description>
          <ArtsyLink href={permalink}>
            learn more / get more a more HD look
          </ArtsyLink>
          <AnotherButton onClick={() => anotherArt()}>
            Another Art
          </AnotherButton>
          <AnotherButton onClick={() => anotherPlaylist()}>
            Another playlist
          </AnotherButton>
        </ArtworkInfo>
      </ArtworkContainer>

      {/* <Row justify="space-around" align="middle" style={{ minHeight: "100%" }}>
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
      </Row> */}
    </Main>
  );
}

export default Artwork;
