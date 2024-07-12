import { useState, useEffect } from 'react';
import Layout from '../../../components/MerchantLayout';
import { PlusIconWhite } from "../../../assests/icons/Icons";
import { formatNumberWithCommas, addSpace } from "../../../utils/functions";
import { SpinnerMediumWhite, SpinnerOrange } from "../../../components/spinner/Spinner";

const column = ["Restaurant Name", "Total Customers", "Total Queues", "Active Users", "Total Pax", "Status", "Action"];

export const AdminMerchantListPage = () => {
  
  return (
    <>
    <Layout>
    <main className="xl:ml-[370px] ml-[320px] sm:px-10 px-6 bg-[#F6F7F9] h-screen">
    <div className="pb-6 pt-10 flex justify-between">
            <h2 className="text_18  items-center justify-center flex">Merchants</h2>
            <div>
              <span className="lg:flex hidden  items-center justify-center py-3 bg-[#F99762] px-6 rounded-[5px] cursor-pointer">
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
            <td className="text_16 px-2 py-8 capitalize">The place</td>
            <td className="text_16 px-2 py-8">{formatNumberWithCommas("30")}</td>
            <td className="text_16 px-2 py-8">{formatNumberWithCommas("500")}</td>
            <td className="text_16 px-2 py-8">{formatNumberWithCommas("6000")}</td>
            <td className="text_16 px-2 py-8">{formatNumberWithCommas("400000")}</td>
            <td className="text_16 px-2 py-8">served</td>
            <td className="text_16 px-2 py-8">
              <a href className="cursor-pointer sm:h-[50px] h-[50px] rounded-[5px] bg-[#ffffff] border border-[#F99762] hover:bg-[#F99762] hover:text-[#ffffff] w-full px-10 py-3  text-sm text-[#F99762] ">
                Visit Page
              </a>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    </main>
    </Layout>
    </>
  );
};