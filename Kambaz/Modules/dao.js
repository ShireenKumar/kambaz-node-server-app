import model from "./model.js";
import { v4 as uuidv4 } from "uuid";
// Find all modules for a course
export function findModulesForCourse(courseId) {
  return model.find({ course: courseId });
}

// Create a module
export function createModule(module) {
  const newModule = { ...module, _id: uuidv4() };
  return model.create(newModule);
  // Database.modules = [...Database.modules, newModule];
  // return newModule;
 }
 

// Delete a module
export function deleteModule(moduleId) {
  return model.deleteOne({ _id: moduleId });
}

// ✅ Update and return the updated module document
export function updateModule(moduleId, moduleUpdates) {
  return model.findByIdAndUpdate(moduleId, moduleUpdates, { new: true });
}
