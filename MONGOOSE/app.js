const express = require("express");
const app = express();
const mongoose = require("mongoose");
const { Schema } = mongoose;

mongoose
  .connect("mongodb://127.0.0.1:27017/example")
  .then(() => {
    console.log("成功連結資料庫...");
  })
  .catch((e) => {
    console.log(e);
  });

const studentSchema = new Schema({
  name: String,
  age: Number,
  major: String,
  scholarship: {
    merit: Number,
    other: Number,
  },
});

const Student = mongoose.model("Student", studentSchema);
const newObject = new Student({
  name: "Esther",
  age: "28",
  major: "Mathematics",
  scholarship: {
    merit: 5000,
    other: 2500,
  },
});
newObject
  .save()
  .then((savedObject) => {
    console.log("資料已經儲存完畢，儲存的資料是:");
    console.log(savedObject);
  })
  .catch((e) => {
    console.log(e);
  });

app.set("view engine", "ejs");

app.listen(3000, () => {
  console.log("正在伺服器3000...");
});
