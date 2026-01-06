// logs-service/src/models/logs.model.js
import mongoose from "mongoose";

const logSchema = new mongoose.Schema(
  {
    service: { type: String, required: true },     // service name
    method: { type: String, required: true },      // GET/POST/...
    url: { type: String, required: true },         // /api/report?...
    status: { type: Number, required: true },      // 200/404/500
    message: { type: String, default: "" },        // statusMessage or custom message
    timestamp: { type: Date, default: Date.now },
  },
  { versionKey: false }
);

export const LogModel = mongoose.model("Log", logSchema, "logs");
