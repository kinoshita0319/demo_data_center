var express = require("express");
var cryptor = require("crypto");
var fs = require("fs");
require("date-utils");
var router = express.Router();

/* GET home page. */
router.get("/", function(req, res, next) {
  res.render("index", { title: "Express" });
});

router.post("/", function(req, res, next) {
  // リクエストボディを出力
  console.log("body: ", req.body);
  var j_data = JSON.parse(req.body.data);

  //署名検証
  //var verify = cryptor.createVerify("RSA-SHA256");
  var verify = cryptor.createVerify("SHA256");
  verify.write(req.body.data);
  verify.end();
  //var pk = fs.readFileSync("./pks/pk_" + j_data.MBMS_id + ".pem", "utf8");
  /*  var pk = fs.readFileSync(
    "/home/site/wwwroot/pks/pk_" + j_data.MBMS_id + ".pem",
    "utf8"
  );*/
  var pk = fs.readFileSync("/home/site/wwwroot/pks/pk.pem", "utf8");
  var result = verify.verify(pk, req.body.signature, "base64");
  console.log("result: ", result);

  //署名検証結果が正の場合、ファイル格納
  if (result == true) {
    var dt = new Date();
    var formatted = dt.toFormat("YYYYMMDDHH24MISS");

    //fs.writeFileSync("./data_files/" + formatted + ".txt", req.body.data);
    fs.writeFileSync(
      "/home/site/wwwroot/data_files/" + formatted + ".txt",
      req.body.data
    );
  }

  res.send("POST request to the homepage");
});

module.exports = router;
