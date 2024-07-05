import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import { SpinnerWhite } from "../../components/spinner/Spinner";
import storage from "../../utils/storage";
import useRegister from "../../hooks/useSignUp";
import { Modal } from "antd";
import { AppetyLogoBig, CloseIcon, OpenIcon } from "../../assests/icons/Icons";

export const SignUpPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [role, setRole] = useState("ADMIN");
  const [phoneNo, setPhoneNo] = useState("");
  const [address, setAddress] = useState("");
  const pathFrom = location.pathname;

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
      navigate("/verify-account");
      const { data: RegisterDetails } = data;
      storage.add(
        "RegisterDetails",
        JSON.stringify({
          userId: RegisterDetails?.userId,
          firstName: RegisterDetails?.firstName,
          lastName: RegisterDetails?.lastName,
          email: RegisterDetails?.email,
          status: RegisterDetails?.status,
          pathFrom,
        })
      );
    } else if (data?.code === "U00002") {
      Modal.success({
        title: "Email already registered!",
        content:
          "Login to access your account or use a different email if you want to create a new account.",
        onOk: () => existingUser(),
      });
      reset();
    }
  }, [data]);

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

    storage.add("EmailDetails", JSON.stringify(email));
  };

  return (
    <>
      <div className="signup-image md:grid-cols-2 grid-cols-1 overflow-hidden md:flex grid">
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

        <div className="mr-16  mb-9 md:mt-[102px] mt-7 rounded-[10px] bg-[#ffffff] md:pt-[64px] pt-10 px-10 md:w-[750px] w-full md:h-[760px] h-[880px]">
          <div>
            <h3 className="text_24 font-medium text-[#000000]">Hello There,</h3>
            <p className=" pt-4 text-[#6B6968]">Create Your Account</p>
          </div>

          <form onSubmit={handleSubmit(onSubmitHandler)}>
            <div className="md:grid-cols-2 grid-cols-1 md:gap-2 gap-0 overflow-hidden md:flex grid">
              <div className="mt-8">
                <input
                  placeholder="Enter First Name"
                  type="text"
                  className={`in_put ${errors.firstName && "input_error"}`}
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
                  className={`in_put ${errors.lastName && "input_error"}`}
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
                className={`in_put ${errors.businessName && "input_error"}`}
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

            <div className="md:grid-cols-2 grid-cols-1 md:gap-2 gap-0 overflow-hidden md:flex grid mb-11">
              <div className="mt-8">
                <input
                  placeholder="Enter Phone Number"
                  type="number"
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
                    className={`in_put ${errors.password && "input_error"}`}
                    {...register("password", {
                      required: "Password is required",
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
                    <span className="absolute cursor-pointer right-[5%] top-[60%] ">
                      <OpenIcon />
                    </span>
                  ) : (
                    <span className="absolute cursor-pointer right-[5%] top-[60%] ">
                      <CloseIcon />
                    </span>
                  )}
                </span>
              </div>
            </div>

            <div>
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
  );
};
