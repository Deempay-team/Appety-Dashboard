import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { UserContext } from "../../contexts/UserContext";
import axios from "axios";
import QRCode from "qrcode.react";
import { FaUserCircle } from "react-icons/fa";
import secrets from "../../config/secrets";
import ReactPlayer from "react-player";
import { SpinnerOrange } from "../../components/spinner/Spinner";
import { AppetyLogoMedium } from "../../assests/icons/Icons";

import "./styles.css";

const column = ["Pax", "Next In Line"];

export const TvPage = () => {
  const { isTableAvail, setIsTableAvail } = useContext(UserContext);
  const { monitorUrl } = useParams();
  const baseURL = secrets.baseURL;
  const [linkUrl, setLinkUrl] = useState("");
  const [adsVideoUrl, setAdsVideoUrl] = useState("");
  const [imageLoaded, setImageLoaded] = useState(false);
  const [merchName, setMerchName] = useState("");
  const [logoUrl, setLogoUrl] = useState("");
  const [summaryList, setSummaryList] = useState([]);
  const [isMonitorFetch, setIsMonitorFetch] = useState(true);
  const [nextCalled, setNextCalled] = useState("-");
  const [nextCalledPosition, setNextCalledPosition] = useState(-1);
  const [callList, setCallList] = useState([]);
  const [callListSaved, setCallListSaved] = useState([]);
  const [callTimer, setCallTime] = useState(0);
  const [callInterval, setCallInterval] = useState(10000);
  const [currentTime, setCurrentTime] = useState("");
  const [currentDate, setCurrentDate] = useState("");
  const [calltimer1, setCallTimer1] = useState(0);

  var timeOutId;

  useEffect(() => {
    let timer1 = 0;
    setInterval(function () {
      timer1 += 1;
      setCallTimer1(timer1);
    }, 10000);
  }, []);

  useEffect(() => {
    return () => {
      let timeRun = new Date().toLocaleTimeString("en-us", {
        hour: "2-digit",
        minute: "2-digit",
      });

      let dateRun = new Date().toLocaleDateString("en-us", {
        year: "numeric",
        month: "numeric",
        day: "numeric",
      });
      setCurrentTime(timeRun);
      setCurrentDate(dateRun);
    };
  }, [calltimer1]);

  //API CALL FOR THE USER TO SEE MERCHANT DETAILS
  let timer = 0;
  useEffect(() => {
    timer += 1;
    axios
      .get(`${baseURL}api/v1/link/fetch/monitor/${monitorUrl}`)
      .then(function (res) {
        if (res?.data?.code === "000000") {
          if (res?.data?.data?.tableAvailable === "0") {
            setIsTableAvail(false);
          } else {
            setIsTableAvail(true);
          }
          setIsMonitorFetch(false);
          const tvData = res?.data?.data;
          setLogoUrl(tvData?.logoUrl);
          setMerchName(tvData?.merchName);
          setLinkUrl(tvData?.linkUrl);
          setAdsVideoUrl(tvData?.adsVideoUrl);
          setSummaryList(tvData?.summary);

          handleStartTimer();
          let listNext = [];
          for (let i = 0; i < tvData?.summary.length; i++) {
            if (tvData?.summary[i].nextWaitCalled === "1") {
              listNext[i] = tvData?.summary[i].nextInLine;
            }
          }
          setCallList(listNext);
          setCallTime(timer);
        }
      })
      .catch(function (error) {
        console.log("log-error", error);
      });
  }, []);

  const handleStartTimer = () => {
    timeOutId = setInterval(function () {
      timer += 1;
      axios
        .get(`${baseURL}api/v1/link/fetch/monitor/${monitorUrl}`)
        .then(function (res) {
          if (res?.data?.code === "000000") {
            if (res?.data?.data?.tableAvailable === "0") {
              setIsTableAvail(false);
            } else {
              setIsTableAvail(true);
            }
            setIsMonitorFetch(false);
            const tvData = res?.data?.data;
            setLogoUrl(tvData?.logoUrl);
            setMerchName(tvData?.merchName);
            setLinkUrl(tvData?.linkUrl);
            setAdsVideoUrl(tvData?.adsVideoUrl);
            setSummaryList(tvData?.summary);

            let listNext = [];
            for (let i = 0; i < tvData?.summary.length; i++) {
              if (tvData?.summary[i].nextWaitCalled === "1") {
                listNext[i] = tvData?.summary[i].nextInLine;
              }
            }
            setCallList(listNext);
            setCallTime(timer);
          }
        })
        .catch(function (error) {
          console.log("log-error", error);
        });
    }, callInterval);
  };

  useEffect(() => {
    if (callTimer) {
      let calledTotal = 0;

      let calledList = [];

      for (let i = 0; i < summaryList.length; i++) {
        if (summaryList[i].nextWaitCalled === "1") {
          calledList.push(summaryList[i].nextInLine);
        }
      }

      let newCalled = "";
      let newCalledPosition = 0;

      for (let i = 0; i < callList.length; i++) {
        if (callList[i] && !callListSaved.includes(callList[i])) {
          newCalled = callList[i];
          newCalledPosition = i;
        }
      }
      setCallListSaved(calledList);

      if (newCalled) {
        calledTotal = 1;
        setNextCalled(newCalled);
        setNextCalledPosition(-1);
      } else {
        for (let i = 0; i < calledList.length; i++) {
          calledTotal += 1;
          if (i === nextCalledPosition) {
            continue;
          } else {
            if (i < nextCalledPosition) {
              continue;
            } else {
              if (i === calledList.length - 1) {
                setNextCalled(calledList[i]);
                setNextCalledPosition(-1);
                break;
              } else {
                setNextCalled(calledList[i]);
                setNextCalledPosition(i);
                break;
              }
            }
          }
        }
      }

      if (calledTotal === 0) {
        setNextCalled("-");
        setNextCalledPosition(-1);
      }
    }
  }, [callTimer]);

  const qrcode = (
    <QRCode
      id="qrCodeId"
      size={250}
      value={`https://queue.appety.com.sg/user/${linkUrl}`}
      bgColor="white"
      fqColor="black"
      level="H"
    />
  );

  return (
    <>
      {isMonitorFetch ? (
        <>
          <span className="flex items-center justify-center content-center pb-30 h-screen ">
            <SpinnerOrange />
          </span>
        </>
      ) : (
        <>
          <div className="z-20 border-b top-0 border-[#D9D9D9] sticky w-full bg-[#F6F7F9] px-10 py-4">
            <div className="flex justify-between">
              <div className="flex items-center">
                <img
                  src={`${baseURL}api/v1/user/logo/${logoUrl}`}
                  alt="User avatar"
                  className={`${
                    imageLoaded
                      ? "visible rounded-full h-[50px] w-[50px]"
                      : "hidden rounded-full h-[50px] w-[50px]"
                  }`}
                  onLoad={() => setImageLoaded(true)}
                />
                {!imageLoaded && (
                  <FaUserCircle
                    size={50}
                    style={{
                      display: "flex",
                      alignSelf: "center",
                      opacity: 0.25,
                      cursor: "pointer",
                    }}
                  />
                )}
                <p className="font-semibold xl:text-[32px] text-[24px] text-black pl-3 capitalize">
                  {merchName}
                </p>
              </div>
              <div className="flex ">
                <span className="lg:flex hidden gray2-bg opacity-90 items-center rounded-[5px] place-self-center py-[15px] px-[16px] text_16">
                  <p className="">{currentDate}</p>
                  <div class="h-5 mx-4 border-[0.5px] border-[#000000]"></div>
                  <p className="">{currentTime}</p>
                </span>
                <div className="flex ml-8 items-center justify-center text-base">
                  <p className="text-center pr-2">Powered By</p>
                  <AppetyLogoMedium />
                </div>
              </div>
            </div>
          </div>

          {isTableAvail ? (
            <>
              <div className="grid grid-cols-3 gap-4 px-10 pt-10 pb-20 bg-[#F6F7F9] relative h-fit">
                <div className="bg-[#F6F7F9] h-[350px] rounded-l-[5px] grid ">
                  <h1 className="text-center pt-[58px] font-bold absolute text-[80px] text-[#000000]">
                    Come Upstairs 
                  </h1>
                  <h1 className="text-center pt-[170px] font-bold absolute text-[80px] text-[#000000]">
                    The Table is Free
                  </h1>
                </div>
                <div className="bg-[#F6F7F9] h-[350px] rounded-r-[5px]"></div>

                <div className="bg-[] h-[720px] row-span-2">
                  <ReactPlayer
                    url={adsVideoUrl}
                    width="100%"
                    height="720px"
                    playing={true}
                    loop={true}
                  />
                </div>
                <div className="bg-[#ffffff] h-[350px] col-span-2 rounded-[5px]">
                  <div className="flex items-center justify-between pl-[40px] pr-[70px]">
                    <div className="grid 2xl:mr-[70px] mr-[50px] pt-4">
                      <p className="text-[#000000] 2xl:max-w-full  max-w-[500px] adjust-text ">
                        Scan for a Queue Number. Keep the browser open for
                        notifications. If you close it, scan again and enter
                        your mobile number to retrieve your queue number.
                      </p>
                      <p className="text-[#000000]  2xl:max-w-full  max-w-[500px] adjust-text">
                        대기 번호를 스캔하고 브라우저를 닫지 마세요. 브라우저를
                        닫으면 다시 스캔하고 휴대폰 번호를 입력하세요.
                      </p>
                      <p className="text-[#000000] 2xl:max-w-full max-w-[500px] adjust-text">
                        扫描排队号码，勿关闭浏览器。关闭浏览器后，请再次扫描并输入手机号码。
                      </p>
                    </div>
                    <section className="mt-6">{qrcode}</section>
                  </div>
                </div>
                <div className="bg-[#eb9292] h-[350px] hidden"></div>
                <div className="bg-[#5e5eca] h-80 hidden"></div>
                <div className="bg-[red] h-80 hidden"></div>
                <div className="bg-[blue] h-80 hidden"></div>
              </div>
            </>
          ) : (
            <>
              <div className="grid grid-cols-3 gap-4 px-10 pt-10 pb-20 bg-[#F6F7F9] h-fit">
                <div className="bg-[#ffffff] h-[350px] rounded-[5px]">
                  <div className="p-4">
                    <div className=" overflow-x-scroll overflow-y-hidden sm:overflow-x-auto sm:overflow-y-auto rounded-[5px]  ">
                      <table className=" w-full text-base text-center py-1  ">
                        <thead className="text_24 font-normal  capitalize bg-[#ffffff] ">
                          {column.map((header, i) => (
                            <th
                              scope="col"
                              className="py-2 px-2 font-normal border-b-[0.5px] border-[#d7d7d7]"
                              key={i}
                            >
                              {header}
                            </th>
                          ))}
                        </thead>

                        {summaryList.map((list, i) => (
                          <tbody className="border-t-[0.5] pt-2 border-[#d7d7d7]">
                            <tr className="bg-[#ffffff]" key={i}>
                              <td className="text-[32px] text-[#000] px-2 py-4">
                                {list.paxRange}
                              </td>
                              <td className="text-[32px] text-[#000] px-2 py-4">
                                {list.nextInLine}
                              </td>
                            </tr>
                          </tbody>
                        ))}
                      </table>
                    </div>
                  </div>
                </div>
                <div className="bg-[#ffffff] h-[350px] rounded-[5px]">
                  <span>
                    <h2 className="text-center pt-[58px] text-[30px] text-[#000000] font-normal">
                      Calling
                    </h2>
                    <h3 className="text-center text-[120px] mt-[-2rem] text-[#000000] font-semibold">
                      {nextCalled}
                    </h3>
                    <p className="text-center text-[27px] mt- text-[#000000] font-[300px]">
                      Please Proceed Inside
                    </p>
                  </span>
                </div>
                <div className="bg-[] h-[720px] row-span-2">
                  <ReactPlayer
                    url={adsVideoUrl}
                    width="100%"
                    height="720px"
                    playing={true}
                    loop={true}
                  />
                </div>
                <div className="bg-[#ffffff] h-[350px] col-span-2 rounded-[5px]">
                  <div className="flex items-center justify-between pl-[40px] pr-[70px]">
                    <div className="grid 2xl:mr-[70px] mr-[50px] pt-4">
                      <p className="text-[#000000] 2xl:max-w-full  max-w-[500px] adjust-text ">
                        Scan for a Queue Number. Keep the browser open for
                        notifications. If you close it, scan again and enter
                        your mobile number to retrieve your queue number.
                      </p>
                      <p className="text-[#000000]  2xl:max-w-full  max-w-[500px] adjust-text">
                        대기 번호를 스캔하고 브라우저를 닫지 마세요. 브라우저를
                        닫으면 다시 스캔하고 휴대폰 번호를 입력하세요.
                      </p>
                      <p className="text-[#000000] 2xl:max-w-full max-w-[500px] adjust-text">
                        扫描排队号码，勿关闭浏览器。关闭浏览器后，请再次扫描并输入手机号码。
                      </p>
                    </div>
                    <section className="mt-6">{qrcode}</section>
                  </div>
                </div>
                <div className="bg-[#eb9292] h-[350px] hidden"></div>
                <div className="bg-[#5e5eca] h-80 hidden"></div>
                <div className="bg-[red] h-80 hidden"></div>
                <div className="bg-[blue] h-80 hidden"></div>
              </div>
            </>
          )}
        </>
      )}
    </>
  );
};
