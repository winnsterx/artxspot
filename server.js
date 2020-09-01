var express = require("express"); // Express web server framework
var request = require("superagent");
var cors = require("cors");
var cookieParser = require("cookie-parser");

var clientID = "503e2e0e5362808c901a",
  clientSecret = "a88889d6d635b5174682d08538bca175",
  apiUrl = "https://api.artsy.net/api/tokens/xapp_token",
  xappToken;

var app = express();

app.get("/generate", function (req, res) {
  request
    .post(apiUrl)
    .send({ client_id: clientID, client_secret: clientSecret })
    .then((response) => {
      xappToken = response.body.token;
      res.send(xappToken);
    });
});

app
  .use(express.static(__dirname + "/public"))
  .use(cors())
  .use(cookieParser());

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.listen(process.env.PORT || 8080, function () {
  console.log("metspot listening on port ", process.env.PORT || 8080);
});
