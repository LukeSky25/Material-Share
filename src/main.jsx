import React from "react";
import ReactDOM from "react-dom/client";
import { ToastContainer } from "react-toastify";

import "./styles/global.css";
import "react-toastify/dist/ReactToastify.css";

import { Rotas } from "./routes";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ToastContainer className={"toast"} autoClose={3000} />
    <Rotas />
    <ToastContainer />
  </React.StrictMode>
);
