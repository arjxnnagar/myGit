import React, { useEffect, useState } from "react";
import HeatMap from "@uiw/react-heat-map";

// Generate random activity data
const generateActivityData = (startDate, endDate) => {
  const data = [];

  let currentDate = new Date(startDate);
  const end = new Date(endDate);

  while (currentDate <= end) {
    data.push({
      date: currentDate.toISOString().split("T")[0],
      count: Math.floor(Math.random() * 50),
    });

    currentDate.setDate(currentDate.getDate() + 1);
  }

  return data;
};

// Generate heatmap colors
const getPanelColors = (maxCount) => {
  const colors = {};

  for (let i = 0; i <= maxCount; i++) {
    const greenValue = Math.floor((i / maxCount) * 255);
    colors[i] = `rgb(0, ${greenValue}, 0)`;
  }

  return colors;
};

const HeatMapProfile = () => {
  const [activityData, setActivityData] = useState([]);
  const [panelColors, setPanelColors] = useState({});

  useEffect(() => {
    const startDate = "2001-01-01";
    const endDate = "2001-01-31";

    const data = generateActivityData(startDate, endDate);

    setActivityData(data);

    const maxCount = Math.max(...data.map((d) => d.count));

    setPanelColors(getPanelColors(maxCount));
  }, []);

  return (
    <div className="w-full rounded-xl border border-[#30363d] bg-[#0d1117] p-6 text-white">
      <h4 className="mb-4 text-lg font-semibold">Recent Contributions</h4>

      <div className="overflow-x-auto">
        <HeatMap
          value={activityData}
          weekLabels={["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]}
          startDate={new Date("2001-01-01")}
          rectSize={15}
          space={3}
          rectProps={{
            rx: 2.5,
          }}
          panelColors={panelColors}
        />
      </div>
    </div>
  );
};

export default HeatMapProfile;
