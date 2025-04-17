import * as dao from "./dao.js";

export default function AssignmentRoutes(app) {

 
  
  const findAssignmentsForCourse = async (req, res) => {
    const { cid } = req.params;
    const assignments = await dao.findAssignmentsForCourses(cid);
    res.json(assignments);
  };
  app.get("/api/courses/:cid/assignments", findAssignmentsForCourse);

  app.post("/api/courses/:cid/assignments", async (req, res) => {
    const { cid } = req.params;
    const assignment = {...req.body, course: cid,};
    const newAssignment = await dao.createAssignments(assignment);
    res.json(newAssignment);
  });

  app.put("/api/assignments/:aid", async (req, res) => {
    const { aid } = req.params;
    const assignmentUpdates = req.body;
    const status = await dao.updateAssignments(aid, assignmentUpdates);
    res.send(status);
  });

  app.delete("/api/assignments/:aid", async (req, res) => {
    const { aid } = req.params;
    const status = await dao.deleteAssignments(aid);
    res.send(status);
  });
  
  app.get("/api/assignments/:aid", async (req, res) => {
    const assignment = await dao.findAssignmentByIds(req.params.aid);
    res.json(assignment);
  });




  app.get("/api/assignments", (req, res) => {
    const assignments = dao.findAllAssignments();
    res.send(assignments);
  });

  app.get("/api/assignments/:assignmentId", (req, res) => {
    const { assignmentId } = req.params;
    const assignment = dao.findAssignmentById(assignmentId);
    if (!assignment) {
      res.status(404).send({ message: "Assignment not found" });
    } else {
      res.send(assignment);
    }
  });

  app.get("/api/courses/:courseId/assignments", (req, res) => {
    const { courseId } = req.params;
    const assignments = dao.findAssignmentsForCourse(courseId);
    res.json(assignments);
  });

  app.post("/api/courses/:courseId/assignments", (req, res) => {
    const { courseId } = req.params;
    const newAssignment = dao.createAssignment({
      ...req.body,
      course: courseId,
    });
    res.send(newAssignment);
  });

  app.put("/api/assignments/:assignmentId", (req, res) => {
    const { assignmentId } = req.params;
    const assignmentUpdates = req.body;
    const updated = dao.updateAssignment(assignmentId, assignmentUpdates);

    if (!updated) {
      res.status(404).send({ message: "Assignment not found" });
    } else {
      res.send(updated);
    }
  });

  app.delete("/api/assignments/:assignmentId", (req, res) => {
    const { assignmentId } = req.params;
    dao.deleteAssignment(assignmentId);
    res.sendStatus(204);
  });



}
