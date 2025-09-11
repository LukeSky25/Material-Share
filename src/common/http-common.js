import axios from "axios";

const API_URL = "http://localhost:8080/";

const mainInstace = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

const multipartInstance = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-type": "multipart/form-data",
  },
});

const httpCommon = {
  mainInstace,
  multipartInstance,
};

export default httpCommon;
