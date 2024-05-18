import { PRODUCTS_URL } from "../constants";
import { apiSlice } from "./apiSlice";

export const productsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        // Using Redux, we no longer need to use an fetch/axios get request
        getProducts: builder.query({
            query: () => ({
                url: PRODUCTS_URL,
            }),
            // After the last subscriber stops consuming the data + this amount of time, it will delete the data
            keepUnusedDataFor: 5
        })
    }),
});

// This is a query (get request) as opposed to a mutation (put/post?)
export const { useGetProductsQuery } = productsApiSlice;