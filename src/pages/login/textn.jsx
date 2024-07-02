import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { SpinnerWhite } from "../../components/spinner/Spinner";
import { useAuth } from "../../hooks/useAuth";
import useLogin from "../../hooks/useLogin";
import storage from "../../utils/storage";
//import { useUserRole } from "../../hooks/useUser";
import { redirectTo } from "../../utils/functions";
import { AppetyLogoBig, CloseIcon, OpenIcon } from "../../assests/icons/Icons";


export const Test = () => {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [showEye, setShowEye] = useState(false);
  const [phoneNo, setPhoneNo] = useState("");
  const [password, setPassword] = useState("");
  const [userId, setUserId] = useState("");
  const [apiResponseError, setApiResponseError] = useState("");
  const { login } = useAuth();
  const {
    isLoading: isLoggingIn,
    data,
    mutate: loginUser,
  } = useLogin({
    phoneNo,
    password,
  });
  // const {
  //   isLoading: isFetchingUserRole,
  //   data: userRole,
  //   mutate: fetchRole,
  // } = useUserRole({ userId });

  // Form Validation
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  useEffect(() => {
    if (data?.code === "000000") {
 
    } 
  }, [data]);

  const onSubmitHandler = (data) => {
    const { phoneNo, password } = data;
    setPhoneNo(phoneNo);
    setPassword(password);
    loginUser();
  };

  return (
    <>
      <div className="md:block hidden">
        <div className=" bg-[#f1ca81] login-image  md:grid-cols-2 grid-cols-1 overflow-hidden  flex ">
          <div className="w-full md:pt-[250px] pt-10 md:pl-16 pl-4">
            <div className="flex items-center ">
              <AppetyLogoBig />
              <div className="grid pl-4">
                <h2 className=" text-6xl font-semibold text-[#ffffff]">
                  APPETY
                </h2>
                <p className="text_24 md:pt-4 pt-1 text-[#ffffff]">
                  Queue Management System
                </p>
              </div>
            </div>
            <p className="text_24 md:pt-[198px] pt-[90px] text-[#ffffff]">
              Get other payment softwares from Appety
            </p>
          </div>

          <div className="md:mr-16 mr-0 md:mb-9 mb-5 md:mt-[102px] mt-0 rounded-[10px]  mx-auto grid  bg-[#fff] md:pt-[64px] pt-0 px-10 md:w-[750px] max-w-md h-[630px]">
            <div>
              <h3 className="text_24 font-medium text-[#000000]">
                Hello There,
              </h3>
              <p className=" pt-4 text-[#6B6968]">Login Into Your Account</p>
            </div>
       

            <form onSubmit={handleSubmit(onSubmitHandler)} className="">
              <div>
              <div className="mt-10">
                <input
                  name="email"
                  type="number"
                  placeholder="Enter Email Address"
                  className={`in_put ${errors.poneNo && "input_error"}`}
                  {...register("poneNo", {
                    required: "Email is required",
                  })}
                />
                {errors.poneNo && (
                  <p className=" mt-1 text-sm text-[red]">
                    {errors.poneNo.message}
                  </p>
                )}
              </div>
              </div>

              <div className="relative">

                <div className="mt-10">
                  <input
                    type={showEye ? "text" : "password"}
                    placeholder="Enter Password"
                    className={`in_put ${errors.password && "input_error"}`}
                    onFocus={() => setApiResponseError("")}
                    {...register("password", {
                      required: "Password is required",
                      minLength: {
                        value: 6,
                        message: "minimum allowed password is 6",
                      },
                    })}
                  />
                  {errors.password && (
                    <p className=" mt-1 text-sm text-[red]">
                      {errors.password.message}
                    </p>
                  )}
           
                  {/* <span onClick={() => setShowEye(!showEye)}>
                    {showEye ? (
                      <span className="absolute  right-[4%] top-[35%] cursor-pointer">
                        <OpenIcon />
                      </span>
                    ) : (
                      <span className="absolute right-[4%] top-[35%] cursor-pointer">
                        <CloseIcon />
                      </span>
                    )}
                  </span> */}
                </div>
              </div>
              <div>{apiResponseError}</div>

              <div className="input_label pt-6 pb-[100px]">
                <Link
                  to="/password/forgot"
                  className=" text-[#1F222A] text_14 hover:text-indigo-500"
                >
                  Forgot password?
                </Link>
              </div>

              <div>
                <button
                  type="submit"
                  className="submit_btn"
                  disabled={isLoggingIn}
                >
                  {isLoggingIn ? <SpinnerWhite /> : "Login"}
                </button>
              </div>
            </form>

            <p className="mt-6 mb-[70px] text-center text-sm ">
              Don't have an account?{" "}
              <Link to="/signup">
                <span className="text_16 text-[#f99762]">Sign Up</span>
              </Link>
            </p>
          </div>
        </div>
      </div>

    </>
  );
};
