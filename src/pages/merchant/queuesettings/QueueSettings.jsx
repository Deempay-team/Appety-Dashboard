import { useState, useEffect, useRef } from "react";
import Layout from "../../../components/MerchantLayout";
import axios from "axios";

const column = [
  "Queue",
  "Pax (Min)",
  "Pax (Max)",
  "Waiting Time",
  "Action",
];

const QueueSettingsPage = () => {
  const modalRef = useRef();
  const [isDropDown, setIsDropDown] = useState(false);

  const closeDropDown = (e) => {
    if (modalRef.current === e.target) {
      setIsDropDown(false);
    }
  };



const [data, setData] = useState([])

  useEffect(() => {
    axios.get('http://localhost:3000/users')
    .then(res => setData(res.data))
    .catch(err => console.log(err));
  })


  return (
    <>
      <Layout className="bg-[red]">
        <main className="ml-[350px] px-10 pt-10 bg-[#F6F7F9] h-screen">
        <div className=" overflow-x-scroll overflow-y-hidden sm:overflow-x-auto sm:overflow-y-auto rounded-[10px]  ">
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
          <tbody className=" border-b border-solid border-[#d7d7d7] " >
            {/* {data.map((transaction, i) => ( */}
            <tr
              className="  hover:bg-[#e4e6e9] odd:bg-[#ffffff] even:bg-[#f7f7f7]"
              //key={i}
            >
              <td className="text_16 px-2 py-5 capitalize">Q2</td>
              <td className="text_16 px-2 py-5">1</td>
              <td className="text_16 px-2 py-5">2</td>
              <td className="text_16 px-2 py-5">20 Mins</td>
              <td className="text_16 px-2 py-5 underline">
                <span onClick={() => setIsDropDown(true)} className="cursor-pointer reltive">More</span>
                {isDropDown ? (
                <>
                  <div 
                  isDropDown={isDropDown}
                   //ref={modalRef} 
                   //onClick={closeDropDown} 
                   className="absolute right-[4%] top-[31%] z-10 mt-2 w-[120px] origin-top-right divide-y divide-[#D9D9D9] rounded-md bg-[#ffffff] border border-[#D9D9D9] focus:outline-none">
                    <a href>
                    <div className="py-3 text-center">
                        <p className="cursor-pointer block px-4 py-2 text_16 text-[#33B469]">
                          Edit
                        </p>
                    </div>
                    </a>

                 <a href>
                 <div className="py-3 text-center">
                      <p
                       // onClick={handleLogout}
                        className="cursor-pointer block px-4 py-2 text_16 text-[#ff0000]"
                      >
                        Remove
                      </p>
                    </div>
                 </a>
                  </div>
                </>
              ) : null}
              </td>
            </tr>
            {/* ))} */}
          </tbody>

          <tbody className=" border-b border-solid border-[#d7d7d7] " >
            {/* {data.map((transaction, i) => ( */}
            <tr
              className="  hover:bg-[#e4e6e9] odd:bg-[#ffffff] even:bg-[#f7f7f7]"
              //key={i}
            >
              <td className="text_16 px-2 py-5 capitalize">Q2</td>
              <td className="text_16 px-2 py-5">1</td>
              <td className="text_16 px-2 py-5">2</td>
              <td className="text_16 px-2 py-5">20 Mins</td>
              <td className="text_16 px-2 py-5 underline">
                More
              </td>
            </tr>
            {/* ))} */}
          </tbody>

          <tbody className=" border-b border-solid border-[#d7d7d7]" >
            {/* {data.map((transaction, i) => ( */}
            <tr
              className="  hover:bg-[#e4e6e9] odd:bg-[#ffffff] even:bg-[#f7f7f7]"
              //key={i}
            >
              <td className="text_16 px-2 py-5 capitalize">Q1</td>
              <td className="text_16 px-2 py-5">1</td>
              <td className="text_16 px-2 py-5">2</td>
              <td className="text_16 px-2 py-5">20 Mins</td>
              <td className="text_16 px-2 py-5 underline">
                More
              </td>
            </tr>
            {/* ))} */}
          </tbody>

          <tbody>
            <tr
              className="  hover:bg-[#e4e6e9] odd:bg-[#ffffff] even:bg-[#f7f7f7]"
              //key={i}
            >
              <td className="text_16 px-2 py-5 capitalize">Q1</td>
              <td className="text_16 px-2 py-5">1</td>
              <td className="text_16 px-2 py-5">2</td>
              <td className="text_16 px-2 py-5">20 Mins</td>
              <td className="text_16 px-2 py-5 underline">
                More
              </td>
            </tr>
            {/* ))} */}
          </tbody>
          
        </table>
      </div>




      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
            {
              data.map((user, index) => (
                <tr key={index}>
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.id}</td>
                </tr>
              ))
            }
        </tbody>
      </table>


   
        </main>
      </Layout>
    </>
  );
};

export default QueueSettingsPage;
