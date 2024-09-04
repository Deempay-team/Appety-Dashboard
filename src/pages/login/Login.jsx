import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { SpinnerWhite } from "../../components/spinner/Spinner";
import { useAuth } from "../../hooks/useAuth";
import useLogin from "../../hooks/useLogin";
import storage from "../../utils/storage";
import Notify from "../../components/Notification";
import { AppetyLogoBig, CloseIcon, OpenIcon } from "../../assests/icons/Icons";

export const LoginPage = () => {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [apiResponseError, setApiResponseError] = useState("");
  const { login } = useAuth();

  // CALL LOGIN API
  const {
    isLoading: isLoggingIn,
    data,
    mutate: loginUser,
  } = useLogin({
    email,
    password,
  });

  // FORM VALIDATION
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  useEffect(() => {
    if (email && password) {
      loginUser();
      setPassword("");
      setEmail("");
    }
  }, [email, password]);

  useEffect(() => {
    if (data?.code === "000000") {
      const { data: userDetails } = data;
      login(userDetails?.accessToken);
      storage.add(
        "userDetails",
        JSON.stringify({
          userId: userDetails?.userId,
          firstName: userDetails?.firstName,
          lastName: userDetails?.lastName,
          role: userDetails?.role,
          status: userDetails?.status,
          phoneNo: userDetails?.phoneNo,
        })
      );
      if (userDetails?.role === "ADMIN") {
        navigate("/dashboard/merchant");
      } else {
        navigate("/dashboard/admin/overview");
      }
      reset();
    } else if (data?.code === "U00005") {
      setApiResponseError(
        <section style={{ color: "red" }}>Invalid login credentials</section>
      );
    } else if (data?.code === "U00018") {
      Notify(
        "error",
        "Verification Error!",
        "Please check your email to verify your account",
        10
      );
    }
    setPassword("");
    setEmail("");
  }, [data]);

  // SUBMMIT FORM
  const onSubmitHandler = (data) => {
    const { email, password } = data;
    setEmail(email);
    setPassword(password);
  };

  return (
    <>
      <div className="login-image md:grid-cols-2 grid-cols-1 h-screen md:flex grid">
        <div className=" w-full md:pt-[250px] pt-10 md:pl-16 pl-4 ">
          <div className="flex items-center ">
            <AppetyLogoBig />
            <div className="grid pl-4">
              <h2 className=" md:text-6xl text-2xl font-semibold text-[#ffffff]">
                appety
              </h2>
              <p className="md:text-2xl text-lg md:pt-4 pt-0 text-[#ffffff]">
                Queue Management System
              </p>
            </div>
          </div>
          <p className="md:text-2xl text-lg md:pt-[198px] pt-10 text-[#ffffff]">
            Get other payment softwares from appety
          </p>
        </div>

        <div className="mr-16  mb-9 md:mt-[102px] mt-10 rounded-[10px] bg-[#ffffff] md:pt-[64px] pt-10 px-10 md:w-[750px] w-full md:h-[630px] h-[520px]">
          <div>
            <h3 className="text_24 font-medium text-[#000000]">Hello There,</h3>
            <p className=" pt-4 text-[#6B6968]">Login Into Your Account</p>
          </div>

          <form onSubmit={handleSubmit(onSubmitHandler)}>
            <div class="relative w-full mt-10">
              <input
                type="email"
                placeholder=""
                onFocus={() => setApiResponseError("")}
                className={`in_putNew peer  ${errors.email && "input_error"}`}
                {...register("email", {
                  required: "Email is required",
                })}
              />
              <label className="label_new z-2">Enter Email</label>
              <label className="label_newTop z-2">Email</label>
              {errors.email && (
                <p className=" mt-1 text-sm text-[red]">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div class="relative w-full mt-10">
              <input
                type={show ? "text" : "password"}
                placeholder=""
                onFocus={() => setApiResponseError("")}
                className={`in_putNew peer  ${
                  errors.password && "input_error"
                }`}
                {...register("password", {
                  required: "Password is required",
                })}
              />
              <label className="label_new z-2">Enter Password</label>
              <label className="label_newTop z-2">Password</label>
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
            <div>{apiResponseError}</div>
            <div className="input_label pt-6 md:pb-[100px] pb-11">
              <Link
                to="/password/forgot"
                className=" text-[#1F222A] text_14 hover:text-[#f99762]"
              >
                Forgot password?
              </Link>
            </div>
            <button
              type="submit"
              className="submit_btn "
              //disabled={isLoggingIn}
            >
              {isLoggingIn ? <SpinnerWhite /> : "Login"}
            </button>
          </form>

          <p className="mt-5  mb-[0px] text-center text-sm ">
            Don't have an account?{" "}
            <Link to="/signup">
              <span className="text_16 text-[#f99762]">Sign Up</span>
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};
