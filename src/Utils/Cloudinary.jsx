import axios from "axios";

export const uploadFile = async (file, type, preset) => {
  try {
    const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;

    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", preset);

    let api = `https://api.cloudinary.com/v1_1/${cloudName}/${type}/upload`;

    const res = await axios.post(api, data);

    return res.data;
  } catch (err) {
    throw err;
  }
};
