import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    _id: String,
    name: String,
    description: String,
    course: String, // this is a reference TO the course it belongs to
    lessons: [
      {
        _id: String,
        name: String,
        description: String,
        module: String, // lesson knows which module it belongs to
      },
    ],
  },
  { collection: "modules" }
);

export default schema;
