var express = require("express");
var router = express.Router();
var fs = require("fs");

/* GET users listing. */
router.get("/", function(req, res, next) {
  //実行環境によって以下を変える。
  var r_dir = "/home/site/wwwroot/";
  if (process.env.npm_package_config_r_dir != undefined) {
    r_dir = process.env.npm_package_config_r_dir;
  }

  var fileName = fs.readFileSync(r_dir + "firmware/latestFirmware", "utf8");
  var fileURL = r_dir + "firmware/" + fileName;

  //res.attachment(fileURL);
  res.download(fileURL, function(err) {
    if (err) {
      console.log("error.");
    } else {
      console.log("download for firmware done.");
    }
  });

  //res.send("respond with a resource");
});

module.exports = router;
