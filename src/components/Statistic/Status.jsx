import React, { useEffect } from "react";
import { Doughnut } from "react-chartjs-2";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchShowIncomeByStatus } from "../../Slices/statisticSlice";

import { CategoryScale, Chart, registerables } from "chart.js";
Chart.register(CategoryScale);
Chart.register(...registerables);

function Status() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const incomeByStatus = useSelector((state) => state.statistic.incomeByStatus);

  useEffect(() => {
    try {
      dispatch(fetchShowIncomeByStatus());
    } catch (err) {
      if (err.message === "signin again") {
        navigate("/signin");
      }
    }
  }, [dispatch, navigate]);

  return (
    <Doughnut
      data={{
        labels: incomeByStatus.label,
        datasets: [
          {
            label: "USD",
            backgroundColor: incomeByStatus.color,
            data: incomeByStatus.data,
          },
        ],
      }}
      options={{
        legend: { display: false },
        title: {
          display: true,
          text: "Income group by status",
        },
      }}
    />
  );
}

export default Status;
