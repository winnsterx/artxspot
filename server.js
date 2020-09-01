var express = require("express"); // Express web server framework
var request = require("superagent");
var cors = require("cors");
var axios = require("axios");
var querystring = require("querystring");
var cookieParser = require("cookie-parser");

var clientID = "503e2e0e5362808c901a",
  clientSecret = "a88889d6d635b5174682d08538bca175",
  apiUrl = "https://api.artsy.net/api/tokens/xapp_token",
  xappToken;

// r = request
//   .post(apiUrl)
//   .send({ client_id: clientID, client_secret: clientSecret })
//   .end(function (res) {
//     xappToken = res.body.token;
//   });

// j = json.load(r.text);
// token = j["token"];

/**
 * Generates a random string containing numbers and letters
 * @param  {number} length The length of the string
 * @return {string} The generated string
 */

var app = express();

app
  .use(express.static(__dirname + "/public"))
  .use(cors())
  .use(cookieParser());

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.get("/generate", function (req, res) {
  request
    .post(apiUrl)
    .send({ client_id: clientID, client_secret: clientSecret })
    .then((response) => {
      xappToken = response.body.token;
      res.send(xappToken);
    });
});

app.listen(process.env.PORT || 8080);
