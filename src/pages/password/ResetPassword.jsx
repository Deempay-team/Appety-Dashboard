import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useForm } from "react-hook-form";
import { CloseIcon, OpenIcon } from "../../assests/icons/Icons";
import { SpinnerWhite, SpinnerOrange } from "../../components/spinner/Spinner";
import secrets from "../../config/secrets";
import useForget from "../../hooks/useForget";
import { EmailImage } from "../../assests/images";
import storage from "../../utils/storage";
import Notify from "../../components/Notification";

export const ResetPasswordPage = () => {
  const baseURL = secrets.baseURL;
  const navigate = useNavigate();
  const oldEmail = JSON.parse(storage.fetch("EmailDetails")).email;
  const { email, token } = useParams();
  const [isVerified, setIsVerified] = useState(true);
  const [isResending, setIsResending] = useState(false);
  const [isLoadingPage, setIsLoadingPage] = useState(false);
  const [show, setShow] = useState(false);
  const [password, setPassword] = useState("");

  // Form Validation
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const {
    isLoading,
    data,
    mutate: forgetUser,
  } = useForget({
    verifyToken: token,
    password,
    email,
  });

  //CALL FORGET PASSWORD API
  useEffect(() => {
    if (password) {
      forgetUser();
    }
  }, [password]);

  useEffect(() => {
    if (data?.code === "000000") {
      navigate("/login");
      reset();
    }
  }, [data]);

  //VERIFY EMAIL CODE
  // useEffect(() => {
  //   axios
  //     .get(`${baseURL}account_verification/email/${token}`, {})
  //     .then(function (response) {
  //       if (response.data.code === "000000") {
  //         setIsLoadingPage(false)
  //         setIsVerified(false);
  //       } if (response.data.code === "PR0034") {
  //           //  Notify("error", "Your token is invalid!");
  //           console.log("Error");
  //       }
  //     })
  //     .catch(function (error) {
  //       console.log("err", error);
  //     });
  // }, []);

  const sendCode = () => {
    // setIsResending(true);
    // axios
    //   .get(
    //     `${baseURL}account_verification/resend?email=${email == null ? oldEmail : email}&method=PASSWORD`,
    //     {}
    //   )
    //   .then(function (response) {
    //     if (response.data.code === "000000") {
    //       setIsResending(false);
    //     }
    //   })
    //   .catch(function (error) {
    //     console.log("err", error);
    //   });
  };

  const onSubmitHandler = (data) => {
    const { password } = data;
    setPassword(password);
  };

  return (
    <>
    {isLoadingPage ? (
      <>
       <span className="flex items-center justify-center content-center pb-30 h-screen ">
                <SpinnerOrange />
              </span>
      </>
      ) : (
      <>
        {isVerified ? (
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
                    An email was sent to {" "}
                    {/* <span className="text-[#f99762]">{email == null ? oldEmail : email}</span> */}
                  </h2>
                  <p lassName="text_14 pb-1 ">
                    Please confirm your email by clicking the link we sent to
                    your email inbox
                  </p>
                </div>
                <div>
                  <button
                    onClick={sendCode}
                    className="submit_btn"
                  >
                    {isResending ? <SpinnerWhite /> : "Resend Verification"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="flex min-h-screen overflow-hidden bg-[#F6F7F9] flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm"></div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm rounded md:p-5 p-4 bg-[#ffffff]">
              <form
                onSubmit={handleSubmit(onSubmitHandler)}
                className="space-y-6"
              >
                <div className="relative">
                  <div className="flex items-center justify-between">
                <label htmlFor="email" className="input_label">
                  Password
                </label>
              </div>
                  <div className="mt-2">
                    <input
                      name="password"
                      placeholder="Enter New Password"
                      type={show ? "text" : "password"}
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
                    <span onClick={() => setShow(!show)}>
                      {show ? (
                        <span className="absolute right-[4%] top-[61%] cursor-pointer">
                          <OpenIcon />
                        </span>
                      ) : (
                        <span className="absolute right-[4%] top-[61%] cursor-pointer">
                          <CloseIcon />
                        </span>
                      )}
                    </span>
                  </div>
                </div>
                <div>
                  <button type="submit" className="submit_btn">
                    {isLoading ? <SpinnerWhite /> : "Submit"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </>
      )}
      </>
      )}
    </>
  );
};
