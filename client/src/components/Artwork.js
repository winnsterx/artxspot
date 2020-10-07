import React from "react";
import { Row, Col, Typography, Button } from "antd";
import { useHistory } from "react-router-dom";

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
  const history = useHistory();

  function goBack() {
    console.log("Apparently clicked");
    history.push("/playlists");
  }

  return (
    <div className="page">
      {console.log("artwork: ", artwork)}
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
            onClick={goBack}
          >
            another art!
          </Button>
          <Button type="primary">another playlist!</Button>
        </Col>
        <Col span={2} />
      </Row>
    </div>
  );
}

export default Artwork;
