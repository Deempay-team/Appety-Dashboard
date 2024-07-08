import { useState, useEffect, useRef } from "react";
import Layout from "../../../components/MerchantLayout";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useEditWaitType } from "../../../hooks/useMechant";
import storage from "../../../utils/storage";
import secrets from "../../../config/secrets";
import { SpinnerOrangeMedium, SpinnerWhite } from "../../../components/spinner/Spinner";
import Notify from "../../../components/Notification";

const column = ["Name", "Pax (Min)", "Pax (Max)", "Waiting Time (mins)", "Action"];

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
  const [isLoadingRemoveQ1, setIsLoadingRemoveQ1] = useState(false);
  const [isEditQ1, setIsEditQ1] = useState(true);
  const [isEditQ2, setIsEditQ2] = useState(true);
  const [isEditQ3, setIsEditQ3] = useState(true);
  const [isEditQ4, setIsEditQ4] = useState(true);
  const [isEditQ5, setIsEditQ5] = useState(true);
  const [isQ1DropDown, setIsQ1DropDown] = useState(false);
  const [isQ2DropDown, setIsQ2DropDown] = useState(false);
  const [isQ3DropDown, setIsQ3DropDown] = useState(false);
  const [isQ4DropDown, setIsQ4DropDown] = useState(false);
  const [isQ5DropDown, setIsQ5DropDown] = useState(false);
  const [isLoadingWaitType, setIsLoadingWaitType] = useState(false);
  const [editError, setEditError] = useState("");
  const [listIndex, setListIndex] = useState("0");

  //CALL TO UPDATE QUEUE
  const {
    isLoading: isLoadingEditWaitType,
    data,
    mutate: fetchEditWaitType,
  } = useEditWaitType({
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
    reset,
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
        setValue()
      }
    })
    .catch(function (error) {
      console.log("queryWaitType-error", error);
    });
  }

  //RETURN UPDATE API DATA
  useEffect(() => {
    if (data) {
      setIsLoadingEditQ1(false);

      setIsEditQ1(true);
      setIsQ1DropDown(false);
      setIsEditQ2(true);
      setIsQ2DropDown(false);
      setIsEditQ3(true);
      setIsQ3DropDown(false);
      setIsEditQ4(true);
      setIsQ4DropDown(false);
      setIsEditQ5(true);
      setIsQ5DropDown(false);
      queryUpdate();
      reset();
      Notify(
        "success",
        "Saved Succesfully!",
        "Your Queue has being updated!",
        5
      );
    }
  }, [data]);

  const handleWaitType = (index) => {
    setWaitTypeList(queueList);
    setListIndex(index)
    setMaxPax(queueList[index].maxPax)
    setMinPax(queueList[index].minPax)
    setEstimateTime(queueList[index].estimateTime)
  };

  // CALL UPDATE API
  useEffect(() => {
    if (minPax) {
    // fetchEditWaitType();
    }
  }, [minPax]);

  const handleEditQ1 = () => {
    setWaitTypeId(queueList[0]?.waitTypeId);
    setStatus("1");
    setWaitTypeName("Q1");
    setIsLoadingEditQ1(true);
  };

  const handleCancelQ1 = () => {
    setIsEditQ1(true);
      setIsQ1DropDown(false);
    // setWaitTypeId(queueList[0]?.waitTypeId);
    // setWaitTypeName("Q1");
    // setStatus("0");
    
  };

  const handleEditQ2 = () => {
    setWaitTypeId(queueList[1]?.waitTypeId);
    setStatus("1");
    setWaitTypeName("Q2");
  };

  const handleCancelQ2 = () => {
    // setWaitTypeId(queueList[1]?.waitTypeId);
    // setWaitTypeName("Q2");
    // setStatus("0");
    setIsEditQ2(true);
    setIsQ2DropDown(false);
  };

  const handleEditQ3 = () => {
    setWaitTypeId(queueList[2]?.waitTypeId);
    setStatus("1");
    setWaitTypeName("Q3");
  };

  const handleCancelQ3 = () => {
    // setWaitTypeId(queueList[2]?.waitTypeId);
    // setWaitTypeName("Q3");
    // setStatus("0");
    setIsEditQ3(true);
      setIsQ3DropDown(false);
  };

  const handleEditQ4 = () => {
    setWaitTypeId(queueList[3]?.waitTypeId);
    setStatus("1");
    setWaitTypeName("Q4");
  };

  const handleCancelQ4 = () => {
    // setWaitTypeId(queueList[3]?.waitTypeId);
    // setWaitTypeName("Q4");
    // setStatus("0");
    setIsEditQ4(true);
      setIsQ4DropDown(false);
  };

  const handleEditQ5 = () => {
    setWaitTypeId(queueList[4]?.waitTypeId);
    setStatus("1");
    setWaitTypeName("Q5");
  };

  const handleCancelQ5 = () => {
    // setWaitTypeId(queueList[4]?.waitTypeId);
    // setWaitTypeName("Q5");
    // setStatus("0");
     setIsEditQ5(true);
      setIsQ5DropDown(false);
  };

  const onSubmitHandler = (data) => {
    const { minPax, maxPax, estimateTime } = data;

    console.log("data", data);

    console.log("index", listIndex)

    console.log("waitTypeList", waitTypeList)


    if (maxPax <= minPax) {
      return setEditError(<section>Max Pax must be greater than Min Pax</section>);
    }
    if (listIndex === 0) {
      if (maxPax >= waitTypeList[listIndex + 1].minPax) {
        return setEditError(<section>Max Pax should be greater than Min Pax in {waitTypeList[listIndex + 1].waitTypeName}</section>);
      }
    }else if (listIndex > 0 &&  listIndex < waitTypeList[listIndex - 1].minPax) {
      if (maxPax >= waitTypeList[listIndex + 1].minPax) {
        return setEditError(<section>Max Pax should be greater than Min Pax in {waitTypeList[listIndex + 1].waitTypeName}</section>);
      }
      if (minPax <= waitTypeList[listIndex - 1].maxPax) {
        return setEditError(<section>Min Pax should be less or equal to {waitTypeList[listIndex - 1].waitTypeName}</section>);
      }
    }else if (listIndex === setWaitTypeList.length - 1) {
     if (minPax <= waitTypeList[listIndex - 1].maxPax) {
      return setEditError(<section>Min Pax should  not be greater than {waitTypeList[listIndex - 1].waitTypeName}</section>);
     }
    }  
    

    if (maxPax) {
      setMaxPax(maxPax);;
    }
    if (minPax) {
      setMinPax(minPax);
    }
    if (estimateTime) {
      setEstimateTime(estimateTime);
    }

    // setMaxPax(maxPax);
    // setMinPax(minPax);
    // setEstimateTime(estimateTime);
  }

  useEffect(() => {
    // setValue('fieldArray', [{ "maxPax":  }]);
      setValue("minPax", minPax);
      setValue("maxPax", maxPax);
      setValue("estimateTime", estimateTime);
  }, [minPax, maxPax]);



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
                        <td className="text_16 py-6 underline">
                          <span
                            onClick={() => {
                              setIsQ1DropDown(!isQ1DropDown);
                              handleWaitType(0);
                            }}
                            className="cursor-pointer reltive"
                          >
                            More
                          </span>
                          {isQ1DropDown ? (
                            <>
                              <div className="absolute right-[4%] xl:top-[22.5%] top-[28.5%] z-10 mt-2 w-[120px] origin-top-right divide-y divide-[#D9D9D9] rounded-md bg-[#ffffff] border border-[#D9D9D9] focus:outline-none">
                                <a href>
                                  <div
                                    onClick={() => setIsEditQ1(false)}
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
                                    {isLoadingRemoveQ1 ? <SpinnerOrangeMedium /> : "Remove"}
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
                              // pattern: {
                              //   value:
                              //     maxPax > queueList[0]?.minPax,
                              // },
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
                            onClick={handleEditQ1}
                            className="table_short_btn mr-[13px] "
                          >
                            Save
                          </button>
                          <button
                            type="submit"
                            onClick={handleCancelQ1}
                            className="table_short_white "
                          >
                            Cancel
                          </button>
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
                        <td className="text_16 py-6 underline">
                          <span
                            onClick={() => {
                              setIsQ2DropDown(!isQ2DropDown);
                              handleWaitType(1);
                            }}
                            class
                            className="cursor-pointer reltive"
                          >
                            More
                          </span>
                          {isQ2DropDown ? (
                            <>
                              <div className="absolute right-[4%] xl:top-[38%] top-[37%] z-10 mt-2 w-[120px] origin-top-right divide-y divide-[#D9D9D9] rounded-md bg-[#ffffff] border border-[#D9D9D9] focus:outline-none">
                                <a href>
                                  <div
                                    onClick={() => setIsEditQ2(false)}
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
                            onClick={handleEditQ2}
                            className="table_short_btn mr-[13px] "
                          >
                            Save
                          </button>
                          <button
                            type="submit"
                            onClick={handleCancelQ2}
                            className="table_short_white "
                          >
                            Cancel
                          </button>
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
                        <td className="text_16 py-6 underline">
                          <span
                               onClick={() => {
                                setIsQ3DropDown(!isQ3DropDown);
                                handleWaitType(2);
                              }}
                            className="cursor-pointer reltive"
                          >
                            More
                          </span>
                          {isQ3DropDown ? (
                            <>
                              <div className="absolute right-[4%] xl:top-[46.7%] top-[46%] z-10 mt-2 w-[120px] origin-top-right divide-y divide-[#D9D9D9] rounded-md bg-[#ffffff] border border-[#D9D9D9] focus:outline-none">
                                <a href>
                                  <div
                                    onClick={() => setIsEditQ3(false)}
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
                            onClick={handleEditQ3}
                            className="table_short_btn mr-[13px] "
                          >
                            Save
                          </button>
                          <button
                            type="submit"
                            onClick={handleCancelQ3}
                            className="table_short_white "
                          >
                            Cancel
                          </button>
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
                        <td className="text_16 py-6 underline">
                          <span
                             onClick={() => {
                              setIsQ4DropDown(!isQ4DropDown);
                              handleWaitType(3);
                            }}
                            className="cursor-pointer reltive"
                          >
                            More
                          </span>
                          {isQ4DropDown ? (
                            <>
                              <div className="absolute right-[4%] xl:top-[55.5%] top-[54%] z-10 mt-2 w-[120px] origin-top-right divide-y divide-[#D9D9D9] rounded-md bg-[#ffffff] border border-[#D9D9D9] focus:outline-none">
                                <a href>
                                  <div
                                    onClick={() => setIsEditQ4(false)}
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
                            onClick={handleEditQ4}
                            className="table_short_btn mr-[13px] "
                          >
                            Save
                          </button>
                          <button
                            type="submit"
                            onClick={handleCancelQ4}
                            className="table_short_white "
                          >
                            Cancel
                          </button>
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
                        <td className="text_16 py-6 underline">
                          <span
                             onClick={() => {
                              setIsQ5DropDown(!isQ5DropDown);
                              handleWaitType(4);
                            }}
                            className="cursor-pointer reltive"
                          >
                            More
                          </span>
                          {isQ5DropDown ? (
                            <>
                              <div className="absolute right-[4%] xl:top-[64.2%] top-[62.5%] z-10 mt-2 w-[120px] origin-top-right divide-y divide-[#D9D9D9] rounded-md bg-[#ffffff] border border-[#D9D9D9] focus:outline-none">
                                <a href>
                                  <div
                                    onClick={() => setIsEditQ5(false)}
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
                            onClick={handleEditQ5}
                            className="table_short_btn mr-[13px] "
                          >
                            Save
                          </button>
                          <button
                            type="submit"
                            onClick={handleCancelQ5}
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

          <div>
            <p className="mt-3 text_16 text-[#6B6968] font-normal">To edit the table above, please start from the bottom row (Q5)</p>
          </div>
          <div>
            <p className="mt-2 text_16 text-[red] font-normal">{editError}</p>
          </div>
        </main>
      </Layout>
    </>
  );
};

export default QueueSettingsPage;
