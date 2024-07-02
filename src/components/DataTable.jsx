 
 import React, { useState, useEffect } from "react";
 import { useFieldArray, useForm } from "react-hook-form";
 
 //import { Notify } from "../../components/notification";
 
 
 export const DataTable = ({ column, data, link }) => {
   
   return (
   <div className=" overflow-x-scroll overflow-y-hidden sm:overflow-x-auto sm:overflow-y-auto rounded-lg border border-solid border-[#d7d7d7] ">
      <table className=" w-full text-base text-center py-14 border-collapse ">
        <thead className="text_14 capitalize bg-[#f7f7f7] ">
        {column.map((header, i) => (
            <th scope="col" className="py-7 px-8 border-b border-solid border-[#d7d7d7]" key={i}>
              {header}
            </th>
            ))}
        </thead>
        <tbody>
        {/* {data.map((transaction, i) => ( */}
          <tr className="hover:bg-[#e4e6e9] odd:bg-[#ffffff] even:bg-[#f7f7f7]"
          //key={i}
          >
            <td className="text_16 px-2 py-7">
              <span className="bg-[#eee] rounded-[5px] px-[13px] py-[6px]">Q1</span>
            </td>
            <td className="text_16 px-2 py-7">108</td>
            <td className="text_16 px-2 py-7">10</td>
            <td className="text_16 px-2 py-7">
            5
            </td>
          </tr>
          {/* ))} */}
        </tbody>
      </table>
    </div>    
  );
};
