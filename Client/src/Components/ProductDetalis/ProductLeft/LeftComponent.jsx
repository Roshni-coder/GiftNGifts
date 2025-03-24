import React, { useRef, useState } from "react";
import InnerImageZoom from "react-inner-image-zoom";
import "react-inner-image-zoom/lib/InnerImageZoom/styles.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";

function LeftComponent() {
  const [slideIndex, setSlideIndex] = useState(0);
  const zoomsliderBig = useRef();
  const zoomSliderSml = useRef();

  const goTo = (index) => {
    setSlideIndex(index);
    zoomSliderSml.current.swiper.slideTo(index);
    zoomsliderBig.current.swiper.slideTo(index);
  };

  return (
    <div className="flex flex-col lg:pt-3 lg:flex-row gap-3">
      {/* Small Slider (Thumbnails) */}
      <div className="slider lg:w-[18%] hidden lg:block w-full !overflow-hidden pt-1">
        <Swiper
          ref={zoomSliderSml}
          direction={"vertical"}
          slidesPerView={4}
          spaceBetween={6}
          className="zoomProductSliderThumb"
        >
          <SwiperSlide>
            <div
              className={`item rounded-md overflow-hidden cursor-pointer group ${slideIndex === 0 ? "opacity-100" : "opacity-60"}`}
              onClick={() => goTo(0)}
            >
              <img
                src="https://www.fnp.com/images/pr/s/v20221205201829/red-velvet-fresh-cream-cake-half-kg_1.jpg"
                alt=""
                className="w-full transition-all group-hover:scale-105"
              />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div
              className={`item rounded-md overflow-hidden cursor-pointer group ${slideIndex === 1 ? "opacity-100" : "opacity-60"}`}
              onClick={() => goTo(1)}
            >
              <img
                src="https://www.fnp.com/images/pr/s/v20221205201830/red-velvet-fresh-cream-cake-half-kg_2.jpg"
                alt=""
                className="w-full transition-all group-hover:scale-105"
              />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div
              className={`item rounded-md overflow-hidden cursor-pointer group ${slideIndex === 2 ? "opacity-100" : "opacity-60"}`}
              onClick={() => goTo(2)}
            >
              <img
                src="https://www.fnp.com/images/pr/s/v20221205201831/red-velvet-fresh-cream-cake-half-kg_3.jpg"
                alt=""
                className="w-full transition-all group-hover:scale-105"
              />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div
              className={`item rounded-md overflow-hidden cursor-pointer group ${slideIndex === 3 ? "opacity-100" : "opacity-60"}`}
              onClick={() => goTo(3)}
            >
              <img
                src="https://www.fnp.com/images/pr/s/v20210325113712/red-velvet-fresh-cream-cake-half-kg_5.jpg"
                alt=""
                className="w-full transition-all group-hover:scale-105"
              />
            </div>
          </SwiperSlide>
          
        </Swiper>
      </div>

      {/* Large Slider (Zoomed View) */}
      <div className="zoomcontainer lg:w-[75%]  sm:w-[40%] w-full lg:m-0   sm:m-auto pt-2">
        <Swiper ref={zoomsliderBig} slidesPerView={1} spaceBetween={0}>
          <SwiperSlide>
            <InnerImageZoom
              zoomType="hover"
              src="https://www.fnp.com/images/pr/l/v20221205201829/red-velvet-fresh-cream-cake-half-kg_1.jpg"
              zoomScale={1}
            />
          </SwiperSlide>
          <SwiperSlide>
            <InnerImageZoom
              zoomType="hover"
              src="https://www.fnp.com/images/pr/l/v20221205201830/red-velvet-fresh-cream-cake-half-kg_2.jpg"
              zoomScale={1}
            />
          </SwiperSlide>
          <SwiperSlide>
            <InnerImageZoom
              zoomType="hover"
              src="https://www.fnp.com/images/pr/l/v20221205201831/red-velvet-fresh-cream-cake-half-kg_3.jpg"
              zoomScale={1}
            />
          </SwiperSlide>
          <SwiperSlide>
            <InnerImageZoom
              zoomType="hover"
              src="https://www.fnp.com/images/pr/l/v20210325113712/red-velvet-fresh-cream-cake-half-kg_5.jpg"
              zoomScale={1}
            />
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
}

export default LeftComponent;
