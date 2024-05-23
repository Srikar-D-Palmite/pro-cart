import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from './slices/apiSlice.js';
import cartSliceReducer from './slices/cartSlice';

// Store is initiated with a reducer, which is a group of all the Slice reducers
const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        cart: cartSliceReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
    devtools: true,
});

export default store;