import { redirect } from "@remix-run/node";
import type { AxiosError, AxiosResponse } from "axios";
import axios from "axios";

const service = axios.create({
  baseURL: process.env.APP_HOST,
  headers: {
    "X-Requested-With": "XMLHttpRequest",
    "Content-Type": "application/json",
  },
});

service.interceptors.response.use(
  (res: AxiosResponse) => res,
  (err: AxiosError) => {
    if (!err.response) {
      return Promise.reject(err);
    } else if (err.response.status === 401) {
      throw redirect("/login");
    }
    return Promise.reject(err);
  }
);

export default service;
