const today = new Date();

export const formateDate = (dateString) => {
  const date = new Date(dateString);

  date.setHours(0, 0, 0, 0);
  today.setHours(0, 0, 0, 0);

  const diffTime = Math.abs(today - date);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 0) {
    return "Today";
  } else if (diffDays === 1) {
    return "Yesterday";
  } else if (diffDays <= 7) {
    const options = { weekday: "long" };
    return date.toLocaleDateString("en-US", options);
  } else {
    const options = { day: "2-digit", month: "short", year: "numeric" };
    return date.toLocaleDateString("en-GB", options);
  }
};

export const formateTime = (dateString) => {
  const date = new Date(dateString);
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? "0" + minutes : minutes;
  const strTime = hours + ":" + minutes + " " + ampm;
  return strTime;
};

export const formateDateAndTime = (dateString) => {
  return `${formateDate(dateString)} at ${formateTime(dateString)}`;
};
