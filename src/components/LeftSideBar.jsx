import React from "react";
import { currentDate, currentTime } from "../utils/functions";

const LeftSideBar = () => {
  return (
    <div className="relative">
      <div className="w-[362px] sticky left-0 top-0 overflow-y-auto bg-[#eee]">
        <div className="flex items-center  border-r border-[#c4c4c4] top-0 relative ">
          <div className=" grid mx-auto justify-center items-center mt-8 ">
{/*             
            <div class="py-6 pl-5 text-[#6b6968] rounded-lg   bg-[#e0e0e0] w-[285px]  mb-6">
              <div className="pb-9 grid grid-cols-2	">
                <div>
                  <p className="text_12 text-[#6b6968] capitalize ">Name</p>
                  <p className="text_16 text-[#000000] capitalize ">Kingsley</p>
                </div>
                <div>
                  <p className="text_12 text-[#6b6968] capitalize ">
                    Phone Number
                  </p>
                  <p className="text_16 text-[#000000] ">+65 8823 3004</p>
                </div>
              </div>

              <div className="pb-9 grid grid-cols-2">
                <div>
                  <p className="text_12 text-[#6b6968] capitalize ">Pax</p>
                  <p className="text_16 text-[#000000] ">2 Pax</p>
                </div>
                <div>
                  <p className="text_12 text-[#6b6968] capitalize ">Status</p>
                  <p className="text_16 text-[#000000] capitalize ">Waiting</p>
                </div>
              </div>

              <div className="grid grid-cols-2	">
                <div>
                  <p className="text_12 text-[#6b6968] capitalize ">
                    Queue Number
                  </p>
                  <p className="text_16 text-[#000000] ">102</p>
                </div>
                <div>
                  <p className="text_12 text-[#6b6968] ">Date/Time</p>
                  <p className="text_16 text-[#000000]">{currentDate} </p>
                </div>
              </div>
            </div> */}

            {/* <div class="py-6 pl-5 text-[#6b6968] rounded-lg   bg-[#e0e0e0] w-[285px]  mb-6">
              <div className="pb-9 grid grid-cols-2	">
                <div>
                  <p className="text_12 text-[#6b6968] capitalize ">Name</p>
                  <p className="text_16 text-[#000000] capitalize ">James</p>
                </div>
                <div>
                  <p className="text_12 text-[#6b6968] capitalize ">
                    Phone Number
                  </p>
                  <p className="text_16 text-[#000000] ">658 823 3004</p>
                </div>
              </div>

              <div className="pb-9 grid grid-cols-2">
                <div>
                  <p className="text_12 text-[#6b6968] capitalize ">Pax</p>
                  <p className="text_16 text-[#000000] ">20 Pax</p>
                </div>
                <div>
                  <p className="text_12 text-[#6b6968] capitalize ">Status</p>
                  <p className="text_16 text-[#000000] capitalize ">Waiting</p>
                </div>
              </div>

              <div className="grid grid-cols-2	">
                <div>
                  <p className="text_12 text-[#6b6968] capitalize ">
                    Queue Number
                  </p>
                  <p className="text_16 text-[#000000] ">201</p>
                </div>
                <div>
                  <p className="text_12 text-[#6b6968] ">Date/Time</p>
                  <p className="text_16 text-[#000000]">{currentDate} </p>
                </div>
              </div>
            </div>

            <div class="py-6 pl-5 text-[#6b6968] rounded-lg   bg-[#e0e0e0] w-[285px]  mb-6">
            <div className="pb-9 grid grid-cols-2	">
              <div>
                <p className="text_12 text-[#6b6968] capitalize ">Name</p>
                <p className="text_16 text-[#000000] capitalize ">James</p>
              </div>
              <div>
                <p className="text_12 text-[#6b6968] capitalize ">
                  Phone Number
                </p>
                <p className="text_16 text-[#000000] ">658 823 3004</p>
              </div>
            </div>
            <div className="pb-9 grid grid-cols-2">
              <div>
                <p className="text_12 text-[#6b6968] capitalize ">Pax</p>
                <p className="text_16 text-[#000000] ">20 Pax</p>
              </div>
              <div>
                <p className="text_12 text-[#6b6968] capitalize ">Status</p>
                <p className="text_16 text-[#000000] capitalize ">Waiting</p>
              </div>
            </div>
            <div className="grid grid-cols-2	">
              <div>
                <p className="text_12 text-[#6b6968] capitalize ">
                  Queue Number
                </p>
                <p className="text_16 text-[#000000] ">201</p>
              </div>
              <div>
                <p className="text_12 text-[#6b6968] ">Date/Time</p>
                <p className="text_16 text-[#000000]">{currentDate} </p>
              </div>
            </div>
          </div> */}

            <div class="py-6 pl-5 text-[#6b6968] rounded-lg   bg-[#e0e0e0] w-[285px]  mb-6">
              <div className="pb-9 grid grid-cols-2	">
                <div>
                  <p className="text_12 text-[#6b6968] capitalize ">Name</p>
                  <p className="text_16 text-[#000000] capitalize ">James</p>
                </div>
                <div>
                  <p className="text_12 text-[#6b6968] capitalize ">
                    Phone Number
                  </p>
                  <p className="text_16 text-[#000000] ">658 823 3004</p>
                </div>
              </div>

              <div className="pb-9 grid grid-cols-2">
                <div>
                  <p className="text_12 text-[#6b6968] capitalize ">Pax</p>
                  <p className="text_16 text-[#000000] ">20 Pax</p>
                </div>
                <div>
                  <p className="text_12 text-[#6b6968] capitalize ">Status</p>
                  <p className="text_16 text-[#000000] capitalize ">Waiting</p>
                </div>
              </div>

              <div className="grid grid-cols-2	">
                <div>
                  <p className="text_12 text-[#6b6968] capitalize ">
                    Queue Number
                  </p>
                  <p className="text_16 text-[#000000] ">201</p>
                </div>
                <div>
                  <p className="text_12 text-[#6b6968] ">Date/Time</p>
                  <p className="text_16 text-[#000000]">{currentDate} </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>


      

      <div className="w-[362px] absolute right-[0%] justify-end top-[0%] overflow-y-auto bg-[#eee]">
      <div className="flex items-center  border-l border-[#c4c4c4] top-0 relative ">
        <div className=" grid mx-auto justify-center items-center mt-8 ">

          <div class="py-6 pl-5 text-[#6b6968] rounded-lg   bg-[#e0e0e0] w-[285px]  mb-6">
            <div className="pb-9 grid grid-cols-2	">
              <div>
                <p className="text_12 text-[#6b6968] capitalize ">Name</p>
                <p className="text_16 text-[#000000] capitalize ">Kingsley</p>
              </div>
              <div>
                <p className="text_12 text-[#6b6968] capitalize ">
                  Phone Number
                </p>
                <p className="text_16 text-[#000000] ">+65 8823 3004</p>
              </div>
            </div>

            <div className="pb-9 grid grid-cols-2">
              <div>
                <p className="text_12 text-[#6b6968] capitalize ">Pax</p>
                <p className="text_16 text-[#000000] ">2 Pax</p>
              </div>
              <div>
                <p className="text_12 text-[#6b6968] capitalize ">Status</p>
                <p className="text_16 text-[#000000] capitalize ">Waiting</p>
              </div>
            </div>

            <div className="grid grid-cols-2	">
              <div>
                <p className="text_12 text-[#6b6968] capitalize ">
                  Queue Number
                </p>
                <p className="text_16 text-[#000000] ">102</p>
              </div>
              <div>
                <p className="text_12 text-[#6b6968] ">Date/Time</p>
                <p className="text_16 text-[#000000]">{currentDate} </p>
              </div>
            </div>
          </div>

          {/* <div class="py-6 pl-5 text-[#6b6968] rounded-lg   bg-[#e0e0e0] w-[285px]  mb-6">
            <div className="pb-9 grid grid-cols-2	">
              <div>
                <p className="text_12 text-[#6b6968] capitalize ">Name</p>
                <p className="text_16 text-[#000000] capitalize ">James</p>
              </div>
              <div>
                <p className="text_12 text-[#6b6968] capitalize ">
                  Phone Number
                </p>
                <p className="text_16 text-[#000000] ">658 823 3004</p>
              </div>
            </div>

            <div className="pb-9 grid grid-cols-2">
              <div>
                <p className="text_12 text-[#6b6968] capitalize ">Pax</p>
                <p className="text_16 text-[#000000] ">20 Pax</p>
              </div>
              <div>
                <p className="text_12 text-[#6b6968] capitalize ">Status</p>
                <p className="text_16 text-[#000000] capitalize ">Waiting</p>
              </div>
            </div>

            <div className="grid grid-cols-2	">
              <div>
                <p className="text_12 text-[#6b6968] capitalize ">
                  Queue Number
                </p>
                <p className="text_16 text-[#000000] ">201</p>
              </div>
              <div>
                <p className="text_12 text-[#6b6968] ">Date/Time</p>
                <p className="text_16 text-[#000000]">{currentDate} </p>
              </div>
            </div>
          </div>

          <div class="py-6 pl-5 text-[#6b6968] rounded-lg   bg-[#e0e0e0] w-[285px]  mb-6">
            <div className="pb-9 grid grid-cols-2	">
              <div>
                <p className="text_12 text-[#6b6968] capitalize ">Name</p>
                <p className="text_16 text-[#000000] capitalize ">James</p>
              </div>
              <div>
                <p className="text_12 text-[#6b6968] capitalize ">
                  Phone Number
                </p>
                <p className="text_16 text-[#000000] ">658 823 3004</p>
              </div>
            </div>

            <div className="pb-9 grid grid-cols-2">
              <div>
                <p className="text_12 text-[#6b6968] capitalize ">Pax</p>
                <p className="text_16 text-[#000000] ">20 Pax</p>
              </div>
              <div>
                <p className="text_12 text-[#6b6968] capitalize ">Status</p>
                <p className="text_16 text-[#000000] capitalize ">Waiting</p>
              </div>
            </div>

            <div className="grid grid-cols-2	">
              <div>
                <p className="text_12 text-[#6b6968] capitalize ">
                  Queue Number
                </p>
                <p className="text_16 text-[#000000] ">201</p>
              </div>
              <div>
                <p className="text_12 text-[#6b6968] ">Date/Time</p>
                <p className="text_16 text-[#000000]">{currentDate} </p>
              </div>
            </div>
          </div>

          <div class="py-6 pl-5 text-[#6b6968] rounded-lg   bg-[#e0e0e0] w-[285px]  mb-6">
            <div className="pb-9 grid grid-cols-2	">
              <div>
                <p className="text_12 text-[#6b6968] capitalize ">Name</p>
                <p className="text_16 text-[#000000] capitalize ">James</p>
              </div>
              <div>
                <p className="text_12 text-[#6b6968] capitalize ">
                  Phone Number
                </p>
                <p className="text_16 text-[#000000] ">658 823 3004</p>
              </div>
            </div>

            <div className="pb-9 grid grid-cols-2">
              <div>
                <p className="text_12 text-[#6b6968] capitalize ">Pax</p>
                <p className="text_16 text-[#000000] ">20 Pax</p>
              </div>
              <div>
                <p className="text_12 text-[#6b6968] capitalize ">Status</p>
                <p className="text_16 text-[#000000] capitalize ">Waiting</p>
              </div>
            </div>

            <div className="grid grid-cols-2	">
              <div>
                <p className="text_12 text-[#6b6968] capitalize ">
                  Queue Number
                </p>
                <p className="text_16 text-[#000000] ">201</p>
              </div>
              <div>
                <p className="text_12 text-[#6b6968] ">Date/Time</p>
                <p className="text_16 text-[#000000]">{currentDate} </p>
              </div>
            </div>
          </div> */}

        </div>
      </div>
    </div>
    </div>
  );
};

export default LeftSideBar;
