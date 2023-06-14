const express = require("express");
const app = express();

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//GET, POST, PUT,  DELETE (path, handler)
app.get("/", (req, res) => {
  let obj = {
    title: "Web Design",
    website: "udemy",
  };
  res.json(obj);
});

app.get("/myPage", (req, res) => {
  res.sendFile(__dirname + "/myPage.html");
});

// app.get("/fromHandling", (req, res) => {
//   //   console.log(req.query);
//   res.send("你的名字為" + req.query.name + "年齡為" + req.query.age);
// });

app.post("/fromHandling", (req, res) => {
  // console.log(req.body);
  let { email, password } = req.body;
  res.send("你的信箱是" + email);
});

app.get("*", (req, res) => {
  res.status(404).send("你所找尋的頁面不存在");
});

//listen (port, callback)
app.listen(2000, () => {
  console.log("伺服器正在port2000...");
});
