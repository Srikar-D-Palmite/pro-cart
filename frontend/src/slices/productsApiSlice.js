import { PRODUCTS_URL } from "../constants";
import { apiSlice } from "./apiSlice";

// A function to inject the endpoints into the original API, but also give you that same API back.
export const productsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        // Using Redux, we no longer need to use an fetch/axios get request
        // Note "query" not "mutation"
        getProducts: builder.query({
            // equivalent to: function() {return {url: PRODUCTS_URL}} Where the return type is an object.
            query: () => ({
                url: PRODUCTS_URL,
            }),
            // After the last subscriber stops consuming the data + this amount of time, it will delete the data
            keepUnusedDataFor: 5
        }),
        getProductDetail: builder.query({
            query: (productId) => ({
                url: PRODUCTS_URL + "/" + productId,
            }),
            keepUnusedDataFor: 5
        })
    }),
});

// This is a query (get request) as opposed to a mutation (put/post?).
// productsApiSlice now contains just the getProducts endpoint, so we're exporting this slice of the API.
// Note, the naming is strict. It must be use...Query
export const { useGetProductsQuery, useGetProductDetailQuery } = productsApiSlice;