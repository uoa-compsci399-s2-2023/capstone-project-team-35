/* eslint-disable react/prop-types */
/*
  confidence: number;
  species_name: string;
  tags: string[];
  rank: 0 | 1 | 2;
  expanded: boolean;
*/

// Tags is object of booleans
// const tags = {
//   endemic: true,
//   invasive: true,
//   "non-native": true,
//   "non-invasive": true,
// };

import { useState, useEffect } from "react";
import view_icon from "../../assets/ui-elements/view_icon.svg";
import shrink_icon from "../../assets/ui-elements/shrink_icon.svg";
import info_icon from "../../assets/ui-elements/info_icon.svg";
import gallery_icon from "../../assets/ui-elements/gallery_icon.png";
import RadialGraph from "../radial_graph/radial-graph";
import SpeciesTag from "../tags/tags";
import DistributionMap from "../distribution_map/distribution-map";

const rankedClasses = [
  { marginTop: "mt-4", rank_color: "bg-status-yellow", theme: "#FBC229" },
  {
    marginTop: "mt-12",
    rank_color: "bg-status-orange",
    theme: "#FC7F40",
  },
  { marginTop: "mt-16", rank_color: "bg-status-red", theme: "#FF5E49" },
];

const SpeciesCard = (props) => {
  const { expanded } = props;
  const [isExpanded, setIsExpanded] = useState(expanded);

  useEffect(() => {
    setIsExpanded(false);
  }, [props]);

  console.log(props);

  return isExpanded ? (
    <SpeciesCardExpanded
      {...props}
      handleCollapse={() => setIsExpanded(false)}
    />
  ) : (
    <SpeciesCardCollapsed {...props} handleExpand={() => setIsExpanded(true)} />
  );
};

