import { RequestHandler } from "express";
import logging from "../config/logging";
import bcrypt from "bcrypt";
import createHttpError from "http-errors";
import IUser from "../interfaces/user";

const NAMESPACE = "User";

export const validateToken: RequestHandler = async (req, res, next) => {
  logging.info(NAMESPACE, "Token validated");

  return res.status(200).json({
    message: "The user is athorized",
  });
};

export const register: RequestHandler<
  unknown,
  unknown,
  IUser,
  unknown
> = async (req, res, next) => {
  const username = req.body.username;
  const email = req.body.email;
  const passwordRaw = req.body.password;

  //   try {
  //     if (!username || !email || !passwordRaw) {
  //       throw createHttpError(400, `Parameters missing !`);
  //     }

  //     const existingUsername = await UserModel.findOne({
  //       username: username,
  //     }).exec();

  //     if (existingUsername) {
  //       throw createHttpError(
  //         409,
  //         "Username already taken . Please choose a different one or log in instead. "
  //       );
  //     }

  //     const existingEmail = await UserModel.findOne({
  //       email: email,
  //     }).exec();

  //     if (existingEmail) {
  //       throw createHttpError(
  //         409,
  //         "Email already taken . Please choose a different one or log in instead. "
  //       );
  //     }

  //     const passwordHashed = await bcrypt.hash(passwordRaw, 10);

  //     const newUser = await UserModel.create({
  //       username: username,
  //       email: email,
  //       password: passwordHashed,
  //     });

  //     req.session.userId = newUser._id;

  //     res.status(201).json(newUser);
  //   } catch (error) {
  //     next(error);
  //   }
};

export const login: RequestHandler = async (req, res, next) => {};

export const getAllusers: RequestHandler = async (req, res, next) => {};
