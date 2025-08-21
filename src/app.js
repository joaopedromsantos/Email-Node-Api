import "dotenv/config";
import express, { json } from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import emailRoutes from "./routes/email.routes.js";

const app = express();

app.use(helmet());

const allowedOrigins = process.env.FRONTEND_URL
  ? process.env.FRONTEND_URL.split(",")
  : [];

const corsOptions = {
  origin: (origin, callback) => {
    if (process.env.NODE_ENV !== "production" || !origin) {
      return callback(null, true);
    }

    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};

app.use(cors(corsOptions));

const limiter = rateLimit({
  windowMs: parseInt(process.env.REQUEST_MAX_MINUTES) * 60 * 1000,
  max: parseInt(process.env.REQUEST_MAX),
  standardHeaders: true,
  legacyHeaders: false,
  message: `Too many requests from this IP, please try again after ${process.env.REQUEST_MAX_MINUTES} minutes`,
});

app.use("/api", limiter);

app.use(json());

app.use("/api/email", emailRoutes);

export default app;
