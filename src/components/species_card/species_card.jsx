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

import { useState } from "react";
import view_icon from "../../assets/ui-elements/view_icon.svg";

const rankedClasses = [
  { marginTop: "mt-4", color: "bg-status-yellow" },
  { marginTop: "mt-12", color: "bg-status-orange" },
  { marginTop: "mt-16", color: "bg-status-red" },
];

const SpeciesCard = (props) => {
  const { expanded } = props;
  const [isExpanded, setIsExpanded] = useState(expanded);

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
  image_file_path,
  probability,
  species,
  tags,
  rank,
  handleCollapse,
}) {
  const { color } = rankedClasses[rank];
  return (
    <>
      {/* Maximum Height of the parent panel for reference */}
      <div className="w-full"></div>
      {/* Main Expanded Container */}
      <div
        className={`absolute overlay z-50 p-1 w-full h-[calc(100%-24px)] flex items-center justify-center ${color} border border-black rounded-2xl`}
      >
        {/* Items Container */}
        <div className="relative w-full h-full border border-black bg-slate-50 rounded-2xl">
          {/* Collapse Button */}
          <div
            onClick={handleCollapse}
            className="absolute w-8 bg-white border border-black rounded cursor-pointer aspect-square right-1 top-1"
          ></div>
        </div>
      </div>
    </>
  );
}

function SpeciesCardCollapsed({
  country,
  genus,
  image_file_path,
  probability,
  species,
  tags,
  rank,
  handleExpand,
}) {
  // Props come from the results passed onto the instances in the components in the results page
  const { marginTop, color } = rankedClasses[rank];
  return (
    // BG card container and height reference
    <div className={`w-full ${marginTop}`}>
      {/* Card background */}
      <div className={`w-full h-full rounded-2xl p-1 ${color}`}>
        {/* Items container */}
        <div className="flex flex-col items-center justify-center gap-4 px-16 py-4 bg-white rounded-2xl ">
          {/* Confidence Circle */}

          {/* <div
            className={`overlay items-center justify-center radial-progress border-6 border-yellow`}
            style={{ "--value": "70", "--size": "8rem", "--thickness": "12px" }}
          >
            {Number(probability).toFixed(2)}%
          </div> */}
          <div
            className={`${color} w-44 aspect-square rounded-full flex items-center justify-center `}
          >
            {/* flex items-center justify-center to center an element */}
            <div className="flex items-center justify-center w-32 bg-white rounded-full aspect-square">
              <span className="text-3xl font-semibold text-foreground-dark">
                {Number(probability).toFixed(2)}
              </span>
            </div>
          </div>

          {/* Species Name */}
          <div className="text-3xl text-center">
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
                <div
                  key={tag}
                  className="inline-block px-2 py-1 m-1 text-sm font-semibold border border-black rounded"
                >
                  {tag}
                </div>
              );
            })}
          </div>

          <div className="w-full h-[1px] bg-black" />

          {/* Tap to view info */}
          <div className="flex">
            <a
              className="flex items-center gap-2 cursor-pointer"
              onClick={handleExpand}
            >
              <div className="w-8 rounded aspect-square">
                <img
                  src={view_icon}
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

export default SpeciesCard;
