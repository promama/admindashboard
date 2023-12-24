import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap-icons/font/bootstrap-icons.css";

import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";

import cartReducer from "./Slices/cartSlice";
import deliveryReducer from "./Slices/deliverySlice";
import productReducer from "./Slices/productSlice";
import statisticReducer from "./Slices/statisticSlice";
import userReducer from "./Slices/userSlice";

const store = configureStore({
  reducer: {
    product: productReducer,
    cart: cartReducer,
    user: userReducer,
    delivery: deliveryReducer,
    statistic: statisticReducer,
  },
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
