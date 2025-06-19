
import React from "react";

export const SearchResultlist = ({ results, onSelect }) => {
  return (
    <div className="reviewScroll absolute top-full py-1 left-0 w-full bg-white mt-1 max-h-[250px] overflow-y-auto shadow z-50">
      {results.length > 0 ? (
        results.map((item, index) => (
          <div
            key={index}
            className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 cursor-pointer"
            onClick={() => onSelect(item)}
          >
            <img
              src={item.images?.[0]?.url || "/placeholder.jpg"}
              alt={item.title}
              className="w-8 h-8 object-cover rounded"
            />
            <div>
              <p className="text-sm font-medium">{item.title}</p>
            </div>
          </div>
        ))
      ) : (
        <p className="px-3 py-2 text-sm text-gray-500">No results found.</p>
      )}
    </div>
  );
};