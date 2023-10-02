import React from "react";
import Plot from "react-plotly.js";

const DistributionMap = ({ species }) => {
  return (
    <Plot
      data={[
        {
          type: "choropleth",
          locationmode: "country names",
          locations: ["United States", "Canada", "Mexico"],
          z: [1, 2, 3],
          text: [`United States`],
          colorscale: [
            [0, "#fff3d5"],
            [0.35, "#fddf90"],
            [0.5, "#fbc229"],
            [0.6, "#fc7f40"],
            [0.7, "#ff5e49"],
            [1, "#cd0053"],
          ],
          autocolorscale: false,
          marker: {
            line: {
              color: "rgb(180,180,180)",
              width: 0.5,
            },
          },
        },
      ]}
      layout={{
        width: 700,
        height: 420,
        title: `Distribution Map`,
        geo: {
          projection: {
            type: "robinson",
          },
        },
      }}
    />
  );
};

export default DistributionMap;
