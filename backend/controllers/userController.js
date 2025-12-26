import { Cart } from '../models/cartModel.js';
import { Product } from '../models/productModel.js';

// Cart
export const addToCart = async (req, res) => {
    try {
        const clerkId = req.user.id;
        const { productId, quantity } = req.body;

        if (!productId || !quantity) {
            return res.status(400).json({ message: "Product ID and quantity are required" });
        }

        // Verify product exists and has stock
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        if (product.stock < quantity) {
            return res.status(400).json({ message: "Insufficient stock" });
        }

        // Find or create cart for user
        let cart = await Cart.findOne({ clerkId });
        if (!cart) {
            cart = await Cart.create({ clerkId, items: [] });
        }

        // Check if product already in cart
        const existingItem = cart.items.find(item => item.product.toString() === productId);
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            cart.items.push({ product: productId, quantity });
        }

        await cart.save();
        await cart.populate('items.product');

        res.status(200).json(cart);
    } catch (error) {
        console.log("Error adding to cart", error);
        res.status(500).json({ message: error.message });
    }
}

export const getCart = async (req, res) => {
    try {
        const clerkId = req.user.id;

        let cart = await Cart.findOne({ clerkId }).populate('items.product');
        if (!cart) {
            cart = await Cart.create({ clerkId, items: [] });
        }

        res.status(200).json(cart);
    } catch (error) {
        console.log("Error fetching cart", error);
        res.status(500).json({ message: error.message });
    }
}

export const updateCartQuantity = async (req, res) => {
    try {
        const clerkId = req.user.id;
        const { productId } = req.params;
        const { quantity } = req.body;

        if (!productId || quantity === undefined) {
            return res.status(400).json({ message: "Product ID and quantity are required" });
        }

        if (quantity <= 0) {
            return res.status(400).json({ message: "Quantity must be greater than 0" });
        }

        // Verify product exists and has stock
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        if (product.stock < quantity) {
            return res.status(400).json({ message: "Insufficient stock" });
        }

        const cart = await Cart.findOne({ clerkId });
        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }

        const item = cart.items.find(item => item.product.toString() === productId);
        if (!item) {
            return res.status(404).json({ message: "Item not in cart" });
        }

        item.quantity = quantity;
        await cart.save();
        await cart.populate('items.product');

        res.status(200).json(cart);
    } catch (error) {
        console.log("Error updating cart quantity", error);
        res.status(500).json({ message: error.message });
    }
}

export const deleteFromCart = async (req, res) => {
    try {
        const clerkId = req.user.id;
        const { productId } = req.params;

        if (!productId) {
            return res.status(400).json({ message: "Product ID is required" });
        }

        const cart = await Cart.findOne({ clerkId });
        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }

        cart.items = cart.items.filter(item => item.product.toString() !== productId);
        await cart.save();
        await cart.populate('items.product');

        res.status(200).json(cart);
    } catch (error) {
        console.log("Error deleting from cart", error);
        res.status(500).json({ message: error.message });
    }
}

//Addressess
export const addAddress = async (req, res) => {
}
export const getAddress = async (req, res) => {
}
export const updateAddress = async (req, res) => {
}
export const deleteAddress = async (req, res) => {
}

//Wishlist
export const addToWishlist = async (req, res) => {
}
export const getWishlist = async (req, res) => {
}
export const deleteFromWishlist = async (req, res) => {
}
