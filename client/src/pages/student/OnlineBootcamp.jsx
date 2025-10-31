import React from "react";
import img from '/girl.mp4';

function OnlineBootcamp() {
  const features = [
    {
      icon: "👜",
      title: "Develop skills for real career growth",
      description:
        "Cutting-edge curriculum designed in guidance with industry and academia to develop job-ready skills.",
    },
    {
      icon: "👩‍🏫",
      title: "Learn from experts active in their field",
      description:
        "Leading practitioners who bring current best practices and case studies to sessions that fit into your work schedule.",
    },
    {
      icon: "💻",
      title: "Learn by working on real-world problems",
      description:
        "Capstone projects involving real-world datasets with virtual labs for hands-on learning.",
    },
    {
      icon: "⏰",
      title: "Structured guidance ensuring learning never stops",
      description:
        "24x7 learning support from mentors and a community of like-minded peers to resolve any conceptual doubts.",
    },
  ];

  return (
    <div className="relative min-h-screen flex flex-col justify-center items-center text-white">
      <video autoPlay loop muted className="absolute inset-0 w-full h-full object-cover">
        <source src={img} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      
      <div className="relative bg-black bg-opacity-50 p-10 rounded-lg max-w-4xl w-full text-center shadow-lg">
        <h2 className="text-4xl font-bold mb-4">Our Online Bootcamp</h2>
        <p className="text-lg text-gray-300 mb-6">An immersive learning experience</p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {features.map((feature, index) => (
            <div key={index} className="bg-white bg-opacity-20 p-6 rounded-lg flex flex-col items-center text-white shadow-md">
              <div className="text-5xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-sm text-gray-200">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default OnlineBootcamp;

