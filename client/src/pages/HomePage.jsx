// src/pages/HomePage.jsx
import React from "react";
import HeroSection from "./student/HeroSection";
import Courses from "./student/Courses";
import OnlineBootcamp from "./student/OnlineBootcamp";
import AboutUs from "./student/AboutUs";
import Teachers from "./student/Teachers";
import TestimonialPage from "./student/Testimonial";
import FAQ from "./student/FAQ";

const HomePage = () => {
  return (
    <>
      <HeroSection />
      <Courses />
      <div style={{ marginTop: "50px" }}>
        <OnlineBootcamp />
      </div>
      <div style={{ marginTop: "150px" }}>
        <AboutUs />
      </div>
      <Teachers />
      <div style={{ marginTop: "150px" }}>
        <TestimonialPage />
      </div>
      <div style={{ marginTop: "100px", marginBottom: "100px" }}>
        <FAQ />
      </div>
    </>
  );
};

export default HomePage;
