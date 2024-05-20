import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
// import { BASE_URL } from '../constants.js';
// {baseUrl: BASE_URL}
const baseQuery = fetchBaseQuery({baseUrl: "/"});

export const apiSlice = createApi({
    baseQuery,
    tagTypes: ['Product', 'Order', 'User'],
    // A group of queries and mutations endpoints, like "getProducts", which will be injected in other files (for organization)
    endpoints: (builder) => ({})
});