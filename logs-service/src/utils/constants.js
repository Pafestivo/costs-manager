/**
  all constants that doesn't fit the .env file should go here
  below is a placeholder for a constant in the costs microservice for the categories
  you should add your own constants here, the placeholder should be deleted when you start your own microservice (unless its costs)
  follow the same pattern using Object.freeze() to prevent accidental modifications
  you can later import them wherever you need
 */
export const COST_CATEGORIES = Object.freeze([
  "food",
  "health",
  "housing",
  "sports",
  "education",
]);
