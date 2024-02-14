const today = new Date();

// Formate Date (Today, Yesterday, Weekday, Date)
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

// Formate Time (AM/PM)
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

// Formate Date and Time
export const formateDateAndTime = (dateString) => {
  return `${formateDate(dateString)} at ${formateTime(dateString)}`;
};

// Slice Text (Text, Length)
export const sliceText = (text, length) => {
  return text.length > length ? text.slice(0, length) + "..." : text;
};

// Create File Name
export const createfileName = (fileUrl) => {
  const date = new Date();
  const fileExtension = fileUrl.split(".").pop();

  switch (fileExtension) {
    case "pdf":
      return `SkyMessanger_pdf_${date.toISOString()}.${fileExtension}`;

    case "doc":
    case "docx":
      return `SkyMessanger_document_${date.toISOString()}.${fileExtension}`;

    case "ppt":
    case "pptx":
      return `SkyMessanger_presentation_${date.toISOString()}.${fileExtension}`;

    case "xls":
    case "xlsx":
      return `SkyMessanger_spreadsheet_${date.toISOString()}.${fileExtension}`;

    case "txt":
      return `SkyMessanger_text_${date.toISOString()}.${fileExtension}`;

    case "mp4":
      return `SkyMessanger_Video_${date.toISOString()}.${fileExtension}`;

    case "jpg":
    case "jpeg":
    case "png":
    case "gif":
    case "webp":
    case "svg":
    case "ico":
      return `SkyMessanger_Image_${date.toISOString()}.${fileExtension}`;

    default:
      return `SkyMessanger_File_${date.toISOString()}.${fileExtension}`;
  }
};

// Download file to local machine
export const handleDownload = async (file) => {
  console.log(file);
  const fileBlob = await fetch(file).then((r) => r.blob());
  const fileUrl = URL.createObjectURL(fileBlob);
  const link = document.createElement("a");
  link.href = fileUrl;
  link.download = createfileName(file); // name
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

// Stop Propagation (e)
export const stopPropagation = (e) => {
  if (e && e.stopPropagation) {
    e.stopPropagation();
  } else if (window.event) {
    window.event.cancelBubble = true;
  }
};
