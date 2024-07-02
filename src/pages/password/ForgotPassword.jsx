import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import storage from "../../utils/storage";

export const ForgotPasswordPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  // Form Validation
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const handleClick = () => {
    navigate("/password/reset");
    reset();
  };

  const onSubmitHandler = (data) => {
    const { email } = data;
    setEmail(email);

    const payload = {
      email,
    };
    storage.add("EmailDetails", JSON.stringify(payload));
    handleClick();
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
