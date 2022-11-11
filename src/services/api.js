import axios from "axios";
import config from "../configs";
import { getStringData } from "./storage";

const token = getStringData("authToken");

const api = axios.create({
  baseURL: config.BASE_URL,
  timeout: 1000,
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

export default api;
