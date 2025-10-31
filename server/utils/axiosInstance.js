import axios from "axios";

export const zoomAxios = axios.create({
  baseURL: "https://api.zoom.us/v2",
  headers: {
    Authorization: `Bearer ${process.env.ZOOM_JWT_TOKEN}`,
    "Content-Type": "application/json",
  },
});
