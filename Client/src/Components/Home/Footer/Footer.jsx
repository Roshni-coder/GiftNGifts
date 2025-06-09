import React from "react";
import {
  LiaShippingFastSolid,
  LiaGiftSolid,
} from "react-icons/lia";
import { PiKeyReturnLight } from "react-icons/pi";
import { RiSecurePaymentLine } from "react-icons/ri";
import { BiSupport } from "react-icons/bi";
import { IoChatboxOutline } from "react-icons/io5";
import { FaFacebookF, FaTwitter, FaInstagramSquare } from "react-icons/fa";
import { BsYoutube } from "react-icons/bs";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Divider from "@mui/material/Divider";

function Footer() {
  return (
    <>
      <footer className="bg-[#fafafa] mt-6 pt-6">
        {/* Top Icons Row */}
        <div className="container px-4 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 text-center py-8">
          {[
            {
              icon: <LiaShippingFastSolid className="text-[40px]" />,
              title: "Free Shipping",
              desc: "For all Orders Over ₹100",
            },
            {
              icon: <PiKeyReturnLight className="text-[40px]" />,
              title: "30 Days Returns",
              desc: "For an Exchange Product",
            },
            {
              icon: <RiSecurePaymentLine className="text-[40px]" />,
              title: "Secured Payment",
              desc: "Payment Cards Accepted",
            },
            {
              icon: <LiaGiftSolid className="text-[40px]" />,
              title: "Special Gifts",
              desc: "On First Product Order",
            },
            {
              icon: <BiSupport className="text-[40px]" />,
              title: "Support 24/7",
              desc: "Contact Us Anytime",
            },
          ].map((item, idx) => (
            <div key={idx} className="flex items-center flex-col group">
              <div className="transition-all duration-300 group-hover:text-[#7d0492] group-hover:-translate-y-1">
                {item.icon}
              </div>
              <h3 className="text-[16px] font-semibold mt-3">{item.title}</h3>
              <p className="text-sm text-gray-600">{item.desc}</p>
            </div>
          ))}
        </div>

        <Divider />

        {/* Middle Section */}
        <div className="container px-4 py-12 grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Contact Section */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold">Contact Us</h2>
            <p className="text-sm">GiftNGifts - Mega Support Store<br />Union Trade Center, India</p>
            <Link to="mailto:sales@giftNgifts.com" className="text-sm text-gray-500 hover:underline block">
              sales@giftNgifts.com
            </Link>
            <p className="text-[#7d0492] font-bold text-xl">(+91) 9876-543-210</p>
            <div className="flex items-center gap-2">
              <IoChatboxOutline className="text-3xl text-[#7d0492]" />
              <span className="text-sm font-medium leading-tight">Online Chat<br />Get Expert Help</span>
            </div>
          </div>

          {/* Links Section */}
          <div className="flex flex-wrap md:flex-nowrap justify-between gap-6">
            <div>
              <h2 className="text-lg font-semibold mb-2">Privacy Info</h2>
              <ul className="space-y-2 text-sm">
                {["Terms & Conditions", "Privacy Policy", "Refund Policy", "Terms of Use", "Disclaimer"].map((item, i) => (
                  <li key={i}><Link to="/" className="hover:underline">{item}</Link></li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="text-lg font-semibold mb-2">About Services</h2>
              <ul className="space-y-2 text-sm">
                {["Shipping Info", "Support Policy", "FAQs", "Bulk Orders", "Order Tracking"].map((item, i) => (
                  <li key={i}><Link to="/" className="hover:underline">{item}</Link></li>
                ))}
              </ul>
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h2 className="text-lg font-semibold mb-2">Subscribe to Newsletter</h2>
            <p className="text-sm mb-4">Subscribe to our latest newsletter to get special discounts...</p>
            <form className="space-y-3">
              <input
                type="email"
                placeholder="Your Email Address"
                className="w-full px-3 py-2 border rounded focus:outline-none focus:border-gray-400"
              />
              <FormControlLabel
                control={<Checkbox defaultChecked />}
                label={<span className="text-xs">I agree to the terms and privacy policy</span>}
              />
              <Button variant="contained" className="!bg-[#7d0492] !text-white w-full">SUBSCRIBE</Button>
            </form>
          </div>
        </div>
      </footer>

      {/* Bottom Bar */}
      <div className="bg-white border-t py-4">
        <div className="container px-4 flex flex-col lg:flex-row justify-between items-center gap-4">
          {/* Socials */}
          <div className="flex gap-3">
            {[FaFacebookF, FaTwitter, FaInstagramSquare, BsYoutube].map((Icon, idx) => (
              <Link
                key={idx}
                to="/"
                className="w-9 h-9 border border-gray-300 flex items-center justify-center rounded-full hover:bg-[#7d0492] group"
              >
                <Icon className="text-lg group-hover:text-white" />
              </Link>
            ))}
          </div>

          {/* Copyright */}
          <p className="text-xs text-center sm:text-left">© 1994–2025 GiftNGift.com. All rights reserved.</p>

          {/* Payment Icons */}
          <img
            src="https://static-assets-web.flixcart.com/batman-returns/batman-returns/p/images/payment-method-c454fb.svg"
            alt="Payment Methods"
            className="h-6"
          />
        </div>
      </div>
    </>
  );
}

export default Footer;
