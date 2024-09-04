import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { SpinnerWhite, SpinnerOrange } from "../../components/spinner/Spinner";
import { FaUserCircle } from "react-icons/fa";
import axios from "axios";
import {
  AppetyLogoSmall,
  NotOpenIcon,
  TickIcon,
  HomeIcon,
} from "../../assests/icons/Icons";
import { useJoinQueue } from "../../hooks/useUser";
import secrets from "../../config/secrets";
import ringer from "../../assests/sounds/success-sound.mp3";
import useSound from "use-sound";

export const UserHomePage = () => {
  const { linkUrl } = useParams();
  const baseURL = secrets.baseURL;
  const [fillDataPage, setFillDataPage] = useState(true);
  const [isOpenPage, setIsOpenPage] = useState(true);
  const [isEmail, setIsEmail] = useState(false);
  const [progressBar, setProgressBar] = useState(true);
  const [cusPhone, setCusPhone] = useState("");
  const [cusName, setCusName] = useState("");
  const [marketing, setMarketing] = useState(1);
  const [merchId, setMerchId] = useState("");
  const [merchName, setMerchName] = useState("");
  const [email, setEmail] = useState("");
  const [paxNo, setPaxNo] = useState("");
  const [logoUrl, setLogoUrl] = useState("");
  const [waitTypeList, setWaitTypeList] = useState([]);
  const [waitType, setWaitType] = useState("");
  const [waitTypeNameId, setWaitTypeNameId] = useState("");
  const [waitTypeId, setWaitTypeId] = useState("");
  const [estimateTime, setEstimateTime] = useState("--");
  const [waitPostion, setWaitPosition] = useState("");
  const [userName, setuserName] = useState("");
  const [personNo, setPersonNo] = useState("");
  const [waitNo, setWaitNo] = useState("");
  const [waitId, setWaitId] = useState("");
  const [waitStatus, setWaitStatus] = useState("");
  const [linkUrlStatus, setLinkUrlStatus] = useState("");
  const [preOrderUrl, setPreOrderUrl] = useState("");
  const [imageLoaded, setImageLoaded] = useState(false);
  const [posPercent, setPosPercent] = useState(100);
  const [callTimer, setCallTime] = useState(0);
  const [callInterval, setCallInterval] = useState(10000);
  const [isUserFetch, setIsUserFetch] = useState(true);
  const [currentTime, setCurrentTime] = useState("");
  const [currentDate, setCurrentDate] = useState("");
  const [calltimer1, setCallTimer1] = useState(0);
  const [play] = useSound(ringer);

  //AUDIO SOUND FOR WHEN TABLE IS READY
  // const audio = new Audio(ringer);
  // audio.loop = true;

  // const playSound = () => {
  //   try {
  //     audio.loop = true;
  //     audio.play();
  //   } catch (error) {
  //     console.log("audio error", error);
  //   }
  // };

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
          setPreOrderUrl(res?.data?.data?.preOrderUrl);

          setIsUserFetch(false);
        }
      })
      .catch(function (error) {
        console.log("log-error", error);
      });
  }, []);

  //CHECK IF THE MERCHANT IS OPEN OR NOT
  useEffect(() => {
    if (linkUrlStatus) {
      if (linkUrlStatus === "1") {
        setIsOpenPage(true);
      } else {
        setIsOpenPage(false);
      }
    }
  }, [linkUrlStatus]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const paxNoD = watch("paxNo");

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
    if (cusPhone) {
      joinQueue();
    }
  }, [cusPhone]);

  //CALL API TO JOIN QUEUE
  useEffect(() => {
    if (data?.code === "000000") {
      setWaitNo(data?.data?.waitNo);
      setWaitPosition(data?.data?.waitPosition);
      setuserName(data?.data?.cusName);
      setEstimateTime(parseInt(data?.data?.estimateWaitTime));
      setPersonNo(data?.data?.paxNo);
      setWaitStatus(data?.data?.status);
      setFillDataPage(false);
      setWaitId(data?.data?.waitId);

      var totalQueue = data?.data?.totalNumberQueue;
      var waitos = data?.data?.waitPosition;
      var percentPos =
        ((parseInt(totalQueue) - parseInt(waitos) + 1) / parseInt(totalQueue)) *
        100;
      setPosPercent(percentPos);
    }
  }, [data]);

  useEffect(() => {
    if (waitId) {
      // start timer
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
            setWaitStatus(res?.data?.data?.status);
            setFillDataPage(false);
            var totalQueue = res?.data?.data?.totalNumberQueue;
            var waitos = res?.data?.data?.waitPosition;
            var percentPos =
              ((parseInt(totalQueue) - parseInt(waitos) + 1) /
                parseInt(totalQueue)) *
              100;
            setPosPercent(percentPos);

            if (res?.data?.data?.waitPosition === 0) clearTimeout(timeOutId);

            if (res?.data?.data?.waitCall === "1") {
              setProgressBar(false);
              //playSound();
              play();
            }
          }
        })
        .catch(function (error) {
          console.log("log-error", error);
        });
      //handleTest();
    }, callInterval);
  };

  //SUBMIT USER DATA
  const onSubmitHandler = (data) => {
    const { email, cusPhone, cusName, paxNo } = data;
    setEmail(email);
    setCusName(cusName);
    setPaxNo(paxNo);
    setCusPhone(`65${cusPhone}`);
  };

  return (
    <div className="bg-[#F6F7F9]">
      {isUserFetch ? (
        <span className="flex items-center justify-center content-center pt-5 h-screen ">
          <SpinnerOrange />
        </span>
      ) : (
        <>
          {/* HEADER */}
          <div className="pt-5 max-w-md items-center mx-auto grid  bg-[#F6F7F9] sm:px-0 px-6">
            <div className="flex justify-between items-center">
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
                <p className="font-semibold text-[13px] text-black pl-3 capitalize">
                  {merchName}
                </p>
              </div>
              <div className="flex place-items-end">
                <span className="flex bg-[#dddddd] rounded-[5px] items-center justify-center py-[8px] px-[14px] text-[#000000] text-[12px] font-normal">
                  <p className="">{currentDate}</p>
                  <div class="h-4 mx-[4px] border-[0.5px] border-[#000000]"></div>
                  <p className="">{currentTime}</p>
                </span>
              </div>
            </div>
          </div>

          {isOpenPage ? (
            <>
              {/* FORM FILL-IN SIDE */}
              {fillDataPage ? (
                <div className="bg-[#F6F7F9] ">
                  <div className=" max-w-md items-center mx-auto grid  bg-[#F6F7F9] sm:px-0 px-6">
                    <h1 className="text-2xl text-black font-semibold mb-[4px] mt-10">
                      Hello There,
                    </h1>
                    <p className="text-base text-[#1f222a] mb-10">
                      Fill out the form below for a queue position.
                    </p>
                  </div>
                  <div className="sm:max-w-md max-w-[366px] rounded-lg items-center mx-auto grid  bg-[#FFFFFF] py-10 px-6">
                    <form onSubmit={handleSubmit(onSubmitHandler)} className="">
                      <div class="relative w-full ">
                        <input
                          type="text"
                          placeholder=""
                          autocomplete="on"
                          name="name"
                          id="name"
                          className={`in_putNew peer ${
                            errors.cusName && "input_error"
                          }`}
                          {...register("cusName", {
                            required: "Name is required",
                          })}
                        />
                        <label className="label_new z-2">Enter Your Name</label>
                        <label className="label_newTop z-2">Name</label>
                        {errors.cusName && (
                          <p className=" mt-1 text-sm text-[red]">
                            {errors.cusName.message}
                          </p>
                        )}
                      </div>

                      <div class="relative w-full mt-10">
                        <input
                          type="number"
                          placeholder=""
                          autocomplete="on"
                          name="name"
                          id="name"
                          className={`in_putNew peer put ${
                            errors.cusPhone && "input_error"
                          }`}
                          {...register("cusPhone", {
                            required: "Phone number is required",
                            minLength: {
                              value: 8,
                              message: "minimum allowed number is 8",
                            },
                            maxLength: {
                              value: 8,
                              message: "maximum allowed number is 8",
                            },
                          })}
                        />
                        <label className="label_new z-2">
                          Enter Your Phone Number
                        </label>
                        <label className="label_newTop z-2">Phone Number</label>
                        {errors.cusPhone && (
                          <p className=" mt-1 text-sm text-[red]">
                            {errors.cusPhone.message}
                          </p>
                        )}
                      </div>

                      <div class="relative w-full mt-10">
                        <input
                          type="number"
                          placeholder=""
                          autocomplete="on"
                          name="name"
                          id="name"
                          className={`in_putNew peer put ${
                            errors.paxNo && "input_error"
                          }`}
                          {...register("paxNo", {
                            required: "Pax is required",
                            pattern: {
                              value: /^(?!(0))[0-9]+$/,
                              message: "Your value must be greater than 0",
                            },
                          })}
                        />
                        <label className="label_new z-2">Enter Pax</label>
                        <label className="label_newTop z-2">Pax</label>
                        {errors.paxNo && (
                          <p className=" mt-1 text-sm text-[red]">
                            {errors.paxNo.message}
                          </p>
                        )}
                      </div>

                      <div class="text-[#606060] rounded-lg h-[50px] px-4 flex items-center  justify-between bg-[#FEEAE0] w-full mt-10">
                        <span class="text-[#6B6968] text-sm">
                          Estimated Time
                        </span>
                        <span class="text-[#000000] text-lg ">
                          {estimateTime}
                        </span>
                      </div>

                      <div className="mt-6 flex ">
                        <p className="text-sm text-[#000000] pr-3">
                          Do you want to receive promotions?
                        </p>
                        <input
                          onChange={handleCheckboxChange}
                          id="link-checkbox"
                          type="checkbox"
                          value=""
                          className="
                   relative peer shrink-0
                   appearance-none w-5 h-5 border border-[#6B6968] rounded-sm bg-white
                 checked:bg-[#F99762] checked:border-0
                   focus:outline-none 
                   disabled:border-steel-400 disabled:bg-steel-400
                   "
                        ></input>
                        <svg
                          className="
                  absolute 
                  bottom-[21.4%]
                  left-[77.7%]
                  w-4 h-4 mt-1
                  hidden peer-checked:block
                  pointer-events-none"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="#ffffff"
                          stroke-width="4"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        >
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                      </div>

                      {isEmail ? (
                        <div class="relative w-full mt-8">
                          <input
                            type="email"
                            placeholder=""
                            className={`in_putNew peer put ${
                              errors.email && "input_error"
                            }`}
                            {...register("email")}
                          />
                          <label className="label_new z-2">Enter Email</label>
                          <label className="label_newTop z-2">Email</label>
                        </div>
                      ) : null}

                      <div>
                        <button
                          type="submit"
                          disabled={isJoining}
                          className="submit_btn mt-[80px] "
                        >
                          {isJoining ? <SpinnerWhite /> : "Submit"}
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              ) : (
                <>
                  {/* WAIT QUEUE SIDE */}
                  <div className="bg-[#F6F7F9]">
                    <div className=" max-w-md items-center mx-auto grid  bg-[#f6f7f9] sm:px-0 px-6"></div>

                    {progressBar ? (
                      <div className="mt-10 sm:max-w-md max-w-[366px] rounded-[5px] items-center mx-auto grid  bg-[#ffffff] pb-6 pt-3 px-6">
                        <p className="text-center text-[#000000] font-normal">
                          Group before you
                        </p>
                        <div
                          className="h-2 w-full bg-[#F99762] rounded mt-4 relative"
                          style={{ width: "100%" }}
                        >
                          <div
                            style={{ width: `${100 - posPercent + "%"}` }}
                            className={"h-full bg-[#FDDCCB] rounded"}
                          ></div>
                          <spa
                            style={{ left: `${100 - posPercent - 4 + "%"}` }}
                            className="absolute text-[#ffffff] font-semibold top-[-150%] items-center justify-center flex border border-[#f99762] rounded-full h-[28px] w-[28px] bg-[#f99762]"
                          >
                            {waitPostion}
                          </spa>
                        </div>
                      </div>
                    ) : (
                      <div className="mt-10 sm:max-w-md max-w-[366px] rounded-[5px] items-center mx-auto grid  bg-[#33b469] py-[22px] px-6">
                        <div className="grid text-center items-center justify-center text-base pt-2">
                          <span className="mx-auto">
                            <HomeIcon />
                          </span>
                          <p className="text-center text-[#ffffff] pt-[30px] pb-[40px] text-[23px]">
                            Your table is ready.
                          </p>
                        </div>
                      </div>
                    )}

                    <div className="sm:max-w-md max-w-[366px] rounded-[5px] items-center mx-auto grid  bg-[#ffffff] mt-6 ">
                      <h2 className="text-center mt-8 text-base text-[#6B6968] font-normal">
                        Queue Number
                      </h2>
                      <h3 className="text-center text-[56px] text-[#000000] font-semibold">
                        {waitNo}
                      </h3>
                      <div class="rounded-b-[5px] border-t-[1px] border-[#e0e0e0] py-5 px-6 flex justify-between bg-[#ffffff] w-full mt-4">
                        <span class="text-base font-normal text-[#8a8a89]">
                          Estimated Time
                        </span>
                        <span class="text-lg font-medium text-[#000000]">
                          {estimateTime + " mins"}
                        </span>
                      </div>
                    </div>
                    <div class=" rounded-[5px]  bg-[#ffffff] sm:max-w-md max-w-[366px]  items-center mx-auto mt-6">
                      <div className="py-5 px-6 flex justify-between">
                        <span class="text-base font-normal text-[#8a8a89]">
                          Name
                        </span>
                        <span class="text-lg font-medium text-[#000000] capitalize">
                          {userName}
                        </span>
                      </div>

                      <div class="mx-6 border-[0.1px] border-[#e0e0e0]"></div>
                      <div className="py-5 px-6 flex justify-between">
                        <span class="text-base font-normal text-[#8a8a89]">
                          Pax
                        </span>
                        <span class="text-lg font-medium">{personNo}</span>
                      </div>
                    </div>

                    <div className="mt-6 sm:max-w-md max-w-[366px] rounded-lg items-center mx-auto grid  bg-[#ffffff] py-8 px-10">
                      <p className="text-center text-[#000000] font-semibold text-lg ">
                        Do Not Close This Page
                      </p>
                      <p className="text-center text-sm mt-[14px]">
                        Queue number will be updated here, if you accidentally
                        you close this page, rescan QR code and enter the same
                        hone number to obtain your queue number back.
                      </p>
                    </div>

                    <div class=" sm:max-w-md max-w-[366px]  items-center mx-auto mt-10">
                      <Link to={preOrderUrl} target="_blank">
                        <button type="submit" className="submit_btn">
                          Pre Order
                        </button>
                      </Link>
                    </div>
                  </div>
                </>
              )}
            </>
          ) : (
            <>
              <div className="pt-5 max-w-md items-center mx-auto grid  bg-[#F6F7F9] py-1 sm:px-0 px-6">
                <div>
                  <span className="mt-[160px] flex items-center justify-center">
                    <NotOpenIcon />
                  </span>
                  <h2 className="text-center my-3 text-2xl text-[#000000]">
                    Sorry we are not open yet
                  </h2>
                  <h3 className="text-center mb-[170px] text-base text-[#6B6968]">
                    Check With The Host
                  </h3>
                </div>
              </div>
            </>
          )}

          {/* FOOTER */}
          <div className="mt-10 pb-8 sm:px-0 px-6 flex  max-w-md items-center mx-auto justify-between text-[#000000]">
            <div>
              <Link
                to="https://www.appety.sg/privacy_policy.html"
                target="_blank"
              >
                <p className="text-base">Terms and Conditions</p>
              </Link>
            </div>
            <div className="flex items-center justify-center text-base">
              <p className="text-center pr-2">Powered By</p>
              <AppetyLogoSmall />
            </div>
          </div>
        </>
      )}
    </div>
  );
};
