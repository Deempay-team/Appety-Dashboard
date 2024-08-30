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
  RemoveQueueModalIcon,
} from "../../../assests/icons/Icons";
import {
  SpinnerMediumWhite,
  SpinnerOrangeMedium,
  SpinnerOrange,
  SpinnerWhite,
} from "../../../components/spinner/Spinner";
import axios from "axios";
import {
  truncateLongName,
  truncateShortName,
  formatNumberWithCommas,
} from "../../../utils/functions";
import { EmailImage } from "../../../assests/images";
import { formatDateT, formatDateOnly } from "../../../utils/functions";
import Notify from "../../../components/Notification";
import secrets from "../../../config/secrets";
import storage from "../../../utils/storage";
import { Dropdown, Menu } from "antd";
import useForget from "../../../hooks/useForget";
import { useUpdateMerchantDetails } from "../../../hooks/useSuperAdmin";

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
  //const [isLoadingResend, setIsLoadingResend] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [isMerchantFetch, setIsMerchantFetch] = useState(true);
  const [merchantList, setMerchantList] = useState([]);
  const [editMerchantList, setEditMerchantList] = useState([]);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [verifyToken, setVerifyToken] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [isLoadingPassword, setIsLoadingPassword] = useState(false);
  const [showViewDetailsModal, setShowViewDetailsModal] = useState(false);
  const [showStatisticsModal, setShowStatisticsModal] = useState(false);
  const [isViewMerchantDetails, setIsViewMerchantDetails] = useState(true);
  const [merchPhone, setMerchPhone] = useState("");
  const [merchName, setMerchName] = useState("");
  const [contactName, setContactName] = useState("");
  const [merchAddress, setMerchAddress] = useState("");
  const [province, setProvince] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [merchStatus, setMerchStatus] = useState("1");
  const [showDisableModal, setShowDisableModal] = useState(false);
  const [isVerifyRegisterToken, setIsVerifyRegisterToken] = useState("");
  const [totalMerchs, setTotalMerchs] = useState("");
  const [totalCustomers, setTotalCustomers] = useState("");
  const [totalQueue, setTotalQueue] = useState("");
  const [totalServedQueue, setTotalServedQueue] = useState("");
  const [totalMerchToday, setTotalMerchToday] = useState("");
  const [totalCustomerToday, setTotalCustomerToday] = useState("");
  const [totalQueueToday, setTotalQueueToday] = useState("");
  const [totalQueueYesterday, setTotalQueueYesterday] = useState("");
  const [totalServedQueueToday, setTotalServedQueueToday] = useState("");
  const [totalServedQueueYesterday, setTotalServedQueueYesterday] =
    useState("");
  const [totalWaitingQueue, setTotalWaitingQueue] = useState("");
  const [totalWaitingQueueToday, setTotalWaitingQueueToday] = useState("");
  const [totalWaitingQueueYesterday, setTotalWaitingQueueYesterday] =
    useState("");
  const [totalCancelledQueue, setTotalCancelledQueue] = useState("");
  const [totalCancelledQueueToday, setTotalCancelledQueueToday] = useState("");
  const [totalCancelledQueueYesterday, setTotalCancelledQueueYesterday] =
    useState("");

  const [oldMerchPhone, setOldMerchPhone] = useState("");
  const [oldMerchName, setOldMerchName] = useState("");
  // const [oldContactName, setOldContactName] = useState("");
  // const [oldMerchAddress, setOldMerchAddress] = useState("");
  // const [oldProvince, setOldProvince] = useState("");
  // const [oldCountry, setOldCountry] = useState("");
  // const [oldCity, setOldCity] = useState("");

  // Form Validation
  const {
    register,
    handleSubmit,
    setValue,
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

  const {
    isLoading: isUpdatingDetails,
    data: updateMerchantData,
    mutate: updateMerchant,
  } = useUpdateMerchantDetails({
    superAdminId: merchId,
    merchId: editMerchantList?.merchId,
    merchAddress,
    merchPhone,
    merchName,
    contactName,
    province,
    merchStatus,
    country,
    city,
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

  //API TO SEND PASSWORD VERIFYTOKEN
  const sendPasswordToken = () => {
    setIsLoadingPassword(true);
    axios
      .get(
        `${baseURL}api/v1/user/superadmin/sendemail?email=${editMerchantList.contactEmail}&method=PASSWORD&merchId=${merchId}`,
        {}
      )
      .then(function (response) {
        if (response?.data?.code === "000000") {
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
        closeModal();
        reset();
        setVerifyToken("");
      } else {
        Notify("error", "Failed to Update!", forgetData?.message, 5);
        setPassword("");
        setVerifyToken("");
      }
    }
  }, [forgetData]);

  //CALL REGISTER API
  useEffect(() => {
    if (password && firstName && lastName) {
      registerUser();
    }
  }, [password, firstName, lastName]);

  //API TO SEND REGISTER VERIFYTOKEN
  const sendRegisterToken = () => {
    axios
      .get(
        `${baseURL}api/v1/user/superadmin/sendemail?email=${email}&method=REGISTER&merchId=${merchId}`,
        {}
      )
      .then(function (response) {
        if (response?.data?.code === "000000") {
          setVerifyToken(response?.data?.data);
        }
      })
      .catch(function (error) {
        console.log("err", error);
      });
  };

  //CALL VERIFY REGISTER TOKEN API
  const registeredMerchant = () => {
    setIsVerifyRegisterToken(true);
    axios
      .get(`${baseURL}account_verification/email/${verifyToken}`)
      .then(function (response) {
        if (response.data.code === "000000") {
          setIsVerifyRegisterToken(false);
          Notify("success", "Account was created Successfully!");
          closeModal();
          window.location.reload();
        }
      })
      .catch(function (error) {
        console.log("err", error);
      });
  };

  //DATA RETURN FROM REGISTER API
  useEffect(() => {
    if (data) {
      if (data?.code === "000000") {
        setIsRegister(false);
        sendRegisterToken();
      } else if (data?.code === "U00002") {
        Modal.success({
          title: "Email already registered!",
          content:
            "Use a different email to create a new account or reset the password.",
        });
      } else {
        Notify("error", "Failed to Register!", data?.message);
      }
    }
    setPassword("");
    setFirstName("");
    setLastName("");
  }, [data]);

  //CALL UPDATE MERCHANT API
  useEffect(() => {
    if (merchName && merchPhone) {
      updateMerchant();
    }
  }, [merchName, merchPhone]);

  //RETURN DATA FOR UPDATE MERCHANT DETAILS
  useEffect(() => {
    if (updateMerchantData) {
      if (updateMerchantData?.code === "000000") {
        Notify("success", "Merchant details updated successfully!");
        closeModal();
        window.location.reload();
      } else {
        Notify(
          "error",
          "Failed to Update Merchant Details!",
          updateMerchantData?.message,
          5
        );
      }
    }
  }, [updateMerchantData]);

  //CALL QUERY MERCHANT SUMMARY API
  const callMerchantSummary = () => {
    axios
      .get(
        `${baseURL}api/v1/wait/superadmin/summary?superAdminId=${merchId}&merchId=${editMerchantList.merchId}`
      )
      .then(function (res) {
        if (res?.data?.code === "000000") {
          setTotalMerchs(res?.data?.data?.totalMerchs);
          setTotalCustomers(res?.data?.data?.totalCustomers);
          setTotalQueue(res?.data?.data?.totalQueue);
          setTotalServedQueue(res?.data?.data?.totalServedQueue);
          setTotalMerchToday(res?.data?.data?.totalMerchToday);
          setTotalCustomerToday(res?.data?.data?.totalCustomerToday);
          setTotalQueueToday(res?.data?.data?.totalQueueToday);
          setTotalQueueYesterday(res?.data?.data?.totalQueueYesterday);
          setTotalServedQueueToday(res?.data?.data?.totalServedQueueToday);
          setTotalServedQueueYesterday(
            res?.data?.data?.totalServedQueueYesterday
          );
          setTotalWaitingQueue(res?.data?.data?.totalWaitingQueue);
          setTotalWaitingQueueToday(res?.data?.data?.totalWaitingQueueToday);
          setTotalWaitingQueueYesterday(
            res?.data?.data?.totalWaitingQueueYesterday
          );
          setTotalCancelledQueue(res?.data?.data?.totalCancelledQueue);
          setTotalCancelledQueueToday(
            res?.data?.data?.totalCancelledQueueToday
          );
          setTotalCancelledQueueYesterday(
            res?.data?.data?.totalCancelledQueueYesterday
          );
        }
      })
      .catch(function (error) {
        console.log("queue-error", error);
      });
  };

  //CALL REGISTER RESEND CODE
  // const resendCode = () => {
  //   setIsLoadingResend(true);
  //   axios
  //     .get(
  //       `${baseURL}account_verification/resend?email=${email}&method=REGISTER`,
  //       {}
  //     )
  //     .then(function (response) {
  //       if (response?.data?.code === "000000") {
  //         setIsLoadingResend(false);
  //         Notify("success", "Email was sent Successfully!");
  //       }
  //     })
  //     .catch(function (error) {
  //       console.log("err", error);
  //     });
  // };

  //SUBMIT DATA FOR PASSWORD CHANGE
  const onSubmitPassword = (data) => {
    const { password } = data;
    setPassword(password);
  };

  //SUBMIT DATA FOR MERCHANT UPDATE
  const onSubmitMerchantUpdate = (data) => {
    const {
      merchAddress,
      merchPhone,
      merchName,
      contactName,
      province,
      country,
      city,
    } = data;
    setMerchAddress(merchAddress);
    setMerchPhone(merchPhone);
    setMerchName(merchName);
    setContactName(contactName);
    setProvince(province);
    setCountry(country);
    setCity(city);
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
    setShowViewDetailsModal(false);
    setShowStatisticsModal(false);
    setIsViewMerchantDetails(true);
    setMerchPhone("");
    setMerchName("");
    setContactName("");
    setMerchAddress("");
    setProvince("");
    setCountry("");
    setCity("");
    setMerchStatus("1");
    setShowDisableModal(false);
  };

  const handleMerchantDetails = (index) => {
    setEditMerchantList(merchantList[index]);

    setOldMerchName(merchantList[index].merchName);
    setOldMerchPhone(merchantList[index].merchPhone);
  };

  const openPasswordModal = () => {
    sendPasswordToken();
    setContactEmail(editMerchantList?.contactEmail);
  };

  const handleDiableAcc = () => {
    updateMerchant();
  };

  const openDiableModal = () => {
    if (editMerchantList.merchStatus === "1") {
      setMerchStatus("0");
      setShowDisableModal(true);
    } else {
      setMerchStatus("1");
      setShowDisableModal(true);
    }
  };

  const openStaticsModal = () => {
    callMerchantSummary();
    setShowStatisticsModal(true);
  };

  console.log("editMerchantList", editMerchantList);

  console.log("editMerchantList.merchId", editMerchantList.merchId);

  // useEffect(() => {
  //   setValue("merchPhone", oldMerchPhone);
  //   setValue("merchName", oldMerchName);
  //   setValue("contactName", editMerchantList?.contactName);
  //   setValue("merchAddress", editMerchantList?.merchAddress);
  //   // setValue("city", maxPaxOld);
  //   // setValue("country", estimateTimeOld);
  //   // setValue("province", estimateTimeOld);
  //   setValue("merchPhone", editMerchantList?.merchPhone);
  // }, [merchPhone, merchName, contactName, merchAddress, merchPhone ]);

  const more = (
    <Menu className="grid items-center justify-center">
      <span
        onClick={() => setShowViewDetailsModal(true)}
        className="cursor-pointer block px-8 py-4 text_16 text-[#000000]"
      >
        View Details
      </span>
      <div class="border-[0.5px] border-[#D9D9D]"></div>
      <span
        onClick={openPasswordModal}
        className="cursor-pointer block mx-auto py-4 px-4 text_16 text-[#000000]"
      >
        {isLoadingPassword ? <SpinnerOrangeMedium /> : "Change Password"}
      </span>
      <div class="border-[0.5px] border-[#D9D9D9]"></div>
      <span
        onClick={openStaticsModal}
        className="cursor-pointer block px-8 py-4 text_16 text-[000000]"
      >
        Merchant Statistics
      </span>
      <div class="border-[0.5px] border-[#D9D9D9]"></div>
      {editMerchantList?.merchStatus === "1" ? (
        <span
          onClick={openDiableModal}
          className="cursor-pointer block px-8 py-4 text_16 text-[#ff0000]"
        >
          Disable Account
        </span>
      ) : (
        <span
          onClick={openDiableModal}
          className="cursor-pointer block px-8 py-4 text_16 text-[#33B469]"
        >
          Activate Account
        </span>
      )}
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
                          {formatDateOnly(list.createTime)}
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

      {/* SHOW REGISTER MERCHANT MODAL */}
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
                          required: "Restaurant is required",
                        })}
                      />
                      <label className="label_new z-2">
                        Enter Restaurant Name
                      </label>
                      <label className="label_newTop z-2">
                        Restaurant Name
                      </label>
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
                        the link we sent to their email inbox or you can confirm
                        it to complete the registeration.
                      </p>
                    </div>
                    <div>
                      <button
                        onClick={registeredMerchant}
                        className="submit_btn"
                        disabled={isVerifyRegisterToken}
                      >
                        {isVerifyRegisterToken ? <SpinnerWhite /> : "Confirm"}
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </>
      ) : null}

      {/* SHOW CHANGE PASSWORD MODAL */}
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
                className="space-y-6 my-20"
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

      {/* SHOW VIEW DETAILS MODAL & EDIT MERCHANT DETAILS */}
      {showViewDetailsModal ? (
        <>
          <div className="fixed inset-0 z-30 flex items-center justify-center bg-[#858585] bg-opacity-75">
            <div className="bg-[#ffffff] rounded-[15px] shadow-lg px-[85px] pt-[64px] pb-[53px] w-[600px] relative">
              <span
                onClick={closeModal}
                class="absolute top-[5.5%] right-[15%] cursor-pointer"
              >
                <CloseModalIcon />
              </span>
              {isViewMerchantDetails ? (
                <form className="overflow-y-auto max-h-[660px] min-h-[450px]">
                  <div className="relative">
                    <label className="input_label ">Restaurant Name</label>
                    <input
                      name="password"
                      placeholder={editMerchantList?.merchName}
                      className="input_details"
                      disabled={true}
                    />
                  </div>

                  <div className="mt-8 relative">
                    <label className="input_label ">Merchant FullName</label>
                    <input
                      name="password"
                      placeholder={editMerchantList?.contactName}
                      className="input_details"
                      disabled={true}
                    />
                  </div>

                  <div className="mt-8 relative">
                    <label className="input_label ">Merchant Phone</label>
                    <input
                      name="password"
                      placeholder={editMerchantList?.merchPhone}
                      className="input_details"
                      disabled={true}
                    />
                  </div>

                  <div className="mt-8 relative">
                    <label className="input_label ">Merchant Email</label>
                    <input
                      name="password"
                      placeholder={editMerchantList?.contactEmail}
                      className="input_details"
                      disabled={true}
                    />
                  </div>

                  <div className="mt-8 relative">
                    <label className="input_label ">Merchant Address</label>
                    <input
                      name="password"
                      placeholder={editMerchantList?.merchAddress}
                      className="input_details"
                      disabled={true}
                    />
                  </div>

                  <div className="mt-8 relative">
                    <label className="input_label ">Merchant Status</label>
                    <input
                      name="password"
                      placeholder={
                        editMerchantList?.merchStatus === "1"
                          ? "Active"
                          : "Inactive"
                      }
                      className="input_details"
                      disabled={true}
                    />
                  </div>

                  <div className="mt-8 relative">
                    <label className="input_label ">Date Created</label>
                    <input
                      name="password"
                      placeholder={formatDateT(editMerchantList?.createTime)}
                      className="input_details"
                      disabled={true}
                    />
                  </div>

                  <div className="mt-8 relative">
                    <label className="input_label ">Link URL</label>
                    <input
                      name="password"
                      placeholder={editMerchantList?.linkUrl}
                      className="input_details"
                      disabled={true}
                    />
                  </div>

                  <div className="pt-10">
                    <button
                      onClick={() => setIsViewMerchantDetails(false)}
                      className="submit_btn"
                    >
                      Edit Details
                    </button>
                  </div>
                </form>
              ) : (
                <form
                  onSubmit={handleSubmit(onSubmitMerchantUpdate)}
                  className="overflow-y-auto max-h-[660px] min-h-[450px]"
                >
                  <div className="mt-8 relative">
                    <input
                      placeholder=""
                      type="text"
                      className={`in_putNew peer bg-[#EEEEEE] ${
                        errors.contactName && "input_error"
                      }`}
                      {...register("contactName", {
                        required: "Full Name is required",
                      })}
                    />
                    <label className="label_new z-2">Enter Full Name</label>
                    <label className="label_newTop z-2">Full Name</label>
                    {errors.contactName && (
                      <p className=" mt-1 text-sm text-[red]">
                        {errors.contactName.message}
                      </p>
                    )}
                  </div>

                  <div className="mt-8 relative">
                    <input
                      placeholder=""
                      type="text"
                      className={`in_putNew peer bg-[#EEEEEE] ${
                        errors.merchName && "input_error"
                      }`}
                      {...register("merchName", {
                        required: "Restaurant Name is required",
                      })}
                    />
                    <label className="label_new z-2">
                      Enter Restaurant Name
                    </label>
                    <label className="label_newTop z-2">Restaurant Name</label>
                    {errors.merchName && (
                      <p className=" mt-1 text-sm text-[red]">
                        {errors.merchName.message}
                      </p>
                    )}
                  </div>

                  <div className="mt-8 relative">
                    <input
                      placeholder=""
                      type="text"
                      className={`in_putNew peer bg-[#EEEEEE] ${
                        errors.merchAddress && "input_error"
                      }`}
                      {...register("merchAddress", {
                        required: "Address is required",
                      })}
                    />
                    <label className="label_new z-2">Enter Address</label>
                    <label className="label_newTop z-2">Address</label>
                    {errors.merchAddress && (
                      <p className=" mt-1 text-sm text-[red]">
                        {errors.merchAddress.message}
                      </p>
                    )}
                  </div>

                  <div className="mt-8 relative">
                    <input
                      placeholder=""
                      type="text"
                      className={`in_putNew peer bg-[#EEEEEE] put ${
                        errors.merchPhone && "input_error"
                      }`}
                      {...register("merchPhone", {
                        required: "Phone Number is required",
                      })}
                    />
                    <label className="label_new z-2">Enter Phone Number</label>
                    <label className="label_newTop z-2">Phone Number</label>
                    {errors.merchPhone && (
                      <p className=" mt-1 text-sm text-[red]">
                        {errors.merchPhone.message}
                      </p>
                    )}
                  </div>

                  <div className="mt-8 relative">
                    <input
                      placeholder=""
                      type="text"
                      className={`in_putNew peer bg-[#EEEEEE] ${
                        errors.email && "input_error"
                      }`}
                      {...register("country", {
                        required: "Country is required",
                      })}
                    />
                    <label className="label_new z-2">Enter Country</label>
                    <label className="label_newTop z-2">Country</label>
                    {errors.country && (
                      <p className=" mt-1 text-sm text-[red]">
                        {errors.country.message}
                      </p>
                    )}
                  </div>

                  <div className="md:grid-cols-2 grid-cols-1 md:gap-2 gap-0 overflow-hidden md:flex grid">
                    <div className="mt-8 relative">
                      <input
                        placeholder=""
                        type="text"
                        className={`in_putNew peer bg-[#EEEEEE] ${
                          errors.province && "input_error"
                        }`}
                        {...register("province", {
                          required: "State is required",
                        })}
                      />
                      <label className="label_new z-2">Enter State</label>
                      <label className="label_newTop z-2">State</label>
                      {errors.province && (
                        <p className=" mt-1 text-sm text-[red]">
                          {errors.province.message}
                        </p>
                      )}
                    </div>

                    <div className="mt-8 relative">
                      <input
                        placeholder=""
                        type="text"
                        className={`in_putNew peer bg-[#EEEEEE] ${
                          errors.city && "input_error"
                        }`}
                        {...register("city", {
                          required: "City is required",
                        })}
                      />
                      <label className="label_new z-2">Enter City</label>
                      <label className="label_newTop z-2">City</label>
                      {errors.city && (
                        <p className=" mt-1 text-sm text-[red]">
                          {errors.city.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="pt-10">
                    <button
                      type="submit"
                      className="submit_btn"
                      disabled={isUpdatingDetails}
                    >
                      {isUpdatingDetails ? <SpinnerWhite /> : " Submit"}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </>
      ) : null}

      {/* SHOW VIEW DETAILS MODAL */}
      {showStatisticsModal ? (
        <>
          <div className="fixed inset-0 z-30 flex items-center justify-center bg-[#858585] bg-opacity-75">
            <div className="bg-[#ffffff] rounded-[15px] shadow-lg px-[85px] pt-[64px] pb-[53px] w-[600px] relative">
              <span
                onClick={closeModal}
                class="absolute top-[5.5%] right-[15%] cursor-pointer"
              >
                <CloseModalIcon />
              </span>
              <form className="overflow-y-auto max-h-[500px] min-h-[350px]">
                <div className="md:grid-cols-2 grid-cols-1 md:gap-4 gap-0 overflow-hidden md:flex grid">
                  <div className="relative">
                    <label className="input_label ">Total Merchant</label>
                    <input
                      name="password"
                      placeholder={formatNumberWithCommas(totalMerchs)}
                      className="input_details"
                      disabled={true}
                    />
                  </div>

                  <div className="relative">
                    <label className="input_label ">Total Customer</label>
                    <input
                      name="password"
                      placeholder={formatNumberWithCommas(totalCustomers)}
                      className="input_details"
                      disabled={true}
                    />
                  </div>
                </div>

                <div className="mt-8 md:grid-cols-2 grid-cols-1 md:gap-4 gap-0 overflow-hidden md:flex grid">
                  <div className="relative">
                    <label className="input_label ">Total Queue</label>
                    <input
                      name="password"
                      placeholder={formatNumberWithCommas(totalQueue)}
                      className="input_details"
                      disabled={true}
                    />
                  </div>

                  <div className="relative">
                    <label className="input_label ">Total Served Queue</label>
                    <input
                      name="password"
                      placeholder={formatNumberWithCommas(totalServedQueue)}
                      className="input_details"
                      disabled={true}
                    />
                  </div>
                </div>

                <div className="mt-8 md:grid-cols-2 grid-cols-1 md:gap-4 gap-0 overflow-hidden md:flex grid">
                  <div className="relative">
                    <label className="input_label ">Total Waiting Queue</label>
                    <input
                      name="password"
                      placeholder={formatNumberWithCommas(totalWaitingQueue)}
                      className="input_details"
                      disabled={true}
                    />
                  </div>

                  <div className="relative">
                    <label className="input_label ">
                      Total Cancelled Queue
                    </label>
                    <input
                      name="password"
                      placeholder={formatNumberWithCommas(totalCancelledQueue)}
                      className="input_details"
                      disabled={true}
                    />
                  </div>
                </div>

                <div className="mt-8 md:grid-cols-2 grid-cols-1 md:gap-4 gap-0 overflow-hidden md:flex grid">
                  <div className="relative">
                    <label className="input_label ">Total Merchant Today</label>
                    <input
                      name="password"
                      placeholder={formatNumberWithCommas(totalMerchToday)}
                      className="input_details"
                      disabled={true}
                    />
                  </div>

                  <div className="relative">
                    <label className="input_label ">Total Customer Today</label>
                    <input
                      name="password"
                      placeholder={formatNumberWithCommas(totalCustomerToday)}
                      className="input_details"
                      disabled={true}
                    />
                  </div>
                </div>

                <div className="mt-8 md:grid-cols-2 grid-cols-1 md:gap-4 gap-0 overflow-hidden md:flex grid">
                  <div className="relative">
                    <label className="input_label ">Total Queue Today</label>
                    <input
                      name="password"
                      placeholder={formatNumberWithCommas(totalQueueToday)}
                      className="input_details"
                      disabled={true}
                    />
                  </div>

                  <div className="relative">
                    <label className="input_label ">
                      Total Served QueueToday
                    </label>
                    <input
                      name="password"
                      placeholder={formatNumberWithCommas(
                        totalServedQueueToday
                      )}
                      className="input_details"
                      disabled={true}
                    />
                  </div>
                </div>

                <div className="mt-8 md:grid-cols-2 grid-cols-1 md:gap-4 gap-0 overflow-hidden md:flex grid">
                  <div className="relative">
                    <label className="input_label ">
                      Total Waiting Queue Today
                    </label>
                    <input
                      name="password"
                      placeholder={formatNumberWithCommas(
                        totalWaitingQueueToday
                      )}
                      className="input_details"
                      disabled={true}
                    />
                  </div>

                  <div className="relative">
                    <label className="input_label ">
                      Total Cancelled Queue Today
                    </label>
                    <input
                      name="password"
                      placeholder={formatNumberWithCommas(
                        totalCancelledQueueToday
                      )}
                      className="input_details"
                      disabled={true}
                    />
                  </div>
                </div>

                <div className="mt-8 md:grid-cols-2 grid-cols-1 md:gap-4 gap-0 overflow-hidden md:flex grid">
                  <div className="relative">
                    <label className="input_label ">
                      Total Queue Yesterday
                    </label>
                    <input
                      name="password"
                      placeholder={formatNumberWithCommas(totalQueueYesterday)}
                      className="input_details"
                      disabled={true}
                    />
                  </div>

                  <div className="relative">
                    <label className="input_label ">
                      Total Served Queue Yesterday
                    </label>
                    <input
                      name="password"
                      placeholder={formatNumberWithCommas(
                        totalServedQueueYesterday
                      )}
                      className="input_details"
                      disabled={true}
                    />
                  </div>
                </div>

                <div className="mt-8 md:grid-cols-2 grid-cols-1 md:gap-4 gap-0 overflow-hidden md:flex grid">
                  <div className="relative">
                    <label className="input_label ">
                      Total WaitingQueue Yesterday
                    </label>
                    <input
                      name="password"
                      placeholder={formatNumberWithCommas(
                        totalWaitingQueueYesterday
                      )}
                      className="input_details"
                      disabled={true}
                    />
                  </div>

                  <div className="relative">
                    <label className="input_label ">
                      Total CancelledQueue Yesterday
                    </label>
                    <input
                      name="password"
                      placeholder={formatNumberWithCommas(
                        totalCancelledQueueYesterday
                      )}
                      className="input_details"
                      disabled={true}
                    />
                  </div>
                </div>
              </form>
            </div>
          </div>
        </>
      ) : null}

      {/* SHOW DISABLE MODAL MODAL */}
      {showDisableModal ? (
        <>
          <div className="fixed inset-0 z-30 flex items-center justify-center bg-[#858585] bg-opacity-75">
            <div className="bg-[#ffffff] rounded-[15px] shadow-lg p-[112px] w-[600px] relative">
              <div className="">
                <div className="flex justify-center items-center">
                  <RemoveQueueModalIcon />
                </div>
                <div className=" text-center ">
                  <p className="text-[32px] text-[#000000] font-semibold pt-3 pb-2">
                    Are you sure?
                  </p>
                  {editMerchantList.merchStatus === "1" ? (
                    <p className="text_18 text-[#000000] pb-[84px]">
                      This will disable the Merchant
                    </p>
                  ) : (
                    <p className="text_18 text-[#000000] pb-[84px]">
                      This will activate the Merchant
                    </p>
                  )}
                </div>
                <div className="flex justify-center items-center">
                  <button
                    onClick={closeModal}
                    type="submit"
                    className="short_btn mr-[24px]"
                  >
                    Go Back
                  </button>
                  <button
                    onClick={handleDiableAcc}
                    type="submit"
                    className="short_btn_white"
                  >
                    {isUpdatingDetails ? <SpinnerOrangeMedium /> : "Continue"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : null}
      
    </>
  );
};
