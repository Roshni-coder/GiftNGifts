import React, { useState } from "react";
import Select from "@mui/material/Select";
import { Button, MenuItem } from "@mui/material";
import { MdOutlineCloudUpload } from "react-icons/md";

function AddSubCategory() {
  const [productCategory, setProductCategory] = useState("");

  const handleChangeProductCat = (event) => {
    setProductCategory(event.target.value);
  };
  return (
    <section className="p-5 bg-gray-50">
      <form action="" className="h-[80vh] py-2 px-10">
        <div className="grid grid-cols-1 gap-5 mb-3">
          <div className="col w-[50%]">
            <h3 className="text-[14px] font-[500] mb-1">Category Name </h3>
            <Select
              labelId="demo-simple-select-label"
              id="Category"
              size="small"
              className="w-full bg-white"
              value={productCategory}
              label="Product Category"
              onChange={handleChangeProductCat}
            >
              <MenuItem value={""}>None</MenuItem>
              <MenuItem value={10}>BirthDay Gifts</MenuItem>
              <MenuItem value={20}>Aniversery Gifts</MenuItem>
              <MenuItem value={30}>Wedding Gifts</MenuItem>
              <MenuItem value={40}>Personalize</MenuItem>
              <MenuItem value={50}>Combos</MenuItem>
            </Select>
          </div>
        </div>
        <div className="grid grid-cols-1 mb-3">
          <div className="col w-[50%]">
            <h3 className="text-[14px] font-[500] mb-2 ">Sub Category Name</h3>
            <input
              type="text"
              className="w-full p-3 text-sm h-[40px] border border[rgba(0,0,0,0.1)] focus:outline-none focus:border border-[rgba(0,0,0,0.4)] bg-white "
            />
          </div>
        </div>
        <br />
        {/* submit btn */}
        <Button
          type="button"
          className="flex items-center justify-center gap-2 btn-blue btn-lg w-[20%]"
        >
          <MdOutlineCloudUpload className="text-[22px]" />
          Upload Sub Category
        </Button>
      </form>
    </section>
  );
}

export default AddSubCategory;
