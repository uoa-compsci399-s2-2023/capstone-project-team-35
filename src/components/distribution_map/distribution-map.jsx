import React from "react";
import Plot from "react-plotly.js";

const DistributionMap = ({ data }) => {
  if (!data) return null;

  if (data.locations.length === 0)
    return (
      <div className="flex items-center justify-center w-11/12 p-6 text-xl h-2/3 bg-slate-50">
        <span>no occurrences recorded</span>
      </div>
    );
  console.log("DistributionMapData", data);
  return (
    <Plot
      data={[
        {
          type: "choropleth",
          locationmode: "country names",
          locations: data.locations,
          z: data.tally,
          text: "counts",
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
              color: "#707070",
              width: 0.25,
            },
          },
        },
      ]}
      layout={{
        autosize: false,
        width: 500,
        height: 300,
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
            size: 20,
            color: "#909090",
          },
          yref: "paper",
          y: 1.2,
          xref: "paper",
          x: 0.5,
        },
        annotations: [
          {
            xref: "paper",
            yref: "paper",
            x: 0.5,
            xanchor: "center",
            y: 1,
            yanchor: "bottom",
            text: "Showing the first 3000 occurrences. More info at GBIF.org",
            showarrow: false,
            font: {
              family: "Geologica",
              size: 12,
              color: "#909090",
            },
          },
        ],
        geo: {
          projection: {
            type: "robinson",
          },
          coastlinecolor: "#CCCCCC",
          coastlinewidth: 1.5,
          framecolor: "#CCCCCC",
          framewidth: 2,
        },
        // paper_bgcolor: "#f5f5f5",
      }}
      config={{ responsive: true }}
    />
  );
};

export default DistributionMap;
