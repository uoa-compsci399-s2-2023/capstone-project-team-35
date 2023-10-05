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
        autosize: false,
        width: 700,
        height: 390,
        margin: {
          l: 50,
          r: 50,
          b: 50,
          t: 50,
          pad: 0,
        },
        title: {
          text: "DISTRIBUTION MAP",

          font: {
            family: "Geologica",
            size: 24,
            color: "#909090",
          },
          yref: "paper",
          y: 1.1,
        },
        geo: {
          projection: {
            type: "robinson",
          },
        },
        // paper_bgcolor: "#f5f5f5",
      }}
      config={{ responsive: true }}
    />
  );
};

export default DistributionMap;
