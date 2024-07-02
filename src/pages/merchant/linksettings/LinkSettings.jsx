import { useState, useEffect, useRef } from "react";
import QRCode from "qrcode.react";
import { Switch } from 'antd';
import exportAsImage from "../../../components/exportAsImage";
import Layout from "../../../components/MerchantLayout";
import { DownLoadIcon } from "../../../assests/icons/Icons";
import { LinkSettingsTable } from "../../../components/LinkSettingsTable";
import storage from "../../../utils/storage";

const column = [
  "Day",
  "Start Time",
  "End Time",
  "Action (On/Off)",
];

const LinkSettingsPage = () => {
  const exportRef = useRef();
  const [qrURL, setQrURL] = useState("https://pay.deempay.com/aypizza");
  const linkUrl = JSON.parse(storage.fetch("merchantDetails")).linkUrl;

  console.log("linkurl", linkUrl);

  const qrcode = (
    <QRCode
      id="qrCodeId"
      size={110}
      value={`http://localhost:3000/user/${linkUrl}`}
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


  const onChange = (checked) => {
    console.log(`switch to ${checked}`);
  };


  return (
    <>
      <Layout>
         <main className="sm:ml-[350px] ml-0 sm:px-10 px-6 bg-[#F6F7F9] h-screen">
         <h2 className="text_18 pb-4 pt-10">Queue Available Time</h2>
        <div className="">
          <LinkSettingsTable
               column={column}
               //data={transactions}
          />
        </div>

         <div className="text-[#6b6968] rounded-lg  bg-[#ffffff] w-full items-center mx-auto mt-6">
            <div className="py-10 px-10 grid  gap-6 xl:grid-cols-2 grid-cols-1">
              <span class="text-base font-normal">
                <h1 className="text_18">Link Switch</h1>
                <p className="text_12 mt-2 text-[#6b6968] mb-4">This will turn off the link even within on time</p>
                <div className="gray-bg flex items-center justify-between  md:w-[282px] w-[200px] rounded-[5px] p-5  ">
                   <h2 className="text_16 text-[#6b6968]">Switch link on/off</h2>
                   <Switch onChange={onChange} />                   
                </div>
              </span>
              <span class="text-base font-normal">
                <h1 className="text_18">Call Back URL</h1>
                <p className="text_12 mt-2 text-[#6b6968] mb-4">Customize your URL</p>
                <div className="flex">
                  <button className="text-[#000] md:py-[22px] py-4 mr-2 rounded-[5px] gray-bg w-[148px] text_14 md:px-0 px-2 font-normal">Appety.com</button>
                  <input 
                   placeholder="Enter Call Back URL"
                   className="bg-[#ffffff] border border-[#a6a5a4] text-[#000000] placeholder-[#bdbdbd] rounded-lg block md:w-[204px] w-[170px] px-4 dark:placeholder-[#8d8d8d] h-[64px]"
                  />
                </div>
              </span>
            </div>

            <div class="mx-6 border-[0.5px] border-[#e0e0e0]"></div>
            <div className="py-10 px-10 flex">
            <span class="text-base font-normal">
                <h1 className="text_18">QR Code</h1>
                <p className="text_12 mt-2 text-[#6b6968] mb-4">You can download the QR code below</p>
                <div className="flex">
                <section ref={exportRef}>{qrcode}</section>
                 <div className="pt-[95px] pl-2">
                 <span onClick={() => exportAsImage(exportRef.current, "Appety")} className="cursor-pointer">
                 <DownLoadIcon  />
                 </span>
                 </div>
                </div>
              </span>
            </div>
          </div>
        </main>
      </Layout>
    </>
  );
};

export default LinkSettingsPage;
