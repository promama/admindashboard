import React, { useEffect } from "react";
import SideBar from "../../components/SideBar/SideBar";
import TopBar from "../../components/TopBar/TopBar";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchGetAllUserInfos, reset } from "../../Slices/userSlice";
import SingleUser from "./SingleUser";
import { Container, Table } from "react-bootstrap";

function User() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const listUsers = useSelector((state) => state.user.listUsers);

  useEffect(() => {
    try {
      dispatch(fetchGetAllUserInfos());
    } catch (err) {
      if (err.message === "signin again") {
        dispatch(reset());
        navigate("/signin");
      }
    }
    console.log("runing");
  }, [dispatch, navigate]);

  return (
    <body id="page-top">
      {/* Page Wrapper */}
      <div id="wrapper">
        <SideBar />
        {/* Topbar */}
        <div className="d-flex flex-column" id="content-wrapper">
          <TopBar />
          {/* Content below */}
          <Container className="fs-6 ml-4 p-2 justify-content-between">
            <Table responsive bordered hover>
              <thead>
                <tr>
                  <th className="bg-secondary text-white">CN</th>
                  <th className="bg-secondary text-white">Email</th>
                  <th className="bg-secondary text-white">Birthday</th>
                  <th className="bg-secondary text-white">Phone</th>
                  <th className="bg-secondary text-white">Gender</th>
                  <th className="bg-secondary text-white">Role</th>
                  <th className="bg-secondary text-white">Status</th>
                  <th className="bg-secondary text-white">Actions</th>
                </tr>
              </thead>
              <tbody>
                {listUsers.map((user, index) => (
                  <SingleUser
                    userData={user}
                    id={user._id}
                    index={index}
                    key={user._id}
                  />
                ))}
              </tbody>
            </Table>
          </Container>
        </div>
        {/* Scroll to Top Button*/}
        <a className="scroll-to-top rounded" href="#page-top">
          <i className="fas fa-angle-up"></i>
        </a>
      </div>
    </body>
  );
}

export default User;
