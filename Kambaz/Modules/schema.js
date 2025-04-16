import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    _id: String,
    name: String,
    description: String,
    course: String,
    lessons: {
      type: [
        {
          _id: String,
          name: String,
          description: String,
          module: String,
        },
      ],
      default: [], // ✅ FIX: allow new modules to be created without lessons
    },
  },
  { collection: "modules" }
);

export default schema;
