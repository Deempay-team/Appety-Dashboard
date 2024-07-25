import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { SpinnerWhite } from "../../components/spinner/Spinner";
import storage from "../../utils/storage";
import useRegister from "../../hooks/useSignUp";
import { Modal } from "antd";
import { AppetyLogoBig, CloseIcon, OpenIcon } from "../../assests/icons/Icons";
import { EmailImage } from "../../assests/images";
import secrets from "../../config/secrets";
import Notify from "../../components/Notification";
import axios from "axios";

export const SignUpPage = () => {
  const navigate = useNavigate();
  const baseURL = secrets.baseURL;
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

  const existingUser = () => {
    storage.clear();
    navigate("/login");
  };

  useEffect(() => {
    if (
      password &&
      firstName &&
      lastName &&
      email &&
      businessName &&
      phoneNo &&
      address &&
      role
    ) {
      registerUser();
    }
  }, [
    password,
    firstName,
    lastName,
    email,
    businessName,
    phoneNo,
    address,
    role,
  ]);

  useEffect(() => {
    if (data?.code === "000000") {
      setIsRegister(false);
      const { data: RegisterDetails } = data;
      storage.add(
        "RegisterDetails",
        JSON.stringify({
          userId: RegisterDetails?.userId,
          firstName: RegisterDetails?.firstName,
          lastName: RegisterDetails?.lastName,
          email: RegisterDetails?.email,
          status: RegisterDetails?.status,
        })
      );
    } else if (data?.code === "U00002") {
      Modal.success({
        title: "Email already registered!",
        content:
          "Login to access your account or use a different email if you still want to create a new account.",
        onOk: () => existingUser(),
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

  return (
    <>
      {isRegister ? (
        <>
          <div className="signup-image md:grid-cols-2 grid-cols-1 overflow-hidden md:flex grid ">
            <div className=" w-full md:pt-[250px] pt-10 md:pl-16 pl-4 ">
              <div className="flex items-center ">
                <AppetyLogoBig />
                <div className="grid pl-4">
                  <h2 className=" md:text-6xl text-2xl font-semibold text-[#ffffff]">
                    APPETY
                  </h2>
                  <p className="md:text-2xl text-lg md:pt-4 pt-0 text-[#ffffff]">
                    Queue Management System
                  </p>
                </div>
              </div>
              <p className="md:text-2xl text-lg md:pt-[198px] pt-10 text-[#ffffff]">
                Get other payment softwares from Appety
              </p>
            </div>

            <div className="mr-16  mb-20 md:mt-[102px] mt-7 rounded-[10px] bg-[#ffffff] md:pt-[64px] pt-10 px-10 md:w-[750px] w-full md:h-[830px] h-[880px]">
              <div>
                <h3 className="text_24 font-medium text-[#000000]">
                  Hello There,
                </h3>
                <p className=" pt-4 text-[#6B6968]">Create Your Account</p>
              </div>

              <form onSubmit={handleSubmit(onSubmitHandler)}>
                <div className="md:grid-cols-2 grid-cols-1 md:gap-2 gap-0 overflow-hidden md:flex grid">
                  <div className="mt-8 relative">
                    <input
                      placeholder=""
                      type="text"
                      className={`in_putNew peer bg-[#EEEEEE] ${
                        errors.firstName && "input_error"
                      }`}
                      {...register("firstName", {
                        required: "First Name is required",
                      })}
                    />
                    <label className="label_new z-2">Enter First Name</label>
                    {errors.firstName && (
                      <p className=" mt-1 text-sm text-[red]">
                        {errors.firstName.message}
                      </p>
                    )}
                  </div>

                  <div className="mt-8 relative">
                    <input
                      placeholder=""
                      type="text"
                      className={`in_putNew peer bg-[#EEEEEE] ${
                        errors.lastName && "input_error"
                      }`}
                      {...register("lastName", {
                        required: "Last Name is required",
                      })}
                    />
                    <label className="label_new z-2">Enter Last Name</label>
                    {errors.lastName && (
                      <p className=" mt-1 text-sm text-[red]">
                        {errors.lastName.message}
                      </p>
                    )}
                  </div>
                </div>
                <div className="mt-8 relative">
                  <input
                    placeholder=""
                    type="text"
                    className={`in_putNew peer bg-[#EEEEEE] ${
                      errors.businessName && "input_error"
                    }`}
                    {...register("businessName", {
                      required: "Resturant is required",
                    })}
                  />
                  <label className="label_new z-2">Enter Resturant Name</label>
                  {errors.businessName && (
                    <p className=" mt-1 text-sm text-[red]">
                      {errors.businessName.message}
                    </p>
                  )}
                </div>

                <div className="mt-8 relative">
                  <input
                    placeholder=""
                    type="email"
                    className={`in_putNew peer bg-[#EEEEEE] ${
                      errors.email && "input_error"
                    }`}
                    {...register("email", {
                      required: "Email is required",
                    })}
                  />
                  <label className="label_new z-2">Enter Email</label>
                  {errors.email && (
                    <p className=" mt-1 text-sm text-[red]">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                <div className="mt-8 relative">
                  <input
                    placeholder=""
                    type="text"
                    className={`in_putNew peer bg-[#EEEEEE] ${
                      errors.address && "input_error"
                    }`}
                    {...register("address", {
                      required: "Address is required",
                    })}
                  />
                  <label className="label_new z-2">Enter Address</label>
                  {errors.address && (
                    <p className=" mt-1 text-sm text-[red]">
                      {errors.address.message}
                    </p>
                  )}
                </div>
                <div className="mt-8 relative">
                  <input
                    placeholder=""
                    type="text"
                    className={`in_putNew peer bg-[#EEEEEE] put ${
                      errors.phoneNo && "input_error"
                    }`}
                    {...register("phoneNo", {
                      required: "Phone Number is required",
                    })}
                  />
                  <label className="label_new z-2">Enter Phone Number</label>
                  {errors.phoneNo && (
                    <p className=" mt-1 text-sm text-[red]">
                      {errors.phoneNo.message}
                    </p>
                  )}
                </div>

                <div class="relative w-full mt-8">
                  <input
                    type={show ? "text" : "password"}
                    placeholder=""
                    className={`in_putNew peer bg-[#EEEEEE] ${
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
                  <label className="label_new z-2">Enter Password</label>
                  {errors.password && (
                    <p className=" mt-1 text-sm text-[red]">
                      {errors.password.message}
                    </p>
                  )}
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
                    {isRegistering ? <SpinnerWhite /> : " SiginUp"}
                  </button>
                </div>
              </form>

              <p className="mt-6 mb-[70px] text-center text-sm ">
                Already have an account?{" "}
                <Link to="/login">
                  <span className="text_16 text-[#f99762]">Login</span>
                </Link>
              </p>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="bg-[#F6F7F9] flex min-h-screen overflow-hidden flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-lg bg-[#ffffff] rounded md:p-10 p-6">
              <div className="space-y-6">
                <div className="text-center">
                  <h1 className="text_24 pb-5">Confirm your email address</h1>
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
                    Please confirm your email by clicking the link we sent to
                    your email inbox
                  </p>
                </div>
                <div>
                  <button
                    onClick={resendCode}
                    className="submit_btn"
                    disabled={isLoadingResend}
                  >
                    {isLoadingResend ? <SpinnerWhite /> : "Resend Verification"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};
