import express from "express";
import { UserUtils } from "../utils/user-utils";
import { AuthenticationHelper } from "../helpers/authentication-helper";

export const register = async (req: express.Request, res: express.Response) => {
  try {
    const { email, password, username } = req.body;

    if (!email || !password || !username) {
      return res.sendStatus(400);
    }

    const currentUser = await UserUtils.getUserByEmail(email);
    if (currentUser) {
      return res.status(400).json({ error: "Email already taken" });
    }

    const salt = AuthenticationHelper.random();
    const user = await UserUtils.createUser({
      email,
      username,
      authentication: {
        salt,
        password: AuthenticationHelper.authentication(salt, password),
      },
    });

    return res.status(200).json(user);
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

export const login = async (req: express.Request, res: express.Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.sendStatus(400);
    }

    const user = await UserUtils.getUserByEmail(email).select(
      "+authentication.salt + authentication.password"
    );

    if (!user) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    const expectedHash = AuthenticationHelper.authentication(
      user.authentication.salt,
      password
    );

    if (user.authentication.password !== expectedHash) {
      return res.status(403).json({ error: "Invalid email or password" });
    }

    const salt = AuthenticationHelper.random();
    user.authentication.sessionToken = AuthenticationHelper.authentication(
      salt,
      user._id.toString()
    );

    await user.save();

    res.cookie("SANO-AUTH", user.authentication.sessionToken, {
      domain: "localhost",
      path: "/",
    });

    return res.status(200).json(user);
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};
