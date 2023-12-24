import React, { useEffect } from "react";
import SideBar from "../../components/SideBar/SideBar";
import TopBar from "../../components/TopBar/TopBar";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function Delivery() {
  const navigate = useNavigate();
  const email = useSelector((state) => state.user.email);
  return (
    <body id="page-top">
      {/* Page Wrapper */}
      <div id="wrapper">
        <SideBar />
        {/* Topbar */}
        <div className="d-flex flex-column" id="content-wrapper">
          <TopBar />
          <div className="container-fluid">Delivery page</div>
        </div>
      </div>
    </body>
  );
}

export default Delivery;
