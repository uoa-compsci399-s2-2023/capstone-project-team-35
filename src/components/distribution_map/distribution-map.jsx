import React from "react";
import Plot from "react-plotly.js";

const sample_loc = [
  "Philippines",
  "India",
  "Bangladesh",
  "United States of America",
  "Singapore",
  "Thailand",
  "Hong Kong",
  "China",
  "Cameroon",
  "South Africa",
  "Chinese Taipei",
  "Papua New Guinea",
  "R\u00e9union",
  "Macao",
  "Cambodia",
  "Sri Lanka",
  null,
  "Burundi",
  "Kenya",
  "Malawi",
  "Malaysia",
  "Canada",
  "Comoros",
  "Australia",
  "Indonesia",
  "Tanzania, United Republic of",
  "Sudan",
  "C\u00f4te d\u2019Ivoire",
  "Madagascar",
  "Mayotte",
];

const sample_tally = [
  52, 44, 597, 74, 4, 20, 8, 79, 72, 4, 19, 18, 30, 2, 2, 15, 13, 10, 17, 10,
  10, 1, 45, 1, 9, 6, 2, 1, 15, 20,
];

const DistributionMap = ({ data }) => {
  return (
    <Plot
      data={[
        {
          type: "choropleth",
          locationmode: "country names",
          locations: sample_loc,
          z: sample_tally,
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
              color: "#707070",
              width: 0.25,
            },
          },
        },
      ]}
      layout={{
        autosize: false,
        width: 700,
        height: 375,
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
        paper_bgcolor: "#f5f5f5",
      }}
      config={{ responsive: true }}
    />
  );
};

export default DistributionMap;
