import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import Layout from "../../../components/MerchantLayout";
import useRegister from "../../../hooks/useSignUp";
import { Modal } from "antd";
import {
  PlusIconWhite,
  CloseModalIcon,
  CloseIcon,
  OpenIcon,
} from "../../../assests/icons/Icons";
import {
  SpinnerMediumWhite,
  SpinnerOrangeMedium,
  SpinnerOrange,
  SpinnerWhite,
} from "../../../components/spinner/Spinner";
import axios from "axios";
import { truncateLongName, truncateShortName } from "../../../utils/functions";
import { EmailImage } from "../../../assests/images";
import { formatDateT } from "../../../utils/functions";
import Notify from "../../../components/Notification";
import secrets from "../../../config/secrets";
import storage from "../../../utils/storage";
import { Dropdown, Menu } from "antd";
import useForget from "../../../hooks/useForget";

const column = [
  "Restaurant Name",
  "Merchant Phone",
  "Merchant Email",
  "Merchant Address",
  "Date Created",
  "Pages",
  "Actions",
];

export const AdminMerchantListPage = () => {
  const baseURL = secrets.baseURL;
  const merchId = JSON.parse(storage.fetch("userDetails")).userId;
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
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [isMerchantFetch, setIsMerchantFetch] = useState(true);
  const [merchantList, setMerchantList] = useState([]);
  const [editMerchantList, setEditMerchantList] = useState([]);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [verifyToken, setVerifyToken] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [isLoadingPassword, setIsLoadingPassword] = useState(false);

  // Form Validation
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const {
    isLoading,
    data: forgetData,
    mutate: forgetUser,
  } = useForget({
    verifyToken,
    password,
    email: contactEmail,
  });

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

  //CALL QUERY ALL MERCHANTS API
  useEffect(() => {
    axios
      .get(
        `${baseURL}api/v1/user/superadmin/query/merchants?merchId=${merchId}`
      )
      .then(function (res) {
        if (res?.data?.code === "000000") {
          setMerchantList(res?.data?.data);
          setIsMerchantFetch(false);
        }
      })
      .catch(function (error) {
        console.log("queue-error", error);
      });
  }, []);

  //API TO SEND VERIFYTOKEN
  const sendVerifyToken = () => {
    setIsLoadingPassword(true);
    axios
      .get(
        `${baseURL}api/v1/user/superadmin/sendemail?email=${editMerchantList.contactEmail}&method=PASSWORD&merchId=${merchId}`,
        {}
      )
      .then(function (response) {
        if (response.data.code === "000000") {
          setIsLoadingPassword(false);
          setShowPasswordModal(true);
          setVerifyToken(response?.data?.data);
        }
      })
      .catch(function (error) {
        console.log("err", error);
      });
  };

  //CALL FORGET PASSWORD API
  useEffect(() => {
    if (password && verifyToken && contactEmail) {
      forgetUser();
    }
  }, [password, verifyToken, contactEmail]);

  useEffect(() => {
    if (forgetData) {
      if (forgetData?.code === "000000") {
        Notify("success", "Password has being reset successfully!");
        setShowPasswordModal(false);
        setPassword("");
        reset();
      } else {
        Notify("error", "Failed to Update!", forgetData?.message, 5);
        setPassword("");
      }
    }
  }, [forgetData]);

  //CALL REGISTER API
  useEffect(() => {
    if (password && firstName && lastName) {
      registerUser();
    }
  }, [password, firstName, lastName]);

  useEffect(() => {
    if (data) {
      if (data?.code === "000000") {
        setIsRegister(false);
      } else if (data?.code === "U00002") {
        Modal.success({
          title: "Email already registered!",
          content:
            "Use a different email to create a new account or reset the password.",
        });
      } else {
        Notify("error", "Failed to Register!");
      }
    }
    setPassword("");
    setFirstName("");
    setLastName("");
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

  //SUBMIT DATA FOR PASSWORD CHANGE
  const onSubmitPassword = (data) => {
    const { password } = data;
    setPassword(password);
  };

  //SUBMIT DATA FOR REGISTRATION
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

  const openRegisterModal = () => {
    setShowRegisterModal(true);
  };

  const closeModal = () => {
    reset();
    setShowRegisterModal(false);
    setPassword("");
    setFirstName("");
    setLastName("");
    setEmail("");
    setRole(role);
    setPhoneNo("");
    setAddress("");
    setBusinessName("");
    setVerifyToken("");
    setIsRegister(true);
    setShowPasswordModal(false);
  };

  const handleMerchantDetails = (index) => {
    setEditMerchantList(merchantList[index]);
  };

  const openPasswordModal = () => {
    sendVerifyToken();
    setContactEmail(editMerchantList.contactEmail);
  };

  const more = (
    <Menu className="grid items-center justify-center">
      <span
        onClick={openPasswordModal}
        className="cursor-pointer block mx-auto py-4 px-4 text_16 text-[#33B469]"
      >
        {isLoadingPassword ? <SpinnerOrangeMedium /> : "Change Password"}
      </span>
      <div class="border-[0.5px] border-[#D9D9D9]"></div>
      <span
        //onClick={}
        className="cursor-pointer block px-8 py-4 text_16 text-[#ff0000]"
      >
        Disable Account
      </span>
    </Menu>
  );

  return (
    <>
      <Layout>
        <main className="xl:ml-[370px] ml-[320px] sm:px-10 px-6 bg-[#F6F7F9] h-fit pb-20">
          {isMerchantFetch ? (
            <>
              <span className="flex items-center justify-center content-center pb-40 h-screen ">
                <SpinnerOrange />
              </span>
            </>
          ) : (
            <>
              <div className="pb-6 pt-10 flex justify-between">
                <h2 className="text_18  items-center justify-center flex">
                  Merchants
                </h2>
                <div>
                  <span
                    onClick={openRegisterModal}
                    className="lg:flex hidden  items-center justify-center py-3 bg-[#F99762] px-6 rounded-[5px] cursor-pointer"
                  >
                    <PlusIconWhite />
                    <p className="text_16 pl-2 text-[#ffffff]">
                      Create Merchant
                    </p>
                  </span>
                </div>
              </div>

              <div className=" overflow-x-scroll overflow-y-hidden sm:overflow-x-auto sm:overflow-y-auto rounded-[5px]  ">
                <table className=" w-full text-base text-center py-1  border-collapse ">
                  <thead className="text_16 font-normal capitalize bg-[#ffffff] ">
                    {column.map((header, i) => (
                      <th
                        scope="col"
                        className="py-5 px-3 font-normal border-b-[0.5px] border-solid border-[#d7d7d7]"
                        key={i}
                      >
                        {header}
                      </th>
                    ))}
                  </thead>

                  <tbody>
                    {merchantList.map((list, index) => (
                      <tr
                        className="bg-[#ffffff]"
                        key={index}
                        onClick={() => handleMerchantDetails(index)}
                      >
                        <td className="text_16 px-2 py-8 capitalize">
                          {list.merchName}
                        </td>
                        <td className="text_16 px-2 py-8">{list.merchPhone}</td>
                        <td className="text_16 px-2 py-8">
                          {truncateLongName(list.contactEmail)}
                        </td>
                        <td className="text_16 px-2 py-8">
                          {truncateShortName(list.merchAddress)}
                        </td>
                        <td className="text_16 px-2 py-8">
                          {formatDateT(list.createTime)}
                        </td>
                        <td className="text_16 px-2 py-8">
                          <a
                            href={`/dashboard/merchant/${list.merchId}`}
                            className="cursor-pointer sm:h-[50px] h-[50px] rounded-[5px] bg-[#ffffff] border border-[#F99762] hover:bg-[#F99762] hover:text-[#ffffff] w-full px-7 py-3  text-sm text-[#F99762] "
                          >
                            Visit Page
                          </a>
                        </td>
                        <td className="text_16 px-2 py-8">
                          <Dropdown overlay={more} trigger={["click"]}>
                            <span className=" cursor-pointer text_16 text-[#000000] underline">
                              More
                            </span>
                          </Dropdown>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </main>
      </Layout>

      {/* SHOW CANCEL QUEUE MODAL */}
      {showRegisterModal ? (
        <>
          <div className="fixed inset-0 z-30 flex items-center justify-center bg-[#858585] bg-opacity-75">
            <div className="bg-[#ffffff] rounded-[15px] shadow-lg px-[85px] pt-[64px] pb-[53px] w-[600px] relative">
              <span
                onClick={closeModal}
                class="absolute top-[5%] right-[15%] cursor-pointer"
              >
                <CloseModalIcon />
              </span>
              {isRegister ? (
                <>
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
                        <label className="label_new z-2">
                          Enter First Name
                        </label>
                        <label className="label_newTop z-2">First Name</label>
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
                        <label className="label_newTop z-2">Last Name</label>
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
                      <label className="label_new z-2">
                        Enter Resturant Name
                      </label>
                      <label className="label_newTop z-2">Resturant Name</label>
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
                      <label className="label_newTop z-2">Email</label>
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
                      <label className="label_newTop z-2">Address</label>
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
                      <label className="label_new z-2">
                        Enter Phone Number
                      </label>
                      <label className="label_newTop z-2">Phone Number</label>
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

                    <div className="pt-10">
                      <button
                        type="submit"
                        className="submit_btn"
                        disabled={isRegistering}
                      >
                        {isRegistering ? <SpinnerWhite /> : " Submit"}
                      </button>
                    </div>
                  </form>
                </>
              ) : (
                <>
                  <div className="space-y-6">
                    <div className="text-center">
                      <h1 className="text_24 pb-5">Confirm Email Address</h1>
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
                        Please let the Merchant confirm their email by clicking
                        the link we sent to their email inbox
                      </p>
                    </div>
                    <div>
                      <button
                        onClick={resendCode}
                        className="submit_btn"
                        disabled={isLoadingResend}
                      >
                        {isLoadingResend ? (
                          <SpinnerWhite />
                        ) : (
                          "Resend Verification"
                        )}
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </>
      ) : null}

      {/* SHOW CANCEL QUEUE MODAL */}
      {showPasswordModal ? (
        <>
          <div className="fixed inset-0 z-30 flex items-center justify-center bg-[#858585] bg-opacity-75">
            <div className="bg-[#ffffff] rounded-[15px] shadow-lg px-[85px] pt-[64px] pb-[53px] w-[600px] relative">
              <span
                onClick={closeModal}
                class="absolute top-[12%] right-[15%] cursor-pointer"
              >
                <CloseModalIcon />
              </span>
              <form
                onSubmit={handleSubmit(onSubmitPassword)}
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
                      className={`input_password ${
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
        </>
      ) : null}
    </>
  );
};
