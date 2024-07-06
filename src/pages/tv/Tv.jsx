import React, { useState, useEffect } from "react";
import QRCode from "qrcode.react";
import { currentDate, currentTime } from "../../utils/functions";
import { TvTable } from "../../components/TvTable"; 
//import ReactPlayer from 'react-player'

const column = [
  "Pax",
  "Next In Line",
];

export const TvPage = () => {
  const [qrURL, setQrURL] = useState("https://pay.deempay.com/aypizza");

  let imageUrls = "";

  const qrcode = (
    <QRCode
      id="qrCodeId"
      size={265}
      value={qrURL}
      bgColor="white"
      fqColor="black"
      level="M"
      // imageSettings={{
      //   src: logoUrl ? logoUrl : Logo,
      //   excavate: true,
      //   width: 40,
      //   height: 40,
      // }}
    />
  );

   return (
    <>
      <div className="z-20 border-b top-0 border-[#D9D9D9] sticky w-full bg-[#F6F7F9] px-10 py-4">
        <div className="flex justify-between">
          <div className="flex items-center">
            {/* <Avatar imageUrl={imageUrls} /> */}
            <p className="font-medium text-[32px] text-black pl-3 capitalize">
              chicken republic
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
         <TvTable
               column={column}
               //data={transactions}
          />
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
           <iframe src="https://www.youtube.com/watch?v=qqG96G8YdcE" title="New content" allowFullScreen></iframe>
          </div>
          {/* <ReactPlayer url='https://www.youtube.com/watch?v=qqG96G8YdcE' /> */}
        </div>  
        <div class="bg-[#ffffff] w-26 h-80 col-span-2">
          <div className="flex items-center justify-between px-[80px]">
            <p className="text-[#000000] text-2xl max-w-[400px]">
            Scan for a Queue Number. Do not close your browser.  Scan again if you close your browser accidentally
            </p>
            <section className="mt-6">{qrcode}</section>
          </div>
        </div>  
      </div>

      {/* <div class="grid grid-cols-3 gap-1 justify-evenly bg-[#F6F7F9] h-screen">  
        <div class="bg-[red] w-26 h-12 ">1</div>  
        <div class="bg-[yellow] w-26 h-12">2</div>  
        <div class="bg-[blue] w-26 h-12 grid-rows-2">3</div>  
        <div class="bg-[black] w-26 h-12">4</div>  
        <div class="bg-[green] w-26 h-12">5</div>  
        <div class="bg-[pink] w-26 h-12">6</div>  
    </div> */}
    </>
  );
};
