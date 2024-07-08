import React, { useState, useEffect } from "react";
import MenuItem from "./MenuItems";
import { Link } from "react-router-dom";
import { merchantLinks, adminLinks } from "./links";
import { BackArrowIcon } from "../assests/icons/Icons";
import storage from "../utils/storage";

const Sidebar = () => {
  //const adminStatus = JSON.parse(storage.fetch("RegisterDetails")).status;
  const adminStatus = JSON.parse(storage.fetch("userDetails")).status;
  //console.log("merchantStatus-", merchantStatus);
  const [menuItems, setMenuItems] = useState([]);
  const [isMerchant, setIsMerchant] = useState(false);
  const [isAdmin, setIsAdmin] = useState(true);
    
useEffect(() => {
  if (adminStatus === "1") {
    setMenuItems(merchantLinks);
    setIsMerchant(true);
    setIsAdmin(false);
  } else {
    setMenuItems(adminLinks)
    setIsAdmin(true);
    setIsMerchant(false)
  }
}, [])

  return (
    <>
      <div className="fixed h-full top-0 md:block hidden items-center justify-center xl:w-[370px] w-[320px] bg-[#F6F7F9] border-r border-[#D9D9D9]">
        <div className="">
        {isAdmin && (
           <div className="mt-[120px] ">
         </div>
         )}
         {isMerchant && (
           <div className="border-b py-8 border-[#D9D9D9] mt-[85px] ">
           <Link to="/dashboard/merchant" className="flex px-[70px] cursor-pointer ">
             <BackArrowIcon />
             <p className="text_18 "> Go back</p>
           </Link>
         </div>
         )}
          <ul className="mt-10">
            {menuItems.map((link, i) => (
              <MenuItem key={i} item={link} />
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
