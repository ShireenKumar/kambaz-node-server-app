import * as dao from "./dao.js";

export default function EnrollmentRoutes(app) {
  app.post("/api/users/:userId/courses/:courseId/enroll", (req, res) => {
    const { userId, courseId } = req.params;
    const enrollment = dao.enrollUserInCourse(userId, courseId);
    res.send(enrollment);
  });
  app.delete("/api/users/:userId/courses/:courseId/unenroll", (req, res) => {
    const { userId, courseId } = req.params;
    dao.unenrollUserFromCourse(userId, courseId);
    res.send();
  });
  app.get("/api/users/:userId/courses", (req, res) => {
    const { userId } = req.params;
    const courses = dao.findCoursesForUser(userId);
    res.send(courses);
  });
  app.get("/api/courses/:courseId/users", (req, res) => {
    const { courseId } = req.params;
    const users = dao.findUsersForCourse(courseId);
    res.send(users);
  });
  app.get("/api/enrollments", (req, res) => {
    const enrollments = dao.findAllEnrollments();
    res.send(enrollments);
  });
}
