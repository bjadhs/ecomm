import { User } from '../models/userModel.js';
import { Order } from '../models/orderModel.js';
import { Product } from '../models/productModel.js';
import cloudinary from '../config/cloudinary.js';

export const createProduct = async (req, res) => {
    try {
        const { name, description, price, stock, category } = req.body;
        if (!name || !description || !price || !stock || !category) {
            return res.status(400).json({ message: "All fields are required.." })
        }

        if (!Array.isArray(req.files) || !req.files.length === 0) {
            return res.status(400).json({ message: "Please upload at least one image" })
        }
        if (req.files.length > 3) {
            return res.status(400).json({ message: "Please upload at most three images" })
        }

        // Upload images to cloudinary
        const uploadPromise = req.files.map((file) => {
            return cloudinary.uploader.upload(file.path, { folder: "products" })
        })
        const uploadResult = await Promise.all(uploadPromise);
        const imageUrl = uploadResult.map((image) => {
            return image.secure_url;
        })


        const product = await Product.create({
            name,
            description,
            price: parseFloat(price),
            stock: parseInt(stock),
            category,
            images: imageUrl
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

        // Update images if new image updated
        if (req.files && req.files.length > 0) {

            if (req.files.length > 3) {
                return res.status(400).json({ message: "Please upload at most three images" })
            }
            // Delete old images from Cloudinary
            if (product.images && product.images.length > 0) {
                const deletePromises = product.images.map((imageUrl) => {
                    const publicId = imageUrl.split('/').slice(-2).join('/').split('.')[0];
                    return cloudinary.uploader.destroy(publicId);
                });
                await Promise.all(deletePromises);
            }
            const uploadPromise = req.files.map((file) => {
                return cloudinary.uploader.upload(file.path, { folder: "products" })
            })
            const uploadResult = await Promise.all(uploadPromise);
            console.log("Upload result", uploadResult);
            const imageUrl = uploadResult.map((image) => {
                return image.secure_url;
            })
            product.images = imageUrl;
        }

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
        const product = await Product.findById(id);

        if (!product) {
            return res.status(404).json({ message: "Product not found" })
        }
        // Delete images from cloudinary
        if (product.images && product.images.length > 0) {
            const deletePromises = product.images.map((imageUrl) => {
                const publicId = imageUrl.split('/').slice(-2).join('/').split('.')[0];
                return cloudinary.uploader.destroy(publicId);
            });
            await Promise.all(deletePromises);
        }
        await Product.findByIdAndDelete(id);

        res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
        console.log("Error deleting product", error);
        res.status(500).json({ message: error.message });
    }

}


export const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find().populate("user", ["name", "email"]).populate("items.product").sort({ createdAt: -1 });
        res.status(200).json(orders);
    } catch (error) {
        console.log("Error getting orders", error);
        res.status(500).json({ message: error.message });
    }
}

export const updateOrderStatus = async (req, res) => {

    try {
        const { orderId } = req.params;
        const { status } = req.body;

        if (!["pending", "shipped", "delivered"].includes(status)) {
            return res.status(400).json({ message: "Invalid status" })
        }
        const order = await Order.findById(orderId);
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
        const customers = await User.find({}).sort({ createdAt: -1 });
        res.status(200).json(customers)
    } catch (error) {
        console.log(`Error fetching customer data: ${error}`)
        res.status(500).json({ message: error.message });
    }
}
