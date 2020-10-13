import React from "react";
import { Row, Col, Typography, Button } from "antd";
import { Redirect, useHistory } from "react-router-dom";

const { Title } = Typography;

function Artwork({ artwork }) {
  const title = artwork.title;
  const description = artwork.description;
  const permalink = artwork._links.permalink.href;
  const thumbnail = artwork._links.thumbnail.href;
  const history = useHistory();

  function goBack() {
    console.log("Apparently clicked");
    return <Redirect to="/playlists" />;
  }

  return (
    <div className="page">
      <Row />
      <Row justify="center" align="middle" style={{ minHeight: "100%" }}>
        <Col span={2} />
        <Col span={12}>
          <img
            src={thumbnail}
            alt={title}
            width="90%"
            style={{ marginTop: "10%" }}
          />
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
          <br /> <br />
          <Button
            type="primary"
            style={{
              fontWeight: "bold",
            }}
            size="large"
            onClick={goBack}
          >
            another playlist!
          </Button>
        </Col>
        <Col span={2} />
      </Row>
    </div>
  );
}

export default Artwork;
