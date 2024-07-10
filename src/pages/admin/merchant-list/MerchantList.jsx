import { useState } from 'react';
import Layout from '../../../components/MerchantLayout';
import { PlusIconWhite } from "../../../assests/icons/Icons";
import { AdminMerchantTable } from "../../../components/AdminMerchantTable"

const column = ["Restaurant Name", "Total Customers", "Total Queues", "Active Users", "Total Pax", "Status", "Action"];

export const AdminMerchantListPage = () => {
  
  return (
    <>
    <Layout>
    <main className="xl:ml-[370px] ml-[320px]  sm:px-10 px-6 bg-[#F6F7F9] h-screen">
    <div className="pb-4 pt-10 flex justify-between">
            <h2 className="text_18 ">Merchants</h2>
            <div>
              <span className="lg:flex hidden  items-center justify-center py-3 bg-[#F99762] px-6 rounded-[5px] cursor-pointer">
                <PlusIconWhite />
                <p className="text_16 pl-2 text-[#ffffff]">
                  Create Merchant
                </p>
              </span>
            </div>
          </div>

          <div className="">
          <AdminMerchantTable
               column={column}
               //data={transactions}
          />
        </div>
    </main>
    </Layout>
    </>
  );
};