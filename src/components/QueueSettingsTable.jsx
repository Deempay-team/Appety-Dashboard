import React, { useState, useEffect } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { CloseModalIcon, RemoveQueueModalIcon } from "../assests/icons/Icons";

//import { Notify } from "../../components/notification";

export const QueueSettingsTable = ({ column, data, link }) => {
  const [showEditModal, setShowEditModal] = useState(false);
  const [showRemoveModal, setShowRemoveModal] = useState(false);

  const {
    register,
    handleSubmit,
    resetField,
    reset,
    setValue,
    control,
    formState: { errors },
  } = useForm({
    // defaultValues: {
    //   field: [{ className: "", classCategory: "" }],
    //   fieldFee: [{ feeName: "", feeAmount: "", feeDescription: "" }],
    //   fieldClass: [{ className: "", classCategory: "" }],
    // },
  });

  const closeModal = () => {
    setShowEditModal(false);
    setShowRemoveModal(false);
  };

  const showRemove = () => {
    setShowRemoveModal(true);
  };

  //SUBMIT USER DATA
  const onSubmitHandler = (data) => {
    //const { phoneNo, password } = data;
    console.log("user-data", data);
  };

  return (
    <>
      <div className=" overflow-x-scroll overflow-y-hidden sm:overflow-x-auto sm:overflow-y-auto rounded-[10px] border border-solid border-[#d7d7d7] ">
        <table className=" w-full text-base text-center py-14 border-collapse ">
          <thead className="text_16 font-normal capitalize bg-[#f7f7f7] ">
            {column.map((header, i) => (
              <th
                scope="col"
                className="py-5 px-3 font-normal border-b border-solid border-[#d7d7d7]"
                key={i}
              >
                {header}
              </th>
            ))}
          </thead>
          <tbody>
            {/* {data.map((transaction, i) => ( */}
            <tr
              className="  hover:bg-[#e4e6e9] odd:bg-[#ffffff] even:bg-[#f7f7f7]"
              //key={i}
            >
              <td className="text_16 px-2 py-5 capitalize">Q1</td>
              <td className="text_16 px-2 py-5">1</td>
              <td className="text_16 px-2 py-5">2</td>
              <td className="text_16 px-2 py-5">20 Mins</td>
              <td className="text_16 px-2 py-5 underline">
                More
                {/* <a
                  href
                  className="cursor-pointer "
                  onClick={(e) => {
                    setShowEditModal(true);
                  }}
                >
                  Edit
                </a>{" "}
                /{" "}
                <a
                  href
                  className="cursor-pointer "
                  onClick={(e) => {
                    showRemove();
                  }}
                >
                  Remove
                </a> */}
              </td>
            </tr>
            {/* ))} */}
          </tbody>
          
        </table>
      </div>

      {/* SHOW EDIT QUEUE MODAL */}
      {showEditModal ? (
        <>
          <div className="fixed inset-0 z-30 flex items-center justify-center bg-[#858585] bg-opacity-75">
            <div className="bg-blue rounded-lg shadow-lg p-[70px] w-[650px] relative">
              <p className="text_24 mb-8">Edit Queue</p>
              <span
                onClick={closeModal}
                class="absolute top-[12.9%] right-[11%] cursor-pointer"
              >
                <CloseModalIcon />
              </span>
              <form onSubmit={handleSubmit(onSubmitHandler)} className="">
                <div className="">
                  <input
                    type="number"
                    placeholder="Enter Your Name"
                    className={`in_put ${errors.phoneNo && "input_error"}`}
                    {...register("phoneNo", {
                      required: "Email is required",
                    })}
                  />
                  {errors.phoneNo && (
                    <p className=" mt-1 text-sm text-[red]">
                      {errors.phoneNo.message}
                    </p>
                  )}
                </div>

                <div className="mt-10">
                  <input
                    type="number"
                    placeholder="Enter Your Name"
                    className={`in_put ${errors.phoneNo && "input_error"}`}
                    {...register("phoneNo", {
                      required: "Email is required",
                    })}
                  />
                  {errors.phoneNo && (
                    <p className=" mt-1 text-sm text-[red]">
                      {errors.phoneNo.message}
                    </p>
                  )}
                </div>

                <div className="mt-10">
                  <input
                    type="number"
                    placeholder="Enter Your Name"
                    className={`in_put ${errors.phoneNo && "input_error"}`}
                    {...register("phoneNo", {
                      required: "Email is required",
                    })}
                  />
                  {errors.phoneNo && (
                    <p className=" mt-1 text-sm text-[red]">
                      {errors.phoneNo.message}
                    </p>
                  )}
                </div>

                <div className="mt-10">
                  <input
                    type="number"
                    placeholder="Enter Your Name"
                    className={`in_put ${errors.phoneNo && "input_error"}`}
                    {...register("phoneNo", {
                      required: "Email is required",
                    })}
                  />
                  {errors.phoneNo && (
                    <p className=" mt-1 text-sm text-[red]">
                      {errors.phoneNo.message}
                    </p>
                  )}
                </div>

                <div>
                  <button type="submit" className="submit_btn mt-[67px]">
                    Edit Queue
                  </button>
                </div>
              </form>
            </div>
          </div>
        </>
      ) : null}

      {/* SHOW REMOVE QUEUE MODAL */}
      {showRemoveModal ? (
        <>
          <div className="fixed inset-0 z-30 flex items-center justify-center bg-[#858585] bg-opacity-75">
            <div className="bg-blue rounded-lg shadow-lg p-[70px] w-[650px] relative">
              <div>
                <span className="mt-[14px] flex items-center justify-center">
                  <RemoveQueueModalIcon />
                </span>
                <h2 className="text-center mt-2 mb-4 text-[32px] text-[#6B6968]">
                  Are You Sure
                </h2>
                <h3 className="text-center mb-[84px] text-lg text-[#6B6968]">
                  This queue will be deleted completely
                </h3>
                <div className="flex items-center justify-center">
                  <button onClick={closeModal} className="short_btn">
                    Go Back
                  </button>
                  <button className="short_btn ml-6 ">Yes</button>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
};
