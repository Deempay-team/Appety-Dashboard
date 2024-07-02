import { useState, useEffect, useRef } from "react";
import Layout from "../../../components/MerchantLayout";
import { StoreImage, PeopleImage, QueueImage } from "../../../assests/images";
import { formatNumberWithCommas } from "../../../utils/functions";
import { DownLoadIconWhite } from "../../../assests/icons/Icons";
import { AdminHomeTable } from "../../../components/AdminHomeTable"

const column = ["Restaurant Name", "Customer Name", "Customer Phone", "Time Registered", "Time Ended", "Status", "Queue"];

export const AdminHomePage = () => {
  return (
    <>
      <Layout>
        <main className="sm:ml-[350px] ml-0 sm:px-10 px-6 bg-[#F6F7F9] h-screen">
          <h2 className="text_18 pb-4 pt-10">Overview</h2>
          <div className="p-6 flex md:grid-cols-4 grid-cols-2 lg:gap-8 gap-4 bg-[#ffffff]">
            <div>
              <div class="pt-4 px-4 pb-2.5 text-[#6b6968] rounded-[5px]  gray2-bg w-full  ">
                <div className="flex justify-between">
                  <div>
                    <p className="text_12 text-[#6b6968] capitalize ">
                      Total Restaurants
                    </p>
                    <p className="text_24 text-[#000000] font-medium pt-2 ">
                      {formatNumberWithCommas("40000")}
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
              <div class="pt-4 px-4 pb-2.5 text-[#6b6968] rounded-[5px]  gray2-bg w-full  ">
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
              <div class="pt-4 px-4 pb-2.5 text-[#6b6968] rounded-[5px]  gray2-bg w-full  ">
                <div className="flex justify-between">
                  <div>
                    <p className="text_12 text-[#6b6968] capitalize ">
                      Total Queues
                    </p>
                    <p className="text_24 text-[#000000] font-medium pt-2 ">
                      {formatNumberWithCommas("20003")}
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
              <div class="pt-4 px-4 pb-2.5 text-[#6b6968] rounded-[5px]  gray2-bg w-full  ">
                <div className="flex justify-between">
                  <div>
                    <p className="text_12 text-[#6b6968] capitalize ">
                      Active Users
                    </p>
                    <p className="text_24 text-[#000000] font-medium pt-2 ">
                      {formatNumberWithCommas("36089")}
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

          <div className="pb-4 pt-10 flex justify-between">
            <h2 className="text_18 ">Overview</h2>
            <div>
              <span className="lg:flex hidden  items-center justify-center py-3 bg-[#F99762] px-6 rounded-[5px] cursor-pointer">
                <DownLoadIconWhite />
                <p className="text_16 pl-2 text-[#ffffff]">
                  Download Queue Data
                </p>
              </span>
            </div>
          </div>

          <div className="">
          <AdminHomeTable
               column={column}
               //data={transactions}
          />
        </div>

        </main>
      </Layout>
    </>
  );
};
