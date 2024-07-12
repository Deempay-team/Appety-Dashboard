import { useState, useEffect, useRef } from "react";
import Layout from "../../../components/MerchantLayout";
import { StoreImage, PeopleImage, QueueImage } from "../../../assests/images";
import { formatNumberWithCommas, addSpace } from "../../../utils/functions";
import { DownLoadIconWhite } from "../../../assests/icons/Icons";
import { SpinnerMediumWhite, SpinnerOrange } from "../../../components/spinner/Spinner";

const column = [
  "Restaurant Name",
  "Customer Name",
  "Customer Phone",
  "Time Registered",
  "Time Ended",
  "Status",
  "Queue",
];

export const AdminHomePage = () => {
  return (
    <>
      <Layout>
        <main className="xl:ml-[370px] ml-[320px]  sm:px-10 px-6 bg-[#F6F7F9] h-screen">
          <h2 className="text_18 pb-4 pt-10">Overview</h2>

          <div className="p-6 grid md:grid-cols-4 grid-cols-2 lg:gap-8 gap-4 bg-[#ffffff] rounded-[5px]">
            <div>
              <div class="pt-4 px-4 pb-2.5 text-[#6b6968] rounded-[5px]  bg-[#eeeeee] w-full  ">
                <div className="flex justify-between">
                  <div>
                    <p className="text_12 text-[#6b6968] capitalize ">
                      Total Restaurants
                    </p>
                    <p className="text_24 text-[#000000] font-medium pt-2 ">
                      {formatNumberWithCommas("400")}
                    </p>
                  </div>
                  <div>
                    <div className="flex items-center pl-10 justify-center">
                      <img className="" src={StoreImage} alt="email" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <div class="pt-4 px-4 pb-2.5 text-[#6b6968] rounded-[5px]  bg-[#eeeeee] w-full  ">
                <div className="flex justify-between">
                  <div>
                    <p className="text_12 text-[#6b6968] capitalize ">
                      Total Person
                    </p>
                    <p className="text_24 text-[#000000] font-medium pt-2 ">
                      {formatNumberWithCommas("40689")}
                    </p>
                  </div>
                  <div>
                    <div className="flex items-center  pl-10 justify-center">
                      <img className="" src={PeopleImage} alt="email" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <div class="pt-4 px-4 pb-2.5 text-[#6b6968] rounded-[5px]  bg-[#eeeeee] w-full  ">
                <div className="flex justify-between">
                  <div>
                    <p className="text_12 text-[#6b6968] capitalize ">
                      Total Queues
                    </p>
                    <p className="text_24 text-[#000000] font-medium pt-2 ">
                      {formatNumberWithCommas("200030")}
                    </p>
                  </div>
                  <div>
                    <div className="flex items-center xl:pl-[50px] pl-10 justify-center">
                      <img className="" src={QueueImage} alt="email" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <div class="pt-4 px-4 pb-2.5 text-[#6b6968] rounded-[5px]  bg-[#eeeeee] w-full  ">
                <div className="flex justify-between">
                  <div>
                    <p className="text_12 text-[#6b6968] capitalize ">
                      Active Users
                    </p>
                    <p className="text_24 text-[#000000] font-medium pt-2 ">
                      {formatNumberWithCommas("1036089")}
                    </p>
                  </div>
                  <div>
                    <div className="flex items-center pl-10 justify-center">
                      <img className="" src={PeopleImage} alt="email" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="pb-6 pt-10 flex justify-between">
            <h2 className="text_18 items-center justify-center flex">Queue</h2>
            <div>
              <span className="lg:flex hidden  items-center justify-center py-3 bg-[#F99762] px-6 rounded-[5px] cursor-pointer">
                <DownLoadIconWhite />
                <p className="text_16 pl-2 text-[#ffffff]">
                  Download Queue Data
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
                    className="py-5 px-3 font-normal border-b border-solid border-[#d7d7d7]"
                    key={i}
                  >
                    {header}
                  </th>
                ))}
              </thead>

              <tbody>
                <tr
                  className="bg-[#ffffff]"
                  //key={i}
                >
                  <td className="text_16 px-2 py-5 capitalize">The place</td>
                  <td className="text_16 px-2 py-5">30</td>
                  <td className="text_16 px-2 py-5">
                    {addSpace("6578902345")}
                  </td>
                  <td className="text_16 px-2 py-5">20 Mins</td>
                  <td className="text_16 px-2 py-5">40</td>
                  <td className="text_16 px-2 py-5">served</td>
                  <td className="text_16 px-2 py-5">20</td>
                </tr>
                {/* ))} */}
              </tbody>
            </table>
          </div>
        </main>
      </Layout>
    </>
  );
};
