import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080", // your backend root
    credentials: "include",           // include cookies
    // optionally prepare headers for token-based auth
  }),
  tagTypes: ["User"],
  endpoints: () => ({}),
});
