require("dotenv").config();
const express = require("express");
const app = express();
const session = require("express-session");
const mongoose = require("mongoose");
const Student = require("./models/student");
const bcrypt = require("bcrypt");
const saltRounds = 12; //常用 8 10 12 14

mongoose
  .connect("mongodb://127.0.0.1:27017/example")
  .then(() => {
    console.log("成功連結資料庫...");
  })
  .catch((e) => {
    console.log(e);
  });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: process.env.MYSESSIONSECRETKEY,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false },
  })
);

const verifyUser = (req, res, next) => {
  if (req.session.isVerified) {
    next();
  } else {
    return res.send("請先登入");
  }
};

app.get("/students", async (req, res) => {
  let foundStudent = await Student.find({}).exec();
  return res.send(foundStudent);
});

app.get("/secret", verifyUser, (req, res) => {
  return res.send("秘密是秘密");
});

app.post("/students", async (req, res) => {
  try {
    let { username, password } = req.body;
    let hashValue = await bcrypt.hash(password, saltRounds);
    let newStudent = new Student({ username, password: hashValue });
    let savedStudent = await newStudent.save();
    return res.send({ message: "成功新增學生" + savedStudent });
  } catch (e) {
    return res.status(400).send(e);
  }
});

app.post("/students/login", async (req, res) => {
  try {
    let { username, password } = req.body;
    let foundStudent = await Student.findOne({ username }).exec();
    console.log(foundStudent);
    if (foundStudent) {
      let result = await bcrypt.compare(password, foundStudent.password);
      if (result) {
        req.session.isVerified = true;
        return res.send("登入成功");
      } else {
        return res.send("登入失敗");
      }
    } else {
      return res.send("查無此帳號");
    }
  } catch (e) {
    return res.status(400).send(e);
  }
});

app.post("/students/logout", (req, res) => {
  req.session.isVerified = false;
  return res.send("已登出");
});

app.listen(3000, () => {
  console.log("正在伺服器3000...");
});
