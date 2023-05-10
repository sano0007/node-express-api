import express from "express";
import { register } from "../controllers/auth-controller";

export default (router: express.Router) => {
  router.post("/auth/register", register);
};
