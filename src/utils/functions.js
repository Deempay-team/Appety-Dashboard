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









export const formatPhoneNo = (num) => {
  const lastFourDigits = num.split("").slice(7, 11).join("");
  return `*******${lastFourDigits}`;
};

export const formatBankNo = (num) => {
  const lastFiveDigits = num.split("").slice(5, 10).join("");
  return `*****${lastFiveDigits}`;
};

export const redirectTo = (roleName) => {
  let redirectTo;
  switch (roleName) {
    case "Admin":
      redirectTo = "/dashboard/merchant/overview";
      break;
    case "Manager":
      redirectTo = "/dashboard/manager/overview";
      break;
      case "Supervisor":
      redirectTo = "/dashboard/supervisor/overview";
      break;
    default:
      redirectTo = "/dashboard/cashier/overview";
  }
  return redirectTo;
};

export const formatDateTime = (dateTime) => {
  const date = new Date(dateTime).toDateString();
  const time = new Date(dateTime).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
  return `${date} ${time}`;
};

export const formatMonthYear = (monthyear) => {
  const month = new Date(monthyear).toDateString("en-us", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
  return month;
};

export const numberSeperator = (seperator) => {
  // const input = document.getElementById("myInput");
  // input.addEventListener("input", function(event) {
    // Remove any non-numeric characters from the input
    //const numericValue = seperator.replace(/[^0-9]/g, "");
    // Add the thousand separator to the input value
    const formattedValue = Number(seperator).toLocaleString();
    // Update the input value with the formatted value
    // this.value = formattedValue;
  // });
  return formattedValue;
};

export const formatCurrency = (amount) => {
  let formatNum = new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
  }).format(amount);

  // return formatNum[0] + "\u200A" + "\u200A" + formatNum.substr(1);
  return formatNum[0] + "\u200A" + formatNum.substr(1);
};

export const unFormatCurrency = (amount) => {
  let formatNum = new Intl.NumberFormat("en-NG", {
  }).format(amount);
  return formatNum;
};

export const fetchPaymentClass = (type) => {
  let className;
  switch (type) {
    case "Dynamic QR":
      className = "dynamic";
      break;
    case "Fixed QR":
      className = "fixedd";
      break;
    case "Bank Transfer":
      className = "transfer";
      break;
    case "Transfer (Online)":
      className = "dynamic-transfer";
      break;
    default:
      className = "dynamic";
  }
  return className;
};

export const feePaymentStatus = (type) => {
  let className;
  switch (type) {
    case 1 :
      className = "active_link";
      break;
    case 0 :
      className = "inactive_link";
      break;
    default:
      className = "active_link";
  }
  return className;
};


export const truncateString = (str, num) => {
  num = 15;

  if (str === "" || !str) {
    return str;
  } else if (str.length <= num) {
    return str;
  } else {
    return str.slice(0, num) + "...";
  }
};

export const truncateName = (str, num) => {
  num = 30;

  if (str === "" || !str) {
    return str;
  } else if (str.length <= num) {
    return str;
  } else {
    return str.slice(0, num);
  }
};



