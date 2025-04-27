import React from "react";

export const SearchResultlist = ({ results, onSelect }) => {
  return (
    <div className="reviewScroll absolute top-full  py-1 left-0 w-full bg-white mt-1 max-h-[250px]  shadow z-50">
      {results.map((item, index) => (
        <div
          key={index}
          className="flex items-center px-3  hover:text-[#7d0492] cursor-pointer"
          onClick={() => onSelect(item)} 
        >
          <div>
            <p>{item.title}</p>
          </div>
        </div>
      ))}
    </div>
  );
};
