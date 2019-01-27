var request = require("request");
var fs = require("fs");
var cryptor = require("crypto");
var sign = cryptor.createSign("RSA-SHA256");
//require("date-utils");

//ヘッダーを定義
var headers = {
  "Content-Type": "application/json"
};

//データファイルから読み込み
var data = require("./data_file.json");
var s_data = JSON.stringify(data);
console.log("s_data: ", s_data);

/*
var dt = new Date();
var formatted = dt.toFormat("YYYYMMDDHH24MISS");
var data = { id: "000001", date: formatted, battery_charge: "35" };
var s_data = JSON.stringify(data);
*/

sign.update(s_data);
var sk = fs.readFileSync("./sk_" + data.MBMS_id + ".pem", "utf8");
var signature = sign.sign(sk, "base64");

//オプションを定義
var options = {
  url: "http://localhost:3000",
  method: "POST",
  headers: headers,
  json: true,
  form: { data: s_data, signature: signature }
};

//リクエスト送信
request(options, function(error, response, body) {
  //コールバックで色々な処理
  console.log("statusCode: " + response.statusCode);
});
