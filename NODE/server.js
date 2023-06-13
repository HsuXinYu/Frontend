const http = require("http");
const fs = require("fs");

const server = http.createServer((req, res) => {
  res.writeHead(200, { "Content-type": "text/html;charset=UTF-8" });
  if (req.url == "/") {
    res.write("歡迎來到我的網頁");
    res.end();
  } else if (req.url == "/anotherPage") {
    res.write("這是另一個頁面");
    res.end();
  } else if (req.url == "/myPage") {
    fs.readFile("myPage.html", (e, data) => {
      if (e) {
        res.write("存取HTML錯誤");
        res.end();
      } else {
        res.write(data);
        res.end();
      }
    });
  } else {
    res.write("不存在此頁面");
    res.end();
  }
});

server.listen(2000, () => {
  console.log("伺服器在port2000運行");
});
