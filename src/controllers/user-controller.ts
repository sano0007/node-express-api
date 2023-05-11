import express from "express";
import { UserUtils } from "../utils/user-utils";

export const getAllUsers = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const users = await UserUtils.getUser();
    return res.json(users);
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};
