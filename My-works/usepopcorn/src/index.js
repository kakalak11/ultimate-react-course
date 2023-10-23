import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import StarRating from "./StarRating";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
    {/* <StarRating maxRating={5} /> */}
  </React.StrictMode>
);
// API key: 8f8a07f3
// API URL: http://www.omdbapi.com/?i=tt3896198&apikey=8f8a07f3
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
