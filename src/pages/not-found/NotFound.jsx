import React from "react";
import { NotFoundImage } from "../../assests/images";

export const NotFoundPage = () => {
  return (
    <>
      <div className="h-screen pt-6 bg-[#f0f1f2]">
        <main className="justify-center max-w-md rounded-lg items-center mx-auto grid mt-24 bg-[#fff] py-10 px-8">
          <h3 className="font-medium text-[20px] grid justify-center mb-8 text-[#000]">
            Invalid Page
          </h3>
          <img
            className="mx-auto h-40 w-auto"
            src={NotFoundImage}
            alt="email"
          />

          <p className="text_16 grid justify-center mt-10 text-[#595959] text-center">
            Please check the url and try again.
          </p>
        </main>
      </div>
    </>
  );
};
