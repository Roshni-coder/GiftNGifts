import React from 'react';
import Carousel from 'react-multi-carousel';
import "react-multi-carousel/lib/styles.css";
import { styled } from '@mui/material';

// Styled Image component for consistent styling

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 1, // 1 image per slide on desktop
    partialVisibilityGutter: 40, // Space between slides
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 1, // 1 image per slide on tablet
    partialVisibilityGutter: 30, // Space between slides on tablet
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1, // 1 image per slide on mobile
    partialVisibilityGutter: 20, // Space between slides on mobile
  },
};

function Banner() {
  return (
    <div className="relative">
      <Carousel
        responsive={responsive}
        swipeable={true} // Enable swipe on touch devices
        draggable={true} // Enable dragging
        infinite={true}
        autoPlay={true}
        autoPlaySpeed={5000}
        dotListClass="custom-dot-list-style"
        itemClass="carousel-item-padding-40-px"
        containerClass="carousel-container"
        // Tailwind classes for responsive styling
        className="w-full"
      >
        <div className="flex justify-center items-center">
          <img
            src="https://www.fnp.com/assets/images/custom/new-desk-home/hero-banners/Wedding_Desk-15-01-2025.jpg"
            alt="Banner Image 1"
            className="w-full h-auto  object-cover"
          />
        </div>
        <div className="flex justify-center items-center">
          <img
            src="https://www.fnp.com/assets/images/custom/new-desk-home/hero-banners/Wedding_Desk-15-01-2025.jpg"
            alt="Banner Image 2"
            className="w-full h-auto object-cover"
          />
        </div>
      </Carousel>
    </div>
  );
}

export default Banner;
