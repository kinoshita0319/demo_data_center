const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
require("date-utils");

const app = express();

// urlencodedとjsonは別々に初期化する
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.use(bodyParser.json());

app.listen(8080);
console.log("Server is online.");

app.post("/", function(req, res) {
  // リクエストボディを出力
  console.log(req.body);
  // パラメータ名、nameを出力
  console.log(req.body.battery_charge);

  var dt = new Date();
  var formatted = dt.toFormat("YYYYMMDDHH24MISS");
  console.log(formatted);

  fs.writeFile("" + formatted + ".txt", JSON.stringify(req.body));
  //fs.appendFile("" + formatted + ".txt", "\n");
  //fs.appendFile("" + formatted + ".txt", req.body.battery_charge);

  res.send("POST request to the homepage");
});
