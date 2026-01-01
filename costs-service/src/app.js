/**
  express app configuration
  other than adding routes this file shouldn't be changed
 */
import express from "express";
import { httpLogger } from "./logger/httpLogger.js";
import apiRoutes from "./api/routes/index.js";
import { notFoundMiddleware } from "./middleware/notFound.middleware.js";
import { errorMiddleware } from "./middleware/error.middleware.js";

const app = express();

app.use(express.json({ limit: "1mb" }));
app.use(httpLogger);

// add routes in this section
app.use("/api", apiRoutes);

// these are always at the bottom
app.use(notFoundMiddleware);
app.use(errorMiddleware);

export default app;
