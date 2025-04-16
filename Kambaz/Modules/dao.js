import model from "./model.js";

export function findModulesForCourse(courseId) {
  return model.find({ course: courseId });
}

export async function createModule(module) {
  const created = await model.create({ ...module });
  return created;
}

export function deleteModule(moduleId) {
  return model.deleteOne({ _id: moduleId });
  // const { modules } = Database;
  // Database.modules = modules.filter((module) => module._id !== moduleId);
 }
 

export function updateModule(moduleId, moduleUpdates) {
  const { modules } = Database;
  const module = modules.find((module) => module._id === moduleId);
  Object.assign(module, moduleUpdates);
  return module;
}
