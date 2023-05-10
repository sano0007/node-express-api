import express from "express";
import { UserUtils } from "../utils/user-utils";
import { AuthHelper } from "../helpers/auth-helper";

export const register = async (req: express.Request, res: express.Response) => {
  try {
    const { email, password, username } = req.body;

    if (!email || !password || !username) {
      return res.sendStatus(400);
    }

    const currentUser = await UserUtils.getUserByEmail(email);
    if (!currentUser) {
      return res.sendStatus(400);
    }

    const salt = AuthHelper.random();
    const user = await UserUtils.createUser({
      email,
      username,
      authentication: {
        salt,
        password: AuthHelper.authentication(salt, password),
      },
    });

    return res.status(200).json(user).end();
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};
