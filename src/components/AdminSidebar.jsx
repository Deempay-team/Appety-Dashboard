import React from "react";
import MenuItem from "./MenuItems";
import { adminLinks } from "./links";

const Sidebar = () => {

  return (
    <>
      <div className="fixed h-full top-0 md:block hidden items-center justify-center xl:w-[370px] w-[320px] bg-[#F6F7F9] border-r border-[#D9D9D9]">
        <div className="">
           <div className="mt-[120px] ">
         </div>
          <ul className="mt-10">
            {adminLinks.map((link, i) => (
              <MenuItem key={i} item={link} />
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
