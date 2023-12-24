import React, { useEffect, useState } from "react";
import SideBar from "../../components/SideBar/SideBar";
import TopBar from "../../components/TopBar/TopBar";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ListProducts from "./ListProducts";
import { fetchShowAllProducts } from "../../Slices/productSlice";

function Product() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    try {
      dispatch(fetchShowAllProducts());
    } catch (err) {
      if (err.message === "signin again") {
        navigate("/signin");
      }
    }
  });

  return (
    <body id="page-top">
      {/* Page Wrapper */}
      <div id="wrapper">
        <SideBar />
        {/* Topbar */}
        <div className="d-flex flex-column" id="content-wrapper">
          <TopBar />
          <ListProducts></ListProducts>
        </div>
      </div>
    </body>
  );
}

export default Product;
