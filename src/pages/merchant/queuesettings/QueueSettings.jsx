import { useState, useEffect } from "react";
import Layout from "../../../components/MerchantLayout";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useEditWaitType } from "../../../hooks/useMechant";
import storage from "../../../utils/storage";
import secrets from "../../../config/secrets";
import { RemoveQueueModalIcon } from "../../../assests/icons/Icons";
import {
  SpinnerOrangeMedium,
  SpinnerWhite,
} from "../../../components/spinner/Spinner";
import Notify from "../../../components/Notification";
import { Dropdown, Menu } from "antd";

const column = [
  "Name",
  "Pax (Min)",
  "Pax (Max)",
  "Waiting Time (mins)",
  "Action",
];

const QueueSettingsPage = () => {
  const merchId = JSON.parse(storage.fetch("userDetails")).userId;
  const baseURL = secrets.baseURL;
  const [minPax, setMinPax] = useState("");
  const [maxPax, setMaxPax] = useState("");
  const [waitTypeId, setWaitTypeId] = useState("");
  const [waitTypeName, setWaitTypeName] = useState("");
  const [estimateTime, setEstimateTime] = useState("");
  const [status, setStatus] = useState("1");
  const [queueList, setQueueList] = useState([]);
  const [waitTypeList, setWaitTypeList] = useState([]);
  const [isLoadingEditQ1, setIsLoadingEditQ1] = useState(false);
  const [isLoadingEditQ2, setIsLoadingEditQ2] = useState(false);
  const [isLoadingEditQ3, setIsLoadingEditQ3] = useState(false);
  const [isLoadingEditQ4, setIsLoadingEditQ4] = useState(false);
  const [isLoadingEditQ5, setIsLoadingEditQ5] = useState(false);
  const [isLoadingRemove, setIsLoadingRemove] = useState(false);
  const [isEditQ1, setIsEditQ1] = useState(true);
  const [isEditQ2, setIsEditQ2] = useState(true);
  const [isEditQ3, setIsEditQ3] = useState(true);
  const [isEditQ4, setIsEditQ4] = useState(true);
  const [isEditQ5, setIsEditQ5] = useState(true);
  const [isLoadingWaitType, setIsLoadingWaitType] = useState(false);
  const [editError, setEditError] = useState("");
  const [listIndex, setListIndex] = useState("0");
  const [showRemoveModal, setShowRemoveModal] = useState(false);

  const openRemoveModal = (index) => {
    setShowRemoveModal(true);
    setStatus("0")
  };

  const one = (
    <Menu className="grid items-center justify-center">
      <span
        onClick={() => setIsEditQ1(false)}
        className="cursor-pointer block px-8 py-4 text_16 text-[#33B469]"
      >
        Edit
      </span>
      <div class="border-[1px] border-[#e0e0e0]"></div>
      <span
        onClick={openRemoveModal}
        className="cursor-pointer block px-8 py-4 text_16 text-[#ff0000]"
      >
        Remove
      </span>
    </Menu>
  );

  const second = (
    <Menu className="grid items-center justify-center">
      <span
        onClick={() => setIsEditQ2(false)}
        className="cursor-pointer block px-8 py-4 text_16 text-[#33B469]"
      >
        Edit
      </span>
      <div class="border-[1px] border-[#e0e0e0]"></div>
      <span
        onClick={openRemoveModal}
        className="cursor-pointer block px-8 py-4 text_16 text-[#ff0000]"
      >
        Remove
      </span>
    </Menu>
  );

  const three = (
    <Menu className="grid items-center justify-center">
      <span
        onClick={() => setIsEditQ3(false)}
        className="cursor-pointer block px-8 py-4 text_16 text-[#33B469]"
      >
        Edit
      </span>
      <div class="border-[1px] border-[#e0e0e0]"></div>
      <span
        onClick={openRemoveModal}
        className="cursor-pointer block px-8 py-4 text_16 text-[#ff0000]"
      >
        Remove
      </span>
    </Menu>
  );

  const four = (
    <Menu className="grid items-center justify-center">
      <span
        onClick={() => setIsEditQ4(false)}
        className="cursor-pointer block px-8 py-4 text_16 text-[#33B469]"
      >
        Edit
      </span>
      <div class="border-[1px] border-[#e0e0e0]"></div>
      <span
        onClick={openRemoveModal}
        className="cursor-pointer block px-8 py-4 text_16 text-[#ff0000]"
      >
        Remove
      </span>
    </Menu>
  );

  const five = (
    <Menu className="grid items-center justify-center">
      <span
        onClick={() => setIsEditQ5(false)}
        className="cursor-pointer block px-8 py-4 text_16 text-[#33B469]"
      >
        Edit
      </span>
      <div class="border-[1px] border-[#e0e0e0]"></div>
      <span
        onClick={openRemoveModal}
        className="cursor-pointer block px-8 py-4 text_16 text-[#ff0000]"
      >
        Remove
      </span>
    </Menu>
  );

  //CALL TO UPDATE QUEUE
  const { data, mutate: fetchEditWaitType } = useEditWaitType({
    merchId,
    waitTypeId,
    minPax,
    maxPax,
    waitTypeName,
    status,
    estimateTime,
  });

  // FORM VALIDATION
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  //CALL QUERY WAITTYPE API
  useEffect(() => {
    setIsLoadingWaitType(true);
    axios
      .get(`${baseURL}/api/v1/wait/type/query/${merchId}`)
      .then(function (res) {
        if (res.data.code === "000000") {
          setIsLoadingWaitType(false);
          const queryData = res.data.data;
          setQueueList(queryData);
        }
      })
      .catch(function (error) {
        console.log("queryWaitType-error", error);
      });
  }, []);

  //CALL QUERY WAITTYPE API TO UPDATE STATE
  const queryUpdate = () => {
    axios
      .get(`${baseURL}/api/v1/wait/type/query/${merchId}`)
      .then(function (res) {
        if (res.data.code === "000000") {
          setIsLoadingWaitType(false);
          const queryData = res.data.data;
          setQueueList(queryData);
          setValue();
        }
      })
      .catch(function (error) {
        console.log("queryWaitType-error", error);
      });
  };

  //RETURN UPDATE API DATA
  useEffect(() => {
    if (data) {
      setIsLoadingEditQ1(false);
      setIsLoadingEditQ2(false);
      setIsLoadingEditQ3(false);
      setIsLoadingEditQ4(false);
      setIsLoadingEditQ5(false);
      setIsLoadingRemove(false);

      setIsEditQ1(true);
      setIsEditQ2(true);
      setIsEditQ3(true);
      setIsEditQ4(true);
      setIsEditQ5(true);
      queryUpdate();
      closeModal();
      Notify(
        "success",
        "Your Queue has being updated Successfully!",
      );
      setWaitTypeName("")
    }
  }, [data]);

  const handleWaitType = (index) => {
    setWaitTypeList(queueList);
    setListIndex(index);
    setMaxPax(queueList[index].maxPax);
    setMinPax(queueList[index].minPax);
    setEstimateTime(queueList[index].estimateTime);
  };

  //TO REMOVE WAIT-TYPE
  const handleRemove = () => {
      setStatus("0");
      setWaitTypeId(queueList[listIndex]?.waitTypeId);
      setWaitTypeName(queueList[listIndex]?.waitTypeName);
      setMaxPax(queueList[listIndex]?.maxPax);
      setMinPax(queueList[listIndex]?.minPax);
      setEstimateTime(queueList[listIndex]?.estimateTime);
      setIsLoadingRemove(true);
  };

  // CALL UPDATE API
  useEffect(() => {
    if (minPax && waitTypeName) {
      fetchEditWaitType();
    }
  }, [minPax, waitTypeName]);

  const handleEditQ1 = () => {
    setWaitTypeId(queueList[0]?.waitTypeId);
    setStatus("1");
    setWaitTypeName("Q1");
    setIsLoadingEditQ1(true);
  };

  const handleEditQ2 = () => {
    setWaitTypeId(queueList[1]?.waitTypeId);
    setStatus("1");
    setWaitTypeName("Q2");
    setIsLoadingEditQ2(true);
  };

  const handleEditQ3 = () => {
    setWaitTypeId(queueList[2]?.waitTypeId);
    setStatus("1");
    setWaitTypeName("Q3");
    setIsLoadingEditQ3(true);
  };

  const handleEditQ4 = () => {
    setWaitTypeId(queueList[3]?.waitTypeId);
    setStatus("1");
    setWaitTypeName("Q4");
    setIsLoadingEditQ4(true);
  };

  const handleEditQ5 = () => {
    setWaitTypeId(queueList[4]?.waitTypeId);
    setStatus("1");
    setWaitTypeName("Q5");
    setIsLoadingEditQ5(true);
  };

  const addBack = () => {
      setStatus("1");
      setWaitTypeId(queueList[listIndex]?.waitTypeId);
      setWaitTypeName(queueList[listIndex]?.waitTypeName);
      setMaxPax(queueList[listIndex]?.maxPax);
      setMinPax(queueList[listIndex]?.minPax);
      setEstimateTime(queueList[listIndex]?.estimateTime);
      setIsLoadingRemove(true);
  };

  const queueStatus = (
    <Menu className="grid items-center justify-center">
      <span
        onClick={addBack}
        className="cursor-pointer block px-8 py-4 text_16 text-[#000000]"
      >
        Add Back
      </span>
    </Menu>
  );

  const onSubmitHandler = (data) => {
    const { minPax, maxPax, estimateTime } = data;
   if (maxPax <= minPax) {
      return setEditError(
        <section>Max Pax must be greater than Min Pax</section>
      );
    }
    if (listIndex === 0) {
      if (maxPax >= waitTypeList[listIndex + 1].minPax) {
        return setEditError(
          <section>
            Max Pax should be greater than Min Pax in{" "}
            {waitTypeList[listIndex + 1].waitTypeName}
          </section>
        );
      }
    } else if (
      listIndex > 0 &&
      listIndex < waitTypeList[listIndex - 1].minPax
    ) {
      if (maxPax >= waitTypeList[listIndex + 1].minPax) {
        return setEditError(
          <section>
            Max Pax should be greater than Min Pax in{" "}
            {waitTypeList[listIndex + 1].waitTypeName}
          </section>
        );
      }
      if (minPax <= waitTypeList[listIndex - 1].maxPax) {
        return setEditError(
          <section>
            Min Pax should be less or equal to{" "}
            {waitTypeList[listIndex - 1].waitTypeName}
          </section>
        );
      }
    } else if (listIndex === setWaitTypeList.length - 1) {
      if (minPax <= waitTypeList[listIndex - 1].maxPax) {
        return setEditError(
          <section>
            Min Pax should not be greater than{" "}
            {waitTypeList[listIndex - 1].waitTypeName}
          </section>
        );
      }
    }

    if (maxPax) {
      setMaxPax(maxPax);
    }
    if (minPax) {
      setMinPax(minPax);
    }
    if (estimateTime) {
      setEstimateTime(estimateTime);
    }
  };

  useEffect(() => {
    setValue("minPax", minPax);
    setValue("maxPax", maxPax);
    setValue("estimateTime", estimateTime);
  }, [minPax, maxPax]);

  const closeModal = () => {
    setShowRemoveModal(false);
    setStatus("1")
  };

  return (
    <>
      <Layout className="bg-[red]">
        <main className="xl:ml-[370px] ml-[320px] px-10 pt-10 bg-[#F6F7F9] h-screen">
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
                  {/* Q1 ROW */}
                  <tr className="border-y border-[#d9d9d9] py-4  bg-[#ffffff]">
                    <td className="text_16  py-6 capitalize">
                      {isLoadingWaitType ? "Q1" : queueList[0]?.waitTypeName}
                    </td>
                    {isEditQ1 ? (
                      <>
                        <td className="text_16 py-6 ">
                          {isLoadingWaitType ? "-" : queueList[0]?.minPax}
                        </td>
                        <td className="text_16 py-6 ">
                          {isLoadingWaitType ? "-" : queueList[0]?.maxPax}
                        </td>
                        <td className="text_16 py-6 ">
                          {isLoadingWaitType
                            ? "-"
                            : queueList[0]?.estimateTime + " mins"}
                        </td>
                        <td className="text_16 py-6 ">
                          {/* CHECK FOR STATUS */}
                        {queueList[0]?.status === "1" ? 
                          <>
                            <Dropdown overlay={one} trigger={["click"]}>
                            <span
                              onClick={() => {
                                handleWaitType(0);
                              }}
                              className=" cursor-pointer text_16 underline"
                            >
                              More
                            </span>
                          </Dropdown>
                          </> : 
                          <>
                            <Dropdown overlay={queueStatus} trigger={["click"]}>
                            <span
                              onClick={() => {
                                handleWaitType(0);
                              }}
                              className=" cursor-pointer text_16 underline"
                            >
                              More
                            </span>
                          </Dropdown>
                          </>}
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
                              pattern: {
                                value: /^(?!(0))[0-9]+$/,
                              },
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
                          <span className="flex items-center justify-center">
                            <button
                              type="submit"
                              onClick={handleEditQ1}
                              className="table_short_btn mr-[13px]"
                            >
                              {isLoadingEditQ1 ? <SpinnerWhite /> : "Save"}
                            </button>
                            <button
                              type="submit"
                              onClick={() => setIsEditQ1(true)}
                              className="table_short_white "
                            >
                              Cancel
                            </button>
                          </span>
                        </td>
                      </>
                    )}
                  </tr>

                  {/* Q2 ROW */}
                  <tr className="border-y border-[#d9d9d9] py-4  bg-[#ffffff]">
                    <td className="text_16  py-6 capitalize">
                      {" "}
                      {isLoadingWaitType ? "Q2" : queueList[1]?.waitTypeName}
                    </td>
                    {isEditQ2 ? (
                      <>
                        <td className="text_16 py-6 ">
                          {isLoadingWaitType ? "-" : queueList[1]?.minPax}
                        </td>
                        <td className="text_16 py-6 ">
                          {isLoadingWaitType ? "-" : queueList[1]?.maxPax}
                        </td>
                        <td className="text_16 py-6 ">
                          {" "}
                          {isLoadingWaitType
                            ? "-"
                            : queueList[1]?.estimateTime + " mins"}
                        </td>
                        <td className="text_16 py-6 ">
                            {/* CHECK FOR STATUS */}
                            {queueList[1]?.status === "1" ? 
                          <>
                            <Dropdown overlay={second} trigger={["click"]}>
                            <span
                              onClick={() => {
                                handleWaitType(1);
                              }}
                              className=" cursor-pointer text_16 underline"
                            >
                              More
                            </span>
                          </Dropdown>
                          </> : 
                          <>
                            <Dropdown overlay={queueStatus} trigger={["click"]}>
                            <span
                              onClick={() => {
                                handleWaitType(1);
                              }}
                              className=" cursor-pointer text_16 underline"
                            >
                              More
                            </span>
                          </Dropdown>
                          </>}
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
                          <span className="flex items-center justify-center">
                            <button
                              type="submit"
                              onClick={handleEditQ2}
                              className="table_short_btn mr-[13px] "
                            >
                              {isLoadingEditQ2 ? <SpinnerWhite /> : "Save"}
                            </button>
                            <button
                              type="submit"
                              onClick={() => setIsEditQ2(true)}
                              className="table_short_white "
                            >
                              Cancel
                            </button>
                          </span>
                        </td>
                      </>
                    )}
                  </tr>

                  {/* Q3 ROW */}
                  <tr className="border-y border-[#d9d9d9] py-4  bg-[#ffffff]">
                    <td className="text_16  py-6 capitalize">
                      {isLoadingWaitType ? "Q3" : queueList[2]?.waitTypeName}
                    </td>
                    {isEditQ3 ? (
                      <>
                        <td className="text_16 py-6 ">
                          {isLoadingWaitType ? "-" : queueList[2]?.minPax}
                        </td>
                        <td className="text_16 py-6 ">
                          {isLoadingWaitType ? "-" : queueList[2]?.maxPax}
                        </td>
                        <td className="text_16 py-6 ">
                          {" "}
                          {isLoadingWaitType
                            ? "-"
                            : queueList[2]?.estimateTime + " mins"}
                        </td>
                        <td className="text_16 py-6 ">
                          {/* CHECK FOR STATUS */}
                          {queueList[2]?.status === "1" ? 
                          <>
                            <Dropdown overlay={three} trigger={["click"]}>
                            <span
                              onClick={() => {
                                handleWaitType(2);
                              }}
                              className=" cursor-pointer text_16 underline"
                            >
                              More
                            </span>
                          </Dropdown>
                          </> : 
                          <>
                            <Dropdown overlay={queueStatus} trigger={["click"]}>
                            <span
                              onClick={() => {
                                handleWaitType(2);
                              }}
                              className=" cursor-pointer text_16 underline"
                            >
                              More
                            </span>
                          </Dropdown>
                          </>}
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
                          <span className="flex items-center justify-center">
                            <button
                              type="submit"
                              onClick={handleEditQ3}
                              className="table_short_btn mr-[13px] "
                            >
                              {isLoadingEditQ3 ? <SpinnerWhite /> : "Save"}
                            </button>
                            <button
                              type="submit"
                              onClick={() => setIsEditQ3(true)}
                              className="table_short_white "
                            >
                              Cancel
                            </button>
                          </span>
                        </td>
                      </>
                    )}
                  </tr>

                  {/* Q4 ROW */}

                  <tr className="border-y border-[#d9d9d9] py-4  bg-[#ffffff]">
                    <td className="text_16  py-6 capitalize">
                      {isLoadingWaitType ? "Q4" : queueList[3]?.waitTypeName}
                    </td>
                    {isEditQ4 ? (
                      <>
                        <td className="text_16 py-6 ">
                          {isLoadingWaitType ? "-" : queueList[3]?.minPax}
                        </td>
                        <td className="text_16 py-6 ">
                          {isLoadingWaitType ? "-" : queueList[3]?.maxPax}
                        </td>
                        <td className="text_16 py-6 ">
                          {" "}
                          {isLoadingWaitType
                            ? "-"
                            : queueList[3]?.estimateTime + " mins"}
                        </td>
                        <td className="text_16 py-6 ">
                          {/* CHECK FOR STATUS */}
                          {queueList[3]?.status === "1" ? 
                          <>
                            <Dropdown overlay={four} trigger={["click"]}>
                            <span
                              onClick={() => {
                                handleWaitType(3);
                              }}
                              className=" cursor-pointer text_16 underline"
                            >
                              More
                            </span>
                          </Dropdown>
                          </> : 
                          <>
                            <Dropdown overlay={queueStatus} trigger={["click"]}>
                            <span
                              onClick={() => {
                                handleWaitType(3);
                              }}
                              className=" cursor-pointer text_16 underline"
                            >
                              More
                            </span>
                          </Dropdown>
                          </>}
                        
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
                          <span className="flex items-center justify-center">
                            <button
                              type="submit"
                              onClick={handleEditQ4}
                              className="table_short_btn mr-[13px] "
                            >
                              {isLoadingEditQ4 ? <SpinnerWhite /> : "Save"}
                            </button>
                            <button
                              type="submit"
                              onClick={() => setIsEditQ4(true)}
                              className="table_short_white "
                            >
                              Cancel
                            </button>
                          </span>
                        </td>
                      </>
                    )}
                  </tr>

                  {/* Q5 ROW */}
                  <tr className="border-y border-[#d9d9d9] py-4  bg-[#ffffff]">
                    <td className="text_16  py-6 capitalize">
                      {isLoadingWaitType ? "Q5" : queueList[4]?.waitTypeName}
                    </td>
                    {isEditQ5 ? (
                      <>
                        <td className="text_16 py-6 ">
                          {isLoadingWaitType ? "-" : queueList[4]?.minPax}
                        </td>
                        <td className="text_16 py-6 ">
                          {isLoadingWaitType ? "-" : queueList[4]?.maxPax}
                        </td>
                        <td className="text_16 py-6 ">
                          {" "}
                          {isLoadingWaitType
                            ? "-"
                            : queueList[4]?.estimateTime + " mins"}
                        </td>
                        <td className="text_16 py-6 ">
                         {/* CHECK FOR STATUS */}
                         {queueList[4]?.status === "1" ? 
                          <>
                            <Dropdown overlay={five} trigger={["click"]}>
                            <span
                              onClick={() => {
                                handleWaitType(4);
                              }}
                              className=" cursor-pointer text_16 underline"
                            >
                              More
                            </span>
                          </Dropdown>
                          </> : 
                          <>
                            <Dropdown overlay={queueStatus} trigger={["click"]}>
                            <span
                              onClick={() => {
                                handleWaitType(4);
                              }}
                              className=" cursor-pointer text_16 underline"
                            >
                              More
                            </span>
                          </Dropdown>
                          </>}
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
                          <span className="flex items-center justify-center">
                            <button
                              type="submit"
                              onClick={handleEditQ5}
                              className="table_short_btn mr-[13px] "
                            >
                              {isLoadingEditQ5 ? <SpinnerWhite /> : "Save"}
                            </button>
                            <button
                              type="submit"
                              onClick={() => setIsEditQ5(true)}
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

          <div>
            <p className="mt-3 text_16 text-[#6B6968] font-normal">
              To edit the table above, please start from the bottom row (Q5)
            </p>
          </div>
          <div>
            <p className="mt-2 text_16 text-[red] font-normal">{editError}</p>
          </div>
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
                    The queue will be deleted completely
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

export default QueueSettingsPage;
