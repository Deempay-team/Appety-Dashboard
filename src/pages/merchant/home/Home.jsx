import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import storage from "../../../utils/storage";
import {
  AppetyLogoBig,
  ArrowDownIcon,
  ArrowUpIcon,
  DownLoadIcon,
} from "../../../assests/icons/Icons";
import axios from "axios";
import { Modal } from "antd";
import { FaUserCircle } from "react-icons/fa";
import { currentDate, currentTime } from "../../../utils/functions";
import { DataTable } from "../../../components/DataTable";
import { DownLoadIconWhite } from "../../../assests/icons/Icons";
import { addSpace } from "../../../utils/functions";
import { useUpdateQueue, useGetQueue } from "../../../hooks/useMechant";
import { NotFoundImage } from "../../../assests/images";

const column = ["Queue Type", "Next In Line", "Served", "Still in Queue"];

export const MerchantHomePage = () => {
  const merchId = JSON.parse(storage.fetch("userDetails")).userId;
  const firstName = JSON.parse(storage.fetch("userDetails")).firstName;
  const merchName = JSON.parse(storage.fetch("merchantDetails")).merchName;
  const logoUrl = JSON.parse(storage.fetch("merchantDetails")).logoUrl;
  const navigate = useNavigate();
  const [changeIcon, setChangeIcon] = useState(false);
  const [status, setStatus] = useState("SERVED");
  const [waitId, setWaitId] = useState(20240626990746518556286976);

  // useEffect(() => {
  //   axios
  //   .get(
  //     `http://159.223.37.225//api/v1/user/merchant/query/${merchId}`,
  //     {}
  //   )
  //   .then(function (response) {
  //     if (response.data.code === "000000") {
  //       handleClick();
  //     } else if (response.data.code === "U00008") {
  //       Modal.success({
  //         title: "Email is not registered!",
  //         content: "Create a New Account to get Started",
  //         onOk: () => unRegisteredUser(),
  //       });
  //     }
  //   })
  //   .catch(function (error) {
  //     console.log("err", error);
  //   });
  // }, [])

  // CALL QUERY MERCHANT DETAILS

  // CALL TO UPDATE QUEUE
  //  const {
  //   isLoading: isQueueUpdate,
  //   data: queueUpdateData,
  //   mutate: fetchQueueUpdate,
  // } = useUpdateQueue({
  //   merchId,
  //   waitId,
  //   status,
  // });

  // CALL TO GET QUEUE
  const {
    isLoading: isGetQueue,
    data: getQueueData,
    mutate: fetchGetQueue,
  } = useGetQueue({
    merchId,
    // waitId,
    // status,
  });

  //U990688197526724608

  useEffect(() => {
    axios
      .get(`http://159.223.37.225/api/v1/user/merchant/query/${merchId}`)
      .then(function (res) {
        if (res.data.code === "000000") {
          storage.add(
            "merchantDetails",
            JSON.stringify({
              merchStatus: res.data.data?.userId,
              merchName: res.data.data?.merchName,
              merchPhone: res.data.data?.merchPhone,
              contactName: res.data.data?.contactName,
              linkUrl: res.data.data?.linkUrl,
              linkUrlStatus: res.data.data?.linkUrlStatus,
              logoUrl: res.data.data?.logoUrl,
            })
          );
        }
      })
      .catch(function (error) {
        console.log("log-error", error);
      });
  }, []);

  const resendCode = () => {
    // axios.get(`http://159.223.37.225/api/v1/user/merchant/query/${merchId}`)
    // .then(function (res) {
    //   if (res.data.code === "000000") {
    //     storage.add(
    //       "merchantDetails",
    //       JSON.stringify({
    //         merchStatus: res.data.data?.userId,
    //         merchName: res.data.data?.merchName,
    //         merchPhone: res.data.data?.merchPhone,
    //         contactName: res.data.data?.contactName,
    //         linkUrl: res.data.data?.linkUrl,
    //         linkUrlStatus: res.data.data?.linkUrlStatus,
    //         logoUrl: res.data.data?.logoUrl,
    //       })
    //     );
    //     console.log("merchStatus -- ", res.data.data.merchStatus);
    //     console.log("inkUrlStatus ++ ", res.data.data.linkUrlStatus);
    //   }
    // })
    // .catch(function (error) {
    //   console.log("log-queue-error", error);
    // });
  };

  // useEffect(() => {
  //   fetchGetQueue();
  //  }, []);

  // useEffect(() => {
  //   fetchQueueUpdate();
  //  }, []);

  // useEffect(() => {
  //   if (queueUpdateData?.code === "000000") {
  //     console.log("queueUpdateData ++++", queueUpdateData);
  //   }
  // }, [queueUpdateData]);

  useEffect(() => {
    if (getQueueData?.code === "000000") {
    }
  }, [getQueueData]);

  const handleLogout = () => {
    storage.clear();
    navigate("/login");
  };
  return (
    <>
      <div className="z-20 border-b top-0 border-[#D9D9D9] sticky w-full bg-[#F6F7F9] px-10 py-4">
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
            <p className="font-medium md:text-[32px] text-base text-black pl-3 capitalize">
              {merchName}
            </p>
          </div>

          <div className="flex ">
            <span className="lg:flex hidden mr-[96PX] items-center justify-center py-2 bg-[#FAA87C] px-5 rounded-[5px] ">
              <p className="text_16 text-[#ffffff]">Q1</p>
            </span>
            <span className="lg:flex hidden mr-10 items-center justify-center py-3 bg-[#F99762] px-6 rounded-[5px] cursor-pointer">
              <DownLoadIconWhite />
              <p className="text_16 pl-2 text-[#ffffff]">Download Queue Data</p>
            </span>
            <span className="lg:flex hidden bg-[#D9D9D9] opacity-90 items-center rounded-[5px] place-self-center py-[15px] px-[16px] text_16">
              <p className="">{currentDate}</p>
              <div class="h-5 mx-4 border-[0.5px] border-[#000000]"></div>
              <p className="">{currentTime}</p>
            </span>
            <span className="relative flex items-center bg-[#D9D9D9] opacity-90 rounded-[5px] ml-8 place-self-center py-[15px] px-[16px] text-black text-[12px] font-medium">
              <p className="text_16 text-[#000000] capitalize">{firstName}</p>
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

      {/* HOMEBODY */}
      <div className="relative bg-[#f6f7f9] h-screen">
        {/* LEFT SIDEBAR */}
        <div className="w-[362px] sticky left-0 top-0 overflow-y-auto bg-[#F6F7F9]">
          <div className="border-b border-r border-[#D9D9D9] w-full">
            <div className="flex items-center py-7 ">
              <span className="flex pl-10 ">
                <p className="text_20">Waiting in Queue</p>
                <spa className="ml-[66px] text-[#ffffff] rounded-2xl px-3 py-1 bg-[#FAA87C] ">
                  7
                </spa>
              </span>
            </div>
          </div>

          <div className="flex items-center border-r border-[#D9D9D9] top-0 relative ">
            <div className=" grid mx-auto justify-center items-center mt-8 ">
              <div class="py-6 pl-5 text-[#6b6968] rounded-lg   bg-[#ffffff] w-[285px]  mb-6">
                <div className="pb-9 grid grid-cols-2	">
                  <div>
                    <p className="text_12 text-[#6b6968] capitalize ">Name</p>
                    <p className="text_16 text-[#000000] capitalize ">James</p>
                  </div>
                  <div>
                    <p className="text_12 text-[#6b6968]  capitalize ">
                      Phone Number
                    </p>
                    <p className="text_16 text-[#33B469] underline">
                      {addSpace("+6588233004")}
                    </p>
                  </div>
                </div>

                <div className="pb-9 grid grid-cols-2">
                  <div>
                    <p className="text_12 text-[#6b6968] capitalize ">Pax</p>
                    <p className="text_16 text-[#000000] ">20 Pax</p>
                  </div>
                  <div>
                    <p className="text_12 text-[#6b6968] capitalize ">Status</p>
                    <p className="text_16 text-[#000000] capitalize ">
                      Waiting
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2	">
                  <div>
                    <p className="text_12 text-[#6b6968] capitalize ">
                      Queue Number
                    </p>
                    <p className="text_16 text-[#000000] ">201</p>
                  </div>
                  <div>
                    <p className="text_12 text-[#6b6968] ">Date/Time</p>
                    <p className="text_14 text-[#000000]">
                      {currentDate} {currentTime}{" "}
                    </p>
                  </div>
                </div>
              </div>

              <div class="py-6 pl-5 text-[#6b6968] rounded-lg   bg-[#ffffff] w-[285px]  mb-6">
                <div className="pb-9 grid grid-cols-2	">
                  <div>
                    <p className="text_12 text-[#6b6968] capitalize ">Name</p>
                    <p className="text_16 text-[#000000] capitalize ">James</p>
                  </div>
                  <div>
                    <p className="text_12 text-[#6b6968]  capitalize ">
                      Phone Number
                    </p>
                    <p className="text_16 text-[#33B469] underline">
                      {addSpace("+6588233004")}
                    </p>
                  </div>
                </div>

                <div className="pb-9 grid grid-cols-2">
                  <div>
                    <p className="text_12 text-[#6b6968] capitalize ">Pax</p>
                    <p className="text_16 text-[#000000] ">20 Pax</p>
                  </div>
                  <div>
                    <p className="text_12 text-[#6b6968] capitalize ">Status</p>
                    <p className="text_16 text-[#000000] capitalize ">
                      Waiting
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2	">
                  <div>
                    <p className="text_12 text-[#6b6968] capitalize ">
                      Queue Number
                    </p>
                    <p className="text_16 text-[#000000] ">201</p>
                  </div>
                  <div>
                    <p className="text_12 text-[#6b6968] ">Date/Time</p>
                    <p className="text_14 text-[#000000]">
                      {currentDate} {currentTime}{" "}
                    </p>
                  </div>
                </div>
              </div>

              <div class="py-6 pl-5 text-[#6b6968] rounded-lg   bg-[#ffffff] w-[285px]  mb-6">
                <div className="pb-9 grid grid-cols-2	">
                  <div>
                    <p className="text_12 text-[#6b6968] capitalize ">Name</p>
                    <p className="text_16 text-[#000000] capitalize ">James</p>
                  </div>
                  <div>
                    <p className="text_12 text-[#6b6968]  capitalize ">
                      Phone Number
                    </p>
                    <p className="text_16 text-[#33B469] underline">
                      {addSpace("+6588233004")}
                    </p>
                  </div>
                </div>
                <div className="pb-9 grid grid-cols-2">
                  <div>
                    <p className="text_12 text-[#6b6968] capitalize ">Pax</p>
                    <p className="text_16 text-[#000000] ">20 Pax</p>
                  </div>
                  <div>
                    <p className="text_12 text-[#6b6968] capitalize ">Status</p>
                    <p className="text_16 text-[#000000] capitalize ">
                      Waiting
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-2	">
                  <div>
                    <p className="text_12 text-[#6b6968] capitalize ">
                      Queue Number
                    </p>
                    <p className="text_16 text-[#000000] ">201</p>
                  </div>
                  <div>
                    <p className="text_12 text-[#6b6968] ">Date/Time</p>
                    <p className="text_14 text-[#000000]">
                      {currentDate} {currentTime}{" "}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CONTENT BODY */}
        <main className=" absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ">
          <div className="mt-1 mb-8">
            <DataTable
              column={column}
              //data={transactions}
            />
          </div>
          <div className="text-[#6b6968] rounded-lg  bg-[#ffffff] w-full  items-center mx-auto ">
            <div className="flex bg-[#ffffff] items-center ">
              <div class="py-8 pl-8 text-[#6b6968] ">
                <div className="pb-9 grid grid-cols-2	">
                  <div>
                    <p className="text_12 text-[#6b6968] capitalize ">Name</p>
                    <p className="text_16 text-[#000000] capitalize ">
                      Kingsley
                    </p>
                  </div>
                  <div>
                    <p className="text_12 text-[#6b6968] capitalize ">
                      Phone Number
                    </p>
                    <p className="text_16 text-[#33B469] underline">
                      {addSpace("+65 8823 3004")}
                    </p>
                  </div>
                </div>

                <div className="pb-9 grid grid-cols-2">
                  <div>
                    <p className="text_12 text-[#6b6968] capitalize ">Pax</p>
                    <p className="text_16 text-[#000000] ">2 Pax</p>
                  </div>
                  <div>
                    <p className="text_12 text-[#6b6968] capitalize ">Status</p>
                    <p className="text_16 text-[#000000] capitalize ">
                      Ongoing
                    </p>
                  </div>
                </div>
              </div>
              <div class="h-[170px] mx-4 border-[0.5px] border-[#d9d9d9]"></div>
              <div className="mx-auto grid">
                <h2 className="text-center text_14 text-[#1F222A] font-normal">
                  Queue Number
                </h2>
                <h3 className="text-center text-[56px] text-[#1f222a] font-semibold">
                  010
                </h3>
                <p className="text-center text_14 text-[#6b6968] font-normal">
                  Called in 25 Mins ago
                </p>
              </div>
            </div>

            <div class="border-[0.5px] border-[#d9d9d9]"></div>

            <div className="py-10  flex items-center justify-center">
              <button className="short_btn">Check - In</button>

              <button className="short_btn_white ml-6">Cancel</button>

              <button onClick={resendCode} className="short_btn_green ml-6 ">
                Call
              </button>
            </div>
          </div>
        </main>

        {/* RIGHT SIDEBAR */}
        <div className="w-[362px] absolute right-[0%] justify-end top-[0%] overflow-y-auto bg-[#F6F7F9]">
          <div className="border-b border-l border-[#D9D9D9] w-full">
            <div className="flex items-center py-6 ">
              <span className="flex ml-10 items-center justify-center">
                <span className="cursor-pointer rounded-l-lg bg-[#ededee] border-t border-l border-b border-[#D9D9D9] py-2 px-[44px]">
                  Served
                </span>
                <span className="cursor-pointer rounded-r-lg bg-[#ffffff] border-t border-r border-b border-[#D9D9D9]  py-2 px-[44px]">
                  Cancelled
                </span>
              </span>
            </div>
          </div>
          <div className="flex items-center  border-l border-[#D9D9D9] top-0 relative ">
            <div className=" grid mx-auto justify-center items-center mt-8 ">
              <div class="py-6 pl-5 text-[#6b6968] rounded-lg   bg-[#ffffff] w-[285px]  mb-6">
                <div className="pb-9 grid grid-cols-2	">
                  <div>
                    <p className="text_12 text-[#6b6968] capitalize ">Name</p>
                    <p className="text_16 text-[#000000] capitalize ">James</p>
                  </div>
                  <div>
                    <p className="text_12 text-[#6b6968]  capitalize ">
                      Phone Number
                    </p>
                    <p className="text_16 text-[#33B469] underline">
                      {addSpace("+6588233004")}
                    </p>
                  </div>
                </div>

                <div className="pb-9 grid grid-cols-2">
                  <div>
                    <p className="text_12 text-[#6b6968] capitalize ">Pax</p>
                    <p className="text_16 text-[#000000] ">20 Pax</p>
                  </div>
                  <div>
                    <p className="text_12 text-[#6b6968] capitalize ">Status</p>
                    <p className="text_16 text-[#000000] capitalize ">Served</p>
                  </div>
                </div>

                <div className="grid grid-cols-2	">
                  <div>
                    <p className="text_12 text-[#6b6968] capitalize ">
                      Queue Number
                    </p>
                    <p className="text_16 text-[#000000] ">201</p>
                  </div>
                  <div>
                    <p className="text_12 text-[#6b6968] ">Date/Time</p>
                    <p className="text_14 text-[#000000]">
                      {currentDate} {currentTime}{" "}
                    </p>
                  </div>
                </div>
              </div>

              <div class="py-6 pl-5 text-[#6b6968] rounded-lg   bg-[#ffffff] w-[285px]  mb-6">
                <div className="pb-9 grid grid-cols-2	">
                  <div>
                    <p className="text_12 text-[#6b6968] capitalize ">Name</p>
                    <p className="text_16 text-[#000000] capitalize ">James</p>
                  </div>
                  <div>
                    <p className="text_12 text-[#6b6968]  capitalize ">
                      Phone Number
                    </p>
                    <p className="text_16 text-[#33B469] underline">
                      {addSpace("+6588233004")}
                    </p>
                  </div>
                </div>

                <div className="pb-9 grid grid-cols-2">
                  <div>
                    <p className="text_12 text-[#6b6968] capitalize ">Pax</p>
                    <p className="text_16 text-[#000000] ">20 Pax</p>
                  </div>
                  <div>
                    <p className="text_12 text-[#6b6968] capitalize ">Status</p>
                    <p className="text_16 text-[#000000] capitalize ">Served</p>
                  </div>
                </div>

                <div className="grid grid-cols-2	">
                  <div>
                    <p className="text_12 text-[#6b6968] capitalize ">
                      Queue Number
                    </p>
                    <p className="text_16 text-[#000000] ">201</p>
                  </div>
                  <div>
                    <p className="text_12 text-[#6b6968] ">Date/Time</p>
                    <p className="text_14 text-[#000000]">
                      {currentDate} {currentTime}{" "}
                    </p>
                  </div>
                </div>
              </div>
              <div class="py-6 pl-5 text-[#6b6968] rounded-lg   bg-[#ffffff] w-[285px]  mb-6">
                <div className="pb-9 grid grid-cols-2	">
                  <div>
                    <p className="text_12 text-[#6b6968] capitalize ">Name</p>
                    <p className="text_16 text-[#000000] capitalize ">James</p>
                  </div>
                  <div>
                    <p className="text_12 text-[#6b6968]  capitalize ">
                      Phone Number
                    </p>
                    <p className="text_16 text-[#33B469] underline">
                      {addSpace("+6588233004")}
                    </p>
                  </div>
                </div>

                <div className="pb-9 grid grid-cols-2">
                  <div>
                    <p className="text_12 text-[#6b6968] capitalize ">Pax</p>
                    <p className="text_16 text-[#000000] ">20 Pax</p>
                  </div>
                  <div>
                    <p className="text_12 text-[#6b6968] capitalize ">Status</p>
                    <p className="text_16 text-[#000000] capitalize ">Served</p>
                  </div>
                </div>

                <div className="grid grid-cols-2	">
                  <div>
                    <p className="text_12 text-[#6b6968] capitalize ">
                      Queue Number
                    </p>
                    <p className="text_16 text-[#000000] ">201</p>
                  </div>
                  <div>
                    <p className="text_12 text-[#6b6968] ">Date/Time</p>
                    <p className="text_14 text-[#000000]">
                      {currentDate} {currentTime}{" "}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
