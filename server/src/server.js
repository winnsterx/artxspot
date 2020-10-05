var express = require("express"); // Express web server framework
var request = require("superagent");
var os = require("os");

// var clientID = "503e2e0e5362808c901a",
//   clientSecret = "a88889d6d635b5174682d08538bca175",
//   apiUrl = "https://api.artsy.net/api/tokens/xapp_token",
//   xappToken;

var app = express();

// Moved to the frontend.
// app.get("/generate", function (req, res) {
//   console.log("Calling generate, trying to make a request call in server.js");
//   request
//     .post(apiUrl)
//     .send({ client_id: clientID, client_secret: clientSecret })
//     .end(function (response) {
//       xappToken = response.body.token;
//     });
// });

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.listen(process.env.PORT || 8080, function () {
  console.log("Hostname: ", os.hostname());
  console.log("metspot listening on port ", process.env.PORT || 8080);
});
