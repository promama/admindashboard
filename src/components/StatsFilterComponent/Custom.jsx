import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import React, { useState } from "react";
import { Button, Col, Container } from "react-bootstrap";

import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchShowIncomeBetweenTwoDates } from "../../Slices/statisticSlice";
import { reset } from "../../Slices/userSlice";

function Custom() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [fromDate, setFromDate] = useState(dayjs("DD/MM/YYYY"));
  const [toDate, setToDate] = useState(dayjs("DD/MM/YYYY"));

  const handleFindFromTo = async () => {
    if (fromDate === "DD/MM/YYYY" || toDate === "DD/MM/YYYY") {
      alert("please choose a day to start and a day to end");
    } else if (fromDate >= toDate) {
      alert("please choose a start day happen before to day");
    } else {
      try {
        await dispatch(
          fetchShowIncomeBetweenTwoDates({
            from: fromDate,
            to: toDate,
          })
        ).unwrap();
      } catch (err) {
        if (err.message === "signin again") {
          dispatch(reset());
          navigate("/signin");
        } else {
          alert(err.message);
        }
      }
    }
  };
  return (
    <Container className="d-flex">
      <Col xs={5}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="From"
            format="DD/MM/YYYY"
            value={fromDate}
            onChange={(newDate) => setFromDate(newDate)}
          />
        </LocalizationProvider>
      </Col>
      <Col xs={5}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="To"
            format="DD/MM/YYYY"
            value={toDate}
            onChange={(newDate) => setToDate(newDate)}
          />
        </LocalizationProvider>
      </Col>
      <Col>
        <Button variant="outline-primary" onClick={handleFindFromTo}>
          Find
        </Button>
      </Col>
    </Container>
  );
}

export default Custom;
