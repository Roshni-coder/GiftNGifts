import React from 'react';
import { Link } from "react-router-dom";

function Adevert() {
  return (
    <section className="pt-6">
      {/* Curated Gifts Section */}
      <div className="container mx-auto px-4 md:px-8 bg-white rounded-lg shadow-lg">
        
        {/* Title */}
        <div className="mb-6 px-6 py-4 border-b border-gray-200 text-center">
          <h3 className="text-xl md:text-2xl font-semibold text-gray-800">
            Thoughtfully Curated Gifts
          </h3>
        </div>

        {/* Images Section */}
        <div className="flex flex-col md:flex-row gap-4 md:gap-6 px-6 pb-10">
          
          {/* Image 1 */}
          <Link to="#" className="w-full md:w-1/2 overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-all">
            <img
              src="https://www.fnp.com/assets/images/custom/new-desk-home/shop-by-cat/new/Valentines_1_SBB_Top_Banner-18-01-25.jpg"
              alt="Valentine's Day special gift banner 1"
              className="w-full h-auto object-cover rounded-lg transition-transform duration-300 hover:scale-105"
            />
          </Link>
          
          {/* Image 2 */}
          <Link to="#" className="w-full md:w-1/2 overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-all">
            <img
              src="https://www.fnp.com/assets/images/custom/new-desk-home/shop-by-cat/new/Valentines_2_SBB_Top_Banner-18-01-25.jpg"
              alt="Valentine's Day special gift banner 2"
              className="w-full h-auto object-cover rounded-lg transition-transform duration-300 hover:scale-105"
            />
          </Link>

        </div>
      </div>
    </section>
  );
}

export default Adevert;
