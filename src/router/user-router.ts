import express from "express";
import {
  deleteUser,
  getAllUsers,
  updateUser,
} from "../controllers/user-controller";
import { isAuthenticated, isOwner } from "../middlewares";

export default (router: express.Router) => {
  router.get("/users", isAuthenticated, getAllUsers);
  router.delete("/users/:id", isAuthenticated, isOwner, deleteUser);
  router.post("/users/update/:id", isAuthenticated, isOwner, updateUser);
};
