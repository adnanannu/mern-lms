import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import img1 from "/126357.jpg";
import img2 from "/ii.jpg";
import img3 from "/iii.jpg";

// Custom Left Arrow
const CustomPrevArrow = (props) => {
  const { onClick } = props;
  return (
    <button
      onClick={onClick}
      className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-black text-white p-2 rounded-full opacity-50 hover:opacity-100 z-10"
    >
      &#8592;
    </button>
  );
};

// Custom Right Arrow
const CustomNextArrow = (props) => {
  const { onClick } = props;
  return (
    <button
      onClick={onClick}
      className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-black text-white p-2 rounded-full opacity-50 hover:opacity-100 z-10"
    >
      &#8594;
    </button>
  );
};

const HeroSection = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: true, // Enable left and right arrows
    swipe: true,
    swipeToSlide: true,
    adaptiveHeight: true,
    cssEase: "ease-in-out",
    customPaging: (i) => (
      <div className="w-4 h-4 bg-gray-300 rounded-full"></div>
    ),
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
  };

  return (
    <div className="relative w-full">
      <Slider {...settings}>
        <div className="relative">
          <img
            src={img1}
            alt="Slide 1"
            className="w-full h-[400px] object-cover"
          />
          <div className="absolute inset-0 flex justify-center items-center">
            <div className="text-center text-white">
              <h2 className="text-4xl font-bold mb-4" style={{ color: "black" }}>
                Learn from the Best
              </h2>
              <p className="text-lg mb-6">Skills that will shape your future.</p>
            </div>
          </div>
        </div>
        <div className="relative">
          <img
            src={img2}
            alt="Slide 2"
            className="w-full h-[400px] object-cover"
          />
        </div>
        <div className="relative">
          <img
            src={img3}
            alt="Slide 3"
            className="w-full h-[400px] object-cover"
          />
          <div className="absolute inset-0 flex justify-center items-center">
            <div
              className="text-center text-black"
              style={{ marginRight: "420px" }}
            >
              <h2 className="text-4xl font-bold mb-4" style={{ color: "black" }}>
                Achieve Your Goals
              </h2>
              <p className="text-lg mb-6">
                Take the first step towards success.
              </p>
              <button className="bg-orange-500 px-6 py-3 rounded-full hover:bg-black transition-all">
                Get Started
              </button>
            </div>
          </div>
        </div>
      </Slider>
    </div>
  );
};

export default HeroSection;

