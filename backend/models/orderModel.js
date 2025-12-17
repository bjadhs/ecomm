
import mongoose from "mongoose";

const OrderItemSchema = new mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true
    },
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        min: 1
    },
    image: {
        type: String,
        required: true
    }
})

const OrderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    clerkId: {
        type: String,
        required: true
    },
    items: [OrderItemSchema],
    shippingAddress: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Address",
        required: true
    },
    paymentResult: {
        type: Object,
        required: true
    },
    totalPrice: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        required: true,
        enum: ["pending", "shipped", "delivered", "cancelled"],
        default: "pending"
    },
    deliveredAt: {
        type: Date,
    },
    shippedAt: {
        type: Date,
    }
}, { timestamps: true })


export const Order = mongoose.model("Order", OrderSchema)