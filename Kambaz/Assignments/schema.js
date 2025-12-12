import mongoose from "mongoose";
const assignmentSchema = new mongoose.Schema(
  {
    _id: String,
    title: String,
    course: { type: String, ref: "CourseModel" },
    dueDate: Date,
    availableDate: Date,
    availableUntil: Date,
    description: String,
    points: Number,
  },
  { collection: "assignments" }
);
export default assignmentSchema;
