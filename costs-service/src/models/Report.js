/**
 * report model for implementing the Computed Design Pattern
 * stores pre-computed monthly reports for past months
 * improves performance by caching report data
 */
import mongoose from "mongoose";

// define the report schema for cached monthly reports
const reportSchema = new mongoose.Schema(
  {
    // user ID for whom the report is generated
    userid: {
      type: Number,
      required: true,
    },
    // year of the report
    year: {
      type: Number,
      required: true,
    },
    // month of the report (1-12)
    month: {
      type: Number,
      required: true,
      min: 1,
      max: 12,
    },
    // pre-computed costs data organized by category
    costs: {
      type: mongoose.Schema.Types.Mixed,
      required: true,
    },
  },
  {
    // automatically add createdAt and updatedAt fields
    timestamps: true,
  }
);

// create unique index for userid, year, and month
// this ensures only one report per user per month/year
reportSchema.index({ userid: 1, year: 1, month: 1 }, { unique: true });

// create and export the Report model
const Report = mongoose.model("Report", reportSchema);

export default report;
