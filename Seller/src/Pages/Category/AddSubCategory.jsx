
import React, { useState, useEffect } from "react";
import { Button } from "@mui/material";
import { MdOutlineCloudUpload } from "react-icons/md";
import axios from "axios";

function AddSubCategory({ onSubCategoryAdded, className = "" }) {
  const [subCategoryName, setSubCategoryName] = useState("");
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/api/getcategories`)
      .then((res) => setCategories(res.data))
      .catch((err) => console.error("Error fetching categories", err));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!subCategoryName.trim() || !selectedCategory) {
      alert("Please enter a subcategory name and select a category.");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/addsubcategory`,
        {
          subcategory: subCategoryName.trim(),
          categoryId: selectedCategory,
        }
      );

      alert(response.data.message || "Subcategory added!");

      // Trigger callback if provided
      if (onSubCategoryAdded) {
        onSubCategoryAdded(response.data);
      }

      // Reset form
      setSubCategoryName("");
      setSelectedCategory("");
    } catch (error) {
      console.error("Error:", error);
      alert(error.response?.data?.message || "Failed to add subcategory");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className={`p-4 bg-gray-50 ${className}`}>
      <form onSubmit={handleSubmit} className="py-4 px-4 sm:px-10">
        <div className="grid grid-cols-1 gap-4 mb-6 w-full sm:w-[90%] md:w-[70%] lg:w-[50%]">
          <div>
            <h3 className="text-sm font-medium mb-2">Subcategory Name</h3>
            <input
              type="text"
              value={subCategoryName}
              onChange={(e) => setSubCategoryName(e.target.value)}
              className="w-full p-3 text-sm h-[40px] border border-[rgba(0,0,0,0.4)] bg-white focus:outline-none"
            />
          </div>

          <div>
            <h3 className="text-sm font-medium mb-2">Select Category</h3>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full !py-2 !p-3 text-sm h-[40px] border border-[rgba(0,0,0,0.4)] bg-white focus:outline-none"
            >
              <option value="">-- Select Category --</option>
              {categories.map((cat) => (
                <option key={cat._id} value={cat._id}>
                  {cat.categoryname}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="w-full sm:w-[60%] md:w-[40%] lg:w-[20%]">
          <Button
            type="submit"
            fullWidth
            className="flex items-center justify-center gap-2 btn-blue btn-lg"
            disabled={loading}
          >
            <MdOutlineCloudUpload className="text-[22px]" />
            {loading ? "Uploading..." : "Upload Subcategory"}
          </Button>
        </div>
      </form>
    </section>
  );
}

export default AddSubCategory;
