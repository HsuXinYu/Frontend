const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Student = require("./models/student");

mongoose
  .connect("mongodb://127.0.0.1:27017/example")
  .then(() => {
    console.log("成功連結資料庫...");
  })
  .catch((e) => {
    console.log(e);
  });

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/students", async (req, res) => {
  try {
    let { name, age, major, merit, other } = req.body;
    console.log(name, age, major, merit, other);
    let newStudent = new Student({
      name,
      age,
      major,
      scholarship: {
        merit,
        other,
      },
    });
    let savedStudent = await newStudent.save();
    return res.send({
      msg: "資料儲存成功",
      savedObject: savedStudent,
    });
  } catch (e) {
    return res.status(400).send(e.message);
  }
});

app.get("/students", async (req, res) => {
  try {
    let studentData = await Student.find({}).exec();
    return res.send(studentData);
  } catch (e) {
    return res.status(500).send("尋找資料時發生錯誤...");
  }
});

app.get("/students/:_id", async (req, res) => {
  try {
    let { _id } = req.params;
    let foundStudent = await Student.findOne({ _id }).exec();
    return res.send(foundStudent);
  } catch (e) {
    return res.status(500).send("尋找資料時發生錯誤...");
  }
});

//put會覆蓋原本的所有資料，所以如果沒有給予值原本的資料將不見或設定為預設值
app.put("/students/:_id", async (req, res) => {
  try {
    let { _id } = req.params;
    let { name, age, major, merit, other } = req.body;
    let newData = await Student.findOneAndUpdate(
      { _id },
      {
        name,
        age,
        major,
        scholarship: {
          merit,
          other,
        },
      },
      {}
    );
    return res.send({ msg: "成功更新", updatedData: newData });
  } catch (e) {
    return res.status(400).send(e.message);
  }
});

class NewData {
  constructor() {}
  setProperty(key, value) {
    if (key !== "merit" && key !== "other") {
      this[key] = value;
    } else {
      this[`scholarship.${key}`] = value;
    }
  }
}

app.patch("/students/:_id", async (req, res) => {
  try {
    let { _id } = req.params;
    let newObject = new NewData();
    for (let property in req.body) {
      newObject.setProperty(property, req.body[property]);
    }
    // console.log(req.body);
    // console.log(newObject);

    let newData = await Student.findOneAndUpdate({ _id }, newObject, {
      runValidators: true,
      new: true,
    });
    return res.send({ msg: "成功更新", updatedData: newData });
  } catch (e) {
    return res.status(400).send(e.message);
  }
});

app.delete("/students/:_id", async (req, res) => {
  try {
    let { _id } = req.params;
    let deleteData = await Student.deleteOne({ _id });
    console.log(deleteData);
    return res.send("成功刪除學生資料");
  } catch (e) {
    console.log(e);
    return res.status(500).send("無法此學生資料");
  }
});

app.listen(3000, () => {
  console.log("正在伺服器3000...");
});
