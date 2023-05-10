import mongoose from "mongoose";
import { UserSchema } from "../db/users";
import { CreateUserParams } from "../interface/create-user-params";

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
    return new UserModel(values).save().then((user) => user.toObject());
  }

  public deleteUserById(id: string) {
    return UserModel.findOneAndDelete({ _id: id });
  }

  public updateUserById(id: string, values: Record<string, any>) {
    return UserModel.findByIdAndUpdate(id, values);
  }
}
