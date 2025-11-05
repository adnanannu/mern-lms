// src/features/api/zoomApi.js
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const zoomApi = createApi({
  reducerPath: "zoomApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_BACKEND_URL}/api/v1/zoom`,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    createZoomMeeting: builder.mutation({
      query: ({ courseId, topic, start_time, duration }) => ({
        url: `/create`,
        method: "POST",
        body: { courseId, topic, start_time, duration }, // send all required fields
      }),
    }),
    getZoomMeeting: builder.query({
      query: (courseId) => ({
        url: `/meeting/${courseId}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useCreateZoomMeetingMutation, useGetZoomMeetingQuery } = zoomApi;
