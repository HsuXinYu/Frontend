const express = require("express");
const app = express();
const mongoose = require("mongoose");
const studentRoutes = require("./routes/student-routes");
const cors = require("cors");

//因無法直接提出put、patch、delete請求，需下載method-override
const methodOverride = require("method-override");

mongoose
  .connect("mongodb://127.0.0.1:27017/example")
  .then(() => {
    console.log("成功連結資料庫...");
  })
  .catch((e) => {
    console.log(e);
  });

app.set("view engine", "ejs");
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use("/students", studentRoutes);

app.listen(8080, () => {
  console.log("正在伺服器8080...");
});
