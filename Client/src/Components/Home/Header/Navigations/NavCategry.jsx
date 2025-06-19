import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import axios from "axios";
import { GoTriangleDown } from "react-icons/go";

function NavCategory() {
  const [categories, setCategories] = useState([]);
  const [subcategoriesByCategory, setSubcategoriesByCategory] = useState({});

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/getcategories`
        );
        setCategories(
          Array.isArray(response.data)
            ? response.data
            : response.data.categories || []
        );
      } catch (error) {
        console.error("Error fetching categories", error);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchSubcategories = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/getsubcategories`
        );
        const grouped = response.data.reduce((acc, item) => {
          const catId = item.category?._id;
          if (!catId) return acc;
          if (!acc[catId]) acc[catId] = [];
          acc[catId].push(item);
          return acc;
        }, {});
        setSubcategoriesByCategory(grouped);
      } catch (error) {
        console.error("Error fetching subcategories", error);
      }
    };
    fetchSubcategories();
  }, []);

  return (
    <div className="lg:col-span-7 hidden lg:block">
      <ul className="flex items-center justify-center">
        {categories.map((cat) => (
          <li key={cat._id} className="relative group xl:px-3">
            <Link to="/">
              <Button
                className="!text-black !text-[13px] hover:!text-[#7d0492] flex items-center gap-1"
                style={{ textTransform: "capitalize" }}
              >
                {cat.categoryname}
                <GoTriangleDown className="text-base" />
              </Button>
            </Link>

            {/* Hover Submenu */}
            <div className="submenu absolute !mx-10 top-[110%] !left-4 transform -translate-x-1/2 min-w-[800px] bg-white shadow-lg border border-gray-200 opacity-0 invisible transition-all duration-500 ease-in-out group-hover:opacity-100 group-hover:visible z-10">
              <ul className="grid grid-cols-6  p-4">
                {(subcategoriesByCategory[cat._id] || []).map((subcat, index) => (
                  <li
                    key={`${cat._id}-${subcat._id}-${index}`}
                    className="list-none text-[14px]"
                  >
                    <Link
                      to={`/subcategory/${subcat._id}`}
                      className="text-[rgba(0,0,0,0.8)] hover:text-[#7d0492] transition-colors duration-200"
                    >
                      {subcat.subcategory}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default NavCategory;
