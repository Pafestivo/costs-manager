/**
 * User mongoose model
 * responsible for mapping users collection
 */

import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        id: {
            type: Number,
            required: true,
            unique: true,
        },
        first_name: {
            type: String,
            required: true,
        },
        last_name: {
            type: String,
            required: true,
        },
        birthday: {
            type: Date,
            required: true,
        },
    },
    {
        versionKey: false,
    }
);

export const User = mongoose.model("User", userSchema);
