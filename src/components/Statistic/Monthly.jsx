import React, { useEffect } from "react";
import { Bar } from "react-chartjs-2";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchShowIncomeByMonth } from "../../Slices/statisticSlice";
import { Card, Col, Container, Row } from "react-bootstrap";

import { CategoryScale, Chart, registerables } from "chart.js";
Chart.register(CategoryScale);
Chart.register(...registerables);

function ListStatistic() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const incomeByMonth = useSelector((state) => state.statistic.incomeByMonth);

  useEffect(() => {
    try {
      dispatch(fetchShowIncomeByMonth());
    } catch (err) {
      if (err.message === "signin again") {
        navigate("/signin");
      }
    }
  }, [dispatch, navigate]);

  return (
    <Bar
      className=""
      data={{
        labels: incomeByMonth.label,
        datasets: [{ label: "USD", data: incomeByMonth.data }],
      }}
      options={{
        legend: { display: false },
        title: {
          display: true,
          text: "Income group by month",
        },
      }}
    />
  );
}

export default ListStatistic;
