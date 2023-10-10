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

export const searchUsers = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { query } = req.query;

    const searchResults = await UserUtils.searchUsers(query.toString());

    return res.json(searchResults);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export const exportUserData = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { id } = req.params;

    const user = await UserUtils.getUserById(id);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.setHeader("Content-Disposition", "attachment; filename=user-data.csv");
    res.setHeader("Content-Type", "text/csv");

    const csvData = UserUtils.generateUserDataCSV(user);
    res.send(csvData);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export const updateProfilePicture = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { id } = req.params;
    const { profilePicture } = req.body;

    if (!profilePicture) {
      return res.sendStatus(400);
    }

    const user = await UserUtils.getUserById(id);
    user.profilePicture = profilePicture;
    await user.save();
    return res.json(user);
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

export const updateBio = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { id } = req.params;
    const { bio } = req.body;

    if (!bio) {
      return res.sendStatus(400);
    }

    const user = await UserUtils.getUserById(id);
    user.bio = bio;
    await user.save();
    return res.json(user);
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};
