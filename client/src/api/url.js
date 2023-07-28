import axios from "axios";

export const URL = axios.create({
  baseURL: "http://localhost:3001",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    options: true,
    "Access-Control-Allow-Origin": true,
  },
});
