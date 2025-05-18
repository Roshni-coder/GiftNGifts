import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import Tooltip from "@mui/material/Tooltip";
import { LuTrash2 } from "react-icons/lu";
import { Button } from "@mui/material";
import { MyContext } from "../../App.jsx";
import { FiPlus } from "react-icons/fi";
import { MdOutlineEdit } from "react-icons/md";
import Chip from "@mui/material/Chip";

function SubCategoryList() {
  const { setIsOpenAddProductPanel } = useContext(MyContext);
  const [subcategories, setSubcategories] = useState([]);

  useEffect(() => {
    fetchSubcategories();
    console.log(subcategories)
  }, []);

  const fetchSubcategories = async () => {
    try {
      const response = await axios.get("http://localhost:7000/api/getsubcategories");
      setSubcategories(response.data);
    } catch (error) {
      console.error("Error fetching subcategories:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:7000/api/deletesubcategory/${id}`);
      setSubcategories(prev => prev.filter((item) => item._id !== id));
    } catch (error) {
      console.error("Error deleting subcategory:", error);
    }
  };

  const handleUpdate = (subcategory) => {
    setIsOpenAddProductPanel({
      open: true,
      model: "Update Sub Category",
      data: subcategory,
    });
  };

  const handleSubcategoryBlur = async (e, id, originalValue) => {
    const newValue = e.target.innerText.trim();

    // Don’t update if nothing changed or is empty
    if (!newValue || newValue === originalValue) return;

    try {
      await axios.put(`http://localhost:7000/api/updatesubcategory/${id}`, {
        subcategory: newValue,
      });

      setSubcategories((prev) =>
        prev.map((item) =>
          item._id === id ? { ...item, subcategory: newValue } : item
        )
      );
    } catch (error) {
      console.error("Error updating subcategory:", error);
      alert("Failed to update subcategory. Please try again.");
    }
  };

  return (
    <div className="products shadow-md rounded-md py-2 !px-5 bg-white">
      <div className="flex justify-between pt-3 items-center">
        <h4 className="text-[20px] text-left font-[600]">Sub Category List</h4>
        <Button
          className="btn-blue !ml-auto"
          onClick={() =>
            setIsOpenAddProductPanel({ open: true, model: "Add New Sub Category" })
          }
        >
          <FiPlus className="!pr-1 text-[20px]" />
          Add New Sub Category
        </Button>
      </div>

      <div className="relative pb-5 overflow-auto max-h-[550px] mt-5">
        <table className="w-full border border-gray-300 text-sm text-center text-gray-500">
          <thead className="text-xs uppercase bg-gray-100 !text-[rgba(0,0,0,0.8)]">
            <tr className="border border-gray-300">
              <th className="!px-6 py-4 border border-gray-200">Category Image</th>
              <th className="!px-6 py-4 border border-gray-200">Category Name</th>
              <th className="!px-6 py-4 border border-gray-200">Sub Categories</th>
              <th className="!px-6 py-4 border border-gray-200">Action</th>
            </tr>
          </thead>
          <tbody>
            {subcategories.map((subcategory) => (
              <tr key={subcategory._id} className="border border-gray-300">
                <td className="px-6 py-2 border border-gray-200">
                  <img
                    src={`http://localhost:7000/${subcategory.category?.image}`}
                    alt="Category"
                    className="w-[60px] h-[60px] object-cover rounded-md border"
                  />
                </td>
                <td className="px-6 py-2 border border-gray-200 text-gray-700">
                  {subcategory.category?.categoryname || "No Category"}
                </td>
                <td className="px-6 py-2 border border-gray-200">
                  <div
                    contentEditable
                    suppressContentEditableWarning
                    onBlur={(e) => handleSubcategoryBlur(e, subcategory._id, subcategory.subcategory)}
                    className="border px-2 py-1 rounded-md cursor-text inline-block min-w-[100px] text-gray-700"
                    title="Click to edit"
                  >
                    {subcategory.subcategory}
                  </div>
                </td>
                <td className="px-6 py-2 border border-gray-200 space-x-2">
                  <Tooltip title="Edit">
                    <Button onClick={() => handleUpdate(subcategory)}>
                      <MdOutlineEdit className="text-[20px]" />
                    </Button>
                  </Tooltip>
                  <Tooltip title="Delete">
                    <Button onClick={() => handleDelete(subcategory._id)}>
                      <LuTrash2 className="text-[20px]" />
                    </Button>
                  </Tooltip>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default SubCategoryList;
