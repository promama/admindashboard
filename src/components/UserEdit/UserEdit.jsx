import React, { useEffect, useState } from "react";
import { Col, Offcanvas, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { blue, green, pink, red, yellow, grey } from "@mui/material/colors";
import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";

import {
  fetchEditUserInfos,
  hideOffCanvas,
  reset,
} from "../../Slices/userSlice";

function UserEdit() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userIndex = useSelector((state) => state.user.userIndex);
  const listUsers = useSelector((state) => state.user.listUsers);
  const isShow = useSelector((state) => state.user.isShowOffcanvas);

  const [gender, setGender] = useState("Male");
  const [date, setDate] = useState(
    dayjs(listUsers[userIndex]?.birthDay, "DD/MM/YYYY") || "DD/MM/YYYY"
  );
  const [role, setRole] = useState("User");
  const [status, setStatus] = useState("Active");

  useEffect(() => {
    setGender(listUsers[userIndex]?.sex);
    setRole(listUsers[userIndex]?.role);
    setStatus(listUsers[userIndex]?.status);
    setDate(dayjs(listUsers[userIndex]?.birthDay, "DD/MM/YYYY"));
  }, [listUsers, userIndex]);

  function handleChangeGender(event) {
    setGender(event.target.value);
  }

  function handleChangeRole(event) {
    setRole(event.target.value);
  }

  function handleChangeStatus(event) {
    setStatus(event.target.value);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    if (
      date.date() === dayjs().date() &&
      date.month() === dayjs().month() &&
      date.year() === dayjs().year()
    ) {
      //
    }
    let day = date.date();
    let month = parseInt(date.month() + 1, 10);
    if (date.date() < 10) {
      day = "0" + day;
    }
    if (date.month() < 10) {
      month = "0" + month;
    }
    try {
      const res = await dispatch(
        fetchEditUserInfos({
          _id: listUsers[userIndex]?._id,
          email: listUsers[userIndex]?.email,
          phone: data.get("phone"),
          gender: data.get("radio-gender"),
          role: data.get("radio-role"),
          status: data.get("radio-status"),
          dob: day + "/" + month + "/" + date.year(),
        })
      ).unwrap();
      console.log(res);
      alert(res.message);
    } catch (err) {
      console.log(err);
      alert(err.message);
      if (err.message === "signin again") {
        dispatch(reset());
        navigate("/signin");
      }
    }
  };
  return (
    <Offcanvas
      show={isShow}
      onHide={() => {
        dispatch(hideOffCanvas());
      }}
      placement="end"
      style={{ width: "50%", background: "light" }}
    >
      <Offcanvas.Header closeButton>
        <Offcanvas.Title className="fs-2">User detail</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body className="fs-4">
        <Box
          className="align-items-center"
          component="form"
          onSubmit={handleSubmit}
        >
          {/* email address */}
          <Row className="d-flex mb-2">
            <Col>
              <label className="pr-2">Email: </label>
              <label>{listUsers[userIndex]?.email}</label>
            </Col>
          </Row>
          {/* date of birth */}
          <Row className="mb-4">
            <Col xs={6}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Date of birth"
                  format="DD/MM/YYYY"
                  value={date}
                  onChange={(newDate) => setDate(newDate)}
                />
              </LocalizationProvider>
            </Col>
          </Row>
          {/* gender */}
          <Row>
            <Col xs={6}>
              <FormControl>
                <FormLabel id="demo-row-radio-buttons-group-label">
                  Gender
                </FormLabel>
                <RadioGroup
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="radio-gender"
                  value={gender}
                  onChange={handleChangeGender}
                >
                  <FormControlLabel
                    value="Male"
                    control={
                      <Radio
                        sx={{
                          color: blue[800],
                          "&.Mui-checked": {
                            color: blue[600],
                          },
                        }}
                      />
                    }
                    label="Male"
                    sx={{ color: blue[800] }}
                  />
                  <FormControlLabel
                    value="Female"
                    control={
                      <Radio
                        sx={{
                          color: pink[800],
                          "&.Mui-checked": {
                            color: pink[600],
                          },
                        }}
                      />
                    }
                    label="Female"
                    sx={{ color: pink[800] }}
                  />
                </RadioGroup>
              </FormControl>
            </Col>
          </Row>
          {/* phone number */}
          <Row>
            <Col xs={6}>
              <TextField
                margin="normal"
                fullWidth
                name="phone"
                label="Phone Number"
                type="tel"
                autoComplete="phone"
                sx={{ marginBottom: 2 }}
                defaultValue={listUsers[userIndex]?.phoneNumber}
              />
            </Col>
          </Row>
          {/* role */}
          <Row>
            <Col xs={6}>
              <FormControl>
                <FormLabel id="user-role">Role</FormLabel>
                <RadioGroup
                  row
                  aria-labelledby="user-role"
                  name="radio-role"
                  value={role}
                  onChange={handleChangeRole}
                >
                  <FormControlLabel
                    value="User"
                    control={
                      <Radio
                        sx={{
                          color: grey[800],
                          "&.Mui-checked": {
                            color: grey[600],
                          },
                        }}
                      />
                    }
                    label="User"
                    sx={{ color: grey[800] }}
                  />
                  <FormControlLabel
                    value="Manager"
                    control={
                      <Radio
                        sx={{
                          color: blue[800],
                          "&.Mui-checked": {
                            color: blue[600],
                          },
                        }}
                      />
                    }
                    label="Manager"
                    sx={{ color: blue[800] }}
                  />
                </RadioGroup>
              </FormControl>
            </Col>
          </Row>
          {/* status */}
          <Row>
            <Col xs={6}>
              <FormControl>
                <FormLabel id="user-status">Status</FormLabel>
                <RadioGroup
                  row
                  aria-labelledby="user-status"
                  name="radio-status"
                  value={status}
                  onChange={handleChangeStatus}
                >
                  <FormControlLabel
                    value="Active"
                    control={
                      <Radio
                        sx={{
                          color: green[800],
                          "&.Mui-checked": {
                            color: green[600],
                          },
                        }}
                      />
                    }
                    label="Active"
                    sx={{ color: green[800] }}
                  />
                  <FormControlLabel
                    value="Suspended"
                    control={
                      <Radio
                        sx={{
                          color: yellow[800],
                          "&.Mui-checked": {
                            color: yellow[600],
                          },
                        }}
                      />
                    }
                    label="Suspended"
                    sx={{ color: yellow[800] }}
                  />
                  <FormControlLabel
                    value="Banned"
                    control={
                      <Radio
                        sx={{
                          color: red[800],
                          "&.Mui-checked": {
                            color: red[600],
                          },
                        }}
                      />
                    }
                    label="Banned"
                    sx={{ color: red[800] }}
                  />
                </RadioGroup>
              </FormControl>
            </Col>
          </Row>
          <Button type="submit" variant="contained">
            Save change
          </Button>
        </Box>

        {/* <div>user id: {listUsers[userIndex]._id}</div> */}
      </Offcanvas.Body>
    </Offcanvas>
  );
}

export default UserEdit;
