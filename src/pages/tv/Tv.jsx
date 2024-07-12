import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import QRCode from "qrcode.react";
import { FaUserCircle } from "react-icons/fa";
import { currentDate, currentTime } from "../../utils/functions";
import storage from "../../utils/storage";
import secrets from "../../config/secrets";
//import ReactPlayer from 'react-player'

const column = ["Pax", "Next In Line"];

export const TvPage = () => {
  const { VideokUrl } = useParams();
  const baseURL = secrets.baseURL;
  const [qrURL, setQrURL] = useState("https://pay.deempay.com/aypizza");
  const logoUrl = JSON.parse(storage.fetch("merchantDetails")).logoUrl;
  const merchName = JSON.parse(storage.fetch("merchantDetails")).merchName;
  const [imageLoaded, setImageLoaded] = useState(false);
  const [merchId, setMerchId] = useState("");
  //const [merchName, setMerchName] = useState("");
  //const [logoUrl, setLogoUrl] = useState("");

  const qrcode = (
    <QRCode
      id="qrCodeId"
      size={265}
      value={qrURL}
      bgColor="white"
      fqColor="black"
      level="H"
    />
  );

  return (
    <>
      <div className="z-20 border-b top-0 border-[#D9D9D9] sticky w-full bg-[#F6F7F9] px-10 py-4">
        <div className="flex justify-between">
          <div className="flex items-center">
            <img
              src={`${baseURL}/api/v1/user/logo/${logoUrl}`}
              alt="User avatar"
              className={`${
                imageLoaded
                  ? "visible rounded-full h-[50px] w-[50px]"
                  : "hidden rounded-full h-[50px] w-[50px]"
              }`}
              onLoad={() => setImageLoaded(true)}
            />
            {!imageLoaded && (
              <FaUserCircle
                size={50}
                style={{
                  display: "flex",
                  alignSelf: "center",
                  opacity: 0.25,
                  cursor: "pointer",
                }}
              />
            )}
            <p className="font-semibold xl:text-[32px] text-[24px] text-black pl-3 capitalize">
              {merchName}
            </p>
          </div>
          <div className="flex ">
            <span className="lg:flex hidden gray2-bg opacity-90 items-center rounded-[5px] place-self-center py-[15px] px-[16px] text_16">
              <p className="">{currentDate}</p>
              <div class="h-5 mx-4 border-[0.5px] border-[#000000]"></div>
              <p className="">{currentTime}</p>
            </span>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-3 gap-4 px-10 pt-10 justify-evenly bg-[#F6F7F9] h-screen">
        <div class="bg-[#ffffff] w-26 h-80 ">
          <div className="p-4">
            <div className=" overflow-x-scroll overflow-y-hidden sm:overflow-x-auto sm:overflow-y-auto rounded-[5px]  ">
              <table className=" w-full text-base text-center py-1 border-b border-[#d7d7d7] border-collapse ">
                <thead className="text_16 font-normal  capitalize bg-[#ffffff] ">
                  {column.map((header, i) => (
                    <th
                      scope="col"
                      className="py-5 px-3 font-normal border-b border-solid border-[#d7d7d7]"
                      key={i}
                    >
                      {header}
                    </th>
                  ))}
                </thead>

                <tbody className="border border-[#d7d7d7]">
                  <tr
                    className="bg-[#ffffff] "
                    //key={i}
                  >
                    <td className="text_16 px-2 py-5">30</td>
                    <td className="text_16 px-2 py-5">50</td>
                  </tr>
                </tbody>
                <tbody className="border border-[#d7d7d7]">
                  <tr
                    className="bg-[#ffffff]"
                    //key={i}
                  >
                    <td className="text_16 px-2 py-5">30</td>
                    <td className="text_16 px-2 py-5">50</td>
                  </tr>
                </tbody>
                <tbody className="border border-[#d7d7d7] ">
                  <tr
                    className="bg-[#ffffff] "
                    //key={i}
                  >
                    <td className="text_16 px-2 py-5">30</td>
                    <td className="text_16 px-2 py-5">50</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div class="bg-[#ffffff] w-26 h-80">
          <span>
            <h2 className="text-center mt-5 text-[28px] text-[#6B6968] font-normal">
              Calling
            </h2>
            <h3 className="text-center text-[120px] mt-[-1.5rem] text-[#000000] font-semibold">
              108
            </h3>
            <p className="text-center text-[27px] mt-6 text-[#000000] font-semibold">
              Please Proceed Inside
            </p>
          </span>
        </div>
        <div class="bg-[#ffffff] w-26 h-100 row-span-2">
          <div className="">
            <iframe
              src="https://www.youtube.com/watch?v=qqG96G8YdcE"
              title="New content"
              allowFullScreen
            ></iframe>
          </div>
          {/* <ReactPlayer url='https://www.youtube.com/watch?v=qqG96G8YdcE' /> */}
        </div>
        <div class="bg-[#ffffff] w-26 h-80 col-span-2">
          <div className="flex items-center justify-between px-[80px]">
            <p className="text-[#000000] text-[27px] max-w-[400px]">
              Scan for a Queue Number. Do not close your browser. Scan again if
              you close your browser accidentally.
            </p>
            <section className="mt-6">{qrcode}</section>
          </div>
        </div>
      </div>
    </>
  );
};
