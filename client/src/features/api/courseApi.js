import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Hardcoded backend URL for live server
const BASE_URL = "https://tutorzz.com";

export const courseApi = createApi({
  reducerPath: "courseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    credentials: "include", // send cookies if needed
  }),
  tagTypes: ["Refetch_Creator_Course", "Refetch_Lecture"],
  endpoints: (builder) => ({
    // Create a new course
    createCourse: builder.mutation({
      query: (data) => ({
        url: "api/v1/course",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Refetch_Creator_Course"],
    }),

    // Search courses
    getSearchCourse: builder.query({
      query: ({ searchQuery, categories, sortByPrice }) => {
        let queryString = `api/v1/course/search?query=${encodeURIComponent(searchQuery)}`;
        if (categories?.length) {
          queryString += `&categories=${categories.map(encodeURIComponent).join(",")}`;
        }
        if (sortByPrice) {
          queryString += `&sortByPrice=${encodeURIComponent(sortByPrice)}`;
        }
        return { url: queryString, method: "GET" };
      },
      async onQueryStarted(args, { queryFulfilled }) {
        try {
          const result = await queryFulfilled;
          console.log("Search courses response:", result.data);
        } catch (err) {
          console.error("Search courses error:", err);
        }
      },
    }),

    // Get published courses
    getPublishedCourse: builder.query({
      query: () => ({ url: "api/v1/course/published-courses", method: "GET" }),
      async onQueryStarted(_, { queryFulfilled }) {
        try {
          const result = await queryFulfilled;
          console.log("Published courses response:", result.data);
        } catch (err) {
          console.error("Published courses error:", err);
        }
      },
    }),

    // Get all courses created by logged-in user
    getCreatorCourse: builder.query({
      query: () => ({ url: "api/v1/course", method: "GET" }),
      providesTags: ["Refetch_Creator_Course"],
      async onQueryStarted(_, { queryFulfilled }) {
        try {
          const result = await queryFulfilled;
          console.log("Creator courses response:", result.data);
        } catch (err) {
          console.error("Creator courses error:", err);
        }
      },
    }),

    // Edit a course
    editCourse: builder.mutation({
      query: ({ formData, courseId }) => ({
        url: `api/v1/course/${courseId}`,
        method: "PUT",
        body: formData,
      }),
      invalidatesTags: ["Refetch_Creator_Course"],
    }),

    // Get course by ID
    getCourseById: builder.query({
      query: (courseId) => ({ url: `api/v1/course/${courseId}`, method: "GET" }),
    }),

    // Create a lecture
    createLecture: builder.mutation({
      query: ({ lectureTitle, courseId }) => ({
        url: `api/v1/course/${courseId}/lecture`,
        method: "POST",
        body: { lectureTitle },
      }),
    }),

    // Get course lectures
    getCourseLecture: builder.query({
      query: (courseId) => ({ url: `api/v1/course/${courseId}/lecture`, method: "GET" }),
      providesTags: ["Refetch_Lecture"],
    }),

    // Edit lecture
    editLecture: builder.mutation({
      query: ({ lectureTitle, videoInfo, isPreviewFree, courseId, lectureId }) => ({
        url: `api/v1/course/${courseId}/lecture/${lectureId}`,
        method: "POST",
        body: { lectureTitle, videoInfo, isPreviewFree },
      }),
    }),

    // Delete lecture
    removeLecture: builder.mutation({
      query: (lectureId) => ({ url: `api/v1/course/lecture/${lectureId}`, method: "DELETE" }),
      invalidatesTags: ["Refetch_Lecture"],
    }),

    // Get lecture by ID
    getLectureById: builder.query({
      query: (lectureId) => ({ url: `api/v1/course/lecture/${lectureId}`, method: "GET" }),
    }),

    // Publish/unpublish course
    publishCourse: builder.mutation({
      query: ({ courseId, publish }) => ({
        url: `api/v1/course/${courseId}?publish=${publish}`,
        method: "PATCH",
      }),
    }),
  }),
});

// Export hooks
export const {
  useCreateCourseMutation,
  useGetSearchCourseQuery,
  useGetPublishedCourseQuery,
  useGetCreatorCourseQuery,
  useEditCourseMutation,
  useGetCourseByIdQuery,
  useCreateLectureMutation,
  useGetCourseLectureQuery,
  useEditLectureMutation,
  useRemoveLectureMutation,
  useGetLectureByIdQuery,
  usePublishCourseMutation,
} = courseApi;

