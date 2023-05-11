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

export const deleteUser = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { id } = req.params;
    const deleteUser = await UserUtils.deleteUserById(id);

    return res.json(deleteUser);
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

export const updateUser = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { id } = req.params;
    const { username, email } = req.body;

    if (!username) {
      return res.sendStatus(400);
    }

    // const updateUser = await UserUtils.updateUserById(id, { email, username });
    // return res.json(updateUser);

    const user = await UserUtils.getUserById(id);
    user.username = username;
    await user.save();
    return res.json(user);
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};
