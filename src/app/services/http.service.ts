import axios from "axios";
import { toast } from "react-toastify";
import configFile from "../config.json";

const httpService = axios.create({
  baseURL: configFile.apiEndPoint,
});

httpService.interceptors.response.use(
  (res) => {
    return res;
  },
  function (error) {
    const expectedErrors =
      error.response &&
      error.response.status >= 400 &&
      error.response.status < 500;

    if (!expectedErrors) {
      toast.error("Something was wrong. Try it later");
    }
    return Promise.reject(error);
  }
);

export default httpService;
