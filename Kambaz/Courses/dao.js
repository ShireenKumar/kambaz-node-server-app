import Database from "../Database/index.js";
import model from "./model.js";
import { v4 as uuidv4 } from "uuid";

export function findAllCourses() {
  return model.find();
}

export function findCoursesForEnrolledUser(userId) {
  const { courses, enrollments } = Database;
  return courses.filter((course) =>
    enrollments.some(
      (enrollment) => enrollment.user === userId && enrollment.course === course._id
    )
  );
}

export function createCourse(course) {
  const newCourse = { ...course, _id: uuidv4() };
  return model.create(newCourse);
}

export async function deleteCourse(courseId) {
  const result = await model.deleteOne({ _id: courseId });
  const { enrollments } = Database;
  Database.enrollments = enrollments.filter(
    (enrollment) => enrollment.course !== courseId
  );
  return result;
}

// ✅ FIXED: Returns updated course from MongoDB
export function updateCourse(courseId, courseUpdates) {
  return model.findByIdAndUpdate(courseId, courseUpdates, { new: true });
}
