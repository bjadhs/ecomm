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

export const getProductById = async (req, res) => {

}

export const updateProduct = async (req, res) => {

}

export const deleteProduct = async (req, res) => {

}
