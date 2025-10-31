import React, { useState, useEffect } from 'react';
import img from '/man.mp4';

const testimonials = [
  {
    name: 'John Doe',
    image: 'https://media.istockphoto.com/id/1365601848/photo/portrait-of-a-young-woman-carrying-her-schoolbooks-outside-at-college.jpg?s=612x612&w=0&k=20&c=EVxLUZsL0ueYFF1Nixit6hg-DkiV52ddGw_orw9BSJA=',
    comment: 'best teachers Great quality, fast response, and exceptional customer service!',
  },
  {
    name: 'Jane Smith',
    image: 'https://thumbs.dreamstime.com/b/female-high-school-student-opening-locker-whilst-smiling-camera-41523857.jpg',
    comment: 'Great quality, fast response, and exceptional customer service!',
  },
  {
    name: 'Emily Johnson',
    image: 'https://media.istockphoto.com/id/1438185814/photo/college-student-asian-man-and-studying-on-laptop-at-campus-research-and-education-test-exam.jpg?s=612x612&w=0&k=20&c=YmnXshbaBxyRc4Nj43_hLdLD5FLPTbP0p_3-uC7sjik=',
    comment: 'A wonderful experience from start to finish. Would definitely come back!',
  },
  {
    name: 'Michael Brown',
    image: 'https://www.universityofcalifornia.edu/sites/default/files/styles/article_default_banner/public/college_voting_faq_header.jpg?h=7eca08bd&itok=3bUKecU1',
    comment: 'Highly professional and skilled team. I would work with them again!',
  }
];

function Testimonial() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative flex justify-end items-center min-h-[400px]">
      <video autoPlay loop muted className="absolute inset-0 w-full h-full object-cover">
        <source src={img} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="relative max-w-lg bg-white bg-opacity-80 shadow-lg rounded-lg p-6 text-right backdrop-blur-md" style={{marginRight:"700px"}}>
        <img src={testimonials[currentIndex].image} alt={testimonials[currentIndex].name} 
             className="w-16 h-16 rounded-full object-cover absolute top-4 left-4" />
        <h3 className="text-lg font-semibold">{testimonials[currentIndex].name}</h3>
        <p className="text-gray-600 mt-2">{testimonials[currentIndex].comment}</p>
        
        <div className="absolute bottom-4 left-4 flex space-x-2">
          {testimonials.map((_, index) => (
            <span 
              key={index} 
              className={`w-3 h-3 rounded-full ${currentIndex === index ? 'bg-blue-500' : 'bg-gray-300'}`}
            ></span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Testimonial;


