import React, { useState, useEffect } from "react";
import { Row, Col, Typography } from "antd";

const { Title } = Typography;

function Artwork({ artwork }) {
  const title = artwork.title;
  // INSTEAD of parsing like I AM now, I should be making API calls to get
  // artist name: https://api.artsy.net/api/artists/?artwork_id={id}
  // year / title: https://api.artsy.net/api/artworks/id --> res.date, etc...

  //   const artist = title.substring(0, title.indexOf(","));
  //   let year = title.slice(title.length - 5);
  //   year = year.slice(0, -1);
  //   const parsedYear = parseInt(year, 10);

  //   let endName = title.length;
  //   if (!isNaN(parsedYear)) {
  //     console.log("Year is provided in title: ", year);
  //     endName = title.lastIndexOf("(") - 1;
  //   }

  //   const name = title.substring(title.indexOf(",") + 2, endName);

  const description = artwork.description;
  const permalink = artwork._links.permalink.href;
  const thumbnail = artwork._links.thumbnail.href;

  return (
    <div>
      {console.log("artwork: ", artwork)}
      {console.log("name: ", name)}
      <Row justify="center">
        <Col>
          <img src={thumbnail} alt={title} width="500" height="500" />
        </Col>
        <Col>
          <Title level={2}>
            <i>{name}</i>
          </Title>
          <Title>{artist}</Title>
          <Title>{isNaN(parsedYear) ? "Year Unavailable" : year}</Title>
          <Title>{description}</Title>
        </Col>
      </Row>
    </div>
  );
}

export default Artwork;
