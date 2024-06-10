import { Tab, Tabs } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";

function TabStats(props) {
  const [value, setValue] = useState("Yearly");
  const [textColor, setTextColor] = useState("blue");
  const [indicatorColor, setIndicatorColor] = useState("blue");

  const handleChange = (event, newValue) => {
    setValue(newValue);
    props.parentCallback(newValue);
  };

  return (
    <Box sx={{ width: "100%", marginBottom: "10px" }}>
      <Tabs
        value={value}
        onChange={handleChange}
        textColor="primary"
        sx={{
          "& .MuiTab-root.Mui-selected": {
            color: textColor,
          },
          "& .MuiTabs-indicator": {
            backgroundColor: indicatorColor,
            height: 3,
          },
        }}
        aria-label="secondary tabs example"
      >
        <Tab
          value="Yearly"
          label={"Yearly"}
          onClick={() => {
            setTextColor("blue");
            setIndicatorColor("blue");
          }}
        />
        <Tab
          value="Monthly"
          label={"Monthly"}
          onClick={() => {
            setTextColor("#ff6500");
            setIndicatorColor("#ff6500");
          }}
        />
        <Tab
          value="Daily"
          label={"Daily"}
          onClick={() => {
            setTextColor("#00f6ff");
            setIndicatorColor("#00f6ff");
          }}
        />
        <Tab
          value="Custom"
          label={"Custom"}
          onClick={() => {
            setTextColor("#1bff00");
            setIndicatorColor("#1bff00");
          }}
        />
      </Tabs>
    </Box>
  );
}

export default TabStats;
