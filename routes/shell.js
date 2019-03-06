var express = require("express");
var router = express.Router();
var fs = require("fs");

/* GET users listing. */
router.get("/", function(req, res, next) {
  //実行環境によって以下を変える。
  var r_dir = "./";
  //var r_dir = "/home/site/wwwroot/";

  var fileURL = r_dir + "shell/test_shell";

  res.download(fileURL, function(err) {
    if (err) {
      res.sendStatus(err.status);
      console.log("error.");
    } else {
      console.log("download for shsell done.");
    }
  });

  //res.send("respond with a resource");
});

module.exports = router;
