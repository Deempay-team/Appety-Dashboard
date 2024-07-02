 
 import React, { useState, useEffect } from "react";
 import { useFieldArray, useForm } from "react-hook-form";
 
 //import { Notify } from "../../components/notification";
 
 
 export const LinkSettingsTable = ({ column, data, link }) => {
   
   return (
   <div className=" overflow-x-scroll overflow-y-hidden sm:overflow-x-auto sm:overflow-y-auto rounded-lg border border-solid border-[#d7d7d7] ">
      <table className=" w-full text-base text-center py-14 border-collapse ">
        <thead className="text-base text-[#000000] font-medium capitalize bg-[#f7f7f7] ">
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
            <td className="text_16 px-2 py-7 capitalize">Monday</td>
            <td className="text_16 px-2 py-7">Female</td>
            <td className="text_16 px-2 py-7">Jude</td>
            <td className="text_16 px-2 py-7 capitalize">
            Grace
            </td>
          </tr>
          {/* ))} */}
        </tbody>
      </table>
    </div>    
  );
};