function SpeciesCardExpanded({
  country,
  genus,
  image,
  probability,
  species,
  tags,
  rank,
  handleCollapse,
}) {
  const { rank_color, theme } = rankedClasses[rank];
  const probPercentage = (Number(probability) * 100).toFixed(2);
  // const graph_dim = document.getElementById("graph_container-A").clientWidth;
  return (
    <>
      {/* Maximum Height of the parent panel for reference */}
      <div className="w-full"></div>
      {/* Main Expanded Container */}
      <div
        className={`absolute overlay z-50 p-2 w-full h-[calc(100%-24px)] flex items-center justify-center ${rank_color} rounded-3xl`}
      >
        {/* Items Container */}
        <div className="relative flex flex-row w-full h-full bg-background-light rounded-2xl">
          {/* LEFT INFO-BOX */}
          <div className="flex flex-col items-center justify-center w-4/12 max-h-full gap-4 px-10 py-4 bg-white overflow-clip rounded-2xl">
            {/* Confidence Circle */}
            <div className="flex items-center justify-center w-3/5 rounded-full aspect-square">
              <RadialGraph
                className="flex"
                progress={probPercentage}
                color={theme}
              />
              <span className="absolute z-10 flex font-semibold lg:text-2xl md:text-xl text-foreground-dark">
                {`${probPercentage}%`}
              </span>
            </div>

            {/* Species Name */}
            <div
              className="flex flex-col w-full max-w-xl text-center truncate md:text-xl lg:text-2xl text-ellipsis text-foreground-dark"
              style={{
                fontFamily: "Geologica",
                fontWeight: 400,
                letterSpacing: 0,
              }}
            >
              <p>{genus}</p>{" "}
              <p className="italic" style={{ fontWeight: 300 }}>
                {species}
              </p>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap items-center justify-center">
              {/* Object.keys returns an array of keys */}
              {/* Loop through array */}
              {Object.keys(tags || {}).map((tag) => {
                // If tag is false, return null
                if (!tags[tag]) return null;

                return (
                  <SpeciesTag tag={tag} />
                  // <div
                  //   key={tag}
                  //   className="inline-block px-2 py-1 m-1 text-sm font-semibold border-4 border-black rounded-md border-opacity-5"
                  // >
                  //   {tag}
                  // </div>
                );
              })}
            </div>

            {/* Left Header */}
            {/* <div className="flex flex-row h-2/5 rounded-2xl">
              Radial Graph Container
              <div id="graph_container-A" className="flex w-1/3">
                small radial graph
                <div
                  id="graph_container-B"
                  className="flex items-center justify-center w-full max-w-full p-5 rounded-full aspect-square"
                >
                  <RadialGraph
                    id="radial_graph"
                    className="relative"
                    progress={probPercentage}
                    color={theme}
                    // dimension={115}
                  />
                  <span className="absolute z-10 flex font-semibold text-md text-foreground-dark">
                    {`${probPercentage}%`}
                  </span>
                </div>
              </div>

              Species Name Container
              <div className="flex w-2/3">
                Genus and Species Name
                <div className="w-full p-4 mt-8 mb-8 ">
                  <div className="text-3xl text-left overflow-ellipsis">
                    {genus} {species}
                  </div>
                </div>
              </div>
            </div> */}

            {/* Left Body */}
            {/* <div className="flex flex-col items-center justify-start h-full gap-4 p-4 overflow-hidden rounded-2xl">
              Reference Image
              <div className="flex w-7/12 rounded-2xl aspect-square bg-slate-500">
                <DislplayRefImage ref_data={image} />
              </div>

              Tags
              <div className="flex flex-wrap items-center justify-center">
                Object.keys returns an array of keys
                Loop through array
                {Object.keys(tags || {}).map((tag) => {
                  // If tag is false, return null
                  if (!tags[tag]) return null;

                  return (
                    <SpeciesTag tag={tag} />
                  );
                })}
              </div>
            </div> */}
          </div>

          {/* separator */}
          <div className="w-[2px] h-5/12 mt-[70px] mb-8 opacity-20 bg-foreground-light" />

          {/* RIGHT INFO-BOX */}
          <div className="flex flex-col w-8/12 h-full gap-1 rounded-2xl">
            {/* Collapse Button */}
            <div className="flex h-20">
              <div
                onClick={handleCollapse}
                className="absolute w-8 m-4 bg-white rounded cursor-pointer aspect-square right-1 top-1"
              >
                <img
                  src={shrink_icon}
                  className="items-center w-full h-full"
                  alt="shrink icon"
                ></img>
              </div>
            </div>

            {/* Distribution panel body */}
            <div className="flex flex-col items-center h-full pr-4 overflow-auto">
              {/* Distribution Map */}
              {/* <div
                id="test-map"
                className="flex items-center justify-center w-full h-10/12 overflow-clip bg-slate-200"
              >
                <DistributionMap />
              </div> */}
              <DistributionMap />

              {/* GBIF Links */}
              <div className="flex flex-row items-start justify-center w-full gap-12 mb-6 h-1/12">
                <a
                  className="flex items-center gap-2 cursor-pointer"
                  href="https://www.gbif.org/occurrence/gallery?taxon_key=7930834"
                  target="_blank"
                  rel="noreferrer"
                >
                  <div className="w-4 rounded aspect-square">
                    <img
                      src={gallery_icon}
                      alt="gallery icon"
                      className="z-0 items-center w-full h-full scale-125"
                    ></img>
                  </div>
                  <span
                    className="text-lg italic text-status-blue"
                    style={{
                      fontFamily: "Geologica",
                      fontWeight: 200,
                      letterSpacing: 0,
                    }}
                  >
                    reference photos
                  </span>
                </a>

                <a
                  className="flex items-center gap-2 cursor-pointer"
                  href="https://www.gbif.org/species/7930834"
                  target="_blank"
                  rel="noreferrer"
                >
                  <div className="w-4 rounded aspect-square">
                    <img
                      src={info_icon}
                      alt="info icon"
                      className="z-0 items-center w-full h-full scale-125"
                    ></img>
                  </div>
                  <span
                    className="text-lg italic text-status-blue"
                    style={{
                      fontFamily: "Geologica",
                      fontWeight: 200,
                      letterSpacing: 0,
                    }}
                  >
                    more information
                  </span>
                </a>
              </div>

              {/* Country Label */}
              {/* <div className="flex flex-row w-full h-1/5">
                <div className="relative flex items-start justify-end w-1/12 h-full p-2 mt-2">
                  <div className="flex w-full right-1 aspect-square">
                    <img src={globe_icon} alt="globe icon" />
                  </div>
                </div>
                <div className="flex flex-col items-start justify-start w-full p-2 text-3xl">
                  Country
                  <span className="text-2xl text-slate-900">{country}</span>
                </div>
              </div> */}

              {/* Distribution Link */}
              {/* <div className="flex h-4/5">
                <div className="flex flex-row w-full h-2/6">
                  <div className="relative flex items-start justify-end w-1/12 h-full p-2 mt-2">
                    <div className="flex w-full right-1 aspect-square">
                      <img src={link_icon} alt="link icon" />
                    </div>
                  </div>
                  <div className="flex flex-col items-start justify-start w-full p-2">
                    <span className="text-3xl">Distribution</span>
                    <span className="text-slate-900 text-md">
                      {"https://www.gbif.org/species/5087454"}
                    </span>
                  </div>
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function SpeciesCardCollapsed({
  genus,
  probability,
  species,
  tags,
  rank,
  handleExpand,
}) {
  // Props come from the results passed onto the instances in the components in the results page
  const { marginTop, rank_color, theme } = rankedClasses[rank];
  const probPercentage = (Number(probability) * 100).toFixed(2);
  return (
    // BG card container and height reference
    <div className={`w-full max-w-full ${marginTop}`}>
      {/* Card background */}
      <div className={`w-full h-full max-w-full rounded-3xl p-2 ${rank_color}`}>
        {/* Items container */}
        <div className="flex flex-col items-center justify-center max-h-full gap-4 px-10 py-4 bg-white overflow-clip rounded-2xl">
          {/* Confidence Circle */}
          <div className="flex items-center justify-center w-3/5 rounded-full aspect-square">
            <RadialGraph
              className="flex"
              progress={probPercentage}
              color={theme}
            />
            <span className="absolute z-10 flex text-2xl font-semibold text-foreground-dark">
              {`${probPercentage}%`}
            </span>
          </div>

          {/* Species Name */}
          <div
            className="flex flex-col w-full max-w-xl text-center truncate md:text-xl lg:text-2xl text-ellipsis text-foreground-dark"
            style={{
              fontFamily: "Geologica",
              fontWeight: 400,
              letterSpacing: 0,
            }}
          >
            <p>{genus}</p>{" "}
            <p className="italic" style={{ fontWeight: 300 }}>
              {species}
            </p>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap items-center justify-center">
            {/* Object.keys returns an array of keys */}
            {/* Loop through array */}
            {Object.keys(tags || {}).map((tag) => {
              // If tag is false, return null
              if (!tags[tag]) return null;

              return (
                tags[tag] === "TRUE" && <SpeciesTag tag={tag} />
                // <div
                //   key={tag}
                //   className="inline-block px-2 py-1 m-1 text-sm font-semibold border-4 border-black rounded-md border-opacity-5"
                // >
                //   {tag}
                // </div>
              );
            })}
          </div>

          <div className="w-full h-[2px] opacity-20 bg-foreground-light" />

          {/* Tap to view info */}
          <div className="flex">
            <div
              className="flex items-center gap-2 cursor-pointer"
              onClick={handleExpand}
            >
              <div className="w-8 rounded aspect-square">
                <img
                  src={view_icon}
                  alt="view icon"
                  className="z-0 items-center w-full h-full scale-125"
                ></img>
              </div>
              <span
                className="text-lg"
                style={{
                  fontFamily: "Geologica",
                  fontWeight: 200,
                  letterSpacing: 0,
                }}
              >
                view distribution
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SpeciesCard;
