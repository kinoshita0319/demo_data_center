var request = require("request");
var fs = require("fs");
var cryptor = require("crypto");
var sign = cryptor.createSign("RSA-SHA256");
require("date-utils");

//ヘッダーを定義
var headers = {
  "Content-Type": "application/json"
};

//データファイルから読み込み
var data = require("./data_file.json");

//id取得
var MBMS_id = fs.readFileSync("./MBMS_id", "utf8");

//日時取得
var dt = new Date();
var formatted = dt.toFormat("YYYYMMDDHH24MISS");

//データにidと日時を追加
data.MBMS_id = MBMS_id;
data.MBMS_date = formatted;

//Jsonを文字列化
var s_data = JSON.stringify(data);
console.log("s_data: " + s_data);

//dataに署名する
sign.update(s_data);
var sk = fs.readFileSync("./sk_" + data.MBMS_id + ".pem", "utf8");
var signature = sign.sign(sk, "base64");

//httpsリクエスト作成
var options = {
  //url: "http://localhost:3000",
  url: "https://demo-data-center.azurewebsites.net/",
  method: "POST",
  headers: headers,
  json: true,
  form: { data: s_data, signature: signature }
};

//リクエスト送信
request(options, function(error, response, body) {
  console.log("statusCode: " + response.statusCode);
});
