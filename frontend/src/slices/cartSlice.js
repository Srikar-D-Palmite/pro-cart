// This will not be an apiSlice
import { createSlice } from '@reduxjs/toolkit';
import { updateCart } from '../utils/cartUtils';

// Retrieve cart or initialize it as empty
const initialState = localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : { cartItems: [] };

// Create a new slice. name, initial state, retrieved or initiated as above, and its reducers.
const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: function(state, action) {
            const actionItem = action.payload;

            const itemExist = state.cartItems.find((item) => item._id === actionItem._id);

            if (itemExist) {
                state.cartItems = state.cartItems.map((item) => item._id === itemExist._id ? actionItem : item);
            } else {
                state.cartItems = [...state.cartItems, actionItem];
            }

            return updateCart(state);
        },
        removeFromCart: function(state, action) {
            state.cartItems = state.cartItems.filter((x) => x._id !== action
            .payload);
            return updateCart(state);
        },
    },
});

export const { addToCart, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;