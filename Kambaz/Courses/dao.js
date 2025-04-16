import Database from "../Database/index.js";
import model from "./model.js";
import { v4 as uuidv4 } from "uuid";


export function findAllCourses() {
  return model.find();
 }
 
export function findCoursesForEnrolledUser(userId) {
  const { courses, enrollments } = Database;
  const enrolledCourses = courses.filter((course) =>
    enrollments.some((enrollment) => enrollment.user === userId && enrollment.course === course._id));
  return enrolledCourses;
}
export function createCourse(course) {
  const newCourse = { ...course, _id: uuidv4() };
  return model.create(newCourse);
  // Database.courses = [...Database.courses, newCourse];
  // return newCourse;
}
// export function deleteCourse(courseId) {
//   const { courses, enrollments } = Database;
//   Database.courses = courses.filter((course) => course._id !== courseId);
//   Database.enrollments = enrollments.filter(
//     (enrollment) => enrollment.course !== courseId
// );}
export async function deleteCourse(courseId) {
  const result = await model.deleteOne({ _id: courseId });
  const { enrollments } = Database;
  Database.enrollments = enrollments.filter(
    (enrollment) => enrollment.course !== courseId
  );

  return result;
}
export function updateCourse(courseId, courseUpdates) {
  const { courses } = Database;
  const course = courses.find((course) => course._id === courseId);
  if (!course) {
    return null;
  }
  Object.assign(course, courseUpdates);
  return course;
}
