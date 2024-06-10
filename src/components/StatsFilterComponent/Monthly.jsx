import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  fetchShowIncomeByMonth,
  fetchYears,
} from "../../Slices/statisticSlice";
import { Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { Container } from "@mui/system";
import { reset } from "../../Slices/userSlice";

function Monthly() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const years = useSelector((state) => state.statistic.years);

  const [year, setYear] = useState("");

  const handleChange = async (event) => {
    setYear(event.target.value);
    try {
      await dispatch(fetchShowIncomeByMonth(event.target.value)).unwrap();
    } catch (err) {
      if (err.message === "signin again") {
        dispatch(reset());
        navigate("/signin");
      } else {
        alert(err.message);
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
    <Container>
      <Box sx={{ minWidth: 120 }}>
        <FormControl fullWidth>
          <InputLabel>Year</InputLabel>
          <Select value={year} label="Year" onChange={handleChange}>
            {years.map((year) => {
              return <MenuItem value={year}>{year}</MenuItem>;
            })}
          </Select>
        </FormControl>
      </Box>
    </Container>
  );
}

export default Monthly;
