import React, { useState, useEffect } from "react";
import {} from "antd";

function Artwork({ artwork }) {
  const title = artwork.title;
  const artist = title.substring(0, title.indexOf(","));
  const name = title.substring(
    title.indexOf(",") + 2,
    title.lastIndexOf("(") - 1
  );
  const year =
    title.substring(title.lastIndexOf("(") + 2, title.length - 2) ||
    "Unavailable";
  const description = artwork.description;
  const permalink = artwork._links.permalink;
  const thumbnail = artwork._links.thumbnail;

  return (
    <div>
      {console.log("artwork: ", artwork)}
      {console.log(name)}
    </div>
  );
}

export default Artwork;
