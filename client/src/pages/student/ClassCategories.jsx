import React from "react";

// Reusable Card Component
const CategoryCard = ({ imgSrc, title }) => (
  <div className="bg-white shadow-md rounded-md overflow-hidden">
    <img src={imgSrc} alt={title} className="h-48 w-full object-cover" />
    <div className="p-4">
      <h3 className="text-lg font-semibold text-center">{title}</h3>
    </div>
  </div>
);

const ClassCategories = () => {
  return (
    <div className="bg-gray-50 min-h-screen py-10">
      {/* Top Section with Icons */}
      <div className="flex justify-center space-x-8 mb-8">
        <div className="flex items-center space-x-2">
          <span role="img" aria-label="Live video">📹</span>
          <p className="text-gray-700 font-medium">Live video chat classes</p>
        </div>
        <div className="flex items-center space-x-2">
          <span role="img" aria-label="Teachers">🏅</span>
          <p className="text-gray-700 font-medium">World class teachers</p>
        </div>
        <div className="flex items-center space-x-2">
          <span role="img" aria-label="Learning">📅</span>
          <p className="text-gray-700 font-medium">Flexible learning options</p>
        </div>
        <div className="flex items-center space-x-2">
          <span role="img" aria-label="Learners">👩‍🎓</span>
          <p className="text-gray-700 font-medium">Learners ages 3 - 18</p>
        </div>
      </div>

      {/* Title */}
      <h2 className="text-3xl font-bold text-center mb-6">
        Popular group and 1-on-1 class categories
      </h2>

      {/* Categories */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 px-6">
        <CategoryCard
          imgSrc="https://img.freepik.com/free-photo/front-view-young-female-student-red-shirt-black-bag-holding-copybooks-files-smiling-writing-down-white_140725-16616.jpg"
          title="Full courses"
        />
        <CategoryCard
          imgSrc="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQTzRNkJdXrdE2pwLnrDYTjQzBiqSBTXDVzcrAlO74ZURxcYP-Ib8Gvje_QB1YVIBeLUqo&usqp=CAU"
          title="Personalized tutoring & lessons"
        />
        <CategoryCard
          imgSrc="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfZ30KwubBo5CH1InOFfW2N9vF90CfVtlm0WfqUETdzeKpnijgtwLmteXlWpiBYQmSi-o&usqp=CAU"
          title="Afterschool activities"
        />
        <CategoryCard
          imgSrc="https://img.freepik.com/free-photo/portrait-young-african-woman-with-laptop-white_176420-4662.jpg"
          title="Neurodiversity nurtured"
        />
      </div>
    </div>
  );
};

export default ClassCategories;
