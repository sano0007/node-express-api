import crypto from "crypto";

export abstract class AuthHelper {
  public static random() {
    return crypto.randomBytes(128).toString("base64");
  }

  public static authentication(salt: string, password: string) {
    return crypto
      .createHmac("sha256", [salt, password].join("/"))
      .update(process.env.SECRET)
      .digest();
  }
}