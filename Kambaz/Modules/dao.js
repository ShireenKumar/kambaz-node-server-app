import model from "./model.js";

// Find all modules for a course
export function findModulesForCourse(courseId) {
  return model.find({ course: courseId });
}

// Create a module
export async function createModule(module) {
  const created = await model.create({ ...module });
  return created;
}

// Delete a module
export function deleteModule(moduleId) {
  return model.deleteOne({ _id: moduleId });
}

// ✅ Update and return the updated module document
export function updateModule(moduleId, moduleUpdates) {
  return model.findByIdAndUpdate(moduleId, moduleUpdates, { new: true });
}
