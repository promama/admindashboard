import React, { useEffect } from "react";
import SideBar from "../../components/SideBar/SideBar";
import TopBar from "../../components/TopBar/TopBar";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function Statistic() {
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
          <div className="container-fluid">Statistic page</div>
        </div>
        {/* Scroll to Top Button*/}
        <a className="scroll-to-top rounded" href="#page-top">
          <i className="fas fa-angle-up"></i>
        </a>
      </div>
    </body>
  );
}

export default Statistic;
