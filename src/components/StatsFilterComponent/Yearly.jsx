import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchShowIncomeByYear } from "../../Slices/statisticSlice";

function Yearly() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    try {
      dispatch(fetchShowIncomeByYear()).unwrap();
    } catch (err) {
      if (err.message === "signin again") {
        navigate("/signin");
      }
    }
  }, [dispatch, navigate]);

  return <></>;
}

export default Yearly;
