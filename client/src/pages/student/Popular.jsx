import React from "react";

const topics = [
  { title: "Languages", icon: "🌸" },
  { title: "Math", icon: "📊" },
  { title: "Coding", icon: "💻" },
  { title: "Music", icon: "🥁" },
  { title: "Full curriculum", icon: "📚" },
  { title: "Writing", icon: "✍️" },
  { title: "Reading", icon: "📖" },
  { title: "Social-emotional", icon: "☂️" },
];

const Popular = () => {
  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center py-10">
      <h1 className="text-4xl font-bold text-gray-800 mb-10">Popular Topics</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 px-4 max-w-7xl">
        {topics.map((topic, index) => (
          <div
            key={index}
            className="flex flex-col items-center justify-center bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 p-6"
          >
            <div className="text-6xl mb-4">{topic.icon}</div>
            <p className="text-lg font-semibold text-gray-700">{topic.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Popular;
