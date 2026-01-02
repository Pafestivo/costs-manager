/**
 * service layer for managing cost-related business logic
 * handles cost creation and report generation
 * making use of Computed Design Pattern for monthly reports
 */
import Cost from "../../models/Cost.js";
import Report from "../../models/Report.js";
import { HttpError } from "../../utils/httpError.js";
import { logger } from "../../logger/pino.js";
import { COST_CATEGORIES } from "../../utils/constants.js";

/**
 * add a new cost item to the database
 * @param {Object} costData - cost item data (description, category, userid, sum, date)
 * @returns {Promise<Object>} the created cost item
 */
export const addCost = async (costData) => {
  const { description, category, userid, sum, date } = costData;

  // TODO: add a call to the users microservice here to validate userid
  // following computed design pattern, we have to block adding costs to past months (because the report is already cached in DB)
  const costDate = date ? new Date(date) : new Date();
  const now = new Date();
  const currentMonth = now.getMonth() + 1;
  const currentYear = now.getFullYear();
  const costMonth = costDate.getMonth() + 1;
  const costYear = costDate.getFullYear();

  // check if the cost date is in a past month
  if (
    costYear < currentYear ||
    (costYear === currentYear && costMonth < currentMonth)
  ) {
    throw new HttpError({
      status: 400,
      id: 7,
      message: "Cannot add costs with dates from past months",
      expose: true,
    });
  }

  // create the cost item
  const cost = new Cost({
    description,
    category: category.toLowerCase(),
    userid,
    sum,
    date: costDate,
  });

  // save to database
  await cost.save();
  return cost;
};

/**
 * get monthly report for a specific user
 * implements computed design pattern - caches past month reports
 * @param {Number} userid - user ID
 * @param {Number} year - year
 * @param {Number} month - month (1-12)
 * @returns {Promise<Object>} monthly report organized by category
 */
export const getMonthlyReport = async (userid, year, month) => {
  //TODO: validate userid by calling the users microservice

  // check if the requested month is in the past
  const now = new Date();
  const currentMonth = now.getMonth() + 1;
  const currentYear = now.getFullYear();
  const isPastMonth =
    year < currentYear || (year === currentYear && month < currentMonth);

  // if it's a past month, check if we have a cached report
  if (isPastMonth) {
    const cachedReport = await Report.findOne({ userid, year, month });
    if (cachedReport) {
      return {
        userid: cachedReport.userid,
        year: cachedReport.year,
        month: cachedReport.month,
        costs: cachedReport.costs,
      };
    }
  }

  // generate the report from raw cost data
  const report = await generateReport(userid, year, month);

  // if it's a past month, cache the report for future requests
  if (isPastMonth) {
    try {
      await Report.create({
        userid,
        year,
        month,
        costs: report.costs,
      });
    } catch (error) {
      // log the caching error but still return the generated report, request didn't fail
      //TODO: log this using the logs microservice
      logger.error({ error, userid, year, month }, "Failed to cache report");
    }
  }

  return report;
};

/**
 * generate monthly report from raw cost data
 * @param {Number} userid - user ID
 * @param {Number} year - year
 * @param {Number} month - month (1-12)
 * @returns {Promise<Object>} generated report
 */
const generateReport = async (userid, year, month) => {
  // calculate date range for the month
  const startDate = new Date(year, month - 1, 1);
  const endDate = new Date(year, month, 0, 23, 59, 59, 999);

  // fetch all costs for the user in the specified month
  const costs = await Cost.find({
    userid,
    date: {
      $gte: startDate,
      $lte: endDate,
    },
  }).sort({ date: 1 });

  // group costs by category
  const categorizedCosts = {};
  COST_CATEGORIES.forEach((category) => {
    categorizedCosts[category] = [];
  });

  // process each cost item
  costs.forEach((cost) => {
    const day = cost.date.getDate();
    categorizedCosts[cost.category].push({
      sum: cost.sum,
      description: cost.description,
      day,
    });
  });

  // format the response
  const costsArray = COST_CATEGORIES.map((category) => {
    return {
      [category]: categorizedCosts[category],
    };
  });

  return {
    userid,
    year,
    month,
    costs: costsArray,
  };
};

/**
 * get total costs for a specific user
 * @param {Number} userid - user ID
 * @returns {Promise<Object>} { userid, total } - aggregated total cost
 */
export const getUserCosts = async (userid) => {
  // TODO: validate userid by calling the users microservice

  // aggregate total costs for the user
  const result = await Cost.aggregate([
    { $match: { userid } },
    { $group: { _id: null, total: { $sum: "$sum" } } },
  ]);

  // if no costs found, return total of 0
  const total = result.length > 0 ? result[0].total : 0;

  return {
    userid,
    total,
  };
};
