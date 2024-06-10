import React from "react";
import Monthly from "../../components/StatsFilterComponent/Monthly";
import Daily from "../../components/StatsFilterComponent/Daily";
import Custom from "../../components/StatsFilterComponent/Custom";
import Yearly from "../../components/StatsFilterComponent/Yearly";

function FilterOption(props) {
  const propsCheck = (props) => {
    if (props === "Yearly") return <Yearly />;
    if (props === "Monthly") return <Monthly />;
    if (props === "Daily") return <Daily />;
    return <Custom />;
  };

  return <>{propsCheck(props.showing)}</>;
}

export default FilterOption;
