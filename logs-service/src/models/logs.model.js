
/*
  This file defines the Mongoose schema and model for log entries.
  It specifies the structure and types for log documents stored in MongoDB.
*/
import mongoose from "mongoose";


// Define log schema
const logSchema = new mongoose.Schema(
  {
    service: { type: String, required: true },     // service name
    method: { type: String, required: true },      // GET/POST/...
    url: { type: String, required: true },         // /api/report?...
    status: { type: Number, required: true },      // 200/404/500
    message: { type: String, default: "" },        // statusMessage or custom message
    timestamp: { type: Date, default: Date.now },  // log timestamp
  },
  { versionKey: false }
);


// Export log model
export const LogModel = mongoose.model("Log", logSchema, "logs");
