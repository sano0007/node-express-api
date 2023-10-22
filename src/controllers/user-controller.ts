import express from "express";
import {UserUtils} from "../utils/user-utils";

// Get all users
export const getAllUsers = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const users = await UserUtils.getUser();
    return res.json(users);
  } catch (error) {
    console.log(error);
    return res.sendStatus(400); // Bad Request
  }
};

// Delete a user by ID
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
    return res.sendStatus(400); // Bad Request
  }
};

// Update user information
export const updateUser = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { id } = req.params;
    const { username, email } = req.body;

    if (!username) {
      return res.sendStatus(400); // Bad Request
    }

    // const updateUser = await UserUtils.updateUserById(id, { email, username });
    // return res.json(updateUser);

    // Update username
    const user = await UserUtils.getUserById(id);
    user.username = username;
    await user.save();
    return res.json(user);
  } catch (error) {
    console.log(error);
    return res.sendStatus(400); // Bad Request
  }
};

// Search users based on a query
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

// Export user data as CSV
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

// Update user profile picture
export const updateProfilePicture = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { id } = req.params;
    const { profilePicture } = req.body;

    if (!profilePicture) {
      return res.sendStatus(400); // Bad Request
    }

    const user = await UserUtils.getUserById(id);
    user.profilePicture = profilePicture;
    await user.save();
    return res.json(user);
  } catch (error) {
    console.log(error);
    return res.sendStatus(400); // Bad Request
  }
};

// Update user bio
export const updateBio = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { id } = req.params;
    const { bio } = req.body;

    if (!bio) {
      return res.sendStatus(400); // Bad Request
    }

    const user = await UserUtils.getUserById(id);
    user.bio = bio;
    await user.save();
    return res.json(user);
  } catch (error) {
    console.log(error);
    return res.sendStatus(400); // Bad Request
  }
};
