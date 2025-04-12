import Database from "../Database/index.js";
import { v4 as uuidv4 } from "uuid";

export function findAllEnrollments() {
  return Database.enrollments;
}
export function enrollUserInCourse(userId, courseId) {
  const newEnrollment = { _id: uuidv4(), user: userId, course: courseId,
  };
Database.enrollments = [...Database.enrollments, newEnrollment];
  return newEnrollment;
}
export function unenrollUserFromCourse(userId, courseId) {
  const { enrollments } = Database;
  Database.enrollments = enrollments.filter( (e) => e.user !== userId || e.course !== courseId
);
}

export function findCoursesForUser(userId) {
  const { courses, enrollments } = Database;
  return courses.filter((course) =>
    enrollments.some(
    (enrollment) => enrollment.user === userId && enrollment.course === course._id)
);
}

export function findUsersForCourse(courseId) {
  const { users, enrollments } = Database;
  return users.filter((user) =>
    enrollments.some(
(enrollment) => enrollment.user === user._id && enrollment.course === courseId
    )
  );
}