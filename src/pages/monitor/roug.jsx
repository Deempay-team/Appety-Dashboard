import React, { useState, useEffect } from "react";
import { BackIcon } from "../../assests/icons/Icons";
import secrets from "../../config/secrets";
import { Link, useParams } from "react-router-dom";
import { SpinnerOrange } from "../../components/spinner/Spinner";
import { AppetyLogoMedium } from "../../assests/icons/Icons";
import axios from "axios";
import { FaUserCircle } from "react-icons/fa";

export const MonitorPage = () => {
  const baseURL = secrets.baseURL;
  const [merchId, setMerchId] = useState("");
  const [phone, setPhone] = useState("");
  const { linkUrl } = useParams();
  const [merchName, setMerchName] = useState("");
  const [logoUrl, setLogoUrl] = useState("");
  const [callTimer, setCallTime] = useState(0);
  const [callInterval, setCallInterval] = useState(10000);
  const [currentTime, setCurrentTime] = useState("");
  const [currentDate, setCurrentDate] = useState("");
  const [calltimer1, setCallTimer1] = useState(0);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [waitTypeList, setWaitTypeList] = useState([]);
  const [waitType, setWaitType] = useState("");
  const [linkUrlStatus, setLinkUrlStatus] = useState("");
  const [isUserFetch, setIsUserFetch] = useState(true);
   const [isOpenPage, setIsOpenPage] = useState(true);

  var timeOutId;

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

  //API CALL FOR THE USER TO SEE MERCHANT DETAILS
  useEffect(() => {
    axios
      .get(`${baseURL}api/v1/link/fetch/${linkUrl}`)
      .then(function (res) {
        if (res?.data?.code === "000000") {
          setMerchId(res?.data?.data?.merchId);
          setLogoUrl(res?.data?.data?.logoUrl);
          setMerchName(res?.data?.data?.merchName);
          setWaitTypeList(res?.data?.data?.waitType);
          setLinkUrlStatus(res?.data?.data?.linkUrlStatus);

          setIsUserFetch(false);
        }
      })
      .catch(function (error) {
        console.log("log-error", error);
      });
  }, []);

  //  //CHECK IF THE USER HAS INPUTTED  OR NOT
  //   useEffect(() => {
  //     if (linkUrlStatus) {
  //       if (linkUrlStatus === "1") {
  //         setIsOpenPage(true);
  //       } else {
  //         setIsOpenPage(false);
  //       }
  //     }
  //   }, [linkUrlStatus]);

 

  const handleDigit = (digit) => {
    if (phone.length < 8) {
      setPhone(phone + digit);
    }
  };

   const handleSubmit = () => {
    setIsOpenPage(false);
 
  };


  const handleDelete = () => {
    setPhone(phone.slice(0, -1));
  };

  const handleCheckbox = (e) => {
    setAgree(e.target.checked);
  };

  const [agree, setAgree] = useState(false);

  function formatted(str) {
  return str.split("").join(" ");
}


  return (
    <>
      <div className="z-20 border-b top-0 border-[#D9D9D9] sticky w-full bg-[#F6F7F9] px-10 py-4">
        <div className="flex justify-between">
          <div className="flex items-center">
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
            <span className="lg:flex hidden gray2-bg opacity-90 items-center rounded-[5px] place-self-center py-[15px] px-[16px] text_16">
              <p className="">{currentDate}</p>
              <div class="h-5 mx-4 border-[0.5px] border-[#000000]"></div>
              <p className="">{currentTime}</p>
            </span>
            <div className="flex ml-8 items-center justify-center text-base">
              <p className="text-center pr-2">Powered By</p>
              <AppetyLogoMedium />
            </div>
          </div>
        </div>
      </div>

      <div className="min-h-screen bg-[#f6f6f6]">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6  p-6">
         
          <div className="space-y-4 bg-white rounded-[5px] px-10 py-[50px]">
            <h2 className="text-[32px] font-bold text-black">
              Register your place in line easily with your mobile phone number!
            </h2>
            <p className="text-[22px] font-normal text-black">Check your message via KakaoTalk</p>
            <p className="text-2xl font-normal text-black pt-[77px]">
              Cafe Name:{" "}
              <span className="text-black text-[32px] font-semibold">{merchName}</span>
            </p>
            <div className="flex space-x-6 mt-[100px]">
              <div className="bg-[#f6f6f6] rounded-lg p-6 flex-1 text-center items-center">
                <p className="text-black font-normal text-[16px]">Current Waiting</p>
                <p className="text-[58px] font-bold relative">
                  30 <span className="A text-[16px] font-normal text-center items-center">Teams</span>
                </p>
              </div>
              <div className="bg-[#f6f6f6] rounded-lg p-6 flex-1 text-center items-center">
                <p className="text-black font-normal text-[16px]">Estimated Wait time</p>
                <p className="text-[58px] font-bold ">
                  15 <span className="text-[16px] mt-[-6rem] font-normal text-center items-center">Minutes</span>
                </p>
              </div>
            </div>
          </div>

          <div className=" bg-white rounded-[5px] px-10 pt-[50px] pb-6">

           {isOpenPage ? (
            <>
             <h2 className="text-[32px] text-black font-bold">Welcome!</h2>
            <p className="font-normal text-[24px] text-black ">Please enter your mobile Phone number</p>
            <div className="text-2xl font-normal pt-[50px] pb-[30px]  text-center">
              (+065) {formatted(phone.padEnd(8, "_").replace(/(.{4})/, "$1 "))}
            </div>
            <div className="grid grid-cols-3 gap-4">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, "del", 0, "Next"].map((digit, i) =>
                digit === "Next" ? (
                   <button
                    key={i}
                    onClick={handleSubmit}
                    disabled={!agree || phone.length !== 8}
                    className="submit_btn cursor-pointer"
                  >
                  {"Next"}
                  </button>
                ) : digit === "del" ? (
                  <button
                    key={i}
                    onClick={handleDelete}
                    className="p-4 bg-[#f6f6f6] rounded-md"
                  >
                  <span className="flex items-center justify-center">
                    <BackIcon className="" />
                  </span>
                  </button>
                ) : (
                  <button
                    key={i}
                    onClick={() => handleDigit(digit)}
                    className="p-4 bg-[#f6f6f6] rounded-md"
                  >
                    {digit}
                  </button>
                )
              )}
            </div>
        
            <div className="flex items-center space-x-2 pt-10">
              <input type="checkbox" onChange={handleCheckbox} />
              <label>
                I agree to the collection and use of my personal information
              </label>
            </div>
            </>
            ) : (
            <>
            <div>hello</div>
            </>
            )}

          </div>

        </div>
      </div>
    </>
  );
};
