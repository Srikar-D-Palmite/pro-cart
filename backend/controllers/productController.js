import asyncHandler from "../middleware/asyncHandler.js";
import Product from "../models/productModel.js";

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
const getProducts = asyncHandler(async function(req, res) {
    const products = await Product.find({});
    res.json(products);
});

// @desc    Fetch a product by its ID
// @route   GET /api/products/:id
// @access  Public
const getProductById = asyncHandler(async function(req, res) {
    const product = await Product.findById(req.params.id);
    if(product) {
        return res.json(product);
    } else {
        res.status(404);
        throw new Error("Product not found");
    }
});

export { getProducts, getProductById };