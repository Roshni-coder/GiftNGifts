import React from "react";
import Button from "@mui/material/Button";
import { IoSearchSharp } from "react-icons/io5";

function Search() {
  return (
    <div className="searchBox w-full  bg-[#e5e5e5]  rounded-[5px] relative p-2">
      <input
        type="text"
        placeholder="Search for Products....."
        className="w-full h-[20px] bg-transparent focus:outline-none p-2 text-[15px]"
        style={{placeholder:'color:#1f1f1f'}}/>
      <Button className="!absolute top-[4px] right-[5px] z-50 !w-[37px] !min-w-[35px] h-[35px] !rounded-full !text-black">
        <IoSearchSharp className="text-[#4e4e4e] text-[20px]" />
      </Button>
    </div>
  );
}

export default Search;
