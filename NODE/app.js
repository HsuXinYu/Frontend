const express = require("express");
const app = express();

//HTTP request, GET, POST, PUT,  DELETE
app.get("/", (req, res) => {
  res.send("歡迎來到首頁");
});

//port, callback
app.listen(2000, () => {
  console.log("伺服器正在監聽port2000...");
});
