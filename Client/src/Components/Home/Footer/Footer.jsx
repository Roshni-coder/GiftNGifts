import React from "react";
import { LiaShippingFastSolid } from "react-icons/lia";
import { PiKeyReturnLight } from "react-icons/pi";
import { RiSecurePaymentLine } from "react-icons/ri";
import { LiaGiftSolid } from "react-icons/lia";
import { BiSupport } from "react-icons/bi";
import { Link } from "react-router-dom";
import { IoChatboxOutline } from "react-icons/io5";
import Button from "@mui/material/Button";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { FaFacebookF } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa6";
import { FaInstagramSquare } from "react-icons/fa";
import { BsYoutube } from "react-icons/bs";
import { Divider } from "@mui/material";

function Footer() {
  return (
    <>
      <footer className="py-6 mt-6 bg-[#fafafa]">
        <div className="container px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 text-center pb-16 py-8">
            <div className="col flex items-center flex-col group">
              <LiaShippingFastSolid className="text-[40px] transition-all duration-300 group-hover:text-[#7d0492] group-hover:-translate-y-1" />
              <h3 className="text-[16px] font-[600] mt-3">Free Shipping</h3>
              <p className="text-[12px] font-[500]">For all Orders Over $100</p>
            </div>
            <div className="col flex items-center flex-col group">
              <PiKeyReturnLight className="text-[40px] transition-all duration-300 group-hover:text-[#7d0492] group-hover:-translate-y-1" />
              <h3 className="text-[16px] font-[600] mt-3">30 Days Returns</h3>
              <p className="text-[12px] font-[500]">For an Exchange Product</p>
            </div>
            <div className="col flex items-center flex-col group">
              <RiSecurePaymentLine className="text-[40px] transition-all duration-300 group-hover:text-[#7d0492] group-hover:-translate-y-1" />
              <h3 className="text-[16px] font-[600] mt-3">Secured Payment</h3>
              <p className="text-[12px] font-[500]">Payment Cards Accepted</p>
            </div>
            <div className="col flex items-center flex-col group">
              <LiaGiftSolid className="text-[40px] transition-all duration-300 group-hover:text-[#7d0492] group-hover:-translate-y-1" />
              <h3 className="text-[16px] font-[600] mt-3">Special Gifts</h3>
              <p className="text-[12px] font-[500]">Our First Product Order</p>
            </div>
            <div className="col flex items-center flex-col group">
              <BiSupport className="text-[40px] transition-all duration-300 group-hover:text-[#7d0492] group-hover:-translate-y-1" />
              <h3 className="text-[16px] font-[600] mt-3">Support 24/7</h3>
              <p className="text-[12px] font-[500]">Contact us Anytime</p>
            </div>
          </div>
          <Divider />
          <div className="footer flex flex-wrap lg:flex-nowrap py-12 gap-6">
            <div className="part1 w-full justify-center  border-r border-[rgba(0,0,0,0.1)] px-4">
              <h2 className="text-[20px] font-[600] mb-4">Contact us</h2>
              <p className="text-[13px] font-[400] pb-4">
                GiftNGifts - Mega Support Store <br /> Union Trade Center India
              </p>
              <Link className="link text-[14px]" to="mailto:">
                sales@giftNgifts.com
              </Link>
              <span className="text-[22px] font-[600] block mt-3 mb-4 text-[#7d0492]">
                (+91) 9876-543-210
              </span>
              <div className="flex items-center gap-2">
                <IoChatboxOutline className="text-[40px] text-[#7d0492]" />
                <span className="text-[16px] font-[600]">
                  OnLine Chat
                  <br />
                  Get Expert Help
                </span>
              </div>
            </div>
            <div className="part2 w-full  px-4 flex  md:flex-nowrap  justify-between  gap-6">
              <div className="part2_col1 w-1/2">
                <h2 className="text-[20px] font-[600] mb-4">Privacy Info</h2>
                <ul className="list">
                  <li className="list-none text-[14px] mb-2">
                    <Link to="/" className="link">
                      Terms & Conditions
                    </Link>
                  </li>
                  <li className="list-none text-[14px] mb-2">
                    <Link to="/" className="link">
                      Privacy Policy
                    </Link>
                  </li>
                  <li className="list-none text-[14px] mb-2">
                    <Link to="/" className="link">
                      Refund Policy
                    </Link>
                  </li>
                  <li className="list-none text-[14px] mb-2">
                    <Link to="/" className="link">
                      Terms of Use
                    </Link>
                  </li>
                  <li className="list-none text-[14px] mb-2">
                    <Link to="/" className="link">
                      Disclaimer
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="part2_col2 w-1/2">
                <h2 className="text-[20px] font-[600] mb-4">About Services</h2>
                <ul className="list">
                  <li className="list-none text-[14px] mb-2">
                    <Link to="/" className="link">
                      Terms & Conditions
                    </Link>
                  </li>
                  <li className="list-none text-[14px] mb-2">
                    <Link to="/" className="link">
                      Privacy Policy
                    </Link>
                  </li>
                  <li className="list-none text-[14px] mb-2">
                    <Link to="/" className="link">
                      Refund Policy
                    </Link>
                  </li>
                  <li className="list-none text-[14px] mb-2">
                    <Link to="/" className="link">
                      Terms of Use
                    </Link>
                  </li>
                  <li className="list-none text-[14px] mb-2">
                    <Link to="/" className="link">
                      Disclaimer
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="part3 w-full  px-4 flex flex-col">
              <h2 className="text-[18px] font-[600] mb-4">Subscribe to Newsletter</h2>
              <p className="text-[13px]">
                Subscribe to our latest newsletter to get special discounts...
              </p>
              <form className="mt-5">
                <input
                  type="email"
                  className="w-full h-[45px] mb-4 border outline-none px-4 rounded-sm focus:border-[rgba(0,0,0,0.3)]"
                  placeholder="Your Email Address"
                />
                <FormControlLabel
                  control={<Checkbox defaultChecked />}
                  label="I agree to the terms and conditions and the privacy policy"
                />
                <Button className="btn-org !mt-2">SUBSCRIBE</Button>
                
              </form>
            </div>
          </div>
        </div>
      </footer>

      <div className="bottomStrip border-t py-3 border-[rgba(0,0,0,0.2)]">
        <div className="container flex items-center justify-between flex-wrap gap-6">
          <ul className="flex items-center gap-4">
            <li>
              <Link
                to="/"
                target="_blank"
                className="w-[35px] h-[35px] rounded-full border border-[rgba(0,0,0,0.1)] flex items-center justify-center group hover:bg-[#7d0492] transition-all"
                aria-label="Facebook link"
              >
                <FaFacebookF className="text-[20px] group-hover:text-white" />
              </Link>
            </li>
            <li>
              <Link
                to="/"
                target="_blank"
                className="w-[35px] h-[35px] rounded-full border border-[rgba(0,0,0,0.1)] flex items-center justify-center group hover:bg-[#7d0492] transition-all"
                aria-label="Twitter link"
              >
                <FaTwitter className="text-[20px] group-hover:text-white" />
              </Link>
            </li>
            <li>
              <Link
                to="/"
                target="_blank"
                className="w-[35px] h-[35px] rounded-full border border-[rgba(0,0,0,0.1)] flex items-center justify-center group hover:bg-[#7d0492] transition-all"
                aria-label="Instagram link"
              >
                <FaInstagramSquare className="text-[20px] group-hover:text-white" />
              </Link>
            </li>
            <li>
              <Link
                to="/"
                target="_blank"
                className="w-[35px] h-[35px] rounded-full border border-[rgba(0,0,0,0.1)] flex items-center justify-center group hover:bg-[#7d0492] transition-all"
                aria-label="YouTube link"
              >
                <BsYoutube className="text-[15px] group-hover:text-white" />
              </Link>
            </li>
          </ul>
          <p className="text-[13px] text-center mb-0">© 1994-2025 GiftNGift.com. All rights reserved.</p>
          <div className="flex items-center">
            <img src="https://static-assets-web.flixcart.com/batman-returns/batman-returns/p/images/payment-method-c454fb.svg" alt="Payment Methods" />
          </div>
        </div>
      </div>
    </>
  );
}

export default Footer;
