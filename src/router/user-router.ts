import express from "express";
import { getAllUsers } from "../controllers/user-controller";
import { isAuthenticated } from "../middlewares";

export default (router: express.Router) => {
  router.get("/users", isAuthenticated, getAllUsers);
};
