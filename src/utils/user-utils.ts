import mongoose from "mongoose";
import { UserSchema } from "../db/users";
import {
  CreateUserParams,
  UpdateUserParams,
} from "../interface/create-user-params";
import logger from "./logger";

const UserModel = mongoose.model("User", UserSchema);

export abstract class UserUtils {
  public static getUser() {
    return UserModel.find();
  }

  public static getUserByEmail(email: string) {
    return UserModel.findOne({ email });
  }

  public static getUserBySessionToken(sessionToken: string) {
    return UserModel.findOne({ "authentication.sessionToken": sessionToken });
  }

  public static getUserById(id: string) {
    return UserModel.findById(id);
  }

  public static createUser(values: CreateUserParams) {
    return new UserModel(values)
      .save()
      .then((user) => {
        logger.info("User created successfully", user);
        return user.toObject();
      })
      .catch((error) => {
        logger.error("Error creating user", error);
        throw error;
      });
  }

  public static deleteUserById(id: string) {
    return UserModel.findOneAndDelete({ _id: id })
      .then((response) => {
        logger.info("User deleted successfully", response);
        return response;
      })
      .catch((error) => {
        logger.error("Error deleting user", error);
        throw error;
      });
  }

  public static updateUserById(id: string, values: UpdateUserParams) {
    return UserModel.findByIdAndUpdate(id, values);
  }

  public static searchUsers(query: string) {
    return UserModel.find({
      $or: [
        { username: { $regex: query, $options: "i" } },
        { email: { $regex: query, $options: "i" } },
      ],
    });
  }
}
