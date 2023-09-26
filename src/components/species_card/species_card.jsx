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
import globe_icon from "../../assets/ui-elements/globe.svg";
import link_icon from "../../assets/ui-elements/link_logo.svg";
import RadialGraph from "../radial_graph/radial-graph";
import SpeciesTag from "../tags/tags";
// import { motion } from "framer-motion";

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
          <div className="flex flex-col w-5/12 h-full rounded-2xl">
            {/* Left Header */}
            <div className="flex flex-row h-2/5 rounded-2xl">
              {/* Radial Graph Container */}
              <div id="graph_container-A" className="flex w-1/3">
                {/* small radial graph */}
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

              {/* Species Name Container */}
              <div className="flex w-2/3">
                {/* Genus and Species Name */}
                <div className="w-full p-4 mt-8 mb-8 ">
                  <div className="text-3xl text-left overflow-ellipsis">
                    {genus} {species}
                  </div>
                </div>
              </div>
            </div>

            {/* Left Body */}
            <div className="flex flex-col items-center justify-start h-full gap-4 p-4 overflow-hidden rounded-2xl">
              {/* Reference Image */}
              <div className="flex w-7/12 rounded-2xl aspect-square bg-slate-500">
                <DislplayRefImage ref_data={image} />
              </div>

              {/* Tags */}
              <div className="flex flex-wrap items-center justify-center">
                {/* Object.keys returns an array of keys */}
                {/* Loop through array */}
                {Object.keys(tags || {}).map((tag) => {
                  // If tag is false, return null
                  if (!tags[tag]) return null;

                  return (
                    // <div className="inline-block px-2 py-1 m-1 bg-status-blue">
                    //   {tag}
                    // </div>
                    <SpeciesTag tag={tag} />
                    // <div
                    //   key={tag}
                    //   className="inline-block px-2 py-1 m-1 text-sm font-semibold border border-black rounded"
                    // >
                    //   {/* {tag} */}
                    //   <SpeciesTag {...tag} />
                    // </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* separator */}
          <div className="w-[2px] h-5/12 mt-[70px] mb-8 opacity-20 bg-foreground-light" />

          {/* RIGHT INFO-BOX */}
          <div className="flex flex-col w-7/12 h-full gap-1 rounded-2xl">
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
            <div className="flex flex-col h-full pl-4">
              {/* Country Label */}
              <div className="flex flex-row w-full h-1/5">
                <div className="relative flex items-start justify-end w-1/12 h-full p-2 mt-2">
                  <div className="flex w-full right-1 aspect-square">
                    <img src={globe_icon} alt="globe icon" />
                  </div>
                </div>
                <div className="flex flex-col items-start justify-start w-full p-2 text-3xl">
                  Country
                  <span className="text-2xl text-slate-900">{country}</span>
                </div>
              </div>

              {/* Distribution Link */}
              <div className="flex h-4/5">
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
              </div>
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
          <div className="w-full text-2xl text-center truncate max-w-fit text-ellipsis">
            {genus} {species}
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

          <div className="w-full h-[2px] opacity-20 bg-foreground-light" />

          {/* Tap to view info */}
          <div className="flex">
            <a
              className="flex items-center gap-2 cursor-pointer"
              onClick={handleExpand}
              // href=""
            >
              <div className="w-8 rounded aspect-square">
                <img
                  src={view_icon}
                  alt="view icon"
                  className="z-0 items-center w-full h-full scale-125"
                ></img>
              </div>
              <span className="text-xl">tap to view info</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

function DislplayRefImage({ ref_data }) {
  if (!ref_data) return null;
  return (
    <div
      id="input_img_container"
      className="flex w-full rounded-2xl aspect-square bg-slate-500"
    >
      <img
        src={`data:image/jpeg;base64,${ref_data}`}
        alt="reference"
        className="object-cover w-full rounded-2xl"
      />
    </div>
  );
}

export default SpeciesCard;