import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { CloseIcon, OpenIcon } from "../../assests/icons/Icons";
import { SpinnerWhite } from "../../components/spinner/Spinner";
import useForget from "../../hooks/useForget";
import Notify from "../../components/Notification";

export const ResetPasswordPage = () => {
  const navigate = useNavigate();
  const { email, token } = useParams();
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
    if (data?.code === "PR0034") {
      Notify("error", "Your token is invalid, please resend again!");
      navigate("/password/forgot");
    }
  }, [data]);

  const onSubmitHandler = (data) => {
    const { password } = data;
    setPassword(password);
  };

  return (
    <div className="flex min-h-screen overflow-hidden bg-[#F6F7F9] flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm"></div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm rounded md:p-5 p-4 bg-[#ffffff]">
        <form onSubmit={handleSubmit(onSubmitHandler)} className="space-y-6">
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
                className={`input_password ${errors.password && "input_error"}`}
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
              <span onClick={() => setShow(!show)}>
                {show ? (
                  <span className="absolute right-[14px] top-[53px] cursor-pointer">
                    <OpenIcon />
                  </span>
                ) : (
                  <span className="absolute right-[14px] top-[53px] cursor-pointer">
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
  );
};
