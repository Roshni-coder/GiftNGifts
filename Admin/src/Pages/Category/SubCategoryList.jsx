import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import Tooltip from "@mui/material/Tooltip";
import { LuTrash2 } from "react-icons/lu";
import { Button, TextField, IconButton } from "@mui/material";
import { MyContext } from "../../App.jsx";
import { FiPlus } from "react-icons/fi";
import { MdOutlineEdit } from "react-icons/md";
import { MdSave, MdClose } from "react-icons/md";
import { MdSaveAlt } from "react-icons/md";
import Chip from "@mui/material/Chip";

function SubCategoryList() {
  const { setIsOpenAddProductPanel } = useContext(MyContext);
  const [groupedData, setGroupedData] = useState({});
  const [editingId, setEditingId] = useState(null);
  const [editValue, setEditValue] = useState("");

  useEffect(() => {
    fetchSubcategories();
  }, []);

  const fetchSubcategories = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/getsubcategories`);
      const data = response.data;

      const grouped = data.reduce((acc, item) => {
        const catId = item.category?._id;
        if (!catId) return acc;
        if (!acc[catId]) {
          acc[catId] = {
            category: item.category,
            subcategories: [item],
          };
        } else {
          acc[catId].subcategories.push(item);
        }
        return acc;
      }, {});
      setGroupedData(grouped);
    } catch (error) {
      console.error("Error fetching subcategories:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/deletesubcategory/${id}`);
      fetchSubcategories();
    } catch (error) {
      console.error("Error deleting subcategory:", error);
    }
  };

  const handleEdit = (subcat) => {
    setEditingId(subcat._id);
    setEditValue(subcat.subcategory);
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditValue("");
  };

  const handleSave = async (id) => {
    try {
      await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/updatesubcategory/${id}`, {
        subcategory: editValue,
      });
      setEditingId(null);
      setEditValue("");
      fetchSubcategories();
    } catch (error) {
      console.error("Error updating subcategory:", error);
    }
  };

  return (
    <div className="products shadow-md rounded-md py-2 px-4 md:px-5 bg-white">
      <div className="flex flex-col sm:flex-row sm:justify-between pt-3 items-center gap-2">
        <h4 className="text-[18px] md:text-[20px] font-[600] text-center sm:text-left">
          Sub Category List
        </h4>
        <Button
          className="btn-blue"
          onClick={() =>
            setIsOpenAddProductPanel({ open: true, model: "Add New Sub Category" })
          }
        >
          <FiPlus className="!pr-1 text-[20px]" />
          Add New Sub Category
        </Button>
      </div>

      <div className="relative overflow-x-auto mt-5 max-h-[550px]">
        <table className="min-w-[800px] w-full border border-gray-300 text-sm text-center text-gray-500">
          <thead className="text-xs uppercase bg-gray-100 text-gray-800">
            <tr>
              <th className="px-6 py-4 border border-gray-200">Category Image</th>
              <th className="px-6 py-4 border border-gray-200">Category Name</th>
              <th className="px-6 py-4 border border-gray-200">Sub Categories</th>
              <th className="px-6 py-4 border border-gray-200">Action</th>
            </tr>
          </thead>
          <tbody>
            {Object.values(groupedData).map((group, index) => (
              <tr key={group.category._id || index} className="border border-gray-300">
                <td className="px-6 py-2 border border-gray-200">
                  <img
                    src={`${import.meta.env.VITE_BACKEND_URL}/${group.category?.image}`}
                    alt="Category"
                    className="w-[50px] h-[50px] object-cover rounded-md m-auto"
                  />
                </td>
                <td className="px-6 py-2 border border-gray-200 text-gray-700">
                  {group.category?.categoryname || "No Category"}
                </td>
                <td className="px-6 py-2 border border-gray-200 text-left">
                  <div className="flex flex-col gap-2">
                    {group.subcategories.map((subcat) =>
                      editingId === subcat._id ? (
                        <TextField
                          key={subcat._id}
                          value={editValue}
                          onChange={(e) => setEditValue(e.target.value)}
                          size="small"
                          fullWidth
                        />
                      ) : (
                        <Chip
                          key={subcat._id}
                          label={subcat.subcategory}
                          onDelete={() => handleDelete(subcat._id)}
                        />
                      )
                    )}
                  </div>
                </td>
                <td className="px-4 py-2 border border-gray-200 text-left">
                  <div className="flex flex-col gap-2">
                    {group.subcategories.map((subcat) => (
                      <div key={subcat._id} className="flex items-center gap-2">
                        {editingId === subcat._id ? (
                          <>
                            <Tooltip title="Save">
                              <IconButton onClick={() => handleSave(subcat._id)}>
                                <MdSaveAlt  className="text-black" />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="Cancel">
                              <IconButton onClick={handleCancel}>
                                <MdClose className="text-black" />
                              </IconButton>
                            </Tooltip>
                          </>
                        ) : (
                          <>
                            <Tooltip title="Edit">
                              <IconButton onClick={() => handleEdit(subcat)}>
                                <MdOutlineEdit />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="Delete">
                              <IconButton onClick={() => handleDelete(subcat._id)}>
                                <LuTrash2 />
                              </IconButton>
                            </Tooltip>
                          </>
                        )}
                      </div>
                    ))}
                  </div>
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
