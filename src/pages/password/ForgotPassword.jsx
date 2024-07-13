import { useState, useEffect } from "react";
import {  useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { SpinnerWhite } from "../../components/spinner/Spinner";
import { EmailImage } from "../../assests/images";
import axios from "axios";
import secrets from "../../config/secrets";
import storage from "../../utils/storage";

export const ForgotPasswordPage = () => {
  const baseURL = secrets.baseURL;
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [isLoadingForgot, setIsLoadingForgot] = useState(false);

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
          if (response.data.code === "000000") {
            setIsLoadingForgot(false);
            navigate("/password/reset");
            reset();
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
    
    const payload = {
      email,
    };
    storage.add("EmailDetails", JSON.stringify(payload));
  };

  return (
    <>
   
      <div className="flex min-h-screen overflow-hidden bg-[#F6F7F9] flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          {/* <h2 className="mt-10 text-center text_24 font-semibold ">
            Wait, so you forgot
          </h2> */}
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm rounded md:p-5 p-4 bg-[#ffffff] ">
          <form onSubmit={handleSubmit(onSubmitHandler)} className="space-y-6">
            <div>
              <label htmlFor="email" className="input_label">
                Email address
              </label>
              <div className="mt-2">
                <input
                  name="email"
                  placeholder="Enter your Email"
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
              {/* <div className="mt-2">
                <input
                  name="email"
                  placeholder="Enter your Email"
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
              </div> */}
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
  );
};
