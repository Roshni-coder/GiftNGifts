import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

import { GoGift } from "react-icons/go";
import { FaChartSimple } from "react-icons/fa6";
import { LiaChartPieSolid } from "react-icons/lia";
import { BsBank2 } from "react-icons/bs";
import { TbBrandProducthunt } from "react-icons/tb";
// import required modules
import { Navigation} from 'swiper/modules';

export default function DashBordBox() {
  return (
    <>
      <Swiper
        slidesPerView={4}
        spaceBetween={10}
        navigation={true}
        modules={[Navigation]}
        className="dashboardBoxesSlider"
      >
        <SwiperSlide>
            <div className="box bg-white !p-5 !cursor-pointer  rounded-md border flex items-center gap-4 border-[rgba(0,0,0,0.1)]">
               <GoGift  className='text-[35px] text-[#3872fa]'/>
                <div className="info !w-[70%] ">
                    <h3>New Orders</h3>
                    <b>$1,399</b>
                </div>
                <FaChartSimple className='text-[50px] text-[#3872fa] ' />
            </div>
        </SwiperSlide>
        <SwiperSlide>
            <div className="box bg-white !p-5 !cursor-pointer  rounded-md border flex items-center gap-4 border-[rgba(0,0,0,0.1)]">
               <LiaChartPieSolid  className='text-[45px] text-[#10b981]'/>
                <div className="info !w-[70%] ">
                    <h3>Sales</h3>
                    <b>$57,990</b>
                </div>
                <FaChartSimple className='text-[50px] text-[#10b981] ' />
            </div>
        </SwiperSlide>
        <SwiperSlide>
            <div className="box !p-5 bg-white !cursor-pointer  rounded-md border flex items-center gap-4 border-[rgba(0,0,0,0.1)]">
               <BsBank2 className='text-[35px] text-[#7928ca] '/>
                <div className="info !w-[70%] ">
                    <h3>Revenew</h3>
                    <b>$1,399</b>
                </div>
                <FaChartSimple className='text-[50px] text-[#7928ca] ' />
            </div>
        </SwiperSlide>
        <SwiperSlide>
            <div className="box !p-5 bg-white !cursor-pointer  rounded-md border flex items-center gap-4 border-[rgba(0,0,0,0.1)]">
               <TbBrandProducthunt   className='text-[45px] text-[#3872fa] '/>
                <div className="info !w-[70%] ">
                    <h3>Total Products</h3>
                    <b>$1,399</b>
                </div>
                <FaChartSimple className='text-[50px] text-[#3872fa] ' />
            </div>
        </SwiperSlide>
      </Swiper>
    </>
  );
}
