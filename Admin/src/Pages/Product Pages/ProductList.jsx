import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import Tooltip from "@mui/material/Tooltip";
import { LuTrash2 } from "react-icons/lu";
import { Button } from "@mui/material";
import { MyContext } from "../../App.jsx";
import { FiPlus } from "react-icons/fi";
import { MdOutlineEdit } from "react-icons/md";
import { FaRegEye } from "react-icons/fa6";
import SearchBox from "../../Components/SearchBox/SearchBox.jsx";
import Progress from "../../Components/Progress/Progress.jsx";
import { Link } from "react-router-dom";

function ProductList() {
  const { setIsOpenAddProductPanel } = useContext(MyContext);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatetask, setUpdatetask] = useState({});
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/product/getproducts`);
      setProducts(response.data.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching products:", error);
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/getcategories`);
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching categories", error);
    }
  };

  const fetchSubcategories = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/getsubcategories`);
      setSubcategories(response.data);
    } catch (error) {
      console.error("Error fetching subcategories:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchCategories();
    fetchSubcategories();
  }, []);

  const removeproduct = async (_id) => {
    try {
      const response = await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/product/deleteproduct/${_id}`);
      if (response.data.success) {
        setProducts(products.filter((product) => product._id !== _id));
      } else {
        alert("Cannot delete product");
      }
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const update = async (_id) => {
    if (!updatetask[_id] || Object.keys(updatetask[_id]).length === 0) {
      alert("No changes detected for update.");
      return;
    }
    try {
      const response = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/product/updateproduct/${_id}`, updatetask[_id]);
      if (response.data.success) {
        setProducts((prevProducts) =>
          prevProducts.map((product) =>
            product._id === _id ? { ...product, ...updatetask[_id] } : product
          )
        );
        setUpdatetask((prev) => ({ ...prev, [_id]: {} }));
        alert("Product updated successfully!");
      } else {
        alert("Update failed");
      }
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  const getCategoryNameById = (id) => {
    const category = categories.find((cat) => cat._id === id);
    return category ? category.categoryname : "Not found";
  };

  const getSubCategoryNameById = (id) => {
    const sub = subcategories.find((cat) => cat._id === id);
    return sub ? sub.subcategory : "Not found";
  };

  const handleupdate = (id, value, field) => {
    setUpdatetask((prev) => ({
      ...prev,
      [id]: { ...prev[id], [field]: value },
    }));
  };

  return (
    <div className=" products shadow-md  rounded-md !my-2 px-1 md:px-6 bg-white">
      <h2 className="text-xl md:text-2xl font-semibold py-2 sm:text-left text-center">Products List</h2>

      <div className="flex !flex-col  sm:!flex-row items-start sm:items-center  !justify-center sm:justify-between gap-3 py-2">
        <div className="w-full sm:w-[75%]">
          <SearchBox />
        </div>
        <div className="w-full sm:w-[25%]  text-center">
          <Button
            className="btn-blue sm:w-full"
            onClick={() => setIsOpenAddProductPanel({ open: true, model: "Add Product" })}
          >
            <FiPlus className="pr-1 text-[20px] " />
            Add Product
          </Button>
        </div>
      </div>

      {/* Responsive Table Wrapper */}
      <div className="w-full overflow-x-auto mt-4 max-h-[550px]">
        <table className="min-w-[1000px] w-full text-sm text-center text-gray-600">
          <thead className="text-xs uppercase bg-gray-100 text-black">
            <tr>
              <th className="px-6 py-4">Products</th>
              <th className="px-6 py-4 whitespace-nowrap">Category</th>
              <th className="px-6 py-4 whitespace-nowrap">Sub Category</th>
              <th className="px-6 py-4 whitespace-nowrap">Price</th>
              <th className="px-6 py-4 whitespace-nowrap">Action</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="6" className="py-4 text-center">
                  <Progress />
                </td>
              </tr>
            ) : (
              products.map((product) => (
                <tr key={product._id} className="border-b border-gray-200">
                  <td className="px-6 py-2 border">
                    <Link to="#">
                      <div className="flex items-center gap-4">
                        <div className="w-[65px] h-[65px] rounded-md overflow-hidden">
                          <img
                            src={product.images[0]?.url}
                            className="w-full h-full object-cover"
                            alt="Product"
                          />
                        </div>
                        <div className="text-left w-[75%]">
                          <h3
                            className="font-semibold text-sm text-black"
                            contentEditable
                            suppressContentEditableWarning
                            onBlur={(e) => handleupdate(product._id, e.target.innerText, "title")}
                          >
                            {product.title}
                          </h3>
                        </div>
                      </div>
                    </Link>
                  </td>
                  <td
                    className="px-6 py-2 border"
                    contentEditable
                    suppressContentEditableWarning
                    onBlur={(e) => handleupdate(product._id, e.target.innerText, "categoryname")}
                  >
                    {getCategoryNameById(product.categoryname)}
                  </td>
                  <td
                    className="px-6 py-2 border"
                    contentEditable
                    suppressContentEditableWarning
                    onBlur={(e) => handleupdate(product._id, e.target.innerText, "subcategory")}
                  >
                    {getSubCategoryNameById(product.subcategory)}
                  </td>
                  <td className="px-6 py-2 border">
                    <div className="flex items-center gap-2 justify-center">
                      <span
                        className="text-black text-[15px] font-semibold"
                        contentEditable
                        suppressContentEditableWarning
                        onBlur={(e) =>
                          handleupdate(product._id, e.target.innerText.replace("₹", ""), "price")
                        }
                      >
                        ₹{product.price}
                      </span>
                      <span
                        className="line-through text-gray-500 text-sm"
                        contentEditable
                        suppressContentEditableWarning
                        onBlur={(e) =>
                          handleupdate(product._id, e.target.innerText.replace("₹", ""), "oldprice")
                        }
                      >
                        ₹{product.oldprice}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-2 border">
                    <div className="flex items-center justify-center gap-2">
                      <Tooltip title="Update">
                        <button className="text-blue-600 text-lg" onClick={() => update(product._id)}>
                          <MdOutlineEdit />
                        </button>
                      </Tooltip>
                      <Tooltip title="Delete">
                        <button
                          className="text-red-600 text-lg"
                          onClick={() => removeproduct(product._id)}
                        >
                          <LuTrash2 />
                        </button>
                      </Tooltip>
                      <Tooltip title="Preview">
                        <button className="text-green-600 text-lg">
                          <FaRegEye />
                        </button>
                      </Tooltip>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ProductList;
