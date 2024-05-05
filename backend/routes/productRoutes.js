import express from "express";
const router = express.Router();
import asyncHandler from "../middleware/asyncHandler.js";
import Product from "../models/productModel.js";

router.get('/', asyncHandler(async function(req, res) {
    const products = await Product.find({});
    res.json(products);
}));

router.get('/:id', asyncHandler(async function(req, res) {
    const product = await Product.findById(req.params.id);
    if(product) {
        return res.json(product);
    }
    res.status(404).json({ message: 'Product not found' });
}));

export default router;