import React, { useState, useEffect, useContext } from "react";
import { BackIcon } from "../../assests/icons/Icons";
import secrets from "../../config/secrets";
import { useParams } from "react-router-dom";
import { SpinnerWhite, SpinnerOrange } from "../../components/spinner/Spinner";
import { AppetyLogoMedium } from "../../assests/icons/Icons";
import axios from "axios";
import { FaUserCircle } from "react-icons/fa";
import { useJoinQueue } from "../../hooks/useUser";
import Notify from "../../components/Notification";
//import { UserContext } from "../../contexts/UserContext";

export const MonitorPage = () => {
  const baseURL = secrets.baseURL;
 // const { isTableAvail, setIsTableAvail } = useContext(UserContext);
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
  const [pax, setPax] = useState("");
  const [paxNo, setPaxNo] = useState("");
  const [agree, setAgree] = useState(false);
  const [activeInput, setActiveInput] = useState(null);
  const [waitTypeNameId, setWaitTypeNameId] = useState("");
  const [waitTypeId, setWaitTypeId] = useState("");
  const [estimateTime, setEstimateTime] = useState("--");
  const [waitPostion, setWaitPosition] = useState("");
  const [cusPhone, setCusPhone] = useState("");
  //const [cusName, setCusName] = useState("");
  const [userName, setuserName] = useState("");
  const [personNo, setPersonNo] = useState("");
  const [waitNo, setWaitNo] = useState("");
  const [waitId, setWaitId] = useState("");
  const [fillDataPage, setFillDataPage] = useState(true);
  const [marketing, setMarketing] = useState(1);

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
  useEffect(() => {
    if (linkUrlStatus) {
      if (linkUrlStatus === "1") {
        setIsOpenPage(true);
      } else {
        setIsOpenPage(false);
      }
    }
  }, [linkUrlStatus]);

  const paxNoD = pax;

  //LOGIC TO FILTER WAITTYPE
  useEffect(() => {
    if (paxNoD) {
      for (let i = 0; i < waitTypeList.length; i++) {
        var minPax = waitTypeList[i].minPax;
        var maxPax = "";
        if (i < waitTypeList.length - 1) {
          maxPax = waitTypeList[i].maxPax;
        } else {
          maxPax = "1000";
        }

        if (
          parseInt(paxNoD) >= parseInt(minPax) &&
          parseInt(paxNoD) <= parseInt(maxPax)
        ) {
          setWaitTypeId(waitTypeList[i].waitTypeId);
          setWaitType(waitTypeList[i].waitTypeName);
          setWaitTypeNameId(waitTypeList[i].waitTypeNameId);
          setEstimateTime(waitTypeList[i].estimateTime);
        }
      }
    }

    if (paxNoD === "0" || paxNoD === " " || paxNoD === "") {
      setEstimateTime("--");
    }
  }, [paxNoD]);

  const {
    isLoading: isJoining,
    data,
    mutate: joinQueue,
  } = useJoinQueue({
    merchId,
    waitType,
    waitTypeNameId,
    waitTypeId,
    paxNo,
    cusPhone,
    cusName: cusPhone,
    marketing,
    email: "-",
  });

  useEffect(() => {
    // if (!agree) {
    //   Notify("error", "Please agree to the personal terms.");
    // }
    if (paxNo && waitType) {
      joinQueue();
      setIsOpenPage(false);
      Notify(
        "success",
        "joined succesfully!",
        "Queue joined succeessfully!",
        5
      );
    }
  }, [paxNo, waitType]);

  const handleSubmits = () => {
    setPaxNo(pax);
    setCusPhone(phone);

    // if (!agree) {
    //   Notify("error", "Please agree to the personal terms.");
    // }
  };

  //CALL API TO JOIN QUEUE
  useEffect(() => {
    if (data?.code === "000000") {
      setWaitNo(data?.data?.waitNo);
      setWaitPosition(data?.data?.waitPosition);
      setuserName(data?.data?.cusName);
      setEstimateTime(parseInt(data?.data?.estimateWaitTime));
      setPersonNo(data?.data?.paxNo);
      //setWaitStatus(data?.data?.status);
      setFillDataPage(false);
      setWaitId(data?.data?.waitId);

      // var totalQueue = data?.data?.totalNumberQueue;
      // var waitos = data?.data?.waitPosition;
      // var percentPos =
      //   ((parseInt(totalQueue) - parseInt(waitos) + 1) / parseInt(totalQueue)) *
      //   100;
      // setPosPercent(percentPos);
    }
  }, [data]);

  useEffect(() => {
    if (waitId) {
      //start timer
      handleStartTimer();
    }
  }, [waitId]);

  // start timer function 2mins
  let timer = 0;
  const handleStartTimer = () => {
    timeOutId = setInterval(function () {
      timer += 1;
      setCallTime(timer);
      axios
        .get(
          `${baseURL}api/v1/link/fetch/wait/status/?waitId=${waitId}&merchId=${merchId}`
        )
        .then(function (res) {
          if (res.data.code === "000000") {
            setWaitPosition(res?.data?.data?.waitPosition);
            setEstimateTime(parseInt(res?.data?.data?.estimateWaitTime));
            //setWaitStatus(res?.data?.data?.status);
            setFillDataPage(false);
            // var totalQueue = res?.data?.data?.totalNumberQueue;
            // var waitos = res?.data?.data?.waitPosition;
            // var percentPos =
            //   ((parseInt(totalQueue) - parseInt(waitos) + 1) /
            //     parseInt(totalQueue)) *
            //   100;
            // setPosPercent(percentPos);

            if (res?.data?.data?.waitPosition === 0) clearTimeout(timeOutId);

            if (res?.data?.data?.waitCall === "1") {
              // setProgressBar(false);
              //playSound();
              // play();
            }
          }
        })
        .catch(function (error) {
          console.log("log-error", error);
        });
      //handleTest();
    }, callInterval);
  };

  const handleCheckbox = (e) => {
    setAgree(e.target.checked);
  };

  // function formatted(str) {
  //   return str.split("").join(" ");
  // }

  const handleDigit = (digit) => {
    if (activeInput === "pax" && pax.length < 2) {
      setPax(pax + digit);
    } else if (activeInput === "phone" && phone.length < 8) {
      setPhone(phone + digit);
    }
  };

  const handleDelete = () => {
    if (activeInput === "pax") {
      setPax(pax.slice(0, -1));
    } else if (activeInput === "phone") {
      setPhone(phone.slice(0, -1));
    }
  };

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

      <div className="h-fit bg-[#f6f6f6]">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6  p-6">
          <div className="bg-white rounded-[5px] px-10 py-[50px]">
            <h2 className="text-2xl font-bold mb-2">Reserve your spot!</h2>
            <p className="text-gray-600 pb-[43px]">
              Check your message via KakaoTalk
            </p>
            <hr className="pt-[34px]" />
            <p className="text-2xl font-normal text-black pt-[77px]">
              Cafe Name:{" "}
              <span className="text-black text-[32px] font-semibold">
                {merchName}
              </span>
            </p>
            <div className="flex space-x-6 mt-[100px] pt-[64px]">
              <div className="bg-[#f6f6f6] rounded-lg grid w-[297px] h-[219px]  text-center items-center">
                <p className="text-black font-normal text-[16px] pt-6">
                  Current Waiting
                </p>
                <p className="text-[58px] font-bold  text-center">
                  {waitNo ? waitNo : "--"}
                  {/* <span className="A text-[16px] mx-2 font-normal">
                    Teams
                  </span> */}
                </p>
              </div>
              <div className="bg-[#f6f6f6] rounded-lg w-[297px] h-[219px] grid text-center items-center">
                <p className="text-black font-normal text-[16px] pt-6">
                  Estimated Wait time
                </p>
                {estimateTime === "--" ? (
                  <p className="text-[58px] font-bold ">{estimateTime}</p>
                ) : (
                  <p className="text-[58px] font-bold ">
                    {estimateTime}
                    <span className="text-[16px] mx-2 font-normal ">mins</span>
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className=" bg-white rounded-[5px] px-10 pt-[50px] pb-6">
            {isOpenPage ? (
              <>
                <div className="h-fit bg-white max-w-xl mx-auto">
                  <h2 className="text-2xl font-bold mb-2">Welcome!</h2>
                  <p className="text-gray-600 pb-[43px]">
                    Please enter your pax and mobile phone number.
                  </p>
                  <hr className=" pt-[34px]" />

                  <div className="grid grid-cols-2 gap-4 mb-12">
                    <div>
                      <label className="block text-sm mb-1">Pax Number</label>
                      <input
                        name="pax"
                        value={pax}
                        placeholder="Enter Pax"
                        onFocus={() => setActiveInput("pax")}
                        className="w-full border px-3 py-2 rounded-md cursor-pointer h-[50px] block focus:border-[#F99762] outline-none"
                        readOnly
                      />
                    </div>
                    <div>
                      <label className="block text-sm mb-1">Phone Number</label>
                      <div className="flex border rounded-md overflow-hidden">
                        <span className="px-3 h-[50px] flex items-center bg-white border-r">
                          (+65)
                        </span>
                        <input
                          name="phone"
                          value={phone}
                          placeholder="Enter Phone Number"
                          onFocus={() => setActiveInput("phone")}
                          className="w-full px-3 py-2 cursor-pointer h-[50px] block focus:border-[#F99762] outline-none"
                          readOnly
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4 mb-6">
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, "del", 0, "Next"].map(
                      (digit, i) =>
                        digit === "Next" ? (
                          <button
                            key={i}
                            onClick={handleSubmits}
                            //disabled={!agree || phone.length !== 8}
                            disabled={phone.length !== 8}
                            className="submit_btn cursor-pointer"
                          >
                            {isJoining ? <SpinnerWhite /> : "Next"}
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
                  <div className="flex items-center space-x-2 pt-4">
                    <input type="checkbox" onChange={handleCheckbox} />
                    <label className="text-sm">
                      I agree to the collection and use of my personal
                      information
                    </label>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="h-fit bg-white max-w-xl grid items-center mx-auto">
                   <p className="text-black font-normal text-[16px] pt-[100px] mx-auto">
                  Current Waiting
                </p>
                  <h2 className="text-[110px] font-bold pb-3 pt-[15px] mx-auto">
                    {waitNo}
                  </h2>
                   <p className="text-black font-normal text-[16px] pt-3 mx-auto ">
                  Estimated Wait time
                </p>
                 <p className="text-[62px] font-bold mx-auto">
                    {estimateTime}
                    <span className="text-[16px] mx-2 font-normal ">mins</span>
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
