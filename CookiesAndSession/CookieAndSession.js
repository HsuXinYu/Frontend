require("dotenv").config();
const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const session = require("express-session");

//不想要使用者任意串改cookie導致資安問題可加上秘密String
app.use(cookieParser(process.env.MYCOOKIESECRETKEY));

//resave預設為true，可能會導致race condition(在不同裝置同時登錄，其一更改資料後離開，因另一個裝置仍在使用，會導致修改資料復原)
//saveUninitialized預設為true，是否要存取尚未登入的使用者資訊
//cookie:secure預設為ture，cookies是否只能在HTTPs的傳輸協定下傳輸
app.use(
  session({
    secret: process.env.MYSESSIONSECRETKEY,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false },
  })
);

const checkUser = (req, res, next) => {
  if (!req.session.isVerified) {
    return res.send("請先驗身份，才能看到資料");
  } else {
    next();
  }
};

app.get("/", (req, res) => {
  return res.send("這是首頁");
});

app.get("/setCookie", (req, res) => {
  //   res.cookie("yourCookie", "Apple");
  res.cookie("yourCookie", "Apple", { signed: true });
  return res.send("設置cookie");
});

app.get("/seeCookie", (req, res) => {
  console.log(req.signedCookies);
  return res.send("已經設定的cookie" + req.signedcookies.YourCookie);
});

app.get("/setSessionData", (req, res) => {
  //   console.log(req.session);
  req.session.example = "something...";
  return res.send("在伺服器設置session資料，在瀏覽器設置session ID");
});

app.get("/seeSessionData", (req, res) => {
  console.log(req.session);
  return res.send("已經設定好的session資料");
});

app.get("/verifyUser", (req, res) => {
  req.session.isVerified = true;
  return res.send("身分已驗證");
});

app.get("/secret", checkUser, (req, res) => {
  return res.send("你很可愛!");
});

app.get("/secret2", checkUser, (req, res) => {
  return res.send("你超級可愛!");
});

app.listen(3000, () => {
  console.log("正在伺服器3000...");
});
