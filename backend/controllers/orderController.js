import { Order } from "../models/orderModel.js";

import { User } from "../models/userModel.js";
import { Cart } from "../models/cartModel.js";

export const createOrder = async (req, res) => {
    try {
        const clerkId = req.user.id;
        const { items, shippingAddress, paymentResult, totalPrice } = req.body;

        if (!items || items.length === 0) {
            return res.status(400).json({ message: "Order items are required" })
        }

        const user = await User.findOne({ clerkId });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const order = await Order.create({
            user: user._id,
            clerkId,
            shippingAddress,
            items,
            paymentResult,
            totalPrice,
        })
        console.log("Order created successfully", order);

        // Clear user's cart
        await Cart.findOneAndDelete({ clerkId });

        res.status(201).json(order);
    } catch (error) {
        console.log("Error creating order", error);
        res.status(500).json({ message: error.message });
    }

}

export const getUsersOrders = async (req, res) => {
    try {
        const clerkId = req.user.id;

        const orders = await Order.find({ clerkId }).populate("items.product").sort({ createdAt: -1 });
        console.log("Orders fetched successfully", orders);
        res.status(200).json(orders);
    } catch (error) {
        console.log("Error fetching orders", error);
        res.status(500).json({ message: error.message });
    }


}