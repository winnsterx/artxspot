import React from "react";
import styled from "styled-components";
import { theme, mixins, media, Main } from "../styles";
const { colors } = theme;

const ArtworkContainer = styled.div``;

const ArtworkImage = styled.img``;

const ArtCover = styled.div`
  width: 50%;
  display: inline-block;
`;
const ArtworkInfo = styled.div`
  height: 50%;
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
  letter-spacing: 2px;
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
    setRedoPlaylist(true);
  }

  function anotherArt() {
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
            Learn More / Get HD Look on Artsy
          </ArtsyLink>
          <AnotherButton onClick={() => anotherArt()}>
            Another Art
          </AnotherButton>
          <AnotherButton onClick={() => anotherPlaylist()}>
            Another playlist
          </AnotherButton>
        </ArtworkInfo>
      </ArtworkContainer>
    </Main>
  );
}

export default Artwork;
