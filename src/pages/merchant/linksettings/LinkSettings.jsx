import { useState, useEffect, useRef } from "react";
import QRCode from "qrcode.react";
import { Switch } from "antd";
import axios from "axios";
import { useForm } from "react-hook-form";
import exportAsImage from "../../../components/exportAsImage";
import Layout from "../../../components/MerchantLayout";
import { DownLoadIcon } from "../../../assests/icons/Icons";
import { LinkSettingsTable } from "../../../components/LinkSettingsTable";
import storage from "../../../utils/storage";
import secrets from "../../../config/secrets";
import {
  SpinnerOrangeMedium,
  SpinnerWhite,
} from "../../../components/spinner/Spinner";

const column = ["Day", "Start Time", "End Time", "Action"];

const LinkSettingsPage = () => {
  const exportRef = useRef();
  const baseURL = secrets.baseURL;
  const [qrURL, setQrURL] = useState("https://pay.deempay.com/aypizza");
  const linkUrl = JSON.parse(storage.fetch("merchantDetails")).linkUrl;
  const [isEditMonday, setIsEditMonday] = useState(true);
  const [isEditTuesday, setIsEditTuesday] = useState(true);
  const [isEditWednesday, setIsEditWednesday] = useState(true);
  const [isEditThursday, setIsEditThursday] = useState(true);
  const [isEditFriday, setIsEditFriday] = useState(true);
  const [isEditSaturday, setIsEditSaturday] = useState(true);
  const [isEditSunday, setIsEditSunday] = useState(true);
  const [isMonDropDown, setIsMonDropDown] = useState(false);
  const [isTueDropDown, setIsTueDropDown] = useState(false);
  const [isWedDropDown, setIsWedDropDown] = useState(false);
  const [isThurDropDown, setIsThurDropDown] = useState(false);
  const [isFriDropDown, setIsFriDropDown] = useState(false);
  const [isSatDropDown, setIsSatDropDown] = useState(false);
  const [isSunDropDown, setIsSunDropDown] = useState(false);

  console.log("linkurl", linkUrl);

  // FORM VALIDATION
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const qrcode = (
    <QRCode
      id="qrCodeId"
      size={110}
      value={`http://localhost:3000/user/${linkUrl}`}
      bgColor="white"
      fqColor="black"
      level="M"
      // imageSettings={{
      //   src: logoUrl ? logoUrl : Logo,
      //   excavate: true,
      //   width: 40,
      //   height: 40,
      // }}
    />
  );

  const onChange = (checked) => {
    console.log(`switch to ${checked}`);
  };

  const handleEditMon = () => {
    setIsEditMonday(true);
    setIsMonDropDown(false);
  };

  const handleCancelMon = () => {
    setIsEditMonday(true);
    setIsMonDropDown(false);
  };

  const handleEditTue = () => {
    setIsEditTuesday(true);
    setIsTueDropDown(false);
  };

  const handleCancelTue = () => {
    setIsEditTuesday(true);
    setIsTueDropDown(false);
  };

  const handleEditWed = () => {
    setIsEditWednesday(true);
    setIsWedDropDown(false);
  };

  const handleCancelWed = () => {
    setIsEditWednesday(true);
    setIsWedDropDown(false);
  };

  const handleEditThur = () => {
    setIsEditThursday(true);
    setIsThurDropDown(false);
  };

  const handleCancelThur = () => {
    setIsEditThursday(true);
    setIsThurDropDown(false);
  };

  const handleEditFri = () => {
    setIsEditFriday(true);
    setIsFriDropDown(false);
  };

  const handleCancelFri = () => {
    setIsEditFriday(true);
    setIsFriDropDown(false);
  };

  const handleEditSat = () => {
    setIsEditSaturday(true);
    setIsSatDropDown(false);
  };

  const handleCancelSat = () => {
    setIsEditSaturday(true);
    setIsSatDropDown(false);
  };

  const handleEditSun = () => {
    setIsEditSunday(true);
    setIsSunDropDown(false);
  };

  const handleCancelSun = () => {
    setIsEditSunday(true);
    setIsSunDropDown(false);
  };

  const onSubmitHandler = (data) => {
    console.log("data", data);

    reset();
  };

  return (
    <>
      <Layout>
        <main className="sm:ml-[370px] ml-0 sm:px-10 px-6 bg-[#F6F7F9] h-screen">
          <h2 className="text_18 pb-4 pt-10">Queue Available Time</h2>

          <div className=" overflow-x-scroll overflow-y-hidden sm:overflow-x-auto sm:overflow-y-auto rounded-[10px]  ">
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
                  <tr className="border-y border-[#d9d9d9] py-4  bg-[#ffffff]">
                    <td className="text_16  py-6 capitalize">Monday</td>
                    {isEditMonday ? (
                      <>
                        <td className="text_16 py-6 ">10:00</td>
                        <td className="text_16 py-6 ">12:00</td>
                        <td className="text_16 py-6 underline">
                          <span
                            onClick={() => setIsMonDropDown(!isMonDropDown)}
                            className="cursor-pointer reltive"
                          >
                            More
                          </span>
                          {isMonDropDown ? (
                            <>
                              <div className="absolute right-[4%] xl:top-[29%] top-[28.5%] z-10 mt-2 w-[120px] origin-top-right divide-y divide-[#D9D9D9] rounded-md bg-[#ffffff] border border-[#D9D9D9] focus:outline-none">
                                <a href>
                                  <div
                                    onClick={() => setIsEditMonday(false)}
                                    className="py-3 text-center border-b "
                                  >
                                    <p className="cursor-pointer block px-4 py-2 text_16 text-[#33B469]">
                                      {/* {isLoadingEditQ1 ? <SpinnerWhite /> : "Edit"} */}
                                      Edit
                                    </p>
                                  </div>
                                </a>

                                <a href>
                                  <div className="py-3 text-center">
                                    <p className="cursor-pointer block px-4 py-2 text_16 text-[#ff0000]">
                                      Remove
                                    </p>
                                  </div>
                                </a>
                              </div>
                            </>
                          ) : null}
                        </td>
                      </>
                    ) : (
                      <>
                        <td className="">
                          <input
                            type="text"
                            //onChange={hasTypedMoreThan4Letter}
                            className={`input-short mx-auto ${
                              errors.minPax && "input_error"
                            }`}
                            {...register("minPax", {
                              required: "",
                              pattern: {
                                value: /^(?!(0))[0-9]+$/,
                              },
                            })}
                          />
                        </td>
                        <td className="text_16 py-6 ">
                          <input
                            type="text"
                            className={`input-short mx-auto ${
                              errors.estimateTime && "input_error"
                            }`}
                            {...register("estimateTime", {
                              required: "",
                            })}
                          />
                        </td>
                        <td className="text_16 py-6 ">
                          <button
                            type="submit"
                            onClick={handleEditMon}
                            className="table_short_btn mr-[13px] "
                          >
                            Save
                          </button>
                          <button
                            type="submit"
                            onClick={handleCancelMon}
                            className="table_short_white "
                          >
                            Cancel
                          </button>
                        </td>
                      </>
                    )}
                  </tr>

                  {/* TUESDAY ROW */}
                  <tr className="border-y border-[#d9d9d9] py-4  bg-[#ffffff]">
                    <td className="text_16  py-6 capitalize">
                      Tuesday
                    </td>
                    {isEditTuesday ? (
                      <>
                        <td className="text_16 py-6 ">
                          9:00
                        </td>
                        <td className="text_16 py-6 ">
                          4:00
                        </td>
                        <td className="text_16 py-6 underline">
                          <span
                            onClick={() => setIsTueDropDown(!isTueDropDown)}
                            className="cursor-pointer reltive"
                          >
                            More
                          </span>
                          {isTueDropDown ? (
                            <>
                              <div className="absolute right-[4%] xl:top-[38%] top-[37%] z-10 mt-2 w-[120px] origin-top-right divide-y divide-[#D9D9D9] rounded-md bg-[#ffffff] border border-[#D9D9D9] focus:outline-none">
                                <a href>
                                  <div
                                    onClick={() => setIsEditTuesday(false)}
                                    className="py-3 text-center border-b "
                                  >
                                    <p className="cursor-pointer block px-4 py-2 text_16 text-[#33B469]">
                                      Edit
                                    </p>
                                  </div>
                                </a>

                                <a href>
                                  <div className="py-3 text-center">
                                    <p className="cursor-pointer block px-4 py-2 text_16 text-[#ff0000]">
                                      Remove
                                    </p>
                                  </div>
                                </a>
                              </div>
                            </>
                          ) : null}
                        </td>
                      </>
                    ) : (
                      <>
                        <td className="">
                          <input
                            type="text"
                            className={`input-short mx-auto ${
                              errors.maxPax && "input_error"
                            }`}
                            {...register("maxPax", {
                              required: "",
                            })}
                          />
                        </td>
                        <td className="text_16 py-6 ">
                          <input
                            type="text"
                            className={`input-short mx-auto ${
                              errors.estimateTime && "input_error"
                            }`}
                            {...register("estimateTime", {
                              required: "",
                            })}
                          />
                        </td>
                        <td className="text_16 py-6 ">
                          <button
                            type="submit"
                            onClick={handleEditTue}
                            className="table_short_btn mr-[13px] "
                          >
                            Save
                          </button>
                          <button
                            type="submit"
                            onClick={handleCancelTue}
                            className="table_short_white "
                          >
                            Cancel
                          </button>
                        </td>
                      </>
                    )}
                  </tr>

                  {/* WEDNESDAY ROW */}
                  <tr className="border-y border-[#d9d9d9] py-4  bg-[#ffffff]">
                    <td className="text_16  py-6 capitalize">
                      Wednesday
                    </td>
                    {isEditWednesday ? (
                      <>
                        <td className="text_16 py-6 ">
                          12:00
                        </td>
                        <td className="text_16 py-6 ">
                          6:00
                        </td>
                        <td className="text_16 py-6 underline">
                          <span
                            onClick={() => setIsWedDropDown(!isWedDropDown)}
                            className="cursor-pointer reltive"
                          >
                            More
                          </span>
                          {isWedDropDown ? (
                            <>
                              <div className="absolute right-[4%] xl:top-[38%] top-[37%] z-10 mt-2 w-[120px] origin-top-right divide-y divide-[#D9D9D9] rounded-md bg-[#ffffff] border border-[#D9D9D9] focus:outline-none">
                                <a href>
                                  <div
                                    onClick={() => setIsEditWednesday(false)}
                                    className="py-3 text-center border-b "
                                  >
                                    <p className="cursor-pointer block px-4 py-2 text_16 text-[#33B469]">
                                      Edit
                                    </p>
                                  </div>
                                </a>

                                <a href>
                                  <div className="py-3 text-center">
                                    <p className="cursor-pointer block px-4 py-2 text_16 text-[#ff0000]">
                                      Remove
                                    </p>
                                  </div>
                                </a>
                              </div>
                            </>
                          ) : null}
                        </td>
                      </>
                    ) : (
                      <>
                        <td className="">
                          <input
                            type="text"
                            className={`input-short mx-auto ${
                              errors.maxPax && "input_error"
                            }`}
                            {...register("maxPax", {
                              required: "",
                            })}
                          />
                        </td>
                        <td className="text_16 py-6 ">
                          <input
                            type="text"
                            className={`input-short mx-auto ${
                              errors.estimateTime && "input_error"
                            }`}
                            {...register("estimateTime", {
                              required: "",
                            })}
                          />
                        </td>
                        <td className="text_16 py-6 ">
                          <button
                            type="submit"
                            onClick={handleEditWed}
                            className="table_short_btn mr-[13px] "
                          >
                            Save
                          </button>
                          <button
                            type="submit"
                            onClick={handleCancelWed}
                            className="table_short_white "
                          >
                            Cancel
                          </button>
                        </td>
                      </>
                    )}
                  </tr>

                  {/* THURSDAY ROW */}
                  <tr className="border-y border-[#d9d9d9] py-4  bg-[#ffffff]">
                    <td className="text_16  py-6 capitalize">
                      Thursday
                    </td>
                    {isEditThursday ? (
                      <>
                        <td className="text_16 py-6 ">
                          9:00
                        </td>
                        <td className="text_16 py-6 ">
                          9:00
                        </td>
                        <td className="text_16 py-6 underline">
                          <span
                            onClick={() => setIsThurDropDown(!isThurDropDown)}
                            className="cursor-pointer reltive"
                          >
                            More
                          </span>
                          {isThurDropDown ? (
                            <>
                              <div className="absolute right-[4%] xl:top-[38%] top-[37%] z-10 mt-2 w-[120px] origin-top-right divide-y divide-[#D9D9D9] rounded-md bg-[#ffffff] border border-[#D9D9D9] focus:outline-none">
                                <a href>
                                  <div
                                    onClick={() => setIsEditThursday(false)}
                                    className="py-3 text-center border-b "
                                  >
                                    <p className="cursor-pointer block px-4 py-2 text_16 text-[#33B469]">
                                      Edit
                                    </p>
                                  </div>
                                </a>

                                <a href>
                                  <div className="py-3 text-center">
                                    <p className="cursor-pointer block px-4 py-2 text_16 text-[#ff0000]">
                                      Remove
                                    </p>
                                  </div>
                                </a>
                              </div>
                            </>
                          ) : null}
                        </td>
                      </>
                    ) : (
                      <>
                        <td className="">
                          <input
                            type="text"
                            className={`input-short mx-auto ${
                              errors.maxPax && "input_error"
                            }`}
                            {...register("maxPax", {
                              required: "",
                            })}
                          />
                        </td>
                        <td className="text_16 py-6 ">
                          <input
                            type="text"
                            className={`input-short mx-auto ${
                              errors.estimateTime && "input_error"
                            }`}
                            {...register("estimateTime", {
                              required: "",
                            })}
                          />
                        </td>
                        <td className="text_16 py-6 ">
                          <button
                            type="submit"
                            onClick={handleEditThur}
                            className="table_short_btn mr-[13px] "
                          >
                            Save
                          </button>
                          <button
                            type="submit"
                            onClick={handleCancelThur}
                            className="table_short_white "
                          >
                            Cancel
                          </button>
                        </td>
                      </>
                    )}
                  </tr>

                  {/* FRIDAY ROW */}
                  <tr className="border-y border-[#d9d9d9] py-4  bg-[#ffffff]">
                    <td className="text_16  py-6 capitalize">
                      Friday
                    </td>
                    {isEditFriday ? (
                      <>
                        <td className="text_16 py-6 ">
                         7:00
                        </td>
                        <td className="text_16 py-6 ">
                         9:00
                        </td>
                        <td className="text_16 py-6 underline">
                          <span
                            onClick={() => setIsFriDropDown(!isFriDropDown)}
                            className="cursor-pointer reltive"
                          >
                            More
                          </span>
                          {isFriDropDown ? (
                            <>
                              <div className="absolute right-[4%] xl:top-[46.7%] top-[46%] z-10 mt-2 w-[120px] origin-top-right divide-y divide-[#D9D9D9] rounded-md bg-[#ffffff] border border-[#D9D9D9] focus:outline-none">
                                <a href>
                                  <div
                                    onClick={() => setIsEditFriday(false)}
                                    className="py-3 text-center border-b "
                                  >
                                    <p className="cursor-pointer block px-4 py-2 text_16 text-[#33B469]">
                                      Edit
                                    </p>
                                  </div>
                                </a>

                                <a href>
                                  <div className="py-3 text-center">
                                    <p className="cursor-pointer block px-4 py-2 text_16 text-[#ff0000]">
                                      Remove
                                    </p>
                                  </div>
                                </a>
                              </div>
                            </>
                          ) : null}
                        </td>
                      </>
                    ) : (
                      <>
                        <td className="">
                          <input
                            type="text"
                            className={`input-short mx-auto ${
                              errors.maxPax && "input_error"
                            }`}
                            {...register("maxPax", {
                              required: "",
                            })}
                          />
                        </td>
                        <td className="text_16 py-6 ">
                          <input
                            type="text"
                            className={`input-short mx-auto ${
                              errors.estimateTime && "input_error"
                            }`}
                            {...register("estimateTime", {
                              required: "",
                            })}
                          />
                        </td>
                        <td className="text_16 py-6 ">
                          <button
                            type="submit"
                            onClick={handleEditFri}
                            className="table_short_btn mr-[13px] "
                          >
                            Save
                          </button>
                          <button
                            type="submit"
                            onClick={handleCancelFri}
                            className="table_short_white "
                          >
                            Cancel
                          </button>
                        </td>
                      </>
                    )}
                  </tr>

                  {/* SATURDAY ROW */}
                  <tr className="border-y border-[#d9d9d9] py-4  bg-[#ffffff]">
                    <td className="text_16  py-6 capitalize">
                      Saturday
                    </td>
                    {isEditSaturday ? (
                      <>
                        <td className="text_16 py-6 ">
                          12:00
                        </td>
                        <td className="text_16 py-6 ">
                          1:00
                        </td>
                        <td className="text_16 py-6 underline">
                          <span
                            onClick={() => setIsSatDropDown(!isSatDropDown)}
                            className="cursor-pointer reltive"
                          >
                            More
                          </span>
                          {isSatDropDown ? (
                            <>
                              <div className="absolute right-[4%] xl:top-[55.5%] top-[54%] z-10 mt-2 w-[120px] origin-top-right divide-y divide-[#D9D9D9] rounded-md bg-[#ffffff] border border-[#D9D9D9] focus:outline-none">
                                <a href>
                                  <div
                                    onClick={() => setIsEditSaturday(false)}
                                    className="py-3 text-center border-b "
                                  >
                                    <p className="cursor-pointer block px-4 py-2 text_16 text-[#33B469]">
                                      Edit
                                    </p>
                                  </div>
                                </a>

                                <a href>
                                  <div className="py-3 text-center">
                                    <p className="cursor-pointer block px-4 py-2 text_16 text-[#ff0000]">
                                      Remove
                                    </p>
                                  </div>
                                </a>
                              </div>
                            </>
                          ) : null}
                        </td>
                      </>
                    ) : (
                      <>
                        <td className="">
                          <input
                            type="text"
                            className={`input-short mx-auto ${
                              errors.minPax && "input_error"
                            }`}
                            {...register("minPax", {
                              required: "",
                            })}
                          />
                        </td>
                        <td className="text_16 py-6 ">
                          <input
                            type="text"
                            className={`input-short mx-auto ${
                              errors.estimateTime && "input_error"
                            }`}
                            {...register("estimateTime", {
                              required: "",
                            })}
                          />
                        </td>
                        <td className="text_16 py-6 ">
                          <button
                            type="submit"
                            onClick={handleEditSat}
                            className="table_short_btn mr-[13px] "
                          >
                            Save
                          </button>
                          <button
                            type="submit"
                            onClick={handleCancelSat}
                            className="table_short_white "
                          >
                            Cancel
                          </button>
                        </td>
                      </>
                    )}
                  </tr>

                  {/* SUNDAY ROW */}
                  <tr className="border-y border-[#d9d9d9] py-4  bg-[#ffffff]">
                    <td className="text_16  py-6 capitalize">
                      Sunday
                    </td>
                    {isEditSunday ? (
                      <>
                        <td className="text_16 py-6 ">
                          9:00
                        </td>
                        <td className="text_16 py-6 ">
                          2:00
                        </td>
                        <td className="text_16 py-6 underline">
                          <span
                            onClick={() => setIsSunDropDown(!isSunDropDown)}
                            className="cursor-pointer reltive"
                          >
                            More
                          </span>
                          {isSunDropDown ? (
                            <>
                              <div className="absolute right-[4%] xl:top-[64.2%] top-[62.5%] z-10 mt-2 w-[120px] origin-top-right divide-y divide-[#D9D9D9] rounded-md bg-[#ffffff] border border-[#D9D9D9] focus:outline-none">
                                <a href>
                                  <div
                                    onClick={() => setIsEditSunday(false)}
                                    className="py-3 text-center border-b "
                                  >
                                    <p className="cursor-pointer block px-4 py-2 text_16 text-[#33B469]">
                                      Edit
                                    </p>
                                  </div>
                                </a>

                                <a href>
                                  <div className="py-3 text-center">
                                    <p className="cursor-pointer block px-4 py-2 text_16 text-[#ff0000]">
                                      Remove
                                    </p>
                                  </div>
                                </a>
                              </div>
                            </>
                          ) : null}
                        </td>
                      </>
                    ) : (
                      <>
                        <td className="">
                          <input
                            type="text"
                            className={`input-shorter mx-auto ${
                              errors.minPax && "input_error"
                            }`}
                            {...register("minPax", {
                              required: "",
                            })}
                          />
                        </td>
                        <td className="">
                          <input
                            type="text"
                            className={`input-shorter mx-auto ${
                              errors.maxPax && "input_error"
                            }`}
                            {...register("maxPax", {
                              required: "",
                            })}
                          />
                        </td>
                        <td className="text_16 py-6 ">
                          <input
                            type="text"
                            className={`input-short mx-auto ${
                              errors.estimateTime && "input_error"
                            }`}
                            {...register("estimateTime", {
                              required: "",
                            })}
                          />
                        </td>
                        <td className="text_16 py-6 ">
                          <button
                            type="submit"
                            onClick={handleEditSun}
                            className="table_short_btn mr-[13px] "
                          >
                            Save
                          </button>
                          <button
                            type="submit"
                            onClick={handleCancelSun}
                            className="table_short_white "
                          >
                            Cancel
                          </button>
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
                  <h2 className="text_16 text-[#6b6968]">Switch link on/off</h2>
                  <Switch onChange={onChange} />
                </div>
              </span>
              <span class="text-base font-normal">
                <h1 className="text_18">Call Back URL</h1>
                <p className="text_12 mt-2 text-[#6b6968] mb-4">
                  Customize your URL
                </p>
                <div className="flex">
                  <button className="text-[#000] md:py-[22px] py-4 mr-2 rounded-[5px] gray-bg w-[148px] text_14 md:px-0 px-2 font-normal">
                    Appety.com
                  </button>
                  <input
                    placeholder="Enter Call Back URL"
                    className="bg-[#ffffff] border border-[#a6a5a4] text-[#000000] placeholder-[#bdbdbd] rounded-lg block md:w-[204px] w-[170px] px-4 dark:placeholder-[#8d8d8d] h-[64px]"
                  />
                </div>
              </span>
            </div>

            <div class="mx-6 border-[0.5px] border-[#e0e0e0]"></div>
            <div className="py-10 px-10 flex">
              <span class="text-base font-normal">
                <h1 className="text_18">QR Code</h1>
                <p className="text_12 mt-2 text-[#6b6968] mb-4">
                  You can download the QR code below
                </p>
                <div className="flex">
                  <section ref={exportRef}>{qrcode}</section>
                  <div className="pt-[95px] pl-2">
                    <span
                      onClick={() => exportAsImage(exportRef.current, "Appety")}
                      className="cursor-pointer"
                    >
                      <DownLoadIcon />
                    </span>
                  </div>
                </div>
              </span>
            </div>
          </div>
        </main>
      </Layout>
    </>
  );
};

export default LinkSettingsPage;
