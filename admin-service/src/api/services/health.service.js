/**
  service placeholder, to create your own service make a new file in this directory and follow this pattern
  a service is basically a module that contains logic related to a specific feature and can be used in the controllers
  for example: 
    - userService would contain logic like .createUser(), .getUserById(), etc.
    - costsService would contain logic like .addCost(), .getMonthlyReportForUser(), etc.

  services handle core logic like data processing, database queries and external API calls. 
  this structure will help us to write logic tests without needing to mock HTTP requests/responses.
 */
import mongoose from "mongoose";

export const healthService = {
  async status() {
    return {
      service: process.env.SERVICE_NAME,
      ok: true,
      mongo:
        mongoose.connection?.readyState === 1 ? "connected" : "disconnected",
      timestamp: new Date().toISOString(),
    };
  },
};
