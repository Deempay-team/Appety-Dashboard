import { useState, useEffect, useRef } from "react";
import QRCode from "qrcode.react";
import { Switch, ConfigProvider } from "antd";
import axios from "axios";
import { useForm } from "react-hook-form";
import moment from "moment";
import exportAsImage from "../../../components/exportAsImage";
import Layout from "../../../components/MerchantLayout";
import { DownLoadIcon } from "../../../assests/icons/Icons";
import storage from "../../../utils/storage";
import secrets from "../../../config/secrets";
import { useEditWaitTime, useUpdateMerchant } from "../../../hooks/useMechant";
import {
  RemoveQueueModalIcon,
  CopiedIcon,
  CopyIcon,
} from "../../../assests/icons/Icons";
import {
  SpinnerOrangeMedium,
  SpinnerWhite,
  SpinnerOrange,
  SpinnerMediumWhite,
} from "../../../components/spinner/Spinner";
import Notify from "../../../components/Notification";
import { Dropdown, Menu } from "antd";

const column = ["Day", "Start Time", "End Time", "Action"];

const LinkSettingsPage = () => {
  const exportRef = useRef();
  const inputRef = useRef();
  const baseURL = secrets.baseURL;
  const merchId = JSON.parse(storage.fetch("userDetails")).userId;
  const linkUrl = JSON.parse(storage.fetch("merchantDetails")).linkUrl;
  const switchIsOn = JSON.parse(storage.fetch("merchantDetails")).linkUrlStatus;
  const monitorUrl = JSON.parse(storage.fetch("merchantDetails")).monitorUrl;
  const [waitTimeId, setWaitTimeId] = useState("");
  const [endTime, setEndTime] = useState("");
  const [startTime, setstartTime] = useState("");
  const [endTimeOld, setEndTimeOld] = useState("");
  const [startTimeOld, setstartTimeOld] = useState("");
  const [dayFull, setDayFull] = useState("");
  const [status, setStatus] = useState("1");
  const [isEditMonday, setIsEditMonday] = useState(true);
  const [timeList, setTimeList] = useState([]);
  const [isLoadingTime, setIsLoadingTime] = useState(false);
  const [isLoadingMonday, setIsLoadingMonday] = useState(false);
  const [isLoadingTuesday, setIsLoadingTuesday] = useState(false);
  const [isLoadingWednesday, setIsLoadingWednesday] = useState(false);
  const [isLoadingThursday, setIsLoadingThursday] = useState(false);
  const [isLoadingFriday, setIsLoadingFriday] = useState(false);
  const [isLoadingSaturday, setIsLoadingSaturday] = useState(false);
  const [isLoadingSunday, setIsLoadingSunday] = useState(false);
  const [isEditTuesday, setIsEditTuesday] = useState(true);
  const [isEditWednesday, setIsEditWednesday] = useState(true);
  const [isEditThursday, setIsEditThursday] = useState(true);
  const [isEditFriday, setIsEditFriday] = useState(true);
  const [isEditSaturday, setIsEditSaturday] = useState(true);
  const [isEditSunday, setIsEditSunday] = useState(true);
  const [listIndex, setListIndex] = useState("0");
  const [waitTimeList, setWaitTimeList] = useState([]);
  const [showRemoveModal, setShowRemoveModal] = useState(false);
  const [isLoadingRemove, setIsLoadingRemove] = useState(false);
  const [isLoadingAdd, setIsLoadingAdd] = useState(false);
  const [linkUrlStatus, setLinkUrlStatus] = useState("");
  const [preOrderUrl, setPreOrderUrl] = useState("");
  const [isSwitchOn, setIsSwitchOn] = useState("");
  const [isLoadingOrderUrl, setIsLoadingOrderUrl] = useState(false);
  const [isLoadingVideoUrl, setIsLoadingVideoUrl] = useState(false);
  const [isTimeFetch, setIsTimeFetch] = useState(true);
  const [adsVideoUrl, setAdsVideoUrl] = useState("");
  const [copied, setCopied] = useState(true);

  // monitorUrl: res?.data?.data?.monitorUrl,

  // FORM VALIDATION
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm();

  const openRemoveModal = (index) => {
    setShowRemoveModal(true);
    setStatus("0");
  };

  const monday = (
    <Menu className="grid items-center justify-center">
      <span
        onClick={() => setIsEditMonday(false)}
        className="cursor-pointer block mx-auto py-4 text_16 text-[#33B469]"
      >
        Edit
      </span>
      <div class="border-[0.5px] border-[#D9D9D9]"></div>
      <span
        onClick={openRemoveModal}
        className="cursor-pointer block px-8 py-4 text_16 text-[#ff0000]"
      >
        Remove
      </span>
    </Menu>
  );

  const tuesday = (
    <Menu className="grid items-center justify-center">
      <span
        onClick={() => setIsEditTuesday(false)}
        className="cursor-pointer block mx-auto py-4 text_16 text-[#33B469]"
      >
        Edit
      </span>
      <div class="border-[0.5px] border-[#D9D9D9]"></div>
      <span
        //open={false}
        onClick={openRemoveModal}
        className="cursor-pointer block px-8 py-4 text_16 text-[#ff0000]"
      >
        Remove
      </span>
    </Menu>
  );

  const wednesday = (
    <Menu className="grid items-center justify-center">
      <span
        onClick={() => setIsEditWednesday(false)}
        className="cursor-pointer block mx-auto py-4 text_16 text-[#33B469]"
      >
        Edit
      </span>
      <div class="border-[0.5px] border-[#D9D9D9]"></div>
      <span
        onClick={openRemoveModal}
        className="cursor-pointer block px-8 py-4 text_16 text-[#ff0000]"
      >
        Remove
      </span>
    </Menu>
  );

  const thursday = (
    <Menu className="grid items-center justify-center">
      <span
        onClick={() => setIsEditThursday(false)}
        className="cursor-pointer block mx-auto py-4 text_16 text-[#33B469]"
      >
        Edit
      </span>
      <div class="border-[0.5px] border-[#D9D9D9]"></div>
      <span
        onClick={openRemoveModal}
        className="cursor-pointer block px-8 py-4 text_16 text-[#ff0000]"
      >
        Remove
      </span>
    </Menu>
  );

  const friday = (
    <Menu className="grid items-center justify-center">
      <span
        onClick={() => setIsEditFriday(false)}
        className="cursor-pointer block mx-auto py-4 text_16 text-[#33B469]"
      >
        Edit
      </span>
      <div class="border-[0.5px] border-[#D9D9D9]"></div>
      <span
        onClick={openRemoveModal}
        className="cursor-pointer block px-8 py-4 text_16 text-[#ff0000]"
      >
        Remove
      </span>
    </Menu>
  );

  const saturday = (
    <Menu className="grid items-center justify-center">
      <span
        onClick={() => setIsEditSaturday(false)}
        className="cursor-pointer block mx-auto py-4 text_16 text-[#33B469]"
      >
        Edit
      </span>
      <div class="border-[0.5px] border-[#D9D9D9]"></div>
      <span
        onClick={openRemoveModal}
        className="cursor-pointer block px-8 py-4 text_16 text-[#ff0000]"
      >
        Remove
      </span>
    </Menu>
  );

  const sunday = (
    <Menu className="grid items-center justify-center">
      <span
        onClick={() => setIsEditSunday(false)}
        className="cursor-pointer block mx-auto py-4 text_16 text-[#33B469]"
      >
        Edit
      </span>
      <div class="border-[0.5px] border-[#D9D9D9]"></div>
      <span
        onClick={openRemoveModal}
        className="cursor-pointer block px-8 py-4 text_16 text-[#ff0000]"
      >
        Remove
      </span>
    </Menu>
  );

  //CALL TO UPDATE WAIT-TIME
  const { data, mutate: fetchEditWaitTime } = useEditWaitTime({
    merchId,
    waitTimeId,
    startTime,
    status,
    endTime,
  });

  //CALL TO UPDATE MERCHANT STATUS
  const { data: updateMerchantData, mutate: fetchUpdateMerchant } =
    useUpdateMerchant({
      merchId,
      linkUrlStatus,
      preOrderUrl,
      adsVideoUrl,
    });

  //CALL QUERY WAIT-TIME API
  useEffect(() => {
    setIsLoadingTime(true);
    axios
      .get(`${baseURL}api/v1/wait/time/query/${merchId}`)
      .then(function (res) {
        if (res?.data?.code === "000000") {
          setIsTimeFetch(false);
          setIsLoadingTime(false);
          const daysData = res?.data?.data;
          setTimeList(daysData);
        }
      })
      .catch(function (error) {
        console.log("queryWaitType-error", error);
      });
  }, []);

  //CALL QUERY WAIT-TIME API TO UPDATE STATE
  const timeUpdate = () => {
    axios
      .get(`${baseURL}api/v1/wait/time/query/${merchId}`)
      .then(function (res) {
        if (res?.data?.code === "000000") {
          setIsLoadingTime(false);
          const daysData = res?.data?.data;
          setTimeList(daysData);
        }
      })
      .catch(function (error) {
        console.log("queryWaitType-error", error);
      });
  };

  //CALL QUERY MERCHANT DETAILS API
  const queryMerchantUpdate = () => {
    axios
      .get(`${baseURL}api/v1/user/merchant/query/${merchId}`)
      .then(function (res) {
        if (res?.data?.code === "000000") {
          storage.add(
            "merchantDetails",
            JSON.stringify({
              merchStatus: res?.data?.data?.merchStatus,
              merchName: res?.data?.data?.merchName,
              merchPhone: res?.data?.data?.merchPhone,
              contactName: res?.data?.data?.contactName,
              linkUrl: res?.data?.data?.linkUrl,
              linkUrlStatus: res?.data?.data?.linkUrlStatus,
              logoUrl: res?.data?.data?.logoUrl,
              preOrderUrl: res?.data?.data?.preOrderUrl,
              monitorUrl: res?.data?.data?.monitorUrl,
            })
          );
          isSwitchOn(res?.data?.data?.linkUrlStatus);

          console.log("merchant-error", res.data);
        }
      })
      .catch(function (error) {
        console.log("merchant-error", error);
      });
  };

  //RETURN UPDATE API DATA
  useEffect(() => {
    if (data?.code === "000000") {
      setIsLoadingMonday(false);
      setIsLoadingTuesday(false);
      setIsLoadingWednesday(false);
      setIsLoadingThursday(false);
      setIsLoadingFriday(false);
      setIsLoadingSaturday(false);
      setIsLoadingSunday(false);
      setIsLoadingRemove(false);
      setIsLoadingAdd(false);

      setIsEditMonday(true);
      setIsEditTuesday(true);
      setIsEditWednesday(true);
      setIsEditThursday(true);
      setIsEditFriday(true);
      setIsEditSaturday(true);
      setIsEditSunday(true);
      timeUpdate();
      closeModal();
      Notify("success", "Your Queue has being updated Successfully!");
      setWaitTimeId("");
    } else if (data?.code === "U00022") {
      setIsLoadingMonday(false);
      setIsLoadingTuesday(false);
      setIsLoadingWednesday(false);
      setIsLoadingThursday(false);
      setIsLoadingFriday(false);
      setIsLoadingSaturday(false);
      setIsLoadingSunday(false);
      setIsLoadingRemove(false);

      setIsEditMonday(true);
      setIsEditTuesday(true);
      setIsEditWednesday(true);
      setIsEditThursday(true);
      setIsEditFriday(true);
      setIsEditSaturday(true);
      setIsEditSunday(true);
      closeModal();
      Notify("error", "Please check your input and try again!");
      setWaitTimeId("");
    }
  }, [data]);

  // CALL UPDATE API
  useEffect(() => {
    if (endTime && waitTimeId) {
      fetchEditWaitTime();
    }
  }, [endTime, waitTimeId]);

  const handleWaitTime = (index) => {
    setWaitTimeList(timeList);
    setListIndex(index);
    setstartTimeOld(timeList[index]?.startTime);
    setEndTimeOld(timeList[index]?.endTime);
  };

  //TO REMOVE WAIT-TIME
  const handleRemove = () => {
    setStatus("0");
    setWaitTimeId(timeList[listIndex]?.waitTimeId);
    setEndTime(timeList[listIndex]?.endTime);
    setstartTime(timeList[listIndex]?.startTime);
    setIsLoadingRemove(true);
  };

  const qrcode = (
    <QRCode
      id="qrCodeId"
      size={110}
      value={`https://queue.appety.com.sg/user/${linkUrl}`}
      bgColor="white"
      fqColor="black"
      level="M"
    />
  );

  const qrcodeBig = (
    <QRCode
      id="qrCodeId"
      size={450}
      value={`https://queue.appety.com.sg/user/${linkUrl}`}
      bgColor="white"
      fqColor="black"
      level="H"
    />
  );

  //MERCHANT RETURN DATA API
  useEffect(() => {
    if (updateMerchantData) {
      queryMerchantUpdate();
      setIsLoadingOrderUrl(false);
      setIsLoadingVideoUrl(false)
      Notify("success", "Your Status has being updated Successfully!");
    }
  }, [updateMerchantData]);

  //API TO TURN OFF LINK AUTOMATICALLY
  useEffect(() => {
    if (linkUrlStatus || preOrderUrl || adsVideoUrl) {
      fetchUpdateMerchant();
    }
  }, [linkUrlStatus, preOrderUrl, adsVideoUrl]);

  const onChange = (checked) => {
    if (checked) {
      setLinkUrlStatus("1");
    } else {
      setLinkUrlStatus("0");
    }
  };

  const handleEditMon = () => {
    setWaitTimeId(timeList[0]?.waitTimeId);
    setStatus("1");
    setDayFull("MONDAY")
   // setIsLoadingMonday(true);
  };

  const handleEditTue = () => {
    setWaitTimeId(timeList[1]?.waitTimeId);
    setStatus("1");
    setDayFull("TUESDAY")
   // setIsLoadingTuesday(true);
  };

  const handleEditWed = () => {
    setWaitTimeId(timeList[2]?.waitTimeId);
    setStatus("1");
    setDayFull("WEDNESDAY")
   // setIsLoadingWednesday(true);
  };

  const handleEditThur = () => {
    setWaitTimeId(timeList[3]?.waitTimeId);
    setStatus("1");
   // setIsLoadingThursday(true);
   setDayFull("THURSDAY")
  };

  const handleEditFri = () => {
    setWaitTimeId(timeList[4]?.waitTimeId);
    setStatus("1");
    setDayFull("FRIDAY")
   // setIsLoadingFriday(true);
  };

  const handleEditSat = () => {
    setWaitTimeId(timeList[5]?.waitTimeId);
    setStatus("1");
    setDayFull("SATURDAY")
    //setIsLoadingSaturday(true);
  };

  const handleEditSun = () => {
    setWaitTimeId(timeList[6]?.waitTimeId);
    setStatus("1");
    setDayFull("SUNDAY")
   // setIsLoadingSunday(true);
  };

  const addBack = () => {
    setStatus("1");
    setWaitTimeId(timeList[listIndex]?.waitTimeId);
    setEndTime(timeList[listIndex]?.endTime);
    setstartTime(timeList[listIndex]?.startTime);
    setIsLoadingAdd(true);
  };

  const timeStatus = (
    <Menu className="grid items-center justify-center">
      <span
        onClick={addBack}
        className="cursor-pointer block px-4 py-4 text_16 text-[#000000]"
      >
        {isLoadingAdd ? <SpinnerOrangeMedium /> : "Add Back"}
      </span>
    </Menu>
  );

  const onSubmitPreOrder = (data) => {
    const { preOrderUrl, adsVideoUrl } = data;
    if (preOrderUrl) {
      setPreOrderUrl(`https://${preOrderUrl}`);
      setIsLoadingOrderUrl(true);
    }
    if (adsVideoUrl) {
      setAdsVideoUrl(`https://${adsVideoUrl}`);
      setIsLoadingVideoUrl(true)
    }
    reset();
  };

  const onSubmitHandler = (data) => {
    const { startTime, endTime } = data;
    if (startTime) {
      setstartTime(startTime);
    }
    if (endTime) {
      setEndTime(endTime);
    }

    switch (dayFull) {
      case "MONDAY":
        setIsLoadingMonday(true);
        break;
      case "TUESDAY":
        setIsLoadingTuesday(true);
        break;
      case "WEDNESDAY":
        setIsLoadingWednesday(true);
        break;
      case "THURSDAY":
        setIsLoadingThursday(true);
        break;
      case "FRIDAY":
        setIsLoadingFriday(true);
        break;
        case "SATURDAY":
          setIsLoadingSaturday(true);
          break;
        case "SUNDAY":
          setIsLoadingSunday(true);
          break;
      default:
        setIsLoadingMonday(true);
        break;
    }
  };

  useEffect(() => {
    setValue("startTime", startTimeOld);
    setValue("endTime", endTimeOld);
  }, [startTimeOld, endTimeOld]);

  const closeModal = () => {
    setShowRemoveModal(false);
    setStatus("1");
  };

  //COPY TEXT TO CLIPBOARD
  const handleCopy = () => {
    navigator.clipboard
      .writeText(`https://queue.appety.com.sg/display-tv/${monitorUrl}`)
      .then(() => {
        setCopied(false);
        setTimeout(() => {
          setCopied(true);
        }, 1500);
      })
      .catch((error) => console.log(error));
  };

  const timeInput = () => {
    inputRef.current.click();
  };

  return (
    <>
      <Layout>
        <main className="xl:ml-[370px] ml-[320px] sm:px-10 px-6 bg-[#F6F7F9] pb-10  h-full">
          {isTimeFetch ? (
            <>
              <span className="flex items-center justify-center content-center pb-40 h-screen ">
                <SpinnerOrange />
              </span>
            </>
          ) : (
            <>
              <h2 className="text_18 pb-4 pt-10">Queue Available Time</h2>

              <div className=" overflow-x-scroll overflow-y-hidden sm:overflow-x-auto sm:overflow-y-auto rounded-[10px] ">
                <form onSubmit={handleSubmit(onSubmitHandler)}>
                  <table className=" w-full text-base text-center py-14  border-collapse ">
                    <thead className="text_16  font-normal bg-[#ffffff] ">
                      {column.map((header, i) => (
                        <th scope="col" className="font-normal py-6 " key={i}>
                          {header}
                        </th>
                      ))}
                    </thead>
                    <tbody className=" ">
                      {/* MONDAY ROW */}
                      <tr className="border-y-[0.5px] border-[#d9d9d9] py-4  bg-[#ffffff]">
                        {timeList[0]?.status === "1" ? (
                          <>
                            <td className="text_16  py-6 capitalize">Monday</td>
                          </>
                        ) : (
                          <>
                            <td className="text_16 text-[#d0cfcf] py-6 capitalize">
                              Monday
                            </td>
                          </>
                        )}
                        {isEditMonday ? (
                          <>
                            {timeList[0]?.status === "1" ? (
                              <>
                                <td className="text_16 py-6 ">
                                  {isLoadingTime
                                    ? "-"
                                    : moment(
                                        timeList[0]?.startTime,
                                        "HH:mm a"
                                      ).format("h:mm A")}
                                </td>
                                <td className="text_16 py-6 ">
                                  {isLoadingTime
                                    ? "-"
                                    : moment(
                                        timeList[0]?.endTime,
                                        "HH:mm a"
                                      ).format("h:mm A")}
                                </td>
                              </>
                            ) : (
                              <>
                                <td className="text_16 py-6 text-[#d0cfcf] ">
                                  {isLoadingTime
                                    ? "-"
                                    : moment(
                                        timeList[0]?.startTime,
                                        "HH:mm a"
                                      ).format("h:mm A")}
                                </td>
                                <td className="text_16 py-6 text-[#d0cfcf]">
                                  {isLoadingTime
                                    ? "-"
                                    : moment(
                                        timeList[0]?.endTime,
                                        "HH:mm a"
                                      ).format("h:mm A")}
                                </td>
                              </>
                            )}
                            <td className="text_16 py-6 underline">
                              {/* CHECK FOR STATUS */}
                              {timeList[0]?.status === "1" ? (
                                <>
                                  <Dropdown
                                    overlay={monday}
                                    trigger={["click"]}
                                  >
                                    <span
                                      onClick={() => {
                                        handleWaitTime(0);
                                      }}
                                      className=" cursor-pointer text_16 underline"
                                    >
                                      More
                                    </span>
                                  </Dropdown>
                                </>
                              ) : (
                                <>
                                  <Dropdown
                                    overlay={timeStatus}
                                    trigger={["click"]}
                                  >
                                    <span
                                      onClick={() => {
                                        handleWaitTime(0);
                                      }}
                                      className=" cursor-pointer text-[#d0cfcf] text_16 underline"
                                    >
                                      More
                                    </span>
                                  </Dropdown>
                                </>
                              )}
                            </td>
                          </>
                        ) : (
                          <>
                            <td className="">
                              <span
                              //onClick={() => {timeInput()}}
                              >
                                <input
                                  type="time"
                                  //ref={inputRef}
                                  className={`input-time mx-auto ${
                                    errors.startTime && "input_error"
                                  }`}
                                  {...register("startTime", {
                                    required: "",
                                  })}
                                />
                              </span>
                            </td>
                            <td className="text_16 py-6 ">
                              <span>
                                <input
                                  type="time"
                                  className={`input-time mx-auto ${
                                    errors.endTime && "input_error"
                                  }`}
                                  {...register("endTime", {
                                    required: "",
                                  })}
                                />
                              </span>
                            </td>
                            <td className="text_16 py-6 ">
                              <span className="flex items-center justify-center">
                                <button
                                  type="submit"
                                  onClick={handleEditMon}
                                  className="table_short_btn mr-[13px] "
                                >
                                  {isLoadingMonday ? <SpinnerWhite /> : "Save"}
                                </button>
                                <button
                                  type="submit"
                                  onClick={() => setIsEditMonday(true)}
                                  className="table_short_white "
                                >
                                  Cancel
                                </button>
                              </span>
                            </td>
                          </>
                        )}
                      </tr>

                      {/* TUESDAY ROW */}
                      <tr className="py-4  bg-[#ffffff]">
                        {timeList[1]?.status === "1" ? (
                          <>
                            <td className="text_16  py-6 capitalize">
                              Tuesday
                            </td>
                          </>
                        ) : (
                          <>
                            <td className="text_16 text-[#d0cfcf] py-6 capitalize">
                              Tuesday
                            </td>
                          </>
                        )}
                        {isEditTuesday ? (
                          <>
                            {timeList[1]?.status === "1" ? (
                              <>
                                <td className="text_16 py-6 ">
                                  {isLoadingTime
                                    ? "-"
                                    : moment(
                                        timeList[1]?.startTime,
                                        "HH:mm a"
                                      ).format("h:mm A")}
                                </td>
                                <td className="text_16 py-6 ">
                                  {isLoadingTime
                                    ? "-"
                                    : moment(
                                        timeList[1]?.endTime,
                                        "HH:mm a"
                                      ).format("h:mm A")}
                                </td>
                              </>
                            ) : (
                              <>
                                <td className="text_16 py-6 text-[#d0cfcf] ">
                                  {isLoadingTime
                                    ? "-"
                                    : moment(
                                        timeList[1]?.startTime,
                                        "HH:mm a"
                                      ).format("h:mm A")}
                                </td>
                                <td className="text_16 py-6 text-[#d0cfcf]">
                                  {isLoadingTime
                                    ? "-"
                                    : moment(
                                        timeList[1]?.endTime,
                                        "HH:mm a"
                                      ).format("h:mm A")}
                                </td>
                              </>
                            )}
                            <td className="text_16 py-6 underline">
                              {/* CHECK FOR STATUS */}
                              {timeList[1]?.status === "1" ? (
                                <>
                                  <Dropdown
                                    overlay={tuesday}
                                    trigger={["click"]}
                                  >
                                    <span
                                      onClick={() => {
                                        handleWaitTime(1);
                                      }}
                                      className=" cursor-pointer text_16 underline"
                                    >
                                      More
                                    </span>
                                  </Dropdown>
                                </>
                              ) : (
                                <>
                                  <Dropdown
                                    overlay={timeStatus}
                                    trigger={["click"]}
                                  >
                                    <span
                                      onClick={() => {
                                        handleWaitTime(1);
                                      }}
                                      className=" cursor-pointer text_16 text-[#d0cfcf] underline"
                                    >
                                      More
                                    </span>
                                  </Dropdown>
                                </>
                              )}
                            </td>
                          </>
                        ) : (
                          <>
                            <td className="">
                              <input
                                type="time"
                                className={`input-time mx-auto ${
                                  errors.startTime && "input_error"
                                }`}
                                {...register("startTime", {
                                  required: "",
                                })}
                              />
                            </td>
                            <td className="text_16 py-6 ">
                              <input
                                type="time"
                                className={`input-time mx-auto ${
                                  errors.endTime && "input_error"
                                }`}
                                {...register("endTime", {
                                  required: "",
                                })}
                              />
                            </td>
                            <td className="text_16 py-6 ">
                              <span className="flex items-center justify-center">
                                <button
                                  type="submit"
                                  onClick={handleEditTue}
                                  className="table_short_btn mr-[13px] "
                                >
                                  {isLoadingTuesday ? <SpinnerWhite /> : "Save"}
                                </button>
                                <button
                                  type="submit"
                                  onClick={() => setIsEditTuesday(true)}
                                  className="table_short_white "
                                >
                                  Cancel
                                </button>
                              </span>
                            </td>
                          </>
                        )}
                      </tr>

                      {/* WEDNESDAY ROW */}
                      <tr className="border-y-[0.5px] border-[#d9d9d9] py-4  bg-[#ffffff]">
                        {timeList[2]?.status === "1" ? (
                          <>
                            <td className="text_16  py-6 capitalize">
                              Wednesday
                            </td>
                          </>
                        ) : (
                          <>
                            <td className="text_16 text-[#d0cfcf] py-6 capitalize">
                              Wednesday
                            </td>
                          </>
                        )}
                        {isEditWednesday ? (
                          <>
                            {timeList[2]?.status === "1" ? (
                              <>
                                <td className="text_16 py-6 ">
                                  {isLoadingTime
                                    ? "-"
                                    : moment(
                                        timeList[2]?.startTime,
                                        "HH:mm a"
                                      ).format("h:mm A")}
                                </td>
                                <td className="text_16 py-6 ">
                                  {isLoadingTime
                                    ? "-"
                                    : moment(
                                        timeList[2]?.endTime,
                                        "HH:mm a"
                                      ).format("h:mm A")}
                                </td>
                              </>
                            ) : (
                              <>
                                <td className="text_16 py-6 text-[#d0cfcf] ">
                                  {isLoadingTime
                                    ? "-"
                                    : moment(
                                        timeList[2]?.startTime,
                                        "HH:mm a"
                                      ).format("h:mm A")}
                                </td>
                                <td className="text_16 py-6 text-[#d0cfcf]">
                                  {isLoadingTime
                                    ? "-"
                                    : moment(
                                        timeList[2]?.endTime,
                                        "HH:mm a"
                                      ).format("h:mm A")}
                                </td>
                              </>
                            )}
                            <td className="text_16 py-6 underline">
                              {/* CHECK FOR STATUS */}
                              {timeList[2]?.status === "1" ? (
                                <>
                                  <Dropdown
                                    overlay={wednesday}
                                    trigger={["click"]}
                                  >
                                    <span
                                      onClick={() => {
                                        handleWaitTime(2);
                                      }}
                                      className=" cursor-pointer text_16 underline"
                                    >
                                      More
                                    </span>
                                  </Dropdown>
                                </>
                              ) : (
                                <>
                                  <Dropdown
                                    overlay={timeStatus}
                                    trigger={["click"]}
                                  >
                                    <span
                                      onClick={() => {
                                        handleWaitTime(2);
                                      }}
                                      className=" cursor-pointer text-[#d0cfcf] text_16 underline"
                                    >
                                      More
                                    </span>
                                  </Dropdown>
                                </>
                              )}
                            </td>
                          </>
                        ) : (
                          <>
                            <td className="">
                              <input
                                type="time"
                                className={`input-time mx-auto ${
                                  errors.startTime && "input_error"
                                }`}
                                {...register("startTime", {
                                  required: "",
                                })}
                              />
                            </td>
                            <td className="text_16 py-6 ">
                              <input
                                type="time"
                                className={`input-time mx-auto ${
                                  errors.endTime && "input_error"
                                }`}
                                {...register("endTime", {
                                  required: "",
                                })}
                              />
                            </td>
                            <td className="text_16 py-6 ">
                              <span className="flex items-center justify-center">
                                <button
                                  type="submit"
                                  onClick={handleEditWed}
                                  className="table_short_btn mr-[13px] "
                                >
                                  {isLoadingWednesday ? (
                                    <SpinnerWhite />
                                  ) : (
                                    "Save"
                                  )}
                                </button>
                                <button
                                  type="submit"
                                  onClick={() => setIsEditWednesday(true)}
                                  className="table_short_white "
                                >
                                  Cancel
                                </button>
                              </span>
                            </td>
                          </>
                        )}
                      </tr>

                      {/* THURSDAY ROW */}
                      <tr className="py-4  bg-[#ffffff]">
                        {timeList[3]?.status === "1" ? (
                          <>
                            <td className="text_16  py-6 capitalize">
                              Thursday
                            </td>
                          </>
                        ) : (
                          <>
                            <td className="text_16 text-[#d0cfcf] py-6 capitalize">
                              Thursday
                            </td>
                          </>
                        )}
                        {isEditThursday ? (
                          <>
                            {timeList[3]?.status === "1" ? (
                              <>
                                <td className="text_16 py-6 ">
                                  {isLoadingTime
                                    ? "-"
                                    : moment(
                                        timeList[3]?.startTime,
                                        "HH:mm a"
                                      ).format("h:mm A")}
                                </td>
                                <td className="text_16 py-6 ">
                                  {isLoadingTime
                                    ? "-"
                                    : moment(
                                        timeList[3]?.endTime,
                                        "HH:mm a"
                                      ).format("h:mm A")}
                                </td>
                              </>
                            ) : (
                              <>
                                <td className="text_16 py-6 text-[#d0cfcf] ">
                                  {isLoadingTime
                                    ? "-"
                                    : moment(
                                        timeList[3]?.startTime,
                                        "HH:mm a"
                                      ).format("h:mm A")}
                                </td>
                                <td className="text_16 py-6 text-[#d0cfcf]">
                                  {isLoadingTime
                                    ? "-"
                                    : moment(
                                        timeList[3]?.endTime,
                                        "HH:mm a"
                                      ).format("h:mm A")}
                                </td>
                              </>
                            )}
                            <td className="text_16 py-6 underline">
                              {/* CHECK FOR STATUS */}
                              {timeList[3]?.status === "1" ? (
                                <>
                                  <Dropdown
                                    overlay={thursday}
                                    trigger={["click"]}
                                  >
                                    <span
                                      onClick={() => {
                                        handleWaitTime(3);
                                      }}
                                      className=" cursor-pointer text_16 underline"
                                    >
                                      More
                                    </span>
                                  </Dropdown>
                                </>
                              ) : (
                                <>
                                  <Dropdown
                                    overlay={timeStatus}
                                    trigger={["click"]}
                                  >
                                    <span
                                      onClick={() => {
                                        handleWaitTime(3);
                                      }}
                                      className=" cursor-pointer text_16 text-[#d0cfcf] underline"
                                    >
                                      More
                                    </span>
                                  </Dropdown>
                                </>
                              )}
                            </td>
                          </>
                        ) : (
                          <>
                            <td className="">
                              <input
                                type="time"
                                className={`input-time mx-auto ${
                                  errors.startTime && "input_error"
                                }`}
                                {...register("startTime", {
                                  required: "",
                                })}
                              />
                            </td>
                            <td className="text_16 py-6 ">
                              <input
                                type="time"
                                className={`input-time mx-auto ${
                                  errors.endTime && "input_error"
                                }`}
                                {...register("endTime", {
                                  required: "",
                                })}
                              />
                            </td>
                            <td className="text_16 py-6 ">
                              <span className="flex items-center justify-center">
                                <button
                                  type="submit"
                                  onClick={handleEditThur}
                                  className="table_short_btn mr-[13px] "
                                >
                                  {isLoadingThursday ? (
                                    <SpinnerWhite />
                                  ) : (
                                    "Save"
                                  )}
                                </button>
                                <button
                                  type="submit"
                                  onClick={() => setIsEditThursday(true)}
                                  className="table_short_white "
                                >
                                  Cancel
                                </button>
                              </span>
                            </td>
                          </>
                        )}
                      </tr>

                      {/* FRIDAY ROW */}
                      <tr className="border-y-[0.5px] border-[#d9d9d9] py-4  bg-[#ffffff]">
                        {timeList[4]?.status === "1" ? (
                          <>
                            <td className="text_16  py-6 capitalize">Friday</td>
                          </>
                        ) : (
                          <>
                            <td className="text_16 text-[#d0cfcf] py-6 capitalize">
                              Friday
                            </td>
                          </>
                        )}
                        {isEditFriday ? (
                          <>
                            {timeList[4]?.status === "1" ? (
                              <>
                                <td className="text_16 py-6 ">
                                  {isLoadingTime
                                    ? "-"
                                    : moment(
                                        timeList[4]?.startTime,
                                        "HH:mm a"
                                      ).format("h:mm A")}
                                </td>
                                <td className="text_16 py-6 ">
                                  {isLoadingTime
                                    ? "-"
                                    : moment(
                                        timeList[4]?.endTime,
                                        "HH:mm a"
                                      ).format("h:mm A")}
                                </td>
                              </>
                            ) : (
                              <>
                                <td className="text_16 py-6 text-[#d0cfcf] ">
                                  {isLoadingTime
                                    ? "-"
                                    : moment(
                                        timeList[4]?.startTime,
                                        "HH:mm a"
                                      ).format("h:mm A")}
                                </td>
                                <td className="text_16 py-6 text-[#d0cfcf]">
                                  {isLoadingTime
                                    ? "-"
                                    : moment(
                                        timeList[4]?.endTime,
                                        "HH:mm a"
                                      ).format("h:mm A")}
                                </td>
                              </>
                            )}
                            <td className="text_16 py-6 underline">
                              {/* CHECK FOR STATUS */}
                              {timeList[4]?.status === "1" ? (
                                <>
                                  <Dropdown
                                    overlay={friday}
                                    trigger={["click"]}
                                  >
                                    <span
                                      onClick={() => {
                                        handleWaitTime(4);
                                      }}
                                      className=" cursor-pointer text_16 underline"
                                    >
                                      More
                                    </span>
                                  </Dropdown>
                                </>
                              ) : (
                                <>
                                  <Dropdown
                                    overlay={timeStatus}
                                    trigger={["click"]}
                                  >
                                    <span
                                      onClick={() => {
                                        handleWaitTime(4);
                                      }}
                                      className=" cursor-pointer text_16 text-[#d0cfcf] underline"
                                    >
                                      More
                                    </span>
                                  </Dropdown>
                                </>
                              )}
                            </td>
                          </>
                        ) : (
                          <>
                            <td className="">
                              <input
                                type="time"
                                className={`input-time mx-auto ${
                                  errors.startTime && "input_error"
                                }`}
                                {...register("startTime", {
                                  required: "",
                                })}
                              />
                            </td>
                            <td className="text_16 py-6 ">
                              <input
                                type="time"
                                className={`input-time mx-auto ${
                                  errors.endTime && "input_error"
                                }`}
                                {...register("endTime", {
                                  required: "",
                                })}
                              />
                            </td>
                            <td className="text_16 py-6 ">
                              <span className="flex items-center justify-center">
                                <button
                                  type="submit"
                                  onClick={handleEditFri}
                                  className="table_short_btn mr-[13px] "
                                >
                                  {isLoadingFriday ? <SpinnerWhite /> : "Save"}
                                </button>
                                <button
                                  type="submit"
                                  onClick={() => setIsEditFriday(true)}
                                  className="table_short_white "
                                >
                                  Cancel
                                </button>
                              </span>
                            </td>
                          </>
                        )}
                      </tr>

                      {/* SATURDAY ROW */}
                      <tr className=" py-4  bg-[#ffffff]">
                        {timeList[5]?.status === "1" ? (
                          <>
                            <td className="text_16  py-6 capitalize">
                              Saturday
                            </td>
                          </>
                        ) : (
                          <>
                            <td className="text_16 text-[#d0cfcf] py-6 capitalize">
                              Saturday
                            </td>
                          </>
                        )}
                        {isEditSaturday ? (
                          <>
                            {timeList[5]?.status === "1" ? (
                              <>
                                <td className="text_16 py-6 ">
                                  {isLoadingTime
                                    ? "-"
                                    : moment(
                                        timeList[5]?.startTime,
                                        "HH:mm a"
                                      ).format("h:mm A")}
                                </td>
                                <td className="text_16 py-6 ">
                                  {isLoadingTime
                                    ? "-"
                                    : moment(
                                        timeList[5]?.endTime,
                                        "HH:mm a"
                                      ).format("h:mm A")}
                                </td>
                              </>
                            ) : (
                              <>
                                <td className="text_16 py-6 text-[#d0cfcf] ">
                                  {isLoadingTime
                                    ? "-"
                                    : moment(
                                        timeList[5]?.startTime,
                                        "HH:mm a"
                                      ).format("h:mm A")}
                                </td>
                                <td className="text_16 py-6 text-[#d0cfcf]">
                                  {isLoadingTime
                                    ? "-"
                                    : moment(
                                        timeList[5]?.endTime,
                                        "HH:mm a"
                                      ).format("h:mm A")}
                                </td>
                              </>
                            )}
                            <td className="text_16 py-6 underline">
                              {/* CHECK FOR STATUS */}
                              {timeList[5]?.status === "1" ? (
                                <>
                                  <Dropdown
                                    overlay={saturday}
                                    trigger={["click"]}
                                  >
                                    <span
                                      onClick={() => {
                                        handleWaitTime(5);
                                      }}
                                      className=" cursor-pointer text_16 underline"
                                    >
                                      More
                                    </span>
                                  </Dropdown>
                                </>
                              ) : (
                                <>
                                  <Dropdown
                                    overlay={timeStatus}
                                    trigger={["click"]}
                                  >
                                    <span
                                      onClick={() => {
                                        handleWaitTime(5);
                                      }}
                                      className=" cursor-pointer text_16 text-[#d0cfcf] underline"
                                    >
                                      More
                                    </span>
                                  </Dropdown>
                                </>
                              )}
                            </td>
                          </>
                        ) : (
                          <>
                            <td className="">
                              <input
                                type="time"
                                className={`input-time mx-auto ${
                                  errors.startTime && "input_error"
                                }`}
                                {...register("startTime", {
                                  required: "",
                                })}
                              />
                            </td>
                            <td className="text_16 py-6 ">
                              <input
                                type="time"
                                className={`input-time mx-auto ${
                                  errors.endTime && "input_error"
                                }`}
                                {...register("endTime", {
                                  required: "",
                                })}
                              />
                            </td>
                            <td className="text_16 py-6 ">
                              <span className="flex items-center justify-center">
                                <button
                                  type="submit"
                                  onClick={handleEditSat}
                                  className="table_short_btn mr-[13px] "
                                >
                                  {isLoadingSaturday ? (
                                    <SpinnerWhite />
                                  ) : (
                                    "Save"
                                  )}
                                </button>
                                <button
                                  type="submit"
                                  onClick={() => setIsEditSaturday(true)}
                                  className="table_short_white "
                                >
                                  Cancel
                                </button>
                              </span>
                            </td>
                          </>
                        )}
                      </tr>

                      {/* SUNDAY ROW */}
                      <tr className="border-t-[0.5px] border-[#d9d9d9] py-4  bg-[#ffffff]">
                        {timeList[6]?.status === "1" ? (
                          <>
                            <td className="text_16  py-6 capitalize">Sunday</td>
                          </>
                        ) : (
                          <>
                            <td className="text_16 text-[#d0cfcf] py-6 capitalize">
                              Sunday
                            </td>
                          </>
                        )}
                        {isEditSunday ? (
                          <>
                            {timeList[6]?.status === "1" ? (
                              <>
                                <td className="text_16 py-6 ">
                                  {isLoadingTime
                                    ? "-"
                                    : moment(
                                        timeList[6]?.startTime,
                                        "HH:mm a"
                                      ).format("h:mm A")}
                                </td>
                                <td className="text_16 py-6 ">
                                  {isLoadingTime
                                    ? "-"
                                    : moment(
                                        timeList[6]?.endTime,
                                        "HH:mm a"
                                      ).format("h:mm A")}
                                </td>
                              </>
                            ) : (
                              <>
                                <td className="text_16 py-6 text-[#d0cfcf] ">
                                  {isLoadingTime
                                    ? "-"
                                    : moment(
                                        timeList[6]?.startTime,
                                        "HH:mm a"
                                      ).format("h:mm A")}
                                </td>
                                <td className="text_16 py-6 text-[#d0cfcf]">
                                  {isLoadingTime
                                    ? "-"
                                    : moment(
                                        timeList[6]?.endTime,
                                        "HH:mm a"
                                      ).format("h:mm A")}
                                </td>
                              </>
                            )}
                            <td className="text_16 py-6 underline">
                              {/* CHECK FOR STATUS */}
                              {timeList[6]?.status === "1" ? (
                                <>
                                  <Dropdown
                                    overlay={sunday}
                                    trigger={["click"]}
                                  >
                                    <span
                                      onClick={() => {
                                        handleWaitTime(6);
                                      }}
                                      className=" cursor-pointer text_16 underline"
                                    >
                                      More
                                    </span>
                                  </Dropdown>
                                </>
                              ) : (
                                <>
                                  <Dropdown
                                    overlay={timeStatus}
                                    trigger={["click"]}
                                  >
                                    <span
                                      onClick={() => {
                                        handleWaitTime(6);
                                      }}
                                      className=" cursor-pointer text_16 text-[#d0cfcf] underline"
                                    >
                                      More
                                    </span>
                                  </Dropdown>
                                </>
                              )}
                            </td>
                          </>
                        ) : (
                          <>
                            <td className="">
                              <input
                                type="time"
                                className={`input-time mx-auto ${
                                  errors.startTime && "input_error"
                                }`}
                                {...register("startTime", {
                                  required: "",
                                })}
                              />
                            </td>
                            <td className="text_16 py-6 ">
                              <input
                                type="time"
                                className={`input-time mx-auto ${
                                  errors.endTime && "input_error"
                                }`}
                                {...register("endTime", {
                                  required: "",
                                })}
                              />
                            </td>
                            <td className="text_16 py-6 ">
                              <span className="flex items-center justify-center">
                                <button
                                  type="submit"
                                  onClick={handleEditSun}
                                  className="table_short_btn mr-[13px] "
                                >
                                  {isLoadingSunday ? <SpinnerWhite /> : "Save"}
                                </button>
                                <button
                                  type="submit"
                                  onClick={() => setIsEditSunday(true)}
                                  className="table_short_white "
                                >
                                  Cancel
                                </button>
                              </span>
                            </td>
                          </>
                        )}
                      </tr>
                    </tbody>
                  </table>
                </form>
              </div>

              <div className="text-[#6b6968] rounded-lg  bg-[#ffffff] w-full items-center mx-auto mt-6">
                <div className="py-10 px-10 grid  gap-6 xl:grid-cols-2 grid-cols-1">
                  <span class="text-base font-normal">
                    <h1 className="text_18">Link Switch</h1>
                    <p className="text_12 mt-2 text-[#6b6968] mb-4">
                      This will turn off the link even within on time
                    </p>
                    <div className="gray-bg flex items-center justify-between  md:w-[282px] w-[200px] rounded-[5px] p-5  ">
                      <h2 className="text_16 text-[#6b6968]">
                        Switch link on/off
                      </h2>
                      <ConfigProvider
                        theme={{
                          token: {
                            colorPrimary: "#F99762",
                            borderRadius: 2,
                            colorBgContainer: "#f6ffed",
                          },
                        }}
                      >
                        {isSwitchOn || switchIsOn === "1" ? (
                          <Switch defaultChecked onChange={onChange} />
                        ) : (
                          <Switch onChange={onChange} />
                        )}
                      </ConfigProvider>
                    </div>
                  </span>
                  <span class="text-base font-normal">
                    <h1 className="text_18">Preorder URL</h1>
                    <p className="text_12 mt-2 text-[#6b6968] mb-4">
                      Customize URL for your Customers
                    </p>
                    <form
                      onSubmit={handleSubmit(onSubmitPreOrder)}
                      className="flex"
                    >
                      <button className="text-[#000] md:py-[20px] py-4 mr-2 rounded-[5px] gray-bg  text_16 md:px-[32px] font-normal">
                        https://
                      </button>
                      <input
                        //placeholder={orderUrl ? orderUrl : "Enter Preorder url"}
                        placeholder= "Enter Preorder url"
                        className="bg-[#ffffff] border border-[#a6a5a4] hover:border-[#F99762]  focus:border-[#F99762] outline-none text-[#000000] placeholder-[#bdbdbd] rounded-lg block md:w-[204px] w-[170px] px-4 dark:placeholder-[#f99762] h-[64px]"
                        {...register("preOrderUrl")}
                      />
                      <button
                        type="submit"
                        className="gray-bg ml-2 px-6 md:py-[20px] py-4 rounded-[5px] text_16 text-[#000000] hover:bg-[#F99762] hover:text-[#ffffff]"
                      >
                        {isLoadingOrderUrl ? <SpinnerMediumWhite /> : "Save"}
                      </button>
                    </form>
                  </span>
                </div>

                <div class="mx-6 border-[0.5px] border-[#e0e0e0] "></div>
                <div className="py-10 px-10 grid  gap-6 xl:grid-cols-2 grid-cols-1">
                <span class="text-base font-normal">
                    <h1 className="text_18">Monitor Link</h1>
                    <p className="text_12 mt-2 text-[#6b6968] mb-4">
                      This will play on the monitor
                    </p>
                    <form
                      onSubmit={handleSubmit(onSubmitPreOrder)}
                      className="flex"
                    >
                      <button className="text-[#000000] md:py-[20px] py-4 mr-[2px] rounded-[5px] gray-bg  text_14 md:px-4 px-6 font-normal">
                      {`https://queue.appety.com.sg/display-tv/${monitorUrl}`}
                      </button>
                 
                      <button
                        type="submit"
                        className="gray-bg ml-2 px-6 md:py-[20px] py-4 rounded-[5px] text_16 text-[#000000] "
                      >
                         {copied ? (
                        <span
                          class="  cursor-pointer"
                          onClick={handleCopy}
                        >
                          <CopyIcon />
                        </span>
                      ) : (
                        <span
                          class=" cursor-pointer"
                          onClick={handleCopy}
                        >
                          <CopiedIcon />
                        </span>
                      )}
                      </button>
                    </form>
                  </span>
                  <span class="text-base font-normal">
                    <h1 className="text_18">Video Add URL</h1>
                    <p className="text_12 mt-2 text-[#6b6968] mb-4">
                      This will play on the monitor
                    </p>
                    <form
                      onSubmit={handleSubmit(onSubmitPreOrder)}
                      className="flex"
                    >
                      <button className="text-[#000] md:py-[20px] py-4 mr-2 rounded-[5px] gray-bg  text_16 md:px-[32px] font-normal">
                        https://
                      </button>
                      <input
                        placeholder="Enter Video url"
                        className="bg-[#ffffff] border border-[#a6a5a4] hover:border-[#F99762]  focus:border-[#F99762] outline-none text-[#000000] placeholder-[#bdbdbd] rounded-lg block md:w-[204px] w-[170px] px-4 dark:placeholder-[#8d8d8d] h-[64px]"
                        {...register("adsVideoUrl")}
                      />
                      <button
                        type="submit"
                        className="gray-bg ml-2 px-6 md:py-[20px] py-4 rounded-[5px] text_16 text-[#000000] hover:bg-[#F99762] hover:text-[#ffffff]"
                      >
                        {isLoadingVideoUrl ? <SpinnerMediumWhite /> : "Save"}
                      </button>
                    </form>
                  </span>
                </div>


                <div class="mx-6 border-[0.5px] border-[#e0e0e0]"></div>
                <div className="py-10 px-10 grid  gap-6 xl:grid-cols-2 grid-cols-1">
                  <span class="text-base font-normal">
                    <h1 className="text_18">QR Code</h1>
                    <p className="text_12 mt-2 text-[#6b6968] mb-4">
                      You can download the QR code below
                    </p>
                    <div className="flex">
                      <section>{qrcode}</section>
                      <section
                        className="top-[-2000%] absolute"
                        ref={exportRef}
                      >
                        {qrcodeBig}
                      </section>
                      <div className="pt-[95px] pl-2">
                        <span
                          onClick={() =>
                            exportAsImage(exportRef.current, "Appety")
                          }
                          className="cursor-pointer"
                        >
                          <DownLoadIcon />
                        </span>
                      </div>
                    </div>
                  </span>
                 
                </div>
              </div>
            </>
          )}
        </main>
      </Layout>

      {/* SHOW CANCEL QUEUE MODAL */}
      {showRemoveModal ? (
        <>
          <div className="fixed inset-0 z-30 flex items-center justify-center bg-[#858585] bg-opacity-75">
            <div className="bg-[#ffffff] rounded-[15px] shadow-lg p-[112px] w-[600px] relative">
              <div className="">
                <div className="flex justify-center items-center">
                  <RemoveQueueModalIcon />
                </div>
                <div className=" text-center ">
                  <p className="text-[32px] text-[#000000] font-semibold pt-3 pb-2">
                    Are you sure?
                  </p>
                  <p className="text_18 text-[#000000] pb-[84px]">
                    The Time will be deleted completely
                  </p>
                </div>
                <div className="flex justify-center items-center">
                  <button
                    onClick={closeModal}
                    type="submit"
                    className="short_btn mr-[24px]"
                  >
                    Go Back
                  </button>
                  <button
                    onClick={handleRemove}
                    type="submit"
                    className="short_btn_white"
                  >
                    {isLoadingRemove ? <SpinnerOrangeMedium /> : "Continue"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
};

export default LinkSettingsPage;
