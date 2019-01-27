var express = require("express");
var cryptor = require("crypto");
var sign = cryptor.createSign("RSA-SHA256");
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
  //console.log("data: ", req.body.data);
  //console.log("signedData: ", req.body.signedData);
  var j_data = JSON.parse(req.body.data);
  //console.log("MBMS_id: ", j_data.MBMS_id);

  var verify = cryptor.createVerify("RSA-SHA256");
  //verify.write("some data to sigan");
  verify.write(req.body.data);
  verify.end();
  //var pk = fs.readFileSync("./pks/pk_" + j_data.MBMS_id + ".pem", "utf8");
  console.log("MBMS_id: ", j_data.MBMS_id);
  var pk = fs.readFileSync(
    "/home/site/wwwroot/pks/pk_" + j_data.MBMS_id + ".pem",
    "utf8"
  );
  var result = verify.verify(pk, req.body.signature, "base64");
  console.log("result: ", result);

  if (result == true) {
    var dt = new Date();
    var formatted = dt.toFormat("YYYYMMDDHH24MISS");
    //console.log("formatted: ", formatted);

    //fs.writeFile("./data_files/" + formatted + ".txt", req.body.data);
    fs.writeFileSync(
      "/home/site/wwwroot/data_files/" + formatted + ".txt",
      req.body.data
    );
  }

  res.send("POST request to the homepage");
});

module.exports = router;
