import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    stock: {
        type: Number,
        required: true,
        min: 0,
        default: 0
    },
    images: [{
        type: String,
        required: true
    }],
    category: {
        type: String,
        required: true
    },
    averageRating: {
        type: Number,
        required: true,
        min: 0,
        max: 5,
        default: 0
    },
    totalReviews: {
        type: Number,
        required: true,
        default: 0
    }
}, { timestamps: true })

const Product = mongoose.model('Product', productSchema);

export default Product;
