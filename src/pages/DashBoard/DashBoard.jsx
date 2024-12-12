import React, { useEffect, useRef, useState } from "react";
import "./DashBoard.css";
import { useNavigate } from "react-router-dom";
import SideBar from "../../components/SideBar/SideBar";
import TopBar from "../../components/TopBar/TopBar";
import { useDispatch, useSelector } from "react-redux";
import ListStatistic from "../../components/Statistic/Yearly";
import { fetchShowGeneralIncom } from "../../Slices/statisticSlice";
import Status from "../../components/Statistic/Status";
import TabStats from "./TabStats";
import FilterOption from "./FilterOption";

import socketIOClient from "socket.io-client";
import { fetchTestingSocket } from "../../Slices/userSlice";
import { replaceNotify } from "../../Slices/cartSlice";

function DashBoard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const general = useSelector((state) => state.statistic.general);
  const [showing, setShowing] = useState("Yearly");
  const [filter, setFilter] = useState("");

  // const [responseMessage, setResponseMessage] = useState("Waiting Response");
  // const socketRef = useRef();
  // const managerRoom = useSelector((state) => state.user.email);

  // useEffect(() => {
  //   socketRef.current = socketIOClient.connect("http://localhost:5001");

  //   try {
  //     //connect to manager room
  //     socketRef.current.emit("manager:join");
  //     //listen to server accept join room
  //     socketRef.current.on("server:acceptjoin", (message) => {
  //       if (!message.success) {
  //         alert("not join room");
  //       }
  //     });
  //   } catch {}

  //   try {
  //     //listen to server sending a user confirm order
  //     socketRef.current.on("server:user-confirm-order", (message) => {
  //       dispatch(replaceNotify(message.notify));
  //       alert(message.message);
  //     });
  //   } catch {}

  //   try {
  //     //listen to server a user finish order
  //     socketRef.current.on("server:user-finish-order", (message) => {
  //       dispatch(replaceNotify(message.notify));
  //       alert(message.message);
  //     });
  //   } catch {}

  //   try {
  //     //testing socket sending
  //     socketRef.current.on("server saying: ", (message) => {
  //       setResponseMessage(message);
  //     });
  //     socketRef.current.on("server:saying", (message) => {
  //       console.log(message);
  //     });
  //   } catch {}
  // }, [managerRoom, dispatch]);

  // function submitSendMessage() {
  //   //send message to server
  //   console.log("current socket id is: " + socketRef.current.id);
  //   socketRef.current.emit("chat message", {
  //     message: "call you from admin",
  //     socketId: socketRef.current.id,
  //   });
  // }

  // const submitSendSocketId = async () => {
  //   try {
  //     const res = await dispatch(
  //       fetchTestingSocket({ token: localStorage.getItem("access_token") })
  //     ).unwrap();
  //     console.log(res);
  //     await socketRef.current.emit("admin:saying", {
  //       message: "i want you to throw list user to somewhere else",
  //       token: localStorage.getItem("access_token"),
  //       socketId: socketRef.current.id,
  //     });
  //   } catch (err) {
  //     console.log("error: " + err);
  //   }
  // };

  // const submitToRoom = async () => {
  //   try {
  //     await socketRef.current.emit("user:send-to-room", {
  //       message: "send to room from admin page",
  //       room: "phuc@gmail.com",
  //     });
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  useEffect(() => {
    try {
      dispatch(fetchShowGeneralIncom());
    } catch (err) {
      alert(err.message);
    }
  }, [dispatch]);

  const handleCallback = (dataFromTab) => {
    setShowing(dataFromTab);
  };

  const handleFilterCallBack = (dataFromFilter) => {
    setFilter(dataFromFilter);
  };

  return (
    <div>
      <body id="page-top">
        {/* Page Wrapper */}
        <div id="wrapper">
          {/* Sidebar */}
          <SideBar />
          {/* End of Sidebar */}

          {/* Content Wrapper */}
          <div id="content-wrapper" className="d-flex flex-column">
            {/* Main Content */}
            <div id="content">
              {/* Topbar */}
              <TopBar />
              {/* End of Topbar */}

              {/* Begin Page Content */}
              <div className="container-fluid">
                {/* Page Heading */}
                <div className="d-sm-flex align-items-center justify-content-between mb-4">
                  <h1 className="h3 mb-0 text-gray-800">Dashboard</h1>
                  {/* <button onClick={() => submitSendMessage()}>
                    send message through socketio: {responseMessage}
                  </button>
                  <button onClick={() => submitSendSocketId()}>
                    send and test middleware recieve socket id
                  </button>
                  <button onClick={() => submitToRoom()}>
                    send message to room phuc@gmail.com
                  </button> */}
                </div>

                {/* Content Row */}
                <div className="row">
                  {/* Earnings (Monthly) Card Example */}
                  <div className="col-xl-3 col-md-6 mb-4">
                    <div className="card border-left-primary shadow h-100 py-2">
                      <div className="card-body">
                        <div className="row no-gutters align-items-center">
                          <div className="col mr-2">
                            <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">
                              Earnings (Monthly)
                            </div>
                            <div className="h5 mb-0 font-weight-bold text-gray-800">
                              ${general.monthly}
                            </div>
                          </div>
                          <div className="col-auto">
                            <i className="fas fa-calendar fa-2x text-gray-300"></i>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Earnings (Total) Card Example */}
                  <div className="col-xl-3 col-md-6 mb-4">
                    <div className="card border-left-success shadow h-100 py-2">
                      <div className="card-body">
                        <div className="row no-gutters align-items-center">
                          <div className="col mr-2">
                            <div className="text-xs font-weight-bold text-success text-uppercase mb-1">
                              Earnings (Total)
                            </div>
                            <div className="h5 mb-0 font-weight-bold text-gray-800">
                              ${general.total}
                            </div>
                          </div>
                          <div className="col-auto">
                            <i className="fas fa-dollar-sign fa-2x text-gray-300"></i>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Total Product Card Example */}
                  <div className="col-xl-3 col-md-6 mb-4">
                    <div className="card border-left-info shadow h-100 py-2">
                      <div className="card-body">
                        <div className="row no-gutters align-items-center">
                          <div className="col mr-2">
                            <div className="text-xs font-weight-bold text-info text-uppercase mb-1">
                              Total Products
                            </div>
                            <div className="row no-gutters align-items-center">
                              <div className="col mr-2">
                                <div className="h5 ml-3 mb-0 font-weight-bold text-gray-800">
                                  {general.product}
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="col-auto">
                            <i className="fas fa-clipboard-list fa-2x text-gray-300"></i>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Total Users Card Example */}
                  <div className="col-xl-3 col-md-6 mb-4">
                    <div className="card border-left-warning shadow h-100 py-2">
                      <div className="card-body">
                        <div className="row no-gutters align-items-center">
                          <div className="col mr-2">
                            <div className="text-xs font-weight-bold text-warning text-uppercase mb-1">
                              Total Users
                            </div>
                            <div className="h5 mb-0 font-weight-bold text-gray-800">
                              {general.user}
                            </div>
                          </div>
                          <div className="col-auto">
                            <i className="fas fa-comments fa-2x text-gray-300"></i>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Content Row */}
                {/* Chart.js here */}

                <div className="row">
                  {/* Area Chart */}
                  <div className="col-xl-8 col-lg-7">
                    <div className="card shadow mb-4">
                      {/* Card Header - Dropdown */}
                      <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                        <h6 className="m-0 font-weight-bold text-primary">
                          Earning group by months
                        </h6>
                      </div>
                      {/* Card Body */}
                      <div className="card-body">
                        <TabStats parentCallback={handleCallback}></TabStats>
                        <FilterOption showing={showing} />
                        <div className="chart-area">
                          <ListStatistic />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Pie Chart */}

                  <div className="col-xl-4 col-lg-4">
                    <div className="card shadow mb-4">
                      {/* Card Header - Dropdown */}
                      <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                        <h6 className="m-0 font-weight-bold text-primary">
                          Earning group by status
                        </h6>
                      </div>
                      {/* Card Body */}
                      <div className="card-body">
                        <div className="chart-pie pt-4 pb-2">
                          <Status />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* /.container-fluid */}
            </div>
            {/* End of Main Content */}

            {/* Footer */}
            <footer className="sticky-footer bg-white">
              <div className="container my-auto">
                <div className="copyright text-center my-auto">
                  <span>Copyright &copy; Your Website 2021</span>
                </div>
              </div>
            </footer>
            {/* End of Footer */}
          </div>
          {/* End of Content Wrapper */}
        </div>
        {/* End of Page Wrapper */}

        {/* Scroll to Top Button*/}
        <a className="scroll-to-top rounded" href="#page-top">
          <i className="fas fa-angle-up"></i>
        </a>

        {/* Logout Modal*/}
        <div
          className="modal fade"
          id="logoutModal"
          tabindex="-1"
          role="dialog"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  Ready to Leave?
                </h5>
                <button
                  className="close"
                  type="button"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">×</span>
                </button>
              </div>
              <div className="modal-body">
                Select "Logout" below if you are ready to end your current
                session.
              </div>
              <div className="modal-footer">
                <button
                  className="btn btn-secondary"
                  type="button"
                  data-dismiss="modal"
                >
                  Cancel
                </button>
                <a className="btn btn-primary" href="login.html">
                  Logout
                </a>
              </div>
            </div>
          </div>
        </div>
      </body>
    </div>
  );
}

export default DashBoard;
