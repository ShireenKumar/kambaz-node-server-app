import * as dao from "./dao.js";
import * as courseDao from "../Courses/dao.js";
import * as enrollmentsDao from "../Enrollments/dao.js";

export default function UserRoutes(app) {

  const signup = async (req, res) => {
    const existingUser = await dao.findUserByUsername(req.body.username);
    if (existingUser) {
      return res.status(400).json({ message: "Username already taken" });
    }
    const currentUser = await dao.createUser(req.body);
    req.session.currentUser = currentUser;
    res.json(currentUser);
  };

  const signin = async (req, res) => {
    const { username, password } = req.body;
    const user = await dao.findUserByCredentials(username, password);
    if (user) {
      req.session.currentUser = user;
      res.json(user);
    } else {
      res.status(403).json({ message: "Invalid credentials" });
    }
  };

  const signout = (req, res) => {
    req.session.destroy();
    res.sendStatus(200);
  };

  const profile = (req, res) => {
    const currentUser = req.session.currentUser;
    if (!currentUser) {
      return res.sendStatus(401);
    }
    res.json(currentUser);
  };


  const createCourse = async (req, res) => {
    const currentUser = req.session.currentUser;
    if (!currentUser) return res.sendStatus(401);

    const newCourse = await courseDao.createCourse(req.body);
    await enrollmentsDao.enrollUserInCourse(currentUser._id, newCourse._id);
    res.json(newCourse);
  };

  const findCoursesForEnrolledUser = async (req, res) => {
    let { userId } = req.params;
    if (userId === "current") {
      const currentUser = req.session.currentUser;
      if (!currentUser) return res.sendStatus(401);
      userId = currentUser._id;
    }
    const courses = await courseDao.findCoursesForEnrolledUser(userId);
    res.json(courses);
  };

  app.get("/api/users/current/courses", async (req, res) => {
    const currentUser = req.session.currentUser;
    if (!currentUser) return res.sendStatus(403);
    const courses = await courseDao.findCoursesForEnrolledUser(currentUser._id);
    res.json(courses);
  });


  const createUser = async (req, res) => {
    const newUser = await dao.createUser(req.body);
    res.json(newUser);
  };

  const deleteUser = async (req, res) => {
    const status = await dao.deleteUser(req.params.userId);
    res.json(status);
  };

  const findAllUsers = async (req, res) => {
    const users = await dao.findAllUsers();
    res.json(users);
  };

  const findUserById = async (req, res) => {
    const user = await dao.findUserById(req.params.userId);
    res.json(user);
  };

  const updateUser = async (req, res) => {
    const userId = req.params.userId;
    const userUpdates = req.body;
    await dao.updateUser(userId, userUpdates);
    const currentUser = await dao.findUserById(userId);
    req.session.currentUser = currentUser;
    res.json(currentUser);
  };


  app.post("/api/users/signup", signup);
  app.post("/api/users/signin", signin);
  app.post("/api/users/signout", signout);
  app.post("/api/users/profile", profile);

  app.post("/api/users/current/courses", createCourse);
  app.get("/api/users/:userId/courses", findCoursesForEnrolledUser);

  app.post("/api/users", createUser);
  app.get("/api/users", findAllUsers);
  app.get("/api/users/:userId", findUserById);
  app.put("/api/users/:userId", updateUser);
  app.delete("/api/users/:userId", deleteUser);
}
