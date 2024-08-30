import { useState, useEffect, useRef } from "react";
import Layout from "../../../components/superAdminLayout";
import { StoreImage, PeopleImage, QueueImage } from "../../../assests/images";
import { formatNumberWithCommas } from "../../../utils/functions";
import { DownLoadIconWhite } from "../../../assests/icons/Icons";
import axios from "axios";
import { CSVLink } from "react-csv";
import { currentDate, currentTime } from "../../../utils/functions";
import { formatDate, formatDateT } from "../../../utils/functions";
import {
  SpinnerOrange,
  SpinnerWhite,
} from "../../../components/spinner/Spinner";
import secrets from "../../../config/secrets";
import storage from "../../../utils/storage";

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
  const baseURL = secrets.baseURL;
  const exportQueueRef = useRef(null);
  const [isQueueFetch, setIsQueueFetch] = useState(true);
  const merchId = JSON.parse(storage.fetch("userDetails")).userId;
  const [exportQueues, setExportQueues] = useState([]);
  const [queueList, setQueueList] = useState([]);
  const [isExporting, setIsExporting] = useState(false);
  const [totalMerchs, setTotalMerchs] = useState("");
  const [totalCustomers, setTotalCustomers] = useState("");
  const [totalQueue, setTotalQueue] = useState("");
  const [totalServedQueue, setTotalServedQueue] = useState("");

  //CALL QUERY QUEUE API
  useEffect(() => {
    axios
      .get(`${baseURL}api/v1/wait/superadmin/query?merchId=${merchId}`)
      .then(function (res) {
        if (res?.data?.code === "000000") {
          setQueueList(res?.data?.data);
          setIsExporting(false);
          setIsQueueFetch(false);
        }
      })
      .catch(function (error) {
        console.log("queue-error", error);
      });
  }, []);

  //CALL QUERY SUPERADMIN SUMMARY API
  useEffect(() => {
    axios
      .get(`${baseURL}api/v1/wait/superadmin/summary?superAdminId=${merchId}`)
      .then(function (res) {
        if (res?.data?.code === "000000") {
          setTotalMerchs(res?.data?.data?.totalMerchs);
          setTotalCustomers(res?.data?.data?.totalCustomers);
          setTotalQueue(res?.data?.data?.totalQueue);
          setTotalServedQueue(res?.data?.data?.totalServedQueue);
        }
      })
      .catch(function (error) {
        console.log("queue-error", error);
      });
  }, []);

  //CALL QUERY QUEUE FOR DOWNLOAD
  const exportQueueDetails = () => {
    setIsExporting(true);
    axios
      .get(`${baseURL}api/v1/wait/superadmin/query?merchId=${merchId}`)
      .then(function (res) {
        if (res?.data?.code === "000000") {
          const formattedQueue = res?.data?.data.map((q) => {
            return {
              customerIdentificationNo: q.cusId,
              restaurantName: q.waitMerchName,
              customerName: q.cusName,
              customerPhone: q.cusPhone,
              registeredTime: formatDate(q.createTime),
              timeEnded: formatDate(q.updateTime),
              customerStatus: q.status,
              customerEmail: q.email,
              queueNumber: q.waitNo,
            };
          });
          setExportQueues(formattedQueue);
          setTimeout(() => {
            exportQueueRef.current.link.click();
          }, 300);
          setIsExporting(false);
        }
      })
      .catch(function (error) {
        console.log("download-error", error);
      });
  };

  return (
    <>
      <Layout>
        <main className="xl:ml-[370px] ml-[320px]  sm:px-10 px-6 bg-[#F6F7F9] h-fit">
          {isQueueFetch ? (
            <>
              <span className="flex items-center justify-center content-center pb-40 h-screen ">
                <SpinnerOrange />
              </span>
            </>
          ) : (
            <>
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
                          {formatNumberWithCommas(totalMerchs)}
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
                          {formatNumberWithCommas(totalCustomers)}
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
                          {formatNumberWithCommas(totalQueue)}
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
                        Served Queue
                        </p>
                        <p className="text_24 text-[#000000] font-medium pt-2 ">
                          {formatNumberWithCommas(totalServedQueue)}
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
                <h2 className="text_18 items-center justify-center flex">
                  Queue
                </h2>
                <div>
                  <CSVLink
                    data={exportQueues}
                    filename={`Queue_Report_${currentDate}${currentTime}`}
                    ref={exportQueueRef}
                  ></CSVLink>
                  <span
                    onClick={exportQueueDetails}
                    className="lg:flex hidden  items-center justify-center py-3 bg-[#F99762] w-[235px] rounded-[5px] cursor-pointer"
                  >
                    {isExporting ? (
                      <SpinnerWhite />
                    ) : (
                      <>
                        <DownLoadIconWhite />
                        <p className="text_16 pl-2 text-[#ffffff]">
                          Download Queue Data
                        </p>
                      </>
                    )}
                  </span>
                </div>
              </div>

              <div className=" overflow-x-scroll overflow-y-hidden xl:overflow-x-auto xl:overflow-y-auto rounded-[5px] pb-12 ">
                <table className=" w-full text-base text-center py-1  border-collapse ">
                  <thead className="text_16 font-normal capitalize bg-[#ffffff] ">
                    {column.map((header, i) => (
                      <th
                        scope="col"
                        className="py-5 px-3 font-normal "
                        key={i}
                      >
                        {header}
                      </th>
                    ))}
                  </thead>
                  <tbody className="">
                    {queueList.map((list, i) => (
                      <tr
                        className="bg-[#ffffff] border-t-[0.3px] border-solid border-[#d7d7d7]"
                        key={i}
                      >
                        <td className="text_16 px-2 py-5 capitalize">
                          {list.waitMerchName}
                        </td>
                        <td className="text_16 px-2 py-5">{list.cusName}</td>
                        <td className="text_16 px-2 py-5">{list.cusPhone}</td>
                        <td className="text_16 px-2 py-5">
                          {formatDateT(list.createTime)}
                        </td>
                        <td className="text_16 px-2 py-5">
                          {formatDateT(list.updateTime)}
                        </td>
                        <td className="text_16 px-2 py-5">{list.status}</td>
                        <td className="text_16 px-2 py-5">{list.waitNo}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </main>
      </Layout>
    </>
  );
};
