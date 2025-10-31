import React from "react";

// Teacher Data
const teachers = [
  {
    id: 1,
    name: "Ms sera",
    title: "Certified Special Education Teacher",
    description: "Special Education Teacher - Specializing in Themed Units",
    image: "https://img.freepik.com/free-photo/impressed-points-up-young-female-teacher-sitting-table-with-school-tools-holding-mini-blackboard-classroom_141793-114391.jpg?semt=ais_hybrid", // Replace with the actual image
  },
  {
    id: 2,
    name: "manu",
    title: "DnD For the Family",
    description: "DnD For the Family",
    image: "https://media.istockphoto.com/id/486325400/photo/teacher-asking-her-students-a-question.jpg?s=612x612&w=0&k=20&c=gA6YxA-uGplqjyZfTKBuOcAXEZz7S_KqgGgEGl8YztQ=", // Replace with the actual image
  },
  {
    id: 3,
    name: "Mrs. madu",
    title: "Middle School Math Teacher",
    description: "Middle School Math Teacher and Former Homeschool",
    image: "https://media.istockphoto.com/id/1410336912/photo/happy-teacher-and-schoolgirl-giving-high-five-during-class-at-school.jpg?s=170667a&w=is&k=20&c=5p-AghQGwVNYOioRAVgu88g39s5w5wQSgFdIAMd3rx0=", // Replace with the actual image
  },
  {
    id: 4,
    name: "Miss clara",
    title: "Certified Art & Elementary Teacher",
    description: "Certified Art & Elementary Teacher",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxrTGiwnzjT8sBBOtedenwq6ZhyrGxAVlF6QlK5RBtkKfiSE0Iv3EgI8gtzAHj0Ym9eN0&usqp=CAU", // Replace with the actual image
  },
];

const Teachers = () => {
  return (
    <div className="bg-orange-50 min-h-screen py-10">
      <div className="mb-8" style={{ marginLeft: "20px" }}>
        <h2 className="font-bold text-3xl mb-6" style={{ color: "black" }}>
          Learn From The Best Teachers
        </h2>
        <p className="text-gray-700 mb-8">
          From critical skills to technical topics, explore the best programs to support your professional development.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto px-4">
        {teachers.map((teacher) => (
          <div
            key={teacher.id}
            className="flex flex-col items-center bg-white rounded-lg shadow-lg p-6 hover:shadow-2xl transition duration-300 border-4 border-orange-500" // Apply the orange border here
          >
            <div className="relative">
              <img
                src={teacher.image}
                alt={teacher.name}
                className="w-32 h-32 object-cover rounded-full border-4 border-white"
              />
              {/* Overlay Badge */}
              <div className="absolute bottom-0 -right-3 bg-black text-white text-xs font-bold rounded-full px-3 py-1 shadow-md">
                ACE Educator
              </div>
            </div>
            <h2 className="text-lg font-bold mt-4 text-gray-800">
              {teacher.name}
            </h2>
            <h3 className="text-sm font-semibold text-gray-500 mb-2">
              {teacher.title}
            </h3>
            <p className="text-center text-gray-600 text-sm">
              {teacher.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Teachers;
