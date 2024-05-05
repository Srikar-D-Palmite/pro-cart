import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import connectDB from "./config/db.js";
import productRoutes from "./routes/productRoutes.js";
const port = process.env.PORT || 5000;

connectDB();

const app = express();

app.get('/', function(req, res) {
    res.send("API is running...");
});

app.use('/api/products', productRoutes);

// Tells server to listen on a port. Without this, you cannot access the API
app.listen(port, () => console.log(`Server is running on port ${port}`));