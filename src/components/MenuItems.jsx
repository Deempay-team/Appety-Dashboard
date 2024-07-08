import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const MenuItem = ({ item }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const isMatch = (keyword) => {
   return location.pathname.split("/").includes(keyword)
  }

  const checkInternet = (pageUrl) => {
      navigate(pageUrl);
  }

  return (
    <>
      {item.route ? (
        <a className="" href>
          <li
            className={
              isMatch(item.keyWord)
                ? "flex items-center px-[27px] mt-6 text-[#ffffff] w-[282px] mx-auto cursor-pointer rounded-lg bg-[#F99762] py-[13px]"
                : "flex items-center px-[70px] py-2 mt-6 text-gray-500 cursor-pointer "
            }
             onClick={(node, event) =>checkInternet(item.route)}
          >
            <span className="pr-2">{item.icon}</span>
            {item.name}
          </li>
         </a>
      ) : ( null
      )}
    </>
  );
};

export default MenuItem;

