import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import storage from "../utils/storage";
import { FaUserCircle } from "react-icons/fa";
import { ArrowDownIcon, ArrowUpIcon } from "../assests/icons/Icons";
import { currentDate, currentTime } from "../utils/functions";

const HeaderPage = () => {
  const navigate = useNavigate();
  const firstName = JSON.parse(storage.fetch("userDetails")).firstName;
  const merchName = JSON.parse(storage.fetch("merchantDetails")).merchName;
  const logoUrl = JSON.parse(storage.fetch("merchantDetails")).logoUrl;
  const [changeIcon, setChangeIcon] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleLogout = () => {
    storage.clear();
    navigate("/login");
  };

  return (
    <>
      <div className="z-20 border-b top-0 border-[#D9D9D9] sticky w-full bg-[#F6F7F9] px-10 py-4">
        <div className="flex justify-between">
          <div className="flex items-center">
          <img
              src={"http://159.223.37.225/api/v1/user/logo/" + logoUrl}
              alt="User avatar"
              //style={{ borderRadius: "50px" }}
              className={`${
                imageLoaded
                  ? "visible rounded-full h-[50px] w-[50px]"
                  : "hidden rounded-full h-[50px] w-[50px]"
              }`}
              onLoad={() => setImageLoaded(true)}
            />
            {!imageLoaded && (
              <FaUserCircle
                size={50}
                style={{
                  display: "flex",
                  alignSelf: "center",
                  opacity: 0.25,
                  cursor: "pointer",
                }}
              />
            )}
            <p className="font-semibold text-[32px] text-black pl-3 capitalize">
              {merchName}
            </p>
          </div>
          <div className="flex ">
            <span className="lg:flex hidden gray2-bg opacity-90 items-center rounded-[5px] place-self-center py-[15px] px-[16px] text_16">
              <p className="">{currentDate}</p>
              <div class="h-5 mx-4 border-[0.5px] border-[#000000]"></div>
              <p className="">{currentTime}</p>
            </span>
            <span className="relative flex items-center gray2-bg opacity-90 rounded-[5px] ml-8 place-self-center py-[15px] px-[16px] text-black text-[12px] font-medium">
              <p className="text_16 text-[#000000]">{firstName}</p>
              <p
                className="cursor-pointer ml-4"
                onClick={() => setChangeIcon(!changeIcon)}
              >
                {changeIcon ? <ArrowDownIcon /> : <ArrowUpIcon />}
              </p>

              {changeIcon ? (
                <>
                  <div className="absolute right-0 top-[59px] z-10 mt-2 w-40 origin-top-right divide-y divide-[#D9D9D9] rounded-md bg-[#ffffff] border border-[#D9D9D9] focus:outline-none">
                    <div className="py-3 text-center">
                      <Link to="/dashboard/merchant/settings/queue">
                        <p className="cursor-pointer block px-4 py-2 text_16 text-[#33B469]">
                          Queue Settings
                        </p>
                      </Link>
                    </div>

                    <div className="py-3 text-center">
                      <p
                        onClick={handleLogout}
                        className="cursor-pointer block px-4 py-2 text_16 text-[#ff0000]"
                      >
                        Logout
                      </p>
                    </div>
                  </div>
                </>
              ) : null}
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default HeaderPage;
