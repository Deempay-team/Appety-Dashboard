import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { Modal } from "antd";
import { useForm } from "react-hook-form";
import { CloseIcon, OpenIcon } from "../../assests/icons/Icons";
import { SpinnerWhite } from "../../components/spinner/Spinner";
import storage from "../../utils/storage";
import secrets from "../../config/secrets";

export const ResetPasswordPage = () => {
  const baseURL = secrets.baseURL;
  const navigate = useNavigate();
  const location = useLocation();
  const email = JSON.parse(storage.fetch("EmailDetails")).email;
  const [show, setShow] = useState(false);
  const [password, setPassword] = useState("");
  const pathFrom = location.pathname;

  // Form Validation
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const handleClick = () => {
    navigate("/verify-account");
    reset();
  };

  const unRegisteredUser = () => {
    navigate("/signup");
    storage.clear();
    reset();
  };

  const sendCode = () => {
    axios
      .get(
        `${baseURL}account_verification/resend?email=${email}&method=PASSWORD`,
        {}
      )
      .then(function (response) {
        if (response.data.code === "000000") {
          handleClick();
        } else if (response.data.code === "U00008") {
          Modal.success({
            title: "Email is not registered!",
            content: "Create a New Account to get Started",
            onOk: () => unRegisteredUser(),
          });
        }
      })
      .catch(function (error) {
        console.log("err", error);
      });
  };

  const onSubmitHandler = (data) => {
    const { password } = data;
    setPassword(password);

    const payload = {
      password,
      pathFrom,
    };
    storage.add("RegisterDetails", JSON.stringify(payload));
    sendCode();
  };

  return (
    <>
      <div className="flex min-h-screen overflow-hidden bg-[#F6F7F9] flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm"></div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm rounded md:p-5 p-4 bg-[#ffffff]">
          <form onSubmit={handleSubmit(onSubmitHandler)} className="space-y-6">
            <div className="relative">
              {/* <div className="flex items-center justify-between">
                <label htmlFor="email" className="input_label">
                  Password
                </label>
              </div> */}
              <div className="mt-2">
                <input
                  name="password"
                  placeholder="Enter New Password"
                  type={show ? "text" : "password"}
                  className={`in_put ${errors.password && "input_error"}`}
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
                <span onClick={() => setShow(!show)}>
                  {show ? (
                    <span className="absolute right-[4%] top-[35%] cursor-pointer">
                      <OpenIcon />
                    </span>
                  ) : (
                    <span className="absolute right-[4%] top-[35%] cursor-pointer">
                      <CloseIcon />
                    </span>
                  )}
                </span>
              </div>
            </div>
            <div>
              <button type="submit" className="submit_btn">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
