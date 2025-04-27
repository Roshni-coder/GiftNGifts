import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Button from "@mui/material/Button";
import { IoSearchSharp } from "react-icons/io5";
import { SearchResultlist } from "./SearchResultlist";
import { useNavigate } from "react-router-dom";

const Search = () => {
  const [input, setInput] = useState("");
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const wrapperRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:7000/api/getproducts");
        setProducts(res.data.data);
      } catch (err) {
        console.error("Error fetching products:", err);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setShowResult(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleChange = (e) => {
    const value = e.target.value;
    setInput(value);

    if (value.trim() === "") {
      setFilteredProducts([]);
      setShowResult(false);
      return;
    }

    const searchTerm = value.toLowerCase();

    const filtered = products.filter((product) => {
      const title = product.title?.toLowerCase() || "";
      const category = product.category?.toLowerCase() || "";
      const subcategory = product.subcategoryname?.toLowerCase() || "";

      return (
        title.includes(searchTerm) ||
        category.includes(searchTerm) ||
        subcategory.includes(searchTerm)
      );
    });

    setFilteredProducts(filtered);
    setShowResult(true);
  };

  const handleSelect = (product) => {
    setInput(product.title);
    setShowResult(false);
    console.log("Selected product:", product);
    navigate(`/products/${product._id}`);
  };

  const handleSearchClick = () => {
    if (!input.trim()) return;

    const searchTerm = input.toLowerCase();

    const matchedProduct = products.find((product) => {
      const title = product.title?.toLowerCase() || "";
      const category = product.category?.toLowerCase() || "";
      const subcategory = product.subcategoryname?.toLowerCase() || "";

      return (
        title.includes(searchTerm) ||
        category.includes(searchTerm) ||
        subcategory.includes(searchTerm)
      );
    });

    if (matchedProduct) {
      setShowResult(false);
      console.log("Searched product:", matchedProduct);
      navigate(`/products/${matchedProduct._id}`);
    } else {
      console.log("No matching product found.");
    }
  };

  return (
    <div
      className="searchBox w-full bg-[#e5e5e5] rounded-[5px] relative p-2"
      ref={wrapperRef}
    >
      <input
        type="text"
        placeholder="Search by title, category, or subcategory..."
        className="w-full h-[20px] bg-transparent focus:outline-none p-2 text-[15px]"
        value={input}
        onFocus={() => setShowResult(true)}
        onChange={handleChange}
      />
      <Button
        onClick={handleSearchClick}
        className="!absolute top-[4px] right-[5px] z-50 !w-[37px] !min-w-[35px] h-[35px] !rounded-full !text-black"
      >
        <IoSearchSharp className="text-[#4e4e4e] text-[20px]" />
      </Button>

      {showResult && filteredProducts.length > 0 && (
        <SearchResultlist results={filteredProducts} onSelect={handleSelect} />
      )}
    </div>
  );
};

export default Search;
