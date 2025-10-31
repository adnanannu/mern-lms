import React, { useState, useMemo } from "react";
import Course from "./Course";
import { useGetPublishedCourseQuery, useGetSearchCourseQuery } from "@/features/api/courseApi";
import { Skeleton } from "@/components/ui/skeleton";

const Courses = ({ defaultLimit = 8 }) => { // accept default limit prop
  const [selectedCategory, setSelectedCategory] = useState(""); // only one category
  const [searchQuery, setSearchQuery] = useState("");

  const { data: publishedData, isLoading, isError } = useGetPublishedCourseQuery();

  // Extract unique categories dynamically
  const categories = useMemo(() => {
    if (!publishedData?.courses) return [];
    return [...new Set(publishedData.courses.map(course => course.category))];
  }, [publishedData]);

  const handleCategoryClick = (category) => {
    setSelectedCategory(prev => (prev === category ? "" : category)); // toggle single category
  };

  // Fetch filtered courses
  const { data, isLoading: isFilteredLoading } = useGetSearchCourseQuery({
    searchQuery,
    categories: selectedCategory ? [selectedCategory] : [],
  });

  if (isError) return <h1>Some error occurred while fetching courses.</h1>;

  // Determine which courses to display
  const allCourses = data?.courses || [];
  
  // Only slice when no search query or category filter is applied
  const displayedCourses =
    !searchQuery && !selectedCategory
      ? allCourses.slice(0, defaultLimit) // default max 8
      : allCourses;

  return (
    <div className="bg-gray-50 dark:bg-[#141414]" style={{ marginTop: "40px" }}>
      <div className="max-w-7xl mx-auto p-6">
        <div className="mb-16">
          <h2 className="font-bold text-3xl mb-6" style={{ color: "black" }}>
            All the skills you need in one place
          </h2>
          <p className="text-gray-700 mb-8">
            From critical skills to technical topics, explore the best programs to support your professional development.
          </p>
          <div className="flex flex-wrap gap-4">
            {categories.map((category) => (
              <button
                key={category}
                className={`border rounded-full py-2 px-6 text-sm font-semibold transition-all ${
                  selectedCategory === category
                    ? "bg-orange-500 text-white"
                    : "bg-white text-black"
                }`}
                onClick={() => handleCategoryClick(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {isFilteredLoading
            ? Array.from({ length: defaultLimit }).map((_, index) => <CourseSkeleton key={index} />)
            : displayedCourses?.map((course) => <Course key={course._id} course={course} />)}
        </div>
      </div>
    </div>
  );
};

export default Courses;

const CourseSkeleton = () => (
  <div className="bg-white shadow-md hover:shadow-lg transition-shadow rounded-lg overflow-hidden">
    <Skeleton className="w-full h-36" />
    <div className="px-5 py-4 space-y-3">
      <Skeleton className="h-6 w-3/4" />
      <div className="flex items-center justify-between">
        <Skeleton className="h-6 w-6 rounded-full" />
        <Skeleton className="h-4 w-20" />
      </div>
      <Skeleton className="h-4 w-1/4" />
    </div>
  </div>
);
