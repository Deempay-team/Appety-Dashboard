import { useState, useEffect } from "react";
import {  useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import storage from "../../utils/storage";
import { SpinnerWhite } from "../../components/spinner/Spinner";
import { EmailImage } from "../../assests/images";
import secrets from "../../config/secrets";

export const SignUpVerifyPage = () => {
  const navigate = useNavigate();
  const oldEmail = JSON.parse(storage.fetch("RegisterDetails")).email;
  const baseURL = secrets.baseURL;
  const { email, token  } = useParams();
  const [isLoadingResend, setIsLoadingResend] = useState(false);

  const registeredUser = () => {
    navigate("/login");
    storage.clear();
  };

 //CALL REGISTER RESEND CODE
  // useEffect(() => {
  //     axios
  //       .get(
  //         `${baseURL}account_verification/email/${token}`,
  //         {}
  //       )
  //       .then(function (response) {
  //         if (response.data.code === "000000") {
  //           registeredUser()
  //         } 
  //       })
  //       .catch(function (error) {
  //         console.log("err", error);
  //       });
  // }, [])

  //CALL REGISTER RESEND CODE
  // const resendCode = () => {
  //   setIsLoadingResend(true);
  //     axios
  //       .get(
  //         `${baseURL}account_verification/resend?email=${oldEmail}&method=REGISTER`,
  //         {}
  //       )
  //       .then(function (response) {
  //         if (response.data.code === "000000") {
  //           setIsLoadingResend(false);
  //         } 
  //       })
  //       .catch(function (error) {
  //         console.log("err", error);
  //       });
  // };

  return (
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
              {/* <h2 className="text_16 p-3">
                An email was sent to{" "}
                <span className="text-[#f99762]">{oldEmail}</span>
              </h2> */}
              <p lassName="text_14 pb-3 ">
                Please confirm your email by clicking the link we sent to your
                email inbox
              </p>
            </div>
            <div>
              <button
              //  onClick={resendCode}
                className="submit_btn"
                disabled={isLoadingResend}
              >
                {isLoadingResend ? <SpinnerWhite /> : "Resend Verification"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
