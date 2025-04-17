import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    _id: String,
    title: { type: String, required: true },
    course: { type: String, ref: "CourseModel" },
    module: String,
    available: String,
    due: String,
    points: String,
    description: String,
  },
  { collection: "assignments" }
);

export default schema;