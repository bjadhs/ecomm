import mongoose from 'mongoose';
import { ENV } from '../config/env.js';
import { Order } from '../models/orderModel.js';
import { Product } from '../models/productModel.js';
import { User } from '../models/userModel.js';
import { Address } from '../models/addressModel.js';

const clerkID = "user_36sa4a0jofNHi9DCZKx0huJQxB8";
const productId = "6945ffe809a7a0787869b5ea";
const sampleAddress = [
    {
        label: "Home",
        fullName: "Brinda D",
        streetAddress: "123 Maple Avenue",
        city: "Franklin",
        state: "ACT",
        zipcode: "2913",
        phone: "+61425367890",
        isDefault: true
    },
    {
        label: "Work",
        fullName: "Brinda D",
        streetAddress: "456 Tech Blvd",
        city: "Narrahbundah",
        state: "ACT",
        zipcode: "2600",
        phone: "+61425367890",
        isDefault: false
    }
];


const seedOrders = async () => {
    try {
        await mongoose.connect(ENV.MONGODB_URI);
        console.log("Connected to MongoDB");
        await Order.deleteMany({});
        await Address.deleteMany({});
        console.log("Cleared existing orders and addresses");



        const user = await User.findOne({ clerkId: clerkID });
        const product = await Product.findById(productId);

        if (!user || !product) {
            console.log("Error: Specific user or product not found.");
            console.log(`User found: ${!!user}, Product found: ${!!product}`);
            process.exit(1);
        }

        const addresses = await Address.insertMany(sampleAddress);
        console.log("Seeded 2 addresses");

        const orders = [
            {
                user: user._id,
                clerkId: user.clerkId,
                items: [{
                    product: product._id,
                    name: product.name,
                    price: product.price,
                    quantity: 1,
                    image: product.images[0]
                }],
                shippingAddress: addresses[0]._id,
                paymentResult: {
                    id: "pay_sample_01",
                    status: "completed",
                    update_time: new Date().toISOString(),
                    email_address: user.email
                },
                totalPrice: product.price,
                status: "delivered",
                deliveredAt: new Date(),
                shippedAt: new Date()
            },
            {
                user: user._id,
                clerkId: user.clerkId,
                items: [{
                    product: product._id,
                    name: product.name,
                    price: product.price,
                    quantity: 2,
                    image: product.images[0]
                }],
                shippingAddress: addresses[1]._id,
                paymentResult: {
                    id: "pay_sample_02",
                    status: "completed",
                    update_time: new Date().toISOString(),
                    email_address: user.email
                },
                totalPrice: product.price * 2,
                status: "shipped",
                shippedAt: new Date(),
            }
        ];


        await Order.insertMany(orders);
        console.log(`Seeded ${orders.length} orders successfully`);

        process.exit(0);

    } catch (error) {
        console.error("Error seeding orders:", error);
        process.exit(1);
    }
};

seedOrders();
