import { Product } from '../models/productModel.js';


export const getProductById = async (req, res) => {
    const { id } = req.params;

    try {
        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.status(200).json(product);

    } catch (error) {
        console.log("Error getting product by id", error);
        res.status(500).json({ message: error.message })
    }
}