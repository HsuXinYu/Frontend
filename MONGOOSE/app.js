const express = require("express");
const app = express();
const mongoose = require("mongoose");
const { Schema } = mongoose;
const fs = require("fs");

mongoose
  .connect("mongodb://127.0.0.1:27017/example")
  .then(() => {
    console.log("成功連結資料庫...");
  })
  .catch((e) => {
    console.log(e);
  });

const studentSchema = new Schema(
  {
    name: { type: String, required: true },
    age: { type: Number, min: [0, "年齡不能小於0"] },
    major: {
      type: String,
      required: function () {
        return this.scholarship.merit >= 3000;
      },
      enum: ["Computer Science", "Mathematics", "Chemistry"],
    },
    scholarship: {
      merit: { type: Number, default: 0 },
      other: { type: Number, default: 0 },
    },
  }
  // {
  //   methods: {
  //     printTotalScholarship() {
  //       return this.scholarship.merit + this.scholarship.other;
  //     },
  //   },
  // }
  // {
  //   statics: {
  //     findAllMajor(major) {
  //       console.log(this);
  //       return this.find({ major: major }).exec();
  //     },
  //   },
  // }
);
studentSchema.methods.printTotalScholarship = function () {
  return this.scholarship.merit + this.scholarship.other;
};
// studentSchema.statics.findAllMajor = function (major) {
//   return this.find({ major: major }).exec();
// };
studentSchema.static("findAllMajor", function (major) {
  return this.find({ major: major }).exec();
});

//可用於紀錄伺服器瀏覽次數或會員註冊量
studentSchema.pre("save", () => {
  fs.writeFile("record.txt", "A new data will be saved...", (e) => {
    if (e) throw e;
  });
});

const Student = mongoose.model("Student", studentSchema);

Student.find({})
  .exec()
  .then((arr) => {
    arr.forEach((student) => {
      console.log(
        student.name + "的總獎學金金額是" + student.printTotalScholarship()
      );
    });
  });

Student.findAllMajor("Chemistry")
  .then((data) => {
    console.log(data);
  })
  .catch((e) => {
    console.log(e);
  });

let newStudent = new Student({
  name: "小花",
  age: "30",
  major: "Computer Science",
  scholarship: {
    merit: 5000,
    other: 1000,
  },
});

newStudent
  .save()
  .then((data) => {
    console.log("資料已經儲存");
  })
  .catch((e) => {
    console.log(e);
  });

//新增
// const newObject = new Student({
//   name: "cathy",
//   age: "28",
//   major: "Chemistry",
//   scholarship: {
//     merit: 2000,s
//     other: 1000,
//   },
// });
// newObject
//   .save()
//   .then((savedObject) => {
//     console.log("資料已經儲存完畢，儲存的資料是:");
//     console.log(savedObject);
//   })
//   .catch((e) => {
//     console.log(e);
//   });

//查詢
//增加{}可提升程式碼可讀性且結果較穩定
// Student.find({})
//   .exec()
//   .then((data) => {
//     console.log(data);
//   })
//   .catch((e) => {
//     console.log(e);
//   });

// app.get("/", async (req, res) => {
//   try {
//     let data = await Student.findOne({ name: "Apple" }).exec();
//     console.log(data);
//     res.send(data);
//   } catch (e) {
//     console.log(e);
//   }
// });

//更改
//需設定runValidators: true，更新時才能夠檢視資料是否符合Schema的設定
// Student.updateOne({ name: "Apple" }, { age: 20 }, { runValidators: true })
//   .exec()
//   .then((msg) => {
//     console.log(msg);
//   })
//   .catch((e) => {
//     console.log(e);
//   });

//new預設值為false，設定成true時，回傳的資料為更新後的資料
// Student.findOneAndUpdate(
//   { name: "Apple Liao" },
//   { name: "Apple Hsu" },
//   { runValidators: true, new: true }
// )
//   .exec()
//   .then((newData) => {
//     console.log(newData);
//   })
//   .catch((e) => {
//     console.log(e);
//   });

//刪除
// Student.deleteOne({ name: "Amy" }, { age: 26 })
//   .exec()
//   .then((msg) => {
//     console.log(msg);
//   })
//   .catch((e) => {
//     console.log(e);
//   });

app.set("view engine", "ejs");

app.listen(3000, () => {
  console.log("正在伺服器3000...");
});
