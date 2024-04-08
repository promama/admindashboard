import React from "react";
import { Button, Col, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { fetchDeleteUser, showOffcanvas } from "../../Slices/userSlice";

import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css

function SingleUser(props) {
  const dispatch = useDispatch();

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
    <tr>
      <td>{props.index + 1}</td>
      <td>{props.userData.email}</td>
      {props.userData.birthDay ? <td>{props.userData.birthDay}</td> : <td></td>}
      {props.userData.phoneNumber ? (
        <td>{props.userData.phoneNumber}</td>
      ) : (
        <td></td>
      )}
      {props.userData.sex ? <td>{props.userData.sex}</td> : <td></td>}
      {props.userData.role ? <td>{props.userData.role}</td> : <td></td>}
      {props.userData.status ? <td>{props.userData.status}</td> : <td></td>}
      <td>
        <Button
          className="mr-2 mb-1 mt-1"
          variant="outline-primary"
          onClick={handleEditUser}
        >
          Edit
        </Button>
        <Button
          className="mb-1 mt-1"
          variant="outline-danger"
          onClick={handleDeleteUser}
        >
          Delete
        </Button>
      </td>
    </tr>
  );
}

export default SingleUser;
