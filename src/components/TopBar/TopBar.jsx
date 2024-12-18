import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  fetchUnreadNotification,
  replaceNotify,
  reset,
} from "../../Slices/userSlice";
import socketIOClient from "socket.io-client";

import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { Button } from "react-bootstrap";
import NotificationsIcon from "@mui/icons-material/Notifications";

function TopBar() {
  const userEmail = useSelector((state) => state.user.email);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function isLogin(userEmail) {
    if (userEmail === "" || userEmail === null) {
      return false;
    }
    return true;
  }

  const socketRef = useRef();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const listNotify = useSelector((state) => state.user.notificationList);
  const unreadNotify = useSelector((state) => state.user.unreadNotify);
  let email =
    useSelector((state) => state.user.email) || localStorage.getItem("email");

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleRead = (id) => {
    //send data to set read
    console.log(id);
  };

  //load notify
  useEffect(() => {
    dispatch(fetchUnreadNotification({ email: email }));
  }, [dispatch, email]);

  useEffect(() => {
    socketRef.current = socketIOClient.connect("http://localhost:5001");

    try {
      //connect to manager room
      socketRef.current.emit("manager:join");
      //listen to server accept join room
      socketRef.current.on("server:acceptjoin", (message) => {
        if (!message.success) {
          alert("not join room");
        }
      });
    } catch {}

    try {
      //listen to server sending a user confirm order
      socketRef.current.on("server:user-confirm-order", (message) => {
        dispatch(replaceNotify(message));
        alert(message.message);
      });
    } catch {}

    try {
      //listen to server a user finish order
      socketRef.current.on("server:user-finish-order", (message) => {
        dispatch(replaceNotify(message));
        alert(message.message);
      });
    } catch {}

    try {
      //listen to deliver taken order
      socketRef.current.on("manager:order-taken", (message) => {
        dispatch(replaceNotify(message));
        alert(message.message);
      });
    } catch {}

    try {
      //listen to deliver finish order
      socketRef.current.on("manager:deliver-finish-order", (message) => {
        dispatch(replaceNotify(message));
        alert(message.message);
      });
    } catch {}

    try {
      //listen to deliver cancel order
      socketRef.current.on("manager:deliver-cancel-order", (message) => {
        dispatch(replaceNotify(message));
        alert(message.message);
      });
    } catch {}
  }, [dispatch]);
  return (
    <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
      {/* Topbar Navbar */}
      <ul className="navbar-nav ml-auto">
        <Button
          id="basic-button"
          aria-controls={open ? "basic-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
          style={{
            width: "3rem",
            height: "3rem",
            position: "relative",
            marginRight: 5,
          }}
          variant="outline-primary"
          className="rounded-circle"
        >
          <NotificationsIcon />
          <div
            className="rounded-circle bg-danger d-flex justify-content-center align-items-center"
            style={{
              color: "white",
              width: "1.5rem",
              height: "1.5rem",
              position: "absolute",
              bottom: 0,
              right: 0,
              transform: "translate(25%, 25%)",
            }}
          >
            {unreadNotify}
          </div>
        </Button>
        <Menu
          id="basic-menu"
          sx={{ width: 1 / 4 }}
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
          slotProps={{
            paper: {
              style: {
                maxHeight: 48 * 4.5,
                maxWidth: 370,
              },
            },
          }}
        >
          {listNotify
            ?.slice(0)
            .reverse()
            .map((noti) => {
              let backgroundColor = "white";
              let textColor = "black";
              let message = "";
              if (noti.isManagerRead === false) {
                backgroundColor = "#e1f5ef";
              }
              if (noti.status === "Finish") {
                message = " is completed by user";
                textColor = "green";
              } else if (noti.status === "Waiting approve") {
                message = " is approved";
                textColor = "#ff6500";
              } else if (noti.status === "Delivering") {
                message = " is in delivering";
                textColor = "#00f6ff";
              }
              return (
                <MenuItem
                  divider={true}
                  key={noti._id}
                  onClick={() => handleRead(noti._id)}
                  style={{ backgroundColor: backgroundColor }}
                >
                  <div
                    style={{
                      overflowWrap: "break-word",
                      wordWrap: "break-word",
                      hyphens: "auto",
                    }}
                  >
                    {"This order " + noti.orderId}
                    <br />
                    <label style={{ color: textColor }}>{message}</label>
                  </div>
                </MenuItem>
              );
            })}
        </Menu>

        {/* Nav Item - User Information */}
        {isLogin(userEmail) ? (
          <div className="dropdown" style={{ marginRight: "1%" }}>
            <button
              className="btn btn-secondary dropdown-toggle"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              {userEmail}
            </button>
            <ul className="dropdown-menu">
              <li>
                <div
                  className="dropdown-item"
                  style={{ cursor: "pointer" }}
                  // onClick={navigateToProfilePage}
                >
                  Profile
                </div>
              </li>
              <li>
                <div
                  className="dropdown-item"
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    dispatch(reset());
                    navigate("/signin");
                  }}
                >
                  Sign out
                </div>
              </li>
            </ul>
          </div>
        ) : (
          <Link to="/signin" style={{ marginRight: "1%" }}>
            <h1>Signin</h1>
          </Link>
        )}
      </ul>
    </nav>
  );
}

export default TopBar;
