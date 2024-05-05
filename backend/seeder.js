// Data seeding is the process of populating a database with an initial set of data
import mongoose from "mongoose";
import dotenv from "dotenv";
import colors from "colors";
import users from "./data/users.js";
import products from "./data/products.js";
import User from "./models/userModel.js";
import Product from "./models/productModel.js";
import Order from "./models/orderModel.js";
import connectDB from './config/db.js';

dotenv.config();
connectDB();
async function importData() {
    try {
        await Order.deleteMany();
        await Product.deleteMany();
        await User.deleteMany();

        // Get admin user to insert data
        const createdUsers = await User.insertMany(users);
        const adminUser = createdUsers[0]._id;

        // Insert products into DB, with user as the admin user
        const sampleProducts = products.map((product) => {
            return { ...product, user: adminUser };
        });
        await Product.insertMany(sampleProducts);

        console.log("Data Imported!".green.inverse);
        process.exit();
    } catch (error) {
        console.log(`${error}`.red.inverse);
        process.exit(1);
    }
}

const destroyData = async function() {
    try {
        await Order.deleteMany();
        await Product.deleteMany();
        await User.deleteMany();
        
        console.log("Data Deleted!".red.inverse);
        process.exit();
    } catch (error) {
        console.log(`${error}`.red.inverse);
        process.exit(1);
    }
}

if (process.argv[2] === "-d") {
    destroyData();
} else if (process.argv[2] === "-i") {
    importData();
}