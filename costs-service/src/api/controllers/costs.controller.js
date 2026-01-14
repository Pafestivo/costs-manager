/**
 * controller layer for cost-related endpoints
 * handles HTTP requests and responses for cost operations
 */
import * as costsService from "../services/costs.service.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { logger } from "../../logger/pino.js";
import { HttpError } from "../../utils/httpError.js";
import { COST_CATEGORIES } from "../../utils/constants.js";
import { createLog } from "../../utils/createLog.js";

/**
 * add a new cost item
 * POST /api/add
 * @param {Object} req.body - { description, category, userid, sum, date? }
 * @returns {Object} created cost item
 */
export const addCost = asyncHandler(async (req, res) => {
  logger.info({ endpoint: "addCost" }, "Endpoint accessed: addCost");

  const { description, category, userid, sum, date } = req.body;

  // validate required fields
  if (!description || !category || !userid || sum === undefined) {
    throw new HttpError({
      status: 400,
      id: 1,
      message: "Missing required fields: description, category, userid, sum",
      expose: true,
    });
  }

  // validate category
  if (!COST_CATEGORIES.includes(category.toLowerCase())) {
    throw new HttpError({
      status: 400,
      id: 2,
      message: `Invalid category. Must be one of: ${COST_CATEGORIES.join(
        ", "
      )}`,
      expose: true,
    });
  }

  // validate sum is a positive number
  if (isNaN(sum) || sum < 0) {
    throw new HttpError({
      status: 400,
      id: 3,
      message: "Sum must be a positive number",
      expose: true,
    });
  }

  // create the cost item
  const cost = await costsService.addCost({
    description,
    category,
    userid: Number(userid),
    sum: Number(sum),
    date,
  });

  logger.info({ costId: cost._id }, "Cost item created successfully");

  // Log after successful operation (non-blocking)
  try {
    await createLog(
      "costs-service",
      "POST",
      "/api/add",
      201,
      JSON.stringify(cost)
    );
  } catch (logError) {
    logger.warn({ error: logError.message }, "Failed to create log entry");
  }

  res.status(201).json(cost);
});

/**
 * get monthly report for a user
 * GET /api/report?id={userid}&year={year}&month={month}
 * @param {Number} req.query.id - user ID
 * @param {Number} req.query.year - year
 * @param {Number} req.query.month - month (1-12)
 * @returns {Object} monthly report organized by category
 */
export const getMonthlyReport = asyncHandler(async (req, res) => {
  logger.info(
    { endpoint: "getMonthlyReport" },
    "Endpoint accessed: getMonthlyReport"
  );

  const { id, year, month } = req.query;

  // validate required query parameters
  if (!id || !year || !month) {
    throw new HttpError({
      status: 400,
      id: 4,
      message: "Missing required query parameters: id, year, month",
      expose: true,
    });
  }

  // validate numeric values
  const userid = Number(id);
  const yearNum = Number(year);
  const monthNum = Number(month);

  if (isNaN(userid) || isNaN(yearNum) || isNaN(monthNum)) {
    throw new HttpError({
      status: 400,
      id: 5,
      message: "Parameters id, year, and month must be valid numbers",
      expose: true,
    });
  }

  // validate month range
  if (monthNum < 1 || monthNum > 12) {
    throw new HttpError({
      status: 400,
      id: 6,
      message: "Month must be between 1 and 12",
      expose: true,
    });
  }

  // get the report
  const report = await costsService.getMonthlyReport(userid, yearNum, monthNum);

  logger.info(
    { userid, year: yearNum, month: monthNum },
    "Monthly report generated successfully"
  );

  res.status(200).json(report);
});

/**
 * get total costs for a specific user
 * GET /api/user/costs?id={userid}
 * @param {Number} req.query.id - user ID
 * @returns {Object} { userid, total } - aggregated total cost
 */
export const getUserCosts = asyncHandler(async (req, res) => {
  logger.info({ endpoint: "getUserCosts" }, "Endpoint accessed: getUserCosts");

  const { id } = req.query;

  // validate required query parameter
  if (!id) {
    throw new HttpError({
      status: 400,
      id: 8,
      message: "Missing required query parameter: id",
      expose: true,
    });
  }

  // validate numeric value
  const userid = Number(id);

  if (isNaN(userid)) {
    throw new HttpError({
      status: 400,
      id: 9,
      message: "Parameter id must be a valid number",
      expose: true,
    });
  }

  // get total costs for the user
  const result = await costsService.getUserCosts(userid);

  // Log after successful operation (non-blocking)
  try {
    await createLog(
      "costs-service",
      "GET",
      "/api/user/costs",
      200,
      JSON.stringify(req.query)
    );
  } catch (logError) {
    logger.warn({ error: logError.message }, "Failed to create log entry");
  }

  logger.info(
    { userid, total: result.total },
    "User total costs retrieved successfully"
  );

  res.status(200).json(result);
});
