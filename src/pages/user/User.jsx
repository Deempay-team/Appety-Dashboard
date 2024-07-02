import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { currentDate, currentTime } from "../../utils/functions";
import { SpinnerWhite } from "../../components/spinner/Spinner";
import { FaUserCircle } from "react-icons/fa";
import axios from "axios";
import {
  AppetyLogoSmall,
  NotOpenIcon,
  TickIcon,
} from "../../assests/icons/Icons";
import { useJoinQueue } from "../../hooks/useUser";

export const UserHomePage = () => {
  const { linkUrl } = useParams();
  //const merchId = JSON.parse(storage.fetch("userDetails")).userId;
  const [fillDataPage, setFillDataPage] = useState(true);
  const [queueWaitPage, setQueueWaitPage] = useState(false);
  const [notOpenPage, setNotOpenPage] = useState(false);
  const [isEmail, setIsEmail] = useState(false);
  const [progressBar, setProgressBar] = useState(true);
  const [isTableReady, setIsTableReady] = useState(false);
  const [cusPhone, setCusPhone] = useState("");
  const [cusName, setCusName] = useState("");
  const [marketing, setMarketing] = useState(1);
  const [merchId, setMerchId] = useState("");
  const [merchName, setMerchName] = useState(1);
  const [email, setEmail] = useState("");
  const [paxNo, setPaxNo] = useState("");
  const [logoUrl, setLogoUrl] = useState("");
  const [waitTypeList, setWaitTypeList] = useState([]);
  const [waitType, setWaitType] = useState("");
  const [waitTypeNameId, setWaitTypeNameId] = useState("");
  const [waitTypeId, setWaitTypeId] = useState("");
  const [estimateTime, setEstimateTime] = useState("");
  const [waitPostion, setWaitPosition] = useState("");
  const [userName, setuserName] = useState("");
  const [personNo, setPersonNo] = useState("");
  const [waitNo, setWaitNo] = useState("");
  //const [merchStatus, setMerchStatus] = useState("");
  const [waitStatus, setWaitStatus] = useState("");
  const [linkUrlStatus, setLinkUrlStatus] = useState("");

  // const checkPage = () => {
  //   if (linkUrlStatus !== "1") {
  //     setQueueWaitPage(false)
  //     setNotOpenPage(true);
  //     setFillDataPage(false)
  //   } 
  // }

  useEffect(() => {
    axios
      .get(`http://159.223.37.225/api/v1/link/fetch/${linkUrl}`)
      .then(function (res) {
        if (res.data.code === "000000") {
          setMerchId(res.data?.data.merchId);
          setLogoUrl(res.data?.data.logoUrl);
          setMerchName(res.data?.data.merchName);
          setWaitTypeList(res.data?.data.waitType);
          setLinkUrlStatus(res.data?.data.linkUrlStatus)
        }
      })
      .catch(function (error) {
        console.log("log-error", error);
      });
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const paxNoD = watch("paxNo");

  useEffect(() => {
    if (paxNoD) {
      for (let i = 0; i < waitTypeList.length; i++) {
        var minPax = waitTypeList[i].minPax;
        var maxPax =
          waitTypeList[i].maxPax !== "-" ? waitTypeList[i].maxPax : "1000";
        if (
          parseInt(paxNoD) >= parseInt(minPax) &&
          parseInt(paxNoD) <= parseInt(maxPax)
        ) {
          setWaitTypeId(waitTypeList[i].waitTypeId);
          setWaitType(waitTypeList[i].waitTypeName);
          setWaitTypeNameId(waitTypeList[i].waitTypeNameId);
          //setEstimateTime(waitTypeList[i].estimateTime)
        }
      }
    }
  }, [paxNoD]);

  const {
    isLoading: isJoining,
    data,
    mutate: joinQueue,
  } = useJoinQueue({
    merchId,
    cusPhone,
    cusName,
    waitType,
    waitTypeNameId,
    waitTypeId,
    paxNo,
    marketing,
    email: email ? email : "-",
  });

  // Function to handle the checkbox change
  const handleCheckboxChange = (event) => {
    setIsEmail(event.target.checked);
  };

  useEffect(() => {
    if (data?.code === "000000") {
      setWaitNo(data?.data?.waitNo);
      setWaitPosition(data?.data?.waitPosition);
      setuserName(data?.data?.cusName);
      setEstimateTime(data?.data?.estimateWaitTime);
      setPersonNo(data?.data?.paxNo);
      setWaitStatus(data?.data?.status)
      setFillDataPage(false);
      setQueueWaitPage(true);
      setNotOpenPage(false);

   
    }
  }, [data]);

  useEffect (() => {
   if (waitStatus === "WAITING") {
     setProgressBar(true);
     setIsTableReady(false);
     console.log("data", data.data);
   } else {
    setProgressBar(false);
     setIsTableReady(true);
   }
  }, [waitStatus])

  console.log("data", waitStatus);

  //SUBMIT USER DATA
  const onSubmitHandler = (data) => {
    const { email, cusPhone, cusName, paxNo } = data;
    setEmail(email);
    setCusPhone(cusPhone);
    setCusName(cusName);
    setPaxNo(paxNo);

    joinQueue();
  };

  return (
    <div className="bg-[#F6F7F9]">
      {fillDataPage ? (
        <div className="bg-[#F6F7F9] ">
          <div className="pt-10 max-w-md items-center mx-auto grid  bg-[#F6F7F9] py-1 sm:px-0 px-6">
            <div className="flex justify-between">
            <div className="flex items-center">
                  {logoUrl === null ? (
                    <FaUserCircle
                      size={50}
                      style={{
                        display: "flex",
                        alignSelf: "center",
                        opacity: 0.25,
                        cursor: "pointer",
                      }}
                    />
                  ) : (
                    <img
                      src={logoUrl}
                      width="50px"
                      height="50px"
                      alt="User avatar"
                      style={{ borderRadius: "50px" }}
                    />
                  )}
                  <p className="font-medium text-base text-black pl-3 capitalize">
                    {merchName}
                  </p>
                </div>
              <div className="flex place-items-end">
                <span className="flex bg-[#FDDCCB] rounded-[5px] items-center justify-center py-[8px] px-[14px] text-col text-[12px] font-normal">
                  <p className="">{currentDate}</p>
                  <div class="h-4 mx-[4px] border-[0.5px] border-[#f99762]"></div>
                  <p className="">{currentTime}</p>
                </span>
              </div>
            </div>
            <h1 className="text-2xl text-black font-semibold mb-3 mt-9">
              Hello There,
            </h1>
            <p className="text-base text-[#1f222a] mb-[52px]">
              Fill out the form below for a queue position.
            </p>
          </div>
          <div className="sm:max-w-md max-w-[366px] rounded-lg items-center mx-auto grid  bg-[#FFFFFF] py-10 px-6">
            <form onSubmit={handleSubmit(onSubmitHandler)} className="">
              <div className="">
                <input
                  type="text"
                  placeholder="Enter Your Name"
                  className={`in_put bg-[#FEEAE0] ${
                    errors.cusName && "input_error"
                  }`}
                  {...register("cusName", {
                    required: "Name is required",
                  })}
                />
                {errors.cusName && (
                  <p className=" mt-1 text-sm text-[red]">
                    {errors.cusName.message}
                  </p>
                )}
              </div>

              <div className="mt-10">
                <input
                  type="number"
                  placeholder="Enter Your Phone Number"
                  className={`in_put bg-[#FEEAE0] ${
                    errors.cusPhone && "input_error"
                  }`}
                  {...register("cusPhone", {
                    required: "Phone Number is required",
                  })}
                />
                {errors.cusPhone && (
                  <p className=" mt-1 text-sm text-[red]">
                    {errors.cusPhone.message}
                  </p>
                )}
              </div>

              <div className="mt-10">
                <input
                  type="number"
                  placeholder="Enter Pax"
                  className={`in_put bg-[#FEEAE0] ${
                    errors.paxNo && "input_error"
                  }`}
                  {...register("paxNo", {
                    required: "Pax is required",
                    pattern: {
                      value: /^(?!(0))[0-9]+$/,
                      message: "Your value must be greater than 0"
                    }
                  })}
                />
                {errors.paxNo && (
                  <p className=" mt-1 text-sm text-[red]">
                    {errors.paxNo.message}
                  </p>
                )}
              </div>

              <div class="text-[#606060] rounded-lg py-3.5 px-4 flex justify-between darker-bg w-full mt-10">
                <span class="text-[#ffffff] text-sm">Estimated Time</span>
                <span class="text-[#ffffff] ">----</span>
              </div>

              <div className="mt-6 flex ">
                <p className="text-sm text-[#000000] pr-3">
                  Do you want to receive marketing emails?
                </p>
                <input
                  onChange={handleCheckboxChange}
                  id="link-checkbox"
                  type="checkbox"
                  value=""
                  class="w-4 h-4 accent-[#f99762] bg-gray-100 border-gray-300 rounded"
                ></input>
              </div>

              {isEmail ? (
                <div className="mt-6">
                  <input
                    type="email"
                    placeholder="Enter Your Name"
                    className={`in_put bg-[#FEEAE0] ${
                      errors.email && "input_error"
                    }`}
                    {...register("email", {
                      required: "Email is required",
                    })}
                  />
                  {errors.email && (
                    <p className=" mt-1 text-sm text-[red]">
                      {errors.email.message}
                    </p>
                  )}
                </div>
              ) : null}

              <div>
                <button type="submit" disabled={isJoining} className="submit_btn mt-[80px] ">
                  {isJoining ? <SpinnerWhite /> : "submit"}
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : null}

      {queueWaitPage ? (
        <>
          <div className="bg-[#F6F7F9]">
            <div className="pt-10 max-w-md items-center mx-auto grid  bg-[#f6f7f9] py-1 sm:px-0 px-6">
              <div className="flex justify-between">
                <div className="flex items-center">
                  {logoUrl === null ? (
                    <FaUserCircle
                      size={50}
                      style={{
                        display: "flex",
                        alignSelf: "center",
                        opacity: 0.25,
                        cursor: "pointer",
                      }}
                    />
                  ) : (
                    <img
                      src={logoUrl}
                      width="50px"
                      height="50px"
                      alt="User avatar"
                      style={{ borderRadius: "50px" }}
                    />
                  )}
                  <p className="font-medium text-base text-black pl-3 capitalize">
                    {merchName}
                  </p>
                </div>
                <div className="flex place-items-end">
                  <span className="flex bg-[#FDDCCB] rounded-[5px] items-center justify-center py-[8px] px-[14px] text-col text-[12px] font-normal">
                    <p className="">{currentDate}</p>
                    <div class="h-4 mx-[4px] border-[0.5px] border-[#f99762]"></div>
                    <p className="">{currentTime}</p>
                  </span>
                </div>
              </div>
            </div>

            {progressBar ? (
              <div className="mt-[38px] sm:max-w-md max-w-[366px] rounded-[5px] items-center mx-auto grid  bg-[#ffffff] pb-6 pt-3 px-6">
                <p className="text-center text-[#000000] font-normal">
                  Group before you
                </p>
                <div
                  className="h-2 w-full bg-[#FDDCCB] rounded mt-4 relative"
                  style={{ width: "100%" }}
                >
                  <div
                    style={{ width: "50%" }}
                    className={"h-full bg-[#F99762] rounded"}
                  ></div>
                  <spa className="absolute text-[#ffffff] top-[-150%] left-[46%]  items-center border border-[#f99762] rounded-2xl px-[8px] py-[1px] bg-[#FCCBB0] ">
                    {waitPostion}
                  </spa>
                </div>
              </div>
            ) : null}

            {isTableReady ? (
              <div className="mt-[38px] sm:max-w-md max-w-[366px] rounded-[5px] items-center mx-auto grid  bg-[#33b469] py-[22px] px-6">
                <div className="flex items-center justify-center text-base">
                  <TickIcon />
                  <p className="text-center text-[#ffffff] pl-2 text-sm">
                    Your table is ready
                  </p>
                </div>
              </div>
            ) : null}

            <div className="sm:max-w-md max-w-[366px] rounded-[5px] items-center mx-auto grid  bg-[#ffffff] mt-6 ">
              <h2 className="text-center mt-8 text-base text-[#6B6968] font-normal">
                Queue Number
              </h2>
              <h3 className="text-center text-[56px] text-[#000000] font-semibold">
                {waitNo}
              </h3>
              <div class="  rounded-b-[5px] border-t-2 border-[#e0e0e0] py-5 px-6 flex justify-between bg-[#ffffff] w-full mt-4">
                <span class="text-base font-normal text-[#8a8a89]">
                  Estimated Time
                </span>
                <span class="text-lg font-medium text-[#000000]">
                  {estimateTime} Mins
                </span>
              </div>
            </div>
            <div class=" rounded-[5px]  bg-[#ffffff] sm:max-w-md max-w-[366px]  items-center mx-auto mt-6">
              <div className="py-5 px-6 flex justify-between">
                <span class="text-base font-normal text-[#8a8a89]">Name</span>
                <span class="text-lg font-medium text-[#000000] capitalize">
                  {userName}
                </span>
              </div>

              <div class="mx-6 border-[0.5px] border-[#e0e0e0]"></div>
              <div className="py-5 px-6 flex justify-between">
                <span class="text-base font-normal text-[#8a8a89]">Pax</span>
                <span class="text-lg font-medium">{personNo}</span>
              </div>
            </div>

            <div className="mt-6 sm:max-w-md max-w-[366px] rounded-lg items-center mx-auto grid  bg-[#ffffff] py-8 px-10">
              <p className="text-center text-[#000000] font-semibold text-lg ">
                Do Not Close This Page
              </p>
              <p className="text-center text-sm mt-[14px]">
                Queue number will be updated here, if you accidentally close
                this page, re-enter the same mobile to get the queue information
                again.
              </p>
            </div>

            <div class=" sm:max-w-md max-w-[366px]  items-center mx-auto mt-10">
              <button type="submit" className="submit_btn">
                Pre Order
              </button>
            </div>
          </div>
        </>
      ) : null}

      {notOpenPage ? (
        <>
          <div className="pt-10 max-w-md items-center mx-auto grid  bg-[#F6F7F9] py-1 sm:px-0 px-6">
            <div className="flex justify-between">
            <div className="flex items-center">
                  {logoUrl === null ? (
                    <FaUserCircle
                      size={50}
                      style={{
                        display: "flex",
                        alignSelf: "center",
                        opacity: 0.25,
                        cursor: "pointer",
                      }}
                    />
                  ) : (
                    <img
                      src={logoUrl}
                      width="50px"
                      height="50px"
                      alt="User avatar"
                      style={{ borderRadius: "50px" }}
                    />
                  )}
                  <p className="font-medium text-base text-black pl-3 capitalize">
                    {merchName}
                  </p>
                </div>
              <div className="flex place-items-end">
                <span className="flex bg-[#FDDCCB] rounded-[5px] items-center justify-center py-[8px] px-[14px] text-col text-[12px] font-normal">
                  <p className="">{currentDate}</p>
                  <div class="h-4 mx-[4px] border-[0.5px] border-[#f99762]"></div>
                  <p className="">{currentTime}</p>
                </span>
              </div>
            </div>
            <div>
              <span className="mt-[184px] flex items-center justify-center">
                <NotOpenIcon />
              </span>
              <h2 className="text-center my-3 text-2xl text-[#000000]">
                Sorry we are not open yet
              </h2>
              <h3 className="text-center mb-[190px] text-base text-[#6B6968]">
                Check With The Host
              </h3>
            </div>
          </div>
        </>
      ) : null}

      <div className="mt-10 pb-7 sm:px-0 px-6 flex  max-w-md items-center mx-auto justify-between text-[#000000]">
        <div>
          <p className="text-base">Terms and Conditions</p>
        </div>
        <div className="flex items-center justify-center text-base">
          <p className="text-center pr-2">Powered By</p>
          <AppetyLogoSmall />
        </div>
      </div>
    </div>
  );
};
