import express from "express";
import {
  deleteUser,
  exportUserData,
  getAllUsers,
  searchUsers,
  updateBio,
  updateProfilePicture,
  updateUser,
} from "../controllers/user-controller";
import { isAuthenticated, isOwner } from "../middlewares";

export default (router: express.Router) => {
  router.get("/users", isAuthenticated, getAllUsers);
  router.delete("/users/:id", isAuthenticated, isOwner, deleteUser);
  router.post("/users/update/:id", isAuthenticated, isOwner, updateUser);
  router.post("/users/update/:id", isAuthenticated, isOwner, searchUsers);
  router.get("/users/update/:id", isAuthenticated, isOwner, exportUserData);
  router.post("/users/update/:id", isAuthenticated, isOwner, updateBio);
  router.post(
    "/users/update/:id",
    isAuthenticated,
    isOwner,
    updateProfilePicture
  );
};
