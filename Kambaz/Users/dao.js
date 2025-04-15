import model from "./model.js";
import { v4 as uuidv4 } from "uuid";

export const findAllUsers = () => model.find().lean();
export const findUserById = (userId) => model.findById(userId).lean();
export const findUserByUsername = (username) => model.findOne({ username }).lean();
export const findUserByCredentials = (username, password) =>
  model.findOne({ username, password }).lean();
export const updateUser = (userId, user) => model.updateOne({ _id: userId }, { $set: user });
export const deleteUser = (userId) => model.deleteOne({ _id: userId });
export const findUsersByRole = (role) => model.find({ role }).lean();
export const findUsersByPartialName = (partialName) => {
  const regex = new RegExp(partialName, "i");
  return model.find({
    $or: [{ firstName: { $regex: regex } }, { lastName: { $regex: regex } }],
  }).lean();
};

export const createUser = (user) => {
  const newUser = { ...user, _id: uuidv4() };
  return model.create(newUser);
};
