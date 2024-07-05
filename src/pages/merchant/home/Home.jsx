import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import storage from "../../../utils/storage";
import {
  DownLoadIconWhite,
  ArrowDownIcon,
  ArrowUpIcon,
} from "../../../assests/icons/Icons";
import axios from "axios";
import { CSVLink } from "react-csv";
import { FaUserCircle } from "react-icons/fa";
import { currentDate, currentTime, formatDate } from "../../../utils/functions";
import { addSpace } from "../../../utils/functions";
import { useUpdateQueue } from "../../../hooks/useMechant";
import {
  SpinnerOrange,
  SpinnerOrangeMedium,
  SpinnerWhite,
} from "../../../components/spinner/Spinner";
import Notify from "../../../components/Notification";


const column = [
  "Queue Type",
  "pax Range",
  "Next In Line",
  "Served",
  "in Queue",
];

export const MerchantHomePage = () => {
  const merchId = JSON.parse(storage.fetch("userDetails")).userId;
  const firstName = JSON.parse(storage.fetch("userDetails")).firstName;

  const navigate = useNavigate();
  const [merchName, setMerchName] = useState("");
  const [logoUrl, setLogoUrl] = useState("");
  const [changeIcon, setChangeIcon] = useState(false);
  const [serveStatus, setServeStatus] = useState("SERVED");
  const [updateStatus, setUpdateStatus] = useState("");
  const [queueType, setQueueType] = useState([]);
  const [queueList, setQueueList] = useState([]);
  const [servedList, setServedList] = useState([]);
  const [waitTypeId, setWaitTypeId] = useState("");
  const [waitTypeName, setWaitTypeName] = useState("");
  const [waitSize, setWaitSize] = useState(0);
  const [isServed, setIsServed] = useState(true);
  const [isCancelled, setIsCancelled] = useState(false);
  const [isLoadingWaitType, setIsLoadingWaitType] = useState(false);
  const [isLoadingWait, setIsLoadingWait] = useState(true);
  const [isLoadingServed, setIsLoadingServed] = useState(true);
  const [isExporting, setIsExporting] = useState(false);
  const [isCancellingQueue, setIsCancellingQueue] = useState(false);
  const [isCheckInQueue, setIsCheckInQueue] = useState(false);
  const [currentName, setCurrentName] = useState("");
  const [currentPax, setCurrentPax] = useState("");
  const [currentPhone, setCurrentPhone] = useState("");
  const [currentWait, setCurrentWait] = useState("");
  const [currentStatus, setCurrentStatus] = useState("");
  const [currentWaitId, setCurrentWaitId] = useState("");
  const [exportQueues, setExportQueues] = useState([]);
  const exportQueueRef = useRef(null);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [activeWaitTypeId, setActiveWaitTypeId] = useState(1);
  const [statusUpdateSuccess, setStatusUpdateSuccess] = useState(false);

  //CALL TO UPDATE QUEUE
  const {
    isLoading: isQueueUpdate,
    data: queueUpdateData,
    mutate: fetchQueueUpdate,
  } = useUpdateQueue({
    merchId,
    waitId: currentWaitId,
    status: updateStatus,
  });

  //CALL QUERY MERCHANT DETAILS API
  useEffect(() => {
    axios
      .get(`http://159.223.37.225/api/v1/user/merchant/query/${merchId}`)
      .then(function (res) {
        if (res.data.code === "000000") {
          setMerchName(res.data.data?.merchName);
          setLogoUrl(res.data.data?.logoUrl);
          storage.add(
            "merchantDetails",
            JSON.stringify({
              merchStatus: res.data.data?.merchStatus,
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
        console.log("merchant-error", error);
      });
  }, []);

  //CALL QUERY SUMMARY API
  useEffect(() => {
    setIsLoadingWaitType(true);
    axios
      .get(`http://159.223.37.225/api/v1/wait/summary/${merchId}`)
      .then(function (res) {
        if (res.data.code === "000000") {
          setIsLoadingWaitType(false);
          setQueueType(res.data.data);
          setWaitTypeId(res.data.data[0].waitTypeId);
          setWaitTypeName(res.data.data[0].waitTypeName);
          console.log("data=", res.data.data);
        }
      })
      .catch(function (error) {
        console.log("summary-error", error);
      });
  }, []);

  //CALL QUERY QUEUE FOR DOWNLOAD
  const exportQueueDetails = () => {
    setIsExporting(true);
    axios
      .get(
        `http://159.223.37.225/api/v1/wait/query?merchId=${merchId}&status=&waitId&waitTypeId=`
      )
      .then(function (res) {
        if (res.data.code === "000000") {
          const formattedQueue = res.data.data.map((q) => {
            return {
              customerIdentificationNo: q.cusId,
              customerName: q.cusName,
              customerPhone: q.cusPhone,
              PaxNumber: q.paxNo,
              status: q.status,
              waitNumber: q.waitNo,
              waitTime: q.estimatedWaitTime,
              waitPostion: q.waitPosition,
              queueType: q.WaitTypeName,
              dateCreated: formatDate(q.createTime),
            };
          });
          setExportQueues(formattedQueue);
          setTimeout(() => {
            exportQueueRef.current.link.click();
          }, 300);
          setIsExporting(false);
        }
      })
      .catch(function (error) {
        console.log("download-error", error);
      });
  };

  //CALL QUERY QUEUE API FOR WAITING
  useEffect(() => {
    if (waitTypeId || statusUpdateSuccess) {
      setIsLoadingWait(true);
      setIsLoadingServed(true);
      callApi();
      axios
        .get(
          `http://159.223.37.225/api/v1/wait/query?merchId=${merchId}&status=WAITING&waitId&waitTypeId=${waitTypeId}`
        )
        .then(function (res) {
          if (res.data.code === "000000") {
            setIsLoadingWait(false);
            setQueueList(res.data.data);
            setWaitSize(res.data.data.length);
            setCurrentName(res.data.data[0]?.cusName ?? "-");
            setCurrentPax(res.data.data[0]?.paxNo ?? "-");
            setCurrentPhone(res.data.data[0]?.cusPhone ?? "-");
            setCurrentWaitId(res.data.data[0]?.waitId ?? "-");
            setCurrentWait(res.data.data[0]?.waitNo ?? "-");
            setCurrentStatus(res.data.data[0]?.status ?? "-");
            setStatusUpdateSuccess(false);
          }
        })
        .catch(function (error) {
          console.log("query-wait-error", error);
        });
    }
  }, [waitTypeId, statusUpdateSuccess]);


  const callApi = () => {
    if (waitTypeId) {
      axios
        .get(
          `http://159.223.37.225/api/v1/wait/query?merchId=${merchId}&status=${serveStatus}&waitId&waitTypeId=${waitTypeId}`
        )
        .then(function (res) {
          if (res.data.code === "000000") {
            setIsLoadingServed(false);
            setServedList(res.data.data);
          }
        })
        .catch(function (error) {
          console.log("served-error", error);
        });
    }
  };

  useEffect(() => {
    if (serveStatus) {
      callApi();
      setIsLoadingServed(true);
    }
  }, [serveStatus]);

  const handleServe = () => {
    setServeStatus("SERVED");
    setIsServed(true);
    setIsCancelled(false);
    //setIsLoadingServed(true);
  };

  const handleCancel = () => {
    setServeStatus("CANCELLED");
    setIsServed(false);
    setIsCancelled(true);
  };

  const changeWaitTypeId = (i) => {
    setWaitTypeId(queueType[i - 1].waitTypeId);
    setWaitTypeName(queueType[i - 1].waitTypeName);
    setActiveWaitTypeId(i);
  };

  useEffect(() => {
    if (updateStatus) {
      fetchQueueUpdate();
    }
  }, [updateStatus]);

  useEffect(() => {
    if (queueUpdateData?.code === "000000") {
      setIsCancellingQueue(false);
      setIsCheckInQueue(false);
      //   window.location.reload();
      // show notification
       Notify(
          "success",
          "Updated Succesfully!",
          "Your Queue has being updated!",
          7
        );

      setStatusUpdateSuccess(true);

      if (updateStatus === "SERVED") {
        // //call served queue api
        if (serveStatus !== "SERVED") {
          handleServe();
        } else {
          callApi();
          setIsLoadingServed(true);
        }
      } else {
        if (serveStatus !== "CANCELLED") {
          handleCancel();
        } else {
          callApi();
          setIsLoadingServed(true);
        }
      }

      // call waiting queue api
    }
  }, [queueUpdateData]);

  const handleCheckIn = () => {
    setUpdateStatus("SERVED");
    setIsCheckInQueue(true);
    //fetchQueueUpdate({status: "SERVED"});
  };

  const handleCancelQueue = () => {
    setUpdateStatus("CANCELLED");
    setIsCancellingQueue(true);
  };

  const handleCall = () => {};

  const handleLogout = () => {
    storage.clear();
    navigate("/login");
  };

  console.log("active", activeWaitTypeId);
  let whatsappText =
    "Hello {customer name} your table is ready,  proceed to the restaurant";

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

            <p className="font-semibold md:text-[32px] text-base text-black pl-3 capitalize">
              {merchName}
            </p>
          </div>

          <div className="flex ">
            <span className="lg:flex hidden mr-[96PX] items-center justify-center py-2 bg-[#FAA87C] w-[67px] rounded-[5px] ">
              <p className="text_16 text-[#ffffff]">{waitTypeName}</p>
            </span>
            <CSVLink
              data={exportQueues}
              filename={`Queue_report_${currentDate}${currentTime}`}
              ref={exportQueueRef}
            ></CSVLink>
            <span
              onClick={exportQueueDetails}
              className="lg:flex hidden mr-10 items-center justify-center py-3 bg-[#F99762] w-[250px] rounded-[5px] cursor-pointer"
            >
              {isExporting ? (
                <SpinnerWhite />
              ) : (
                <>
                  <DownLoadIconWhite />
                  <p className="text_16 pl-2 text-[#ffffff]">
                    Download Queue Data
                  </p>
                </>
              )}
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

      {/* BODY */}
      <div className="flex min-h-screen items-start fixed">
        {/* LEFT SIDE */}
        <div class="sticky top-0  w-[362px]   border-r border-[#D9D9D9] bg-[#F6F7F9]">
          <div className="flow-root border-b border-[#d9d9d9]">
            <div className="flex items-center py-5 ">
              <span className="flex pl-10 ">
                <p className="text_24">Waiting in Queue</p>
                <span className="ml-[66px] text-[#ffffff] rounded-full h-[50px] w-[50px] text_24  bg-[#FAA87C] items-center flex justify-center ">
                  {waitSize}
                </span>
              </span>
            </div>
          </div>

          <div className="flow-root overflow-y-auto h-screen">
            {isLoadingWait || queueList.length > 0 ? (
              <>
                {isLoadingWait ? (
                  <>
                    <div className="w-[362px] ">
                      <span className="flex pt-[20rem] items-center justify-center ">
                        {" "}
                        <SpinnerOrange />
                      </span>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="w-[362px]   bg-[#F6F7F9]">
                      {queueList?.map((list, index) => (
                        <div key={index} className="flex items-center  ">
                          <div className=" grid mx-auto justify-center items-center mt-8 ">
                            <div class="py-8 pl-5 text-[#6b6968] rounded-lg   bg-[#ffffff] w-[285px]  mb-6">
                              <div className="pb-9 grid grid-cols-2	">
                                <div>
                                  <p className="text_12 text-[#6b6968] capitalize ">
                                    Name
                                  </p>
                                  <p className="text_16 text-[#000000] capitalize ">
                                    {list.cusName}
                                  </p>
                                </div>
                                <div>
                                  <p className="text_12 text-[#6b6968]  capitalize ">
                                    Phone Number
                                  </p>
                                  <p className="text_16 text-[#33B469] underline">
                                    <Link
                                      to={`https://api.whatsapp.com/send?phone=${list.cusPhone}&text=Hello ${list.cusName} your table is ready, please proceed to the restaurant`}
                                      target="_blank"
                                    >
                                      {addSpace(list.cusPhone)}
                                    </Link>
                                  </p>
                                </div>
                              </div>
                              <div className="pb-9 grid grid-cols-2">
                                <div>
                                  <p className="text_12 text-[#6b6968] capitalize ">
                                    Pax
                                  </p>
                                  <p className="text_16 text-[#000000] ">
                                    {list.paxNo}
                                  </p>
                                </div>
                                <div>
                                  <p className="text_12 text-[#6b6968] capitalize ">
                                    Status
                                  </p>
                                  <p className="text_16 text-[#000000] capitalize ">
                                    {list.status}
                                  </p>
                                </div>
                              </div>
                              <div className="grid grid-cols-2	">
                                <div>
                                  <p className="text_12 text-[#6b6968] capitalize ">
                                    Queue Number
                                  </p>
                                  <p className="text_16 text-[#000000] ">
                                    {list.waitNo}
                                  </p>
                                </div>
                                <div>
                                  <p className="text_12 text-[#6b6968] ">
                                    Date/Time
                                  </p>
                                  <p className="text_14 text-[#000000]">
                                    {currentDate} {currentTime}{" "}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </>
            ) : !!isLoadingWait || queueList.length === 0 ? (
              <>
                <div className="w-[362px] ">
                  <span className="grid pt-[15rem] items-center justify-center text-center max-w-sm">
                    <h4 className="text_16">
                      You do not have any Waiting Queue
                    </h4>
                  </span>
                </div>
              </>
            ) : (
              ""
            )}
          </div>
        </div>

        {/* CENTER */}
        <div className="flex-1  h-screen overflow-y-auto bg-[#F6F7F9]">
          <main className="px-10 py-8">
            <div className="mt-1 mb-8 ">
              <div className=" overflow-x-scroll overflow-y-hidden sm:overflow-x-auto sm:overflow-y-auto rounded-[5px] ">
                <table className=" w-full text-base text-center py-14 border-collapse ">
                  <thead className="text_14 capitalize bg-[#ffffff] ">
                    {column.map((header, i) => (
                      <th
                        scope="col"
                        className="pt-8 pb-[14px] px-8 border-b border-solid border-[#d9d9d9]"
                        key={i}
                      >
                        {header}
                      </th>
                    ))}
                  </thead>
                  <tbody className="px-5">
                    {/* {queueType?.map((queueType, i) => (
                      <tr className="bg-[#ffffff]" key={i}>
                        <td className="text_16 px-2 py-4">
                          <button
                            onClick={() => {
                              changeWaitTypeId(i);
                            }}
                            className={
                              isActive(queueType.i)
                                ? "bg-[#F99762] text-[#ffffff] rounded-[5px] px-9 py-4 cursor-pointer"
                                : "bg-[#ffffff] border border-[#d9d9d9] text-[#000000] rounded-[5px] px-9 py-4 cursor-pointer"
                            }
                          >
                            {queueType.waitTypeName}
                          </button>
                        </td>
                        <td className="text_16 px-2 py-7">
                          {queueType.paxRange}
                        </td>
                        <td className="text_16 px-2 py-7">
                          {queueType.nextInLine}
                        </td>
                        <td className="text_16 px-2 py-7">
                          {queueType.totalServed}
                        </td>
                        <td className="text_16 px-2 py-7">
                          {queueType.totalWaiting}
                        </td>
                      </tr>
                    ))} */}
                    <tr className="bg-[#ffffff] ">
                      <td className="text_16 px-2 pt-6 pb-2 pl-10">
                        <button
                          onClick={() => {
                            changeWaitTypeId(1);
                          }}
                          className={
                            activeWaitTypeId === 1
                              ? "bg-[#F99762] text-[#ffffff] rounded-[5px] px-9 py-4 cursor-pointer"
                              : "bg-[#ffffff] border border-[#d9d9d9] text-[#000000] rounded-[5px] px-9 py-4 cursor-pointer"
                          }
                        >
                          {isLoadingWaitType
                            ? "Q1"
                            : queueType[0]?.waitTypeName}
                        </button>
                      </td>
                      <td className="text_16 px-2 py-7">
                        {isLoadingWaitType ? "-" : queueType[0]?.paxRange}
                      </td>
                      <td className="text_16 px-2 py-7">
                        {isLoadingWaitType ? "-" : queueType[0]?.nextInLine}
                      </td>
                      <td className="text_16 px-2 py-7">
                        {isLoadingWaitType ? "-" : queueType[0]?.totalServed}
                      </td>
                      <td className="text_16 px-2 py-7">
                        {isLoadingWaitType ? "-" : queueType[0]?.totalWaiting}
                      </td>
                    </tr>

                    <tr className="bg-[#ffffff]">
                      <td className="text_16 px-2 py-2 pl-10">
                        <button
                          onClick={() => {
                            changeWaitTypeId(2);
                          }}
                          className={
                            activeWaitTypeId === 2
                              ? "bg-[#F99762] text-[#ffffff] rounded-[5px] px-9 py-4 cursor-pointer"
                              : "bg-[#ffffff] border border-[#d9d9d9] text-[#000000] rounded-[5px] px-9 py-4 cursor-pointer"
                          }
                        >
                          {isLoadingWaitType
                            ? "Q2"
                            : queueType[1]?.waitTypeName}
                        </button>
                      </td>
                      <td className="text_16 px-2 py-7">
                        {isLoadingWaitType ? "-" : queueType[1]?.paxRange}
                      </td>
                      <td className="text_16 px-2 py-7">
                        {isLoadingWaitType ? "-" : queueType[1]?.nextInLine}
                      </td>
                      <td className="text_16 px-2 py-7">
                        {isLoadingWaitType ? "-" : queueType[1]?.totalServed}
                      </td>
                      <td className="text_16 px-2 py-7">
                        {isLoadingWaitType ? "-" : queueType[1]?.totalWaiting}
                      </td>
                    </tr>

                    <tr className="bg-[#ffffff]">
                      <td className="text_16 px-2 py-2 pl-10">
                        <button
                          onClick={() => {
                            changeWaitTypeId(3);
                          }}
                          className={
                            activeWaitTypeId === 3
                              ? "bg-[#F99762] text-[#ffffff] rounded-[5px] px-9 py-4 cursor-pointer"
                              : "bg-[#ffffff] border border-[#d9d9d9] text-[#000000] rounded-[5px] px-9 py-4 cursor-pointer"
                          }
                        >
                          {isLoadingWaitType
                            ? "Q3"
                            : queueType[2]?.waitTypeName}
                        </button>
                      </td>
                      <td className="text_16 px-2 py-7">
                        {isLoadingWaitType ? "-" : queueType[2]?.paxRange}
                      </td>
                      <td className="text_16 px-2 py-7">
                        {isLoadingWaitType ? "-" : queueType[2]?.nextInLine}
                      </td>
                      <td className="text_16 px-2 py-7">
                        {isLoadingWaitType ? "-" : queueType[2]?.totalServed}
                      </td>
                      <td className="text_16 px-2 py-7">
                        {isLoadingWaitType ? "-" : queueType[2]?.totalWaiting}
                      </td>
                    </tr>

                    <tr className="bg-[#ffffff]">
                      <td className="text_16 px-2 py-2 pl-10">
                        <button
                          onClick={() => {
                            changeWaitTypeId(4);
                          }}
                          className={
                            activeWaitTypeId === 4
                              ? "bg-[#F99762] text-[#ffffff] rounded-[5px] px-9 py-4 cursor-pointer"
                              : "bg-[#ffffff] border border-[#d9d9d9] text-[#000000] rounded-[5px] px-9 py-4 cursor-pointer"
                          }
                        >
                          {isLoadingWaitType
                            ? "Q4"
                            : queueType[3]?.waitTypeName}
                        </button>
                      </td>
                      <td className="text_16 px-2 py-7">
                        {isLoadingWaitType ? "-" : queueType[3]?.paxRange}
                      </td>
                      <td className="text_16 px-2 py-7">
                        {isLoadingWaitType ? "-" : queueType[3]?.nextInLine}
                      </td>
                      <td className="text_16 px-2 py-7">
                        {isLoadingWaitType ? "-" : queueType[3]?.totalServed}
                      </td>
                      <td className="text_16 px-2 py-7">
                        {isLoadingWaitType ? "-" : queueType[3]?.totalWaiting}
                      </td>
                    </tr>

                    <tr className="bg-[#ffffff] ">
                      <td className="text_16 px-2 pt-2 pb-8 pl-10">
                        <button
                          onClick={() => {
                            changeWaitTypeId(5);
                          }}
                          className={
                            activeWaitTypeId === 5
                              ? "bg-[#F99762] text-[#ffffff] rounded-[5px] px-9 py-4 cursor-pointer"
                              : "bg-[#ffffff] border border-[#d9d9d9] text-[#000000] rounded-[5px] px-9 py-4 cursor-pointer"
                          }
                        >
                          {isLoadingWaitType
                            ? "Q5"
                            : queueType[4]?.waitTypeName}
                        </button>
                      </td>
                      <td className="text_16 px-2 py-7">
                        {isLoadingWaitType ? "-" : queueType[4]?.paxRange}
                      </td>
                      <td className="text_16 px-2 py-7">
                        {isLoadingWaitType ? "-" : queueType[4]?.nextInLine}
                      </td>
                      <td className="text_16 px-2 py-7">
                        {isLoadingWaitType ? "-" : queueType[4]?.totalServed}
                      </td>
                      <td className="text_16 px-2 py-7">
                        {isLoadingWaitType ? "-" : queueType[4]?.totalWaiting}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="text-[#6b6968] rounded-lg  bg-[#ffffff] w-full mt-8 items-center mx-auto ">
              <div className="flex bg-[#ffffff] grid-col-3  pt-4  pb-2">
                {/* <div class="py-8 pl8 pr-8 text-[#6b6968] "> */}
                <div className="px-16 grid pt-4">
                  <div className="pb-9 grid grid-cols-2	">
                    <div>
                      <p className="text_12 text-[#6b6968] capitalize ">Name</p>
                      <p className="text_16 text-[#000000] capitalize ">
                        {currentName}
                      </p>
                    </div>
                    <div>
                      <p className="text_12 text-[#6b6968] capitalize ">
                        Phone Number
                      </p>
                      <p className="text_16 text-[#33B469] underline">
                        <Link
                          to={`https://api.whatsapp.com/send?phone=${currentPhone}&text=Hello ${currentName} your table is ready, please proceed to the restaurant`}
                          target="_blank"
                        >
                          {addSpace(currentPhone)}
                        </Link>
                      </p>
                    </div>
                  </div>

                  <div className="pb-9 grid grid-cols-2">
                    <div>
                      <p className="text_12 text-[#6b6968] capitalize ">Pax</p>
                      <p className="text_16 text-[#000000] ">{currentPax}</p>
                    </div>
                    <div>
                      <p className="text_12 text-[#6b6968] capitalize ">
                        Status
                      </p>
                      <p className="text_16 text-[#000000] capitalize ">
                        {currentStatus}
                      </p>
                    </div>
                  </div>
                </div>
                {/* </div> */}
                <div class="h-[170px] mx-4 border-[0.5px] border-[#d9d9d9]"></div>
                <div className="mx-auto grid pt-1">
                  <h2 className="text-center text_14 text-[#6B6968] font-normal">
                    Queue Number
                  </h2>
                  <h3 className="text-center mt-[-30px] text-[56px] text-[#000000] font-semibold">
                    {currentWait}
                  </h3>
                  <p className="text-center mt-[-25px] text_14 text-[#000000] font-normal">
                    Called in 25 Mins ago
                  </p>
                </div>
              </div>

              <div class="border-[0.5px] border-[#d9d9d9]"></div>

              <div className="py-10  flex items-center justify-center">
                <button onClick={handleCheckIn} className="short_btn">
                  {isCheckInQueue ? <SpinnerWhite /> : "Check - In"}
                </button>

                <button
                  onClick={handleCancelQueue}
                  className="short_btn_white ml-6"
                >
                  {isCancellingQueue ? <SpinnerOrangeMedium /> : "Cancel"}
                </button>

                <button onClick={handleCall} className="short_btn_green ml-6 ">
                  Call
                </button>
              </div>
            </div>

            {/* </>
       )} */}
            {/* </>
   ) : !!isLoadingWait || queueList.length === 0 ? (
     ""
   ) : (
     ""
   )} */}
          </main>
        </div>

        {/* RIGHT SIDE */}

        <div className="sticky top-0  w-[362px] border-l border-[#D9D9D9] bg-[#F6F7F9] ">
          <div className="flow-root border-b border-[#d9d9d9]">
            <span className="flex  items-center justify-center py-6 ">
              {isServed ? (
                <>
                  <button
                    onClick={handleServe}
                    className="cursor-pointer rounded-l-lg bg-[#ededee] border-t border-l border-b border-[#D9D9D9] py-2 px-[44px]"
                  >
                    Served
                  </button>
                  <button
                    onClick={handleCancel}
                    className="cursor-pointer rounded-r-lg bg-[#ffffff] border-t border-r border-b border-[#D9D9D9]  py-2 px-[44px]"
                  >
                    Cancelled
                  </button>
                </>
              ) : null}
              {isCancelled ? (
                <>
                  <button
                    onClick={handleServe}
                    className="cursor-pointer rounded-l-lg bg-[#ffffff] border-t border-l border-b border-[#D9D9D9] py-2 px-[44px]"
                  >
                    Served
                  </button>
                  <button
                    onClick={handleCancel}
                    className="cursor-pointer rounded-r-lg bg-[#ededee] border-t border-r border-b border-[#D9D9D9]  py-2 px-[44px]"
                  >
                    Cancelled
                  </button>
                </>
              ) : null}
            </span>
          </div>

          <div className="flow-root overflow-y-auto h-screen">
            {isLoadingServed || servedList.length > 0 ? (
              <>
                {isLoadingServed ? (
                  <>
                    <div className="w-[362px] ">
                      <span className="flex pt-[20rem] items-center justify-center ">
                        {" "}
                        <SpinnerOrange />
                      </span>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="w-[362px]   bg-[#F6F7F9]">
                      {servedList?.map((list, index) => (
                        <div key={index} className="flex items-center  ">
                          <div className=" grid mx-auto justify-center items-center mt-8 ">
                            <div class="py-8 pl-5 text-[#6b6968] rounded-lg   bg-[#ffffff] w-[285px]  mb-6">
                              <div className="pb-9 grid grid-cols-2	">
                                <div>
                                  <p className="text_12 text-[#6b6968] capitalize ">
                                    Name
                                  </p>
                                  <p className="text_16 text-[#000000] capitalize ">
                                    {list.cusName}
                                  </p>
                                </div>
                                <div>
                                  <p className="text_12 text-[#6b6968]  capitalize ">
                                    Phone Number
                                  </p>
                                  <p className="text_16 text-[#33B469] underline">
                                    {addSpace(list.cusPhone)}
                                  </p>
                                </div>
                              </div>
                              <div className="pb-9 grid grid-cols-2">
                                <div>
                                  <p className="text_12 text-[#6b6968] capitalize ">
                                    Pax
                                  </p>
                                  <p className="text_16 text-[#000000] ">
                                    {list.paxNo}
                                  </p>
                                </div>
                                <div>
                                  <p className="text_12 text-[#6b6968] capitalize ">
                                    Status
                                  </p>
                                  <p className="text_16 text-[#000000] capitalize ">
                                    {list.status}
                                  </p>
                                </div>
                              </div>
                              <div className="grid grid-cols-2	">
                                <div>
                                  <p className="text_12 text-[#6b6968] capitalize ">
                                    Queue Number
                                  </p>
                                  <p className="text_16 text-[#000000] ">
                                    {list.waitNo}
                                  </p>
                                </div>
                                <div>
                                  <p className="text_12 text-[#6b6968] ">
                                    Date/Time
                                  </p>
                                  <p className="text_14 text-[#000000]">
                                    {currentDate} {currentTime}{" "}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </>
            ) : !!isLoadingServed || servedList.length === 0 ? (
              <>
                <div className="w-[362px] ">
                  <span className="grid pt-[15rem] items-center justify-center text-center max-w-sm">
                    <h4 className="text_16">
                      You do not have any Waiting Queue
                    </h4>
                  </span>
                </div>
              </>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </>
  );
};
