export const formateDate = (date) => {
  const d = new Date(date);

  // return today if date is today
  if (d.getDate() === new Date().getDate()) {
    return "Today";
  }

  // return yesterday if date is yesterday
  if (d.getDate() === new Date().getDate() - 1) {
    return "Yesterday";
  }

  // return monday , tuesday etc if date is this week
  if (d.getDate() > new Date().getDate() - 7) {
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thrusday",
      "Friday",
      "Saturday",
    ];
    return days[d.getDay()];
  }

  // return date in dd-mm-yyyy format
  const ye = new Intl.DateTimeFormat("en", { year: "numeric" }).format(d);
  const mo = new Intl.DateTimeFormat("en", { month: "short" }).format(d);
  const da = new Intl.DateTimeFormat("en", { day: "2-digit" }).format(d);
  return `${da}-${mo}-${ye}`;
};

export const formateTime = (date) => {
  const d = new Date(date);
  let hours = d.getHours();
  let minutes = d.getMinutes();
  let ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? "0" + minutes : minutes;
  const strTime = hours + ":" + minutes + " " + ampm;
  return strTime;
};

export const formateDateAndTime = (date) => {
  return `${formateDate(date).toLowerCase()} at ${formateTime(date)}`;
};
