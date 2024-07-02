import { useState, useEffect } from "react";
import {  useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Modal } from "antd";
import storage from "../../utils/storage";
import { SpinnerWhite } from "../../components/spinner/Spinner";
import { EmailImage } from "../../assests/images";

export const VerifyPage = () => {
  const navigate = useNavigate();
  const { userEmail } = useParams();
  const email = JSON.parse(storage.fetch("EmailDetails")).email;
  const pathFrom = JSON.parse(storage.fetch("RegisterDetails")).pathFrom;

  const unRegisteredUser = () => {
    navigate("/signup");
    storage.clear();
  };

  const resendCode = () => {
    //CALL FORGET RESEND CODE
    if (pathFrom === "/password/reset") {
      axios
        .get(
          `http://159.223.37.225/account_verification/resend?email=${email}&method=PASSWORD`,
          {}
        )
        .then(function (response) {
          if (response.data.code === "000000") {
            //  handleClick();
          }
        })
        .catch(function (error) {
          console.log("err", error);
        });
    } else {
      //CALL REGISTER RESEND CODE
      axios
        .get(
          `http://159.223.37.225/account_verification/resend?email=${email}&method=REGISTER`,
          {}
        )
        .then(function (response) {
          if (response.data.code === "000000") {
            //  handleClick();
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
    }
  };

  return (
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
                Please confirm your email by clicking the link we sent to your
                email inbox
              </p>
            </div>
            <div>
              <button
                onClick={resendCode}
                className="submit_btn"
                //disabled={isRegistering}
              >
                {/* {isRegistering ? <SpinnerWhite /> : "Resend Verification"} */}
                Resend Verification
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
