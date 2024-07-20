//import React, { useState, useEffect } from "react";

//const [currentTime1, setCurrentTime1] = useState("0");

export const currentDate = new Date().toLocaleDateString("en-us", {
  year: "numeric",
  month: "numeric",
  //month: "short",
  day: "numeric",
});

export const currentTime = new Date().toLocaleTimeString("en-us", {
  hour: "2-digit",
  minute: "2-digit",
});

// function myFunction() {
//   return Math.PI;
// }

//export const currentTime = currentTime1;

// export function currentTime  () {
//   "90:49";
// }

// export function currentTime () {
//   let timeRun = new Date().toLocaleTimeString("en-us", {
//     hour: "2-digit",
//     minute: "2-digit",
//   });
//   let timer = 0;
//     setInterval(function () {
//     timer += 1;  
//     timeRun = new Date().toLocaleTimeString("en-us", {
//       hour: "2-digit",
//       minute: "2-digit",
//     })
//   }, 1000);

//   return "23:45";
// }

export const formatDateTime = (undate) => {
  return new Date(undate).toLocaleDateString("en-us", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

//FUNCTION TO ADD SPACE IN NUMBER
export const addSpace = (accountNum) => {
  let newAccNo = "";
  for (let i in accountNum) {
    if (i === "2" || i === "6") {
      newAccNo += accountNum[i] + " ";
    } else {
      newAccNo += accountNum[i];
    }
  }
  return newAccNo;
};

//FUNCTION TO HANDLE COMMAS
export const formatNumberWithCommas = (number) => {
  return number?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export const formatDate = (undate) => {
  return new Date(undate).toLocaleDateString("en-us", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  });
};




export const formatTime = (timeString) => {
  const [hourString, minute] = toString(timeString).split(":");
  const hour = +hourString % 24;
  return (hour % 12 || 12) + ":" + minute + (hour < 12 ? "AM" : "PM");
};


// export const redirectTo = (roleName) => {
//   let redirectTo;
//   switch (roleName) {
//     case "Admin":
//       redirectTo = "/dashboard/merchant/overview";
//       break;
//     case "Manager":
//       redirectTo = "/dashboard/manager/overview";
//       break;
//     case "Supervisor":
//       redirectTo = "/dashboard/supervisor/overview";
//       break;
//     default:
//       redirectTo = "/dashboard/cashier/overview";
//   }
//   return redirectTo;
// };

export const formatMonthYear = (monthyear) => {
  const month = new Date(monthyear).toDateString("en-us", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
  return month;
};
