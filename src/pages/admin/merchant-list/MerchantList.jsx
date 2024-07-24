import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import Layout from "../../../components/MerchantLayout";
import useRegister from "../../../hooks/useSignUp";
import { Modal } from "antd";
import {
  PlusIconWhite,
  RemoveQueueModalIcon,
  CloseModalIcon,
  CloseIcon,
  OpenIcon,
} from "../../../assests/icons/Icons";
import { formatNumberWithCommas } from "../../../utils/functions";
import {
  SpinnerMediumWhite,
  SpinnerOrange,
  SpinnerWhite,
} from "../../../components/spinner/Spinner";
import axios from "axios";
import { currentDate, currentTime } from "../../../utils/functions";
import { EmailImage } from "../../../assests/images";
import { formatDate, formatDateTime } from "../../../utils/functions";
import Notify from "../../../components/Notification";
import secrets from "../../../config/secrets";
import storage from "../../../utils/storage";

const column = [
  "Restaurant Name",
  "Total Customers",
  "Total Queues",
  "Active Users",
  "Total Pax",
  "Status",
  "Action",
];

export const AdminMerchantListPage = () => {
  const baseURL = secrets.baseURL;
  const merchId = JSON.parse(storage.fetch("userDetails")).userId;
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [role, setRole] = useState("ADMIN");
  const [phoneNo, setPhoneNo] = useState("");
  const [address, setAddress] = useState("");
  const [isRegister, setIsRegister] = useState(true);
  const [isLoadingResend, setIsLoadingResend] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [isMerchantFetch, setIsMerchantFetch] = useState(true);

  // Form Validation
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const {
    isLoading: isRegistering,
    data,
    mutate: registerUser,
  } = useRegister({
    phoneNo,
    firstName,
    lastName,
    businessName,
    role,
    address,
    password,
    email,
  });

  useEffect(() => {
    if (password && firstName && lastName) {
      registerUser();
    }
  }, [password, firstName, lastName]);

  useEffect(() => {
    if (data?.code === "000000") {
      setIsRegister(false);
    } else if (data?.code === "U00002") {
      Modal.success({
        title: "Email already registered!",
        content: "Use a different email to create a new account",
      });
      reset();
    }
  }, [data]);

  //CALL REGISTER RESEND CODE
  const resendCode = () => {
    setIsLoadingResend(true);
    axios
      .get(
        `${baseURL}account_verification/resend?email=${email}&method=REGISTER`,
        {}
      )
      .then(function (response) {
        if (response.data.code === "000000") {
          setIsLoadingResend(false);
          Notify("success", "Email was sent Successfully!");
        }
      })
      .catch(function (error) {
        console.log("err", error);
      });
  };

  const onSubmitHandler = (data) => {
    const {
      password,
      firstName,
      lastName,
      email,
      businessName,
      phoneNo,
      address,
    } = data;
    setPassword(password);
    setFirstName(firstName);
    setLastName(lastName);
    setEmail(email);
    setRole(role);
    setPhoneNo(phoneNo);
    setAddress(address);
    setBusinessName(businessName);
  };

  const openRegisterModal = () => {
    setShowRegisterModal(true);
  };

  const closeModal = () => {
    reset();
    setShowRegisterModal(false);
    setPassword("");
    setFirstName("");
    setLastName("");
    setEmail("");
    setRole(role);
    setPhoneNo("");
    setAddress("");
    setBusinessName("");
    setIsRegister(true);
  };

  return (
    <>
      <Layout>
        <main className="xl:ml-[370px] ml-[320px] sm:px-10 px-6 bg-[#F6F7F9] h-screen">
          <div className="pb-6 pt-10 flex justify-between">
            <h2 className="text_18  items-center justify-center flex">
              Merchants
            </h2>
            <div>
              <span
                onClick={openRegisterModal}
                className="lg:flex hidden  items-center justify-center py-3 bg-[#F99762] px-6 rounded-[5px] cursor-pointer"
              >
                <PlusIconWhite />
                <p className="text_16 pl-2 text-[#ffffff]">Create Merchant</p>
              </span>
            </div>
          </div>

          <div className=" overflow-x-scroll overflow-y-hidden sm:overflow-x-auto sm:overflow-y-auto rounded-[5px]  ">
            <table className=" w-full text-base text-center py-1  border-collapse ">
              <thead className="text_16 font-normal capitalize bg-[#ffffff] ">
                {column.map((header, i) => (
                  <th
                    scope="col"
                    className="py-5 px-3 font-normal border-b-[0.5px] border-solid border-[#d7d7d7]"
                    key={i}
                  >
                    {header}
                  </th>
                ))}
              </thead>

              <tbody>
                <tr
                  className="bg-[#ffffff]"
                  //key={i}
                >
                  <td className="text_16 px-2 py-8 capitalize">The place</td>
                  <td className="text_16 px-2 py-8">
                    {formatNumberWithCommas("30")}
                  </td>
                  <td className="text_16 px-2 py-8">
                    {formatNumberWithCommas("500")}
                  </td>
                  <td className="text_16 px-2 py-8">
                    {formatNumberWithCommas("6000")}
                  </td>
                  <td className="text_16 px-2 py-8">
                    {formatNumberWithCommas("400000")}
                  </td>
                  <td className="text_16 px-2 py-8">served</td>
                  <td className="text_16 px-2 py-8">
                    <a
                      href
                      className="cursor-pointer sm:h-[50px] h-[50px] rounded-[5px] bg-[#ffffff] border border-[#F99762] hover:bg-[#F99762] hover:text-[#ffffff] w-full px-10 py-3  text-sm text-[#F99762] "
                    >
                      Visit Page
                    </a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </main>
      </Layout>

      {/* SHOW CANCEL QUEUE MODAL */}
      {showRegisterModal ? (
        <>
          <div className="fixed inset-0 z-30 flex items-center justify-center bg-[#858585] bg-opacity-75">
            <div className="bg-[#ffffff] rounded-[15px] shadow-lg px-[85px] pt-[64px] pb-[53px] w-[600px] relative">
              <span
                onClick={closeModal}
                class="absolute top-[5%] right-[15%] cursor-pointer"
              >
                <CloseModalIcon />
              </span>
              {isRegister ? (
                <>
                  <form onSubmit={handleSubmit(onSubmitHandler)}>
                    <div className="md:grid-cols-2 grid-cols-1 md:gap-2 gap-0 overflow-hidden md:flex grid">
                      <div className="mt-8">
                        <input
                          placeholder="Enter First Name"
                          type="text"
                          className={`in_put ${
                            errors.firstName && "input_error"
                          }`}
                          {...register("firstName", {
                            required: "First Name is required",
                          })}
                        />
                        {errors.firstName && (
                          <p className=" mt-1 text-sm text-[red]">
                            {errors.firstName.message}
                          </p>
                        )}
                      </div>
                      <div className="mt-8">
                        <input
                          placeholder="Enter Last Name"
                          type="text"
                          className={`in_put ${
                            errors.lastName && "input_error"
                          }`}
                          {...register("lastName", {
                            required: "Last Name is required",
                          })}
                        />
                        {errors.lastName && (
                          <p className=" mt-1 text-sm text-[red]">
                            {errors.lastName.message}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="mt-8">
                      <input
                        placeholder="Enter Resturant Name"
                        type="text"
                        className={`in_put ${
                          errors.businessName && "input_error"
                        }`}
                        {...register("businessName", {
                          required: "Resturant is required",
                        })}
                      />
                      {errors.businessName && (
                        <p className=" mt-1 text-sm text-[red]">
                          {errors.businessName.message}
                        </p>
                      )}
                    </div>

                    <div className="mt-8">
                      <input
                        placeholder="Enter Email"
                        type="email"
                        className={`in_put ${errors.email && "input_error"}`}
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

                    <div className="mt-8">
                      <input
                        placeholder="Enter Address"
                        type="text"
                        className={`in_put ${errors.address && "input_error"}`}
                        {...register("address", {
                          required: "Address is required",
                        })}
                      />
                      {errors.address && (
                        <p className=" mt-1 text-sm text-[red]">
                          {errors.address.message}
                        </p>
                      )}
                    </div>
                    <div className="mt-8">
                      <input
                        placeholder="Enter Phone Number"
                        type="text"
                        className={`in_put ${errors.phoneNo && "input_error"}`}
                        {...register("phoneNo", {
                          required: "Phone Number is required",
                        })}
                      />
                      {errors.phoneNo && (
                        <p className=" mt-1 text-sm text-[red]">
                          {errors.phoneNo.message}
                        </p>
                      )}
                    </div>
                    <div className="relative">
                      <div className="mt-8">
                        <input
                          type={show ? "text" : "password"}
                          placeholder="Enter Password"
                          className={`in_put ${
                            errors.password && "input_error"
                          }`}
                          {...register("password", {
                            required: "password is required",
                            pattern: {
                              value:
                                /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z!@#\$%\^\&*\)\(+=._-\d]{6,}$/,
                              message:
                                "Your password should contain at least a number and a letter and minimum of 6 characters",
                            },
                          })}
                        />
                        {errors.password && (
                          <p className=" mt-1 text-sm text-[red]">
                            {errors.password.message}
                          </p>
                        )}
                      </div>
                      <span onClick={() => setShow(!show)}>
                        {show ? (
                          <span className="absolute cursor-pointer right-[14px] top-[18px] ">
                            <OpenIcon />
                          </span>
                        ) : (
                          <span className="absolute cursor-pointer right-[14px] top-[18px] ">
                            <CloseIcon />
                          </span>
                        )}
                      </span>
                    </div>

                    <div className="pt-8">
                      <button
                        type="submit"
                        className="submit_btn"
                        disabled={isRegistering}
                      >
                        {isRegistering ? <SpinnerWhite /> : " Submit"}
                      </button>
                    </div>
                  </form>
                </>
              ) : (
                <>
                  <div className="space-y-6">
                    <div className="text-center">
                      <h1 className="text_24 pb-5">Confirm Email Address</h1>
                      <img
                        className="mx-auto h-20 w-auto"
                        src={EmailImage}
                        alt="email"
                      />
                      <h2 className="text_16 p-3">
                        An email was sent to{" "}
                        <span className="text-[#f99762]">{email}</span>
                      </h2>
                      <p lassName="text_14 pb-3 ">
                        Please let the Merchant confirm their email by clicking
                        the link we sent to their email inbox
                      </p>
                    </div>
                    <div>
                      <button
                        onClick={resendCode}
                        className="submit_btn"
                        disabled={isLoadingResend}
                      >
                        {isLoadingResend ? (
                          <SpinnerWhite />
                        ) : (
                          "Resend Verification"
                        )}
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </>
      ) : null}
    </>
  );
};
