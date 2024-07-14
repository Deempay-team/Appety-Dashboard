import React from "react";

import "./styles.css";

export const SpinnerOrange = () => {
  return (
    <div class="text-center justify-center w-8 h-8 border-[3px] border-[#F99762] mx-auto rounded-full loader"></div>
  );
};

export const SpinnerWhite = () => {
  return (
    <div class="text-center justify-center w-5 h-5 border-[3px] border-[#ffffff] mx-auto rounded-full loader"></div>
  );
};

export const SpinnerOrangeMedium = () => {
  return (
    <div class="text-center justify-center w-6 h-6 border-[3px] border-[#F99762] mx-auto rounded-full loader"></div>
  );
};

export const SpinnerMediumWhite = () => {
  return (
    <div class="w-3.5 h-3.5 border-2 border-[#ffffff] rounded-full mx-auto loader text-center"></div>
  );
};


// {isLoadingWait || queueList.length > 0 ? (
// <>
// </>
// ) : !!isLoadingWait || queueList.length === 0 ? (
// <>
// </>
// ) : ("")}






