 
 import React, { useState, useEffect } from "react";
 import { useFieldArray, useForm } from "react-hook-form";
import { addSpace } from "../utils/functions";
 
 //import { Notify } from "../../components/notification";
 
 
 export const AdminHomeTable = ({ column, data, link }) => {
   
   return (
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
              className="  hover:bg-[#e4e6e9] odd:bg-[#ffffff] even:bg-[#f7f7f7]"
              //key={i}
            >
              <td className="text_16 px-2 py-5 capitalize">The place</td>
              <td className="text_16 px-2 py-5">30</td>
              <td className="text_16 px-2 py-5">{addSpace("+6578902345")}</td>
              <td className="text_16 px-2 py-5">20 Mins</td>
              <td className="text_16 px-2 py-5">40</td>
              <td className="text_16 px-2 py-5">served</td>
              <td className="text_16 px-2 py-5">20</td>
            </tr>
            {/* ))} */}
          </tbody>
          
        </table>
      </div>   
  );
};
