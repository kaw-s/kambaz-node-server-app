import mongoose from "mongoose";
const assignmentSchema = new mongoose.Schema({
  title: String,
  course: { type: String, ref: "CourseModel" },

  dueDate: Date,
  availableDate: Date,
  availableUntil: Date,
  description: String,
  points: Number,
});
export default assignmentSchema;
