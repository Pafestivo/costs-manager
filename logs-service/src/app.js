import express from "express";
import { httpLogger } from "./logger/httpLogger.js";
import apiRoutes from "./api/routes/index.js";
import { dbRequestLogger } from "./middleware/dbRequestLogger.middleware.js";
import { notFoundMiddleware } from "./middleware/notFound.middleware.js";
import { errorMiddleware } from "./middleware/error.middleware.js";

const app = express();

app.use(express.json({ limit: "1mb" }));
app.use(httpLogger);

// Log requests to the database
app.use(dbRequestLogger(process.env.SERVICE_NAME || "logs-service"));

app.use("/api", apiRoutes);

app.use(notFoundMiddleware);
app.use(errorMiddleware);

export default app;
