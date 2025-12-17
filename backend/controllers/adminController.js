import { User } from '../models/userModel.js';
import { Order } from '../models/orderModel.js';
import { Product } from '../models/productModel.js';

export const createProduct = async (req, res) => {
    try {
        const { name, description, price, stock, category } = req.body;
        if (!name || !description || !price || !stock || !category) {
            return res.status(400).json({ message: "All fields are required" })
        }

        const product = await Product.create({
            name,
            description,
            price: parseFloat(price),
            stock: parseInt(stock),
            category,
        })
        res.status(201).json(product);
        console.log("Product created successfully", product);
    } catch (error) {
        console.log("Error creating product", error);
        res.status(500).json({ message: error.message });
    }
}

export const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find().sort({ createdAt: -1 });
        res.status(200).json(products);
    } catch (error) {
        console.log("Error getting products", error);
        res.status(500).json({ message: error.message });
    }
}


export const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description, price, stock, category } = req.body;
        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).json({ message: "Product not found" })
        }
        if (name) product.name = name;
        if (description) product.description = description;
        if (price) product.price = parseFloat(price);
        if (stock) product.stock = parseInt(stock);
        if (category) product.category = category;

        await product.save();
        res.status(200).json(product);
    } catch (error) {
        console.log("Error updating product", error);
        res.status(500).json({ message: error.message });
    }

}

export const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findByIdAndDelete(id);

        if (!product) {
            return res.status(404).json({ message: "Product not found" })
        }

        res.status(200).json(product);
    } catch (error) {
        console.log("Error deleting product", error);
        res.status(500).json({ message: error.message });
    }

}

export const getAllOrders = async (req, res) => {
    try {
        const order = await Order.findAll().populate("user", ["name email"]).populate("items.product").sort({ createdAt: -1 });
        res.status(200).json(order);
    } catch (error) {
        console.log("Error getting orders", error);
        res.status(500).json({ message: error.message });
    }
}

export const updateOrderStatus = async (req, res) => {

    try {
        const { id } = req.params;
        const { status } = req.body;

        if (!["pending", "shipped", "delivered"].includes(status)) {
            return res.status(400).json({ message: "Invalid status" })
        }
        const order = Order.findById(id);
        if (!order) {
            return res.status(404).json({ message: "Order not found" })
        }
        order.status = status;
        if (status === "delivered" && !order.deliveredAt) {
            order.deliveredAt = new Date();
        }
        if (status === "shipped" && !order.shippedAt) {
            order.shippedAt = new Date();
        }
        await order.save();
        res.status(200).json(order);
    } catch (error) {
        console.log("Error updating order status", error);
        res.status(500).json({ message: error.message });
    }
}


export const getAllCustomers = async (req, res) => {
    try {
        const customers = await User.findAll().sort({ createdAt: -1 });
        res.status(200).json({ customers })
    } catch (error) {
        console.log(`Error fetching customer data: ${error}`)
        res.status(500).json({ message: error.message });
    }
}
