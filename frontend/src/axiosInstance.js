import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://long-puce-lamb-ring.cyclic.app/",
});

export default axiosInstance;
