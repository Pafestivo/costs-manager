export const createLog = async (
    serviceName,
    method,
    url,
    status,
    message = ""
) => {
    const response = await fetch(process.env.LOG_SERVICE_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            service: serviceName,
            method,
            url,
            status,
            message,
        }),
    });

    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to create log: ${errorText}`);
    }

    return response.json();
};
