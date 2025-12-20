import { Order } from "../models/orderModel.js";

export const createOrder = async (req, res) => {
    try {
        const { clerkId } = req.user;
        const { items, shippingAddress, paymentResult, totalPrice } = req.body;

        if (!items && items.length === 0) {
            return res.status(400).json({ message: "Order items are required" })
        }

        const order = Order.create({
            clerkId,
            shippingAddress,
            items,
            paymentResult,
            totalPrice,
        })
        console.log("Order created successfully", order);
        res.status(201).json(order);
    } catch (error) {
        console.log("Error creating order", error);
        res.status(500).json({ message: error.message });
    }

}

export const getUsersOrders = async (req, res) => {
    try {
        const { clerkId } = req.user;

        const orders = await Order.find({ clerkId }).populate("items.product").sort({ createdAt: -1 });
        console.log("Orders fetched successfully", orders);
        res.status(200).json(orders);
    } catch (error) {
        console.log("Error fetching orders", error);
        res.status(500).json({ message: error.message });
    }


}