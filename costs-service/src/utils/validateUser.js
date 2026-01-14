/**
 * Utility to validate user existence by calling the users microservice
 */

/**
 * Validate if a user exists by calling the users microservice
 * @param {Number} userid - user ID to validate
 * @returns {Promise<Boolean>} true if user exists
 * @throws {Error} if users service is unreachable or returns error
 */
export const validateUser = async (userid) => {
  // Skip validation in test environment
  if (process.env.NODE_ENV === "test") {
    return true;
  }

  try {
    const response = await fetch(`${process.env.USERS_SERVICE_URL}/${userid}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.status === 404) {
      return false; // User not found
    }

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Users service error: ${errorText}`);
    }

    return true; // User exists
  } catch (error) {
    // If it's a fetch error (network issue), throw it
    if (error.message.includes("fetch")) {
      throw new Error(`Failed to connect to users service: ${error.message}`);
    }
    throw error;
  }
};
