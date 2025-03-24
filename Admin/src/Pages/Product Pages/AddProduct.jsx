import React, { useState } from 'react'
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { Button, Rating } from '@mui/material';
import UploadImageBox from '../../Components/UploadBox/UploadImageBox';
import { MdClose } from "react-icons/md";
import { MdOutlineCloudUpload } from "react-icons/md";

function AddProduct() {
  const [productCategory,setProductCategory ] = useState('');

  const handleChangeProductCat = (event) => {
    setProductCategory(event.target.value);
  };
  const [productSubCategory,setProductSubCategory ] = useState('');

  const handleChangeProducSubtCat = (event) => {
    setProductSubCategory(event.target.value);
  };

  return (
    <section className="p-5 bg-gray-50">
      <form action="" className=' py-2 px-10'>
        <div className="grid grid-cols-1 mb-3">
        <div className="col">
          <h3 className='text-[14px] font-[500] mb-1'>Product Title</h3>
          <input type="text"  className='w-full p-3 text-sm h-[40px] border border[rgba(0,0,0,0.1)] focus:outline-none focus:border border-[rgba(0,0,0,0.4)] bg-white '/>
        </div>
        </div>
        <div className="grid grid-cols-1 mb-3">
        <div className="col">
          <h3 className='text-[14px] font-[500] mb-1'>Product Discription</h3>
          <input type="text"  className='w-full p-3 text-sm h-[100px] border border[rgba(0,0,0,0.1)] focus:outline-none focus:border border-[rgba(0,0,0,0.4)] bg-white '/>
        </div>
        </div>
        <div className="grid grid-cols-3 gap-5 mb-3">
        <div className="col">
          <h3 className='text-[14px] font-[500] mb-1'>Product Category </h3>
          <Select
          labelId="demo-simple-select-label"
          id="Product Category"
          size='small'
          className='w-full bg-white'
          value={productCategory}
          label="Product Category"
          onChange={handleChangeProductCat}
        >
          <MenuItem value={''}>None</MenuItem>
          <MenuItem value={10}>BirthDay Gifts</MenuItem>
          <MenuItem value={20}>Aniversery Gifts</MenuItem>
          <MenuItem value={30}>Wedding Gifts</MenuItem>
          <MenuItem value={40}>Personalize</MenuItem>
          <MenuItem value={50}>Combos</MenuItem>
         
        </Select>
        </div>
        <div className="col">
          <h3 className='text-[14px] font-[500] mb-1'>Product SubCategory </h3>
          <Select
          labelId="demo-simple-select-label"
          id="Product Category"
          size='small'
          className='w-full bg-white'
          value={productCategory}
          label="Product Category"
          onChange={handleChangeProducSubtCat }
        >
          <MenuItem value={''}>None</MenuItem>
          <MenuItem value={10}>Cakes</MenuItem>
          <MenuItem value={20}>Cards</MenuItem>
          <MenuItem value={30}>Jwellery</MenuItem>
          <MenuItem value={40}>Teddy Bears</MenuItem>
          <MenuItem value={50}>flawers</MenuItem>
         
        </Select>
        </div>
        <div className="col">
          <h3 className='text-[14px] font-[500] mb-1'>Product Price </h3>
          <input type="Number"  className='w-full p-3 bg-white text-sm h-[40px] border border[rgba(0,0,0,0.1)] focus:outline-none focus:border border-[rgba(0,0,0,0.4)] '/>
        </div>
        
        </div>
        <div className="grid grid-cols-3 gap-5 mb-3">
        <div className="col">
          <h3 className='text-[14px] font-[500] mb-1'>Product OldPrice</h3>
          <input type="Number"  className='w-full p-3 text-sm bg-white h-[40px] border border[rgba(0,0,0,0.1)] focus:outline-none focus:border border-[rgba(0,0,0,0.4)] '/>
        </div>
        <div className="col">
          <h3 className='text-[14px] font-[500] mb-1'>Product Discount</h3>
          <input type="text"  className='w-full p-3 text-sm bg-white h-[40px] border border[rgba(0,0,0,0.1)] focus:outline-none focus:border border-[rgba(0,0,0,0.4)] '/>
        </div>
        <div className="col">
          <h3 className='text-[14px] font-[500] mb-1'>Product Ingredients</h3>
          <input type="text"  className='w-full p-3 text-sm bg-white h-[40px] border border[rgba(0,0,0,0.1)] focus:outline-none focus:border border-[rgba(0,0,0,0.4)] '/>
        </div>
        </div>
        <div className="grid grid-cols-3 gap-5 mb-3">
        <div className="col">
          <h3 className='text-[14px] font-[500] mb-1'>Product Brand </h3>
          <input type="Number"  className='w-full p-3  bg-white text-sm h-[40px] border border[rgba(0,0,0,0.1)] focus:outline-none focus:border border-[rgba(0,0,0,0.4)] '/>
        </div>
        <div className="col">
          <h3 className='text-[14px] font-[500] mb-1'>Product Size</h3>
          <input type="text"  className='w-full p-3 bg-white  text-sm h-[40px] border border[rgba(0,0,0,0.1)] focus:outline-none focus:border border-[rgba(0,0,0,0.4)] '/>
        </div>
        <div className="col">
          <h3 className='text-[14px] pl-1 font-[500] mb-1'>Product Rating</h3>
          <Rating name="half-rating" defaultValue={2.5} precision={0.5} />
        </div>
        </div>
        <div className="grid grid-cols-1 mb-3">
        <div className="col">
          <h3 className='text-[14px] font-[500] mb-1'>Aditional Details</h3>
          <input type="text"  className='w-full p-3 bg-white text-sm h-[40px] border border[rgba(0,0,0,0.1)] focus:outline-none focus:border border-[rgba(0,0,0,0.4)] '/>
        </div>
        </div>

        {/* uload img */}
        <div className="uploadimg w-full p-2 px-1">
          <h3 className='font-[600] text-[18px]'>Media & Images</h3>
          <div className="grid grid-cols-6 gap-4 py-4 ">
          <div className='uploadBox relative flex flex-col !items-center !justify-center !rounded-sm  border-bashed border-1 border-[rgba(0,0,0,0.4)] bg-gray-100  hover:bg-gray-200 cursor-pointer  w-[100%] h-[170px]'>
          <span className='absolute -top-[10px] -right-[5px] w-[20px] h-[20px] rounded-full flex items-center justify-center bg-red-700 '><MdClose className='text-white text-[16px]'/></span>
          <img src="https://www.fnp.com/images/pr/l/v20221205201829/red-velvet-fresh-cream-cake-half-kg_1.jpg" alt="" className='w-full h-full object-cover' />
          </div>
          <div className='uploadBox relative flex flex-col !items-center !justify-center !rounded-sm  border-bashed border-1 border-[rgba(0,0,0,0.4)] bg-gray-100  hover:bg-gray-200 cursor-pointer  w-[100%] h-[170px]'>
          <span className='absolute -top-[10px] -right-[5px] w-[20px] h-[20px] rounded-full flex items-center justify-center bg-red-700 '><MdClose className='text-white text-[16px]'/></span>
          <img src="https://www.fnp.com/images/pr/l/v20221205201829/red-velvet-fresh-cream-cake-half-kg_1.jpg" alt="" className='w-full h-full object-cover' />
          </div>
          <div className='uploadBox relative flex flex-col !items-center !justify-center !rounded-sm  border-bashed border-1 border-[rgba(0,0,0,0.4)] bg-gray-100  hover:bg-gray-200 cursor-pointer  w-[100%] h-[170px]'>
          <span className='absolute -top-[10px] -right-[5px] w-[20px] h-[20px] rounded-full flex items-center justify-center bg-red-700 '><MdClose className='text-white text-[16px]'/></span>
          <img src="https://www.fnp.com/images/pr/l/v20221205201829/red-velvet-fresh-cream-cake-half-kg_1.jpg" alt="" className='w-full h-full object-cover' />
          </div>
          <div className='uploadBox relative flex flex-col !items-center !justify-center !rounded-sm  border-bashed border-1 border-[rgba(0,0,0,0.4)] bg-gray-100  hover:bg-gray-200 cursor-pointer  w-[100%] h-[170px]'>
          <span className='absolute -top-[10px] -right-[5px] w-[20px] h-[20px] rounded-full flex items-center justify-center bg-red-700 '><MdClose className='text-white text-[16px]'/></span>
          <img src="https://www.fnp.com/images/pr/l/v20221205201829/red-velvet-fresh-cream-cake-half-kg_1.jpg" alt="" className='w-full h-full object-cover' />
          </div>
          <div className='uploadBox relative flex flex-col !items-center !justify-center !rounded-sm  border-bashed border-1 border-[rgba(0,0,0,0.4)] bg-gray-100  hover:bg-gray-200 cursor-pointer  w-[100%] h-[170px]'>
          <span className='absolute -top-[10px] -right-[5px] w-[20px] h-[20px] rounded-full flex items-center justify-center bg-red-700 '><MdClose className='text-white text-[16px]'/></span>
          <img src="https://www.fnp.com/images/pr/l/v20221205201829/red-velvet-fresh-cream-cake-half-kg_1.jpg" alt="" className='w-full h-full object-cover' />
          </div>
            <UploadImageBox multiple={true}/>
          </div>
        </div>
        
        <br />
        {/* submit btn */}
         <Button type="button" className="flex items-center justify-center gap-2 btn-blue btn-lg w-[30%]">
          <MdOutlineCloudUpload className='text-[22px]' />Upload Product</Button>

         </form>
    </section>
  )
}

export default AddProduct
