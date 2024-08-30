import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import storage from "../utils/storage";
import { FaUserCircle } from "react-icons/fa";
import {
  ArrowDownIcon,
  ArrowUpIcon,
  BackArrowIcon,
} from "../assests/icons/Icons";
import axios from "axios";
import secrets from "../config/secrets";

const HeaderPage = () => {
  const navigate = useNavigate();
  const baseURL = secrets.baseURL;
  const customerId = JSON.parse(storage.fetch("customerId")).customerId;
  const merchId = JSON.parse(storage.fetch("userDetails")).userId;
  const firstName = JSON.parse(storage.fetch("userDetails")).firstName;
  const userRole = JSON.parse(storage.fetch("userDetails")).role;
  const [merchName, setMerchName] = useState("");
  const [logoUrl, setLogoUrl] = useState("");
  const [imageLoaded, setImageLoaded] = useState(false);
  const [changeIcon, setChangeIcon] = useState(false);
  const [currentTime, setCurrentTime] = useState("");
  const [currentDate, setCurrentDate] = useState("");
  const [calltimer1, setCallTimer1] = useState(0);


  useEffect(() => {
    let timer1 = 0;
    setInterval(function () {
      timer1 += 1;
      setCallTimer1(timer1);
    }, 1000);
  }, []);

  useEffect(() => {
    return () => {
      let timeRun = new Date().toLocaleTimeString("en-us", {
        hour: "2-digit",
        minute: "2-digit",
      });

      let dateRun = new Date().toLocaleDateString("en-us", {
        year: "numeric",
        month: "numeric",
        day: "numeric",
      });
      setCurrentTime(timeRun);
      setCurrentDate(dateRun);
    };
  }, [calltimer1]);

  //CALL QUERY MERCHANT DETAILS API
  useEffect(() => {
    axios
      .get(`${baseURL}api/v1/user/merchant/query/${customerId ? customerId : merchId}`)
      .then(function (res) {
        if (res.data.code === "000000") {
          setMerchName(res.data.data?.merchName);
          setLogoUrl(res.data.data?.logoUrl);
        }
      })
      .catch(function (error) {
        console.log("merchant-error", error);
      });
  }, []);

  const handleLogout = () => {
    storage.clear();
    navigate("/login");
  };

  return (
    <>
      <div className="z-20 border-b top-0 border-[#D9D9D9] sticky w-full bg-[#F6F7F9] px-10 py-4">
        <div className="flex justify-between">
          <div className="flex items-center">
          {userRole === "ADMIN" ? null : (
            <>
              <Link
                to="/dashboard/admin/overview"
                className="flex pr-3 cursor-pointer "
              >
                <BackArrowIcon />
              </Link>
            </>
          )}
            <img
              src={`${baseURL}api/v1/user/logo/${logoUrl}`}
              alt="User avatar"
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
            <p className="font-semibold xl:text-[32px] text-[24px] text-black pl-3 capitalize">
              {merchName}
            </p>
          </div>

          <div className="flex ">
            <span className="flex gray2-bg opacity-90 items-center rounded-[5px] place-self-center py-[15px] px-[16px] text_16">
              <p className="">{currentDate}</p>
              <div class="h-5 mx-4 border-[0.5px] border-[#000000]"></div>
              <p className="">{currentTime}</p>
            </span>
            <span
              onClick={() => setChangeIcon(!changeIcon)}
              className="relative cursor-pointer  flex items-center gray2-bg opacity-90 rounded-[5px] ml-8 place-self-center py-[15px] px-[16px] text-black text-[12px] font-medium"
            >
              <p className="text_16 text-[#000000]">{firstName}</p>
              <p className="cursor-pointer ml-4">
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
