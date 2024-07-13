import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { SpinnerWhite } from "../../components/spinner/Spinner";
import axios from "axios";
import secrets from "../../config/secrets";
import { EmailImage } from "../../assests/images";

export const ForgotPasswordPage = () => {
  const baseURL = secrets.baseURL;
  const [email, setEmail] = useState("");
  const [isLoadingForgot, setIsLoadingForgot] = useState(false);
  const [isMailSent, setIsMailSent] = useState(true);

  // Form Validation
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  //CALL API TO SEND EMAIL FOR PASSWORD FORGET
  useEffect(() => {
    if (email) {
      setIsLoadingForgot(true);
      axios
        .get(
          `${baseURL}account_verification/resend?email=${email}&method=PASSWORD`,
          {}
        )
        .then(function (response) {
          if (response?.data?.code === "000000") {
            setIsLoadingForgot(false);
            reset();
            setIsMailSent(false);
          }
        })
        .catch(function (error) {
          console.log("err", error);
        });
    }
  }, [email]);

  const onSubmitHandler = (data) => {
    const { email } = data;
    setEmail(email);
  };

  const resendCode = () => {
    window.location.reload();
    setIsMailSent(true);
  };

  return (
    <>
      {isMailSent ? (
        <>
          <div className="flex min-h-screen overflow-hidden bg-[#F6F7F9] flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm"></div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm rounded md:p-5 p-4 bg-[#ffffff] ">
              <form
                onSubmit={handleSubmit(onSubmitHandler)}
                className="space-y-6"
              >
                <div>
                  <label htmlFor="email" className="input_label">
                    Email address
                  </label>
                  <div className="mt-2">
                    <input
                      name="email"
                      placeholder="Enter your Email"
                      type="email"
                      className={`input_password ${
                        errors.email && "input_error"
                      }`}
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
                </div>
                <div>
                  <button type="submit" className="submit_btn">
                    {isLoadingForgot ? <SpinnerWhite /> : "Submit"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="bg-[#F6F7F9] flex min-h-screen overflow-hidden flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-lg bg-[#ffffff] rounded md:p-10 p-6">
              <div className="space-y-6">
                <div className="text-center">
                  <h1 className="text_24 pb-3">Confirm your email address</h1>
                  <img
                    className="mx-auto h-20 w-auto"
                    src={EmailImage}
                    alt="email"
                  />
                  <h2 className="text_16 p-3">
                    An email was sent to{" "}
                    <span className="text-[#f99762]">{email}</span>
                  </h2>
                  <p lassName="text_14 pb-3">
                    Please confirm your email by clicking the link we sent to
                    your email inbox
                  </p>
                </div>
                <div>
                  <button onClick={resendCode} className="submit_btn">
                    Resend Verification
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
