import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import products from './data/products.js';
const port = process.env.PORT || 5000;

const app = express();

app.get('/', function(req, res) {
    res.send("API is running...");
});

app.get('/api/products', function(req, res) {
    res.json(products);
});

app.get('/api/products/:id', function(req, res) {
    res.json(products.find((product) => product._id === req.params.id));
});

// Tells server to listen on a port. Without this, you cannot access the API
app.listen(port, () => console.log(`Server is running on port ${port}`));