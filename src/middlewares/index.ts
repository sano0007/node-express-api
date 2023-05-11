import express from "express";
import { UserUtils } from "../utils/user-utils";
import { merge } from "lodash";

export const isAuthenticated = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const sessionToken = req.cookies["SANO-AUTH"];

    if (!sessionToken) {
      return res.sendStatus(403);
    }

    const currentUser = await UserUtils.getUserBySessionToken(sessionToken);

    if (!currentUser) {
      return res.sendStatus(403);
    }
    merge(req, { identity: currentUser });
    return next();
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};
