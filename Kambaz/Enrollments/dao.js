import Database from "../Database/index.js";
import model from "./model.js";

// Return all courses a user is enrolled in
export async function findCoursesForUser(userId) {
  const enrollments = await model.find({ user: userId }).populate("course");
  return enrollments.map((enrollment) => enrollment.course);
 }
 
// Return all users enrolled in a course
export async function findUsersForCourse(courseId) {
  const enrollments = await model.find({ course: courseId }).populate("user");
  return enrollments.map((enrollment) => enrollment.user);
}

// Return all enrollments (raw from DB)
export async function findAllEnrollments() {
  return await model.find();
}

// Enroll a user in a course
export async function enrollUserInCourse(user, course) {
  const _id = `${user}-${course}`;
  return await model.updateOne(
    { _id },
    { $set: { user, course, _id } },
    { upsert: true }
  );
}

// Unenroll a user from a course
export async function unenrollUserFromCourse(user, course) {
  return await model.deleteOne({ user, course });
}
