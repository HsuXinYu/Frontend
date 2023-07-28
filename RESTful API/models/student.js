const mongoose = require("mongoose");
const { Schema } = mongoose;

const studentSchema = new Schema({
  name: { type: String, required: true, minlength: 2 },
  age: {
    type: Number,
    min: [0, "年齡不能是負數"],
    max: [80, "年齡可能太大了"],
    default: 18,
    required: true,
  },
  major: {
    type: String,
    enum: ["Computer Science", "Mathematics", "Chemistry"],
  },
  scholarship: {
    merit: { type: Number, min: 0, max: [5000, "申請太多獎學金了"] },
    other: { type: Number, min: 0, default: 0 },
  },
});

const Student = mongoose.model("Student", studentSchema);
module.exports = Student;
