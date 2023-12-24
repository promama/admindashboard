import React from "react";
import { Button, Col, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { fetchDeleteUser, showOffcanvas } from "../../Slices/userSlice";

import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css

function SingleUser(props) {
  const dispatch = useDispatch();

  function checkNull(target) {
    if (target == null) return true;
    return false;
  }

  function setContent(size, content) {
    return (
      <Col className="border" xs={size}>
        {content}
      </Col>
    );
  }

  function handleEditUser() {
    dispatch(showOffcanvas({ index: props.index }));
  }

  async function handleDeleteUser() {
    confirmAlert({
      title: "Confirm to submit",
      message: "Are you sure to delete this user?",
      buttons: [
        {
          label: "Yes",
          onClick: () => dispatch(fetchDeleteUser({ _id: props.id })),
        },
        {
          label: "No",
        },
      ],
    });
  }
  //props.userData.
  return (
    <Row className="bg-white mb-1">
      <Col className="border" xs={1}>
        {props.index + 1}
      </Col>
      <Col className="border" xs={2}>
        {props.userData.email}
      </Col>
      {checkNull(props.userData.birthDay)
        ? setContent(2, "")
        : setContent(2, props.userData.birthDay)}
      {checkNull(props.userData.phoneNumber)
        ? setContent(2, "")
        : setContent(2, props.userData.phoneNumber)}
      {checkNull(props.userData.sex)
        ? setContent(1, "")
        : setContent(1, props.userData.sex)}
      {checkNull(props.userData.role)
        ? setContent(1, "")
        : setContent(1, props.userData.role)}
      {checkNull(props.userData.status)
        ? setContent(1, "")
        : setContent(1, props.userData.status)}
      <Col className="border" xs={2}>
        <Row>
          <Col xs={4}>
            <Button variant="outline-primary" onClick={handleEditUser}>
              Edit
            </Button>
          </Col>
          <Col xs={6}>
            <Button variant="outline-danger" onClick={handleDeleteUser}>
              Delete
            </Button>
          </Col>
        </Row>
      </Col>
    </Row>
  );
}

export default SingleUser;
