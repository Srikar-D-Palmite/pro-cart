import jwt from 'jsonwebtoken';
import asyncHandler from './asyncHandler.js';
import User from '../models/userModel.js';

// Protect routes. Only for logged in users.
const protect = asyncHandler(async function(req, res, next) {
    let token;

    // Read the JWT from the cookie. jwt is the name of the token/body variable we set in user controller
    token = req.cookies.jwt;

    if(token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            // Get user info by ID from Json Web Token, without the password field. Store it in request, to be used in controllers.
            req.user = await User.findById(decoded.userId).select('-password');
            next();
        } catch(error) {
            console.log(error);
            res.status(401);
            throw new Error('Not authorized, token failed');
        }
    } else {
        res.status(401);
        throw new Error('Not authorized, no token');
    }
});

const noProtect = asyncHandler(async function (req, res, next) {
    let token = req.cookies.jwt;
    if (token) {
        res.status(401);
        throw new Error('Already logged in');
    }
    next();
})

// Admin middleware. Only for logged in admins
const admin = function(req, res, next) {
    if (req.user && req.user.isAdmin) {
        next();
    } else {
        res.status(401);
        throw new Error('Not authorized as Admin');
    }
}

export { protect, admin, noProtect };