import logging from "../config/logging";
import jwt from "jsonwebtoken";
import config from "../config/config";
import IUser from "../interfaces/user";

const NAMESPACE = "Auth";

const signJWT = (
  user: IUser,
  callback: (error: Error | null, token: string | null) => void
): void => {
  const timeSinchEpoch = new Date().getTime();
  const expirationTime =
    timeSinchEpoch + Number(config.server.token.expireTime) * 100000;

  const expirationTimeInSeconds = Math.floor(expirationTime / 1000);

  logging.info(NAMESPACE, `Attempting to sign the token ${user.username}`);

  try {
    jwt.sign(
      { username: user.username },
      config.server.token.secret,
      {
        issuer: config.server.token.issuer,
        algorithm: "ES256",
        expiresIn: expirationTimeInSeconds,
      },
      (error, token) => {
        if (error) {
          callback(error, null);
        } else if (token) {
          callback(null, token);
        }
      }
    );
  } catch (error: Error | unknown) {
    if (error instanceof Error) {
      logging.error(NAMESPACE, error.message, error);
      callback(error, null);
    } else {
      logging.error(NAMESPACE, "An unknown error occurred", error);
    }
  }
};

export default signJWT;
