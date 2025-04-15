import Database from "../Database/index.js";
import { v4 as uuidv4 } from "uuid";

export function findAllAssignments() {
  return Database.assignments;
}

export function findAssignmentById(assignmentId) {
  const { assignments } = Database;
  return assignments.find((a) => a._id === assignmentId);
}

export function findAssignmentsForCourse(courseId) {
  const { assignments } = Database;
  return assignments.filter((assignment) => assignment.course === courseId);
}

export function createAssignment(assignment) {
  const newAssignment = {
    ...assignment,
    _id: uuidv4(), // always override
  };
  Database.assignments = [...Database.assignments, newAssignment];
  return newAssignment;
}

export function deleteAssignment(assignmentId) {
  const { assignments } = Database;
  Database.assignments = assignments.filter((a) => a._id !== assignmentId);
}

export function updateAssignment(assignmentId, assignmentUpdates) {
  const { assignments } = Database;
  const assignment = assignments.find((a) => a._id === assignmentId);

  if (!assignment) {
    return null;
  }

  Object.assign(assignment, assignmentUpdates);
  return assignment;
}
