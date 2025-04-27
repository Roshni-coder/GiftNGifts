// LeftComponent.jsx
import React from "react";

function LeftComponent({ product }) {
  return (
    <div className="productImageContainer !m-auto w-[80%]">
      <img
        src={product?.images?.[0]?.url || "/placeholder.png"}
        alt={product?.images?.[0]?.altText || product?.title || "Product image"}
        className="w-full h-full object-cover  duration-300 group-hover:scale-105 transition-all"
      />

    </div>
  );
}

export default LeftComponent;
