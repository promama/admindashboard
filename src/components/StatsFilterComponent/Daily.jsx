import {
  Box,
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { reset } from "../../Slices/userSlice";
import {
  fetchMonths,
  fetchShowIncomeByYearAndMonth,
  fetchYears,
} from "../../Slices/statisticSlice";

function Daily() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const years = useSelector((state) => state.statistic.years);
  const months = useSelector((state) => state.statistic.months);
  const isLoadMonth = useSelector((state) => state.statistic.isLoadMonth);
  const isLoading = useSelector((state) => state.statistic.isLoading);

  const [year, setYear] = useState("");
  const [month, setMonth] = useState("");

  const handleYearChange = async (event) => {
    setYear(event.target.value);
    try {
      await dispatch(fetchMonths(event.target.value)).unwrap();
    } catch (err) {
      if (err.message === "signin again") {
        dispatch(reset());
        navigate("/signin");
      } else {
        alert(err.message);
      }
    }
  };

  const handleMonthChange = async (event) => {
    setMonth(event.target.value);
  };

  const handleFindDaily = async () => {
    if (month === "" || year === "") {
      alert("nah");
    } else {
      try {
        await dispatch(fetchShowIncomeByYearAndMonth({ year, month })).unwrap();
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

  useEffect(() => {
    try {
      dispatch(fetchYears()).unwrap();
    } catch (err) {
      if (err.message === "signin again") {
        navigate("/signin");
      }
    }
  }, [dispatch, navigate]);
  return (
    <Container className="d-flex align-items-center">
      <Col xs={5}>
        <Box sx={{ minWidth: 120 }}>
          <FormControl fullWidth>
            <InputLabel>Year</InputLabel>
            <Select value={year} label="Year" onChange={handleYearChange}>
              {years.map((year) => {
                return <MenuItem value={year}>{year}</MenuItem>;
              })}
            </Select>
          </FormControl>
        </Box>
      </Col>
      <Col xs={5}>
        {isLoadMonth ? (
          <CircularProgress />
        ) : (
          <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
              <InputLabel>Month</InputLabel>
              <Select value={month} label="Month" onChange={handleMonthChange}>
                {months.map((month) => {
                  return <MenuItem value={month}>{month}</MenuItem>;
                })}
              </Select>
            </FormControl>
          </Box>
        )}
      </Col>
      <Col>
        {isLoading ? (
          <CircularProgress />
        ) : (
          <Button variant="outline-primary" onClick={handleFindDaily}>
            Find
          </Button>
        )}
      </Col>
    </Container>
  );
}

export default Daily;
