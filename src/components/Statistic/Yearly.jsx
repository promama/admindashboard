import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchShowIncomeByYear } from "../../Slices/statisticSlice";

import { CategoryScale, Chart, registerables } from "chart.js";
import { CircularProgress } from "@mui/material";
Chart.register(CategoryScale);
Chart.register(...registerables);

function ListStatistic() {
  const stats = useSelector((state) => state.statistic.stats);
  const isLoading = useSelector((state) => state.statistic.isLoading);

  return (
    <>
      {isLoading ? (
        <CircularProgress className="mt-2" />
      ) : (
        <Bar
          className=""
          data={{
            labels: stats.label,
            datasets: [{ label: "USD", data: stats.data }],
          }}
          options={{
            legend: { display: false },
            title: {
              display: true,
              text: "Income group by year",
            },
          }}
        />
      )}
    </>
  );
}

export default ListStatistic;
