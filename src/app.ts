import "dotenv/config";
import express, { NextFunction, Request, Response } from "express";
import usersRoutes from "./routes/users";
import createHttpError, { isHttpError } from "http-errors";
import cors from "cors";

const app = express();

const allowedOrigins = ["http://localhost:3000"];

app.use(express.json());

const options: cors.CorsOptions = {
  origin: allowedOrigins,
  credentials: true,
};

app.use(cors(options));

// app.use(
//   session({
//     secret: env.SESSION_SECRET,
//     resave: false,
//     saveUninitialized: false,
//     cookie: {
//       maxAge: 60 * 60 * 1000,
//     },
//     rolling: true,
//     store: MongoStore.create({
//       mongoUrl: env.MONGO_CONNECTION_STRING,
//     }),
//   })
// );

app.use("/api/users", usersRoutes);

app.use((req, res, next) => {
  next(createHttpError(404, "Endpoint not found"));
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
  console.error(error);
  let errorMessage = "There is an error";
  let statusCode = 500;

  if (isHttpError(error)) {
    statusCode = error.status;
    errorMessage = error.message;
  }
  res.status(statusCode).json({ error: errorMessage });
});

export default app;
