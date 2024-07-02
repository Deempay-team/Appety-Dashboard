export const TvTable = ({ column, data, }) => {
  return (
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
            className="  hover:bg-[#e4e6e9] odd:bg-[#ffffff] even:bg-[#f7f7f7]"
            //key={i}
          >
            <td className="text_16 px-2 py-5">30</td>
            <td className="text_16 px-2 py-5">50</td>
          </tr>
        </tbody>
        <tbody className="border border-[#d7d7d7]">
          <tr
            className="  hover:bg-[#e4e6e9] odd:bg-[#ffffff] even:bg-[#f7f7f7]"
            //key={i}
          >
            <td className="text_16 px-2 py-5">30</td>
            <td className="text_16 px-2 py-5">50</td>
          </tr>
        </tbody>
        <tbody className="border border-[#d7d7d7] ">
          <tr
            className="  hover:bg-[#e4e6e9] odd:bg-[#ffffff] even:bg-[#f7f7f7]"
            //key={i}
          >
            <td className="text_16 px-2 py-5">30</td>
            <td className="text_16 px-2 py-5">50</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
