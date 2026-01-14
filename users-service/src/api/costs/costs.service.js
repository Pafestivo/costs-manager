/**
 * Costs service
 * Handles communication with the costs microservice
 */

/**
 * get total costs for a specific user by calling the costs microservice
 * @param {number} userId
 * @returns {Promise<number>} total cost for the user
 */
export async function getTotalCostByUserId(userId) {
  try {
    const response = await fetch(
      `${process.env.COSTS_SERVICE_URL}?id=${userId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      // If user not found or other error, return 0
      if (response.status === 404) {
        return 0;
      }
      const errorText = await response.text();
      throw new Error(`Costs service error: ${errorText}`);
    }

    const data = await response.json();
    return data.total || 0;
  } catch (error) {
    // If costs service is unreachable, return 0 as fallback
    console.error(
      `Failed to get total cost for user ${userId}:`,
      error.message
    );
    return 0;
  }
}
