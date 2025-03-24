import React, { useState } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import TotalPrice from "../Cart Page/Totalprice.jsx";
import TextField from "@mui/material/TextField";
import CartItems from "../Cart Page/CartItems.jsx";
import { Button } from "@mui/material";

function Checkout() {
  const [isOpenSummary, setOpenSummary] = useState(0);

  const toggleSummaryPanel = (index) => {
    setOpenSummary(isOpenSummary === index ? null : index);
  };

  return (
    <div className="container !my-2 lg:w-[80%] lg:mx-w-[80%] w-full lg:flex gap-4">
      <div className="leftPart lg:w-[70%] w-full">
        {/* Billing Details */}
        <Accordion className="m-2" expanded={isOpenSummary === 0} onChange={() => toggleSummaryPanel(0)}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <h1 className="text-[16px] pl-1">Billing Details</h1>
          </AccordionSummary>
          <AccordionDetails>
            <form className="w-full">
              <h6 className="pt-3 mb-2 px-1 text-[13px] font-[500]">Name and Phone *</h6>
              <div className="lg:flex items-center gap-3">
                <TextField className="w-full lg:w-[50%]" label="Full Name" size="small" variant="filled" />
                <TextField className="w-full lg:w-[50%] lg:mt-0 mt-3" label="Phone Number" size="small" variant="filled" />
              </div>
              <h6 className="pt-3 mb-2 px-1 text-[13px] font-[500]">Street Address *</h6>
              <TextField className="w-full" label="Address (Area and Street)" size="small" variant="filled" />
              <h6 className="pt-3 mb-2 px-1 text-[13px] font-[500]">City and State *</h6>
              <div className="lg:flex items-center gap-3">
                <TextField className="w-full lg:w-[50%]" label="City/District/Town" size="small" variant="filled" />
                <TextField className="w-full lg:w-[50%] lg:mt-0 mt-3" label="State" size="small" variant="filled" />
              </div>
              <h6 className="pt-3 mb-2 px-1 text-[13px] font-[500]">Pincode and Alternate Phone *</h6>
              <div className="lg:flex items-center gap-3">
                <TextField className="w-full lg:w-[50%]" label="Pincode" size="small" variant="filled" />
                <TextField className="w-full lg:w-[50%] lg:mt-0 mt-3" label="Alternate Number" size="small" variant="filled" />
              </div>
              <h6 className="pt-3 mb-2 px-1 text-[13px] font-[500]">Email Address *</h6>
              <TextField className="w-full" label="Email Address" size="small" variant="filled" />
              <div className="btns flex justify-end mx-1 mt-4 w-full">
                <Button variant="contained" className="w-full !bg-[#fb541b] !h-[45px]">
                  Deliver Here
                </Button>
              </div>
            </form>
          </AccordionDetails>
        </Accordion>
        {/* Order Summary */}
        <Accordion className="m-2" expanded={isOpenSummary === 1} onChange={() => toggleSummaryPanel(1)}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <h1 className="text-[16px] pl-1">Order Summary</h1>
          </AccordionSummary>
          <AccordionDetails>
          <div className="shadow-md rounded-md bg-white reviewScroll w-full border-b border-gray-200  !max-h-[450px] overflow-y-scroll overflow-x-hidden">
                  <CartItems />
                  <CartItems />
                  <CartItems />
                  <CartItems />
                </div>
                <div className="btn mt-4 flex justify-end">
                    <Button variant='contained' className='!bg-[#fb541b] !h-[50%] w-[40%] !rounded-none !p-3'>Continue</Button>
                  </div>
          </AccordionDetails>
        </Accordion>

        {/* Payment Options */}
        <Accordion className="m-2" expanded={isOpenSummary === 2} onChange={() => toggleSummaryPanel(2)}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <h1 className="text-[16px] pl-1">Payment Options</h1>
          </AccordionSummary>
          <AccordionDetails>
            Payment details
          </AccordionDetails>
        </Accordion>
      </div>

      {/* Right Part - Total Price */}
      <div className="rightPart w-full lg:!m-0 mt-4 lg:w-[30%]">
        <TotalPrice />
      </div>
    </div>
  );
}

export default Checkout;