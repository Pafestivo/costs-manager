/**
 * Users validation middleware
 */

export function validateAddUser(req, res, next) {
    const { id, first_name, last_name, birthday } = req.body;

    if (
        id === undefined ||
        first_name === undefined ||
        last_name === undefined ||
        birthday === undefined
    ) {
        return res.status(400).json({
            id: "VALIDATION_ERROR",
            message: "missing required user fields",
        });
    }

    if (typeof id !== "number") {
        return res.status(400).json({
            id: "VALIDATION_ERROR",
            message: "id must be a number",
        });
    }

    if (typeof first_name !== "string" || typeof last_name !== "string") {
        return res.status(400).json({
            id: "VALIDATION_ERROR",
            message: "first_name and last_name must be strings",
        });
    }

    if (isNaN(Date.parse(birthday))) {
        return res.status(400).json({
            id: "VALIDATION_ERROR",
            message: "birthday must be a valid date",
        });
    }

    next();
}
