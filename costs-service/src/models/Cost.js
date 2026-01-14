/**
 * cost model for managing cost items
 * schema includes description, category, userid, sum, and date
 * categories: food, health, housing, sports, education
 */
import mongoose from "mongoose";
import { COST_CATEGORIES } from "../utils/constants.js";

// define the cost schema with required fields
const costSchema = new mongoose.Schema(
  {
    // description of the cost item
    description: {
      type: String,
      required: true,
      trim: true,
    },
    // category of the cost (must be one of the valid categories)
    category: {
      type: String,
      required: true,
      enum: COST_CATEGORIES,
      lowercase: true,
    },
    // user ID (references the id field in User model, not _id)
    userid: {
      type: Number,
      required: true,
    },
    // cost amount (using Double for precision)
    sum: {
      type: mongoose.Schema.Types.Double,
      required: true,
      min: 0,
    },
    // date and time when the cost was incurred
    date: {
      type: Date,
      default: Date.now,
    },
  },
  {
    // automatically add createdAt and updatedAt fields
    timestamps: true,
  }
);

// create index for efficient querying by userid and date
costSchema.index({ userid: 1, date: 1 });

// create and export the Cost model
const Cost = mongoose.model("Cost", costSchema);

export default cost;
