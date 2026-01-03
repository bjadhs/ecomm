import mongoose from "mongoose";

const addressSchema = new mongoose.Schema({
    label: {
        type: String,
        required: true
    },
    fullName: {
        type: String,
        required: true
    },
    streetAddress: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    zipcode: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    },
    isDefault: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

export const Address = mongoose.model("Address", addressSchema)
