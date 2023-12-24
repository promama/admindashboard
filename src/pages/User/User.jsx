import React, { useEffect } from "react";
import SideBar from "../../components/SideBar/SideBar";
import TopBar from "../../components/TopBar/TopBar";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchGetAllUserInfos, reset } from "../../Slices/userSlice";
import SingleUser from "./SingleUser";
import { Col, Container, Row } from "react-bootstrap";

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
          <Container className="container-fluid fs-6 ml-4">
            <Row className="mb-2 bg-secondary text-white">
              <Col className="border" xs={1}>
                CN
              </Col>
              <Col className="border" xs={2}>
                email
              </Col>
              <Col className="border" xs={2}>
                birthday
              </Col>
              <Col className="border" xs={2}>
                phone
              </Col>
              <Col className="border" xs={1}>
                gender
              </Col>
              <Col className="border" xs={1}>
                role
              </Col>
              <Col className="border" xs={1}>
                status
              </Col>
              <Col className="border" xs={2}>
                actions
              </Col>
            </Row>
            {listUsers.map((user, index) => (
              <SingleUser
                userData={user}
                id={user._id}
                index={index}
                key={user._id}
              />
            ))}
          </Container>
        </div>
      </div>
    </body>
  );
}

export default User;
