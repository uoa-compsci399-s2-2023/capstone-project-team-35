import axios from "axios";
import { useEffect, useState } from "react";
import dist_nan_icon from "../../assets/ui-elements/dist-nan_icon.png";
import dist_ok_icon from "../../assets/ui-elements/dist-ok_icon.png";
import gallery_icon from "../../assets/ui-elements/gallery_icon.png";
import info_icon from "../../assets/ui-elements/info_icon.svg";
import shrink_icon from "../../assets/ui-elements/shrink_icon.svg";
import DistributionMap from "../distribution_map/distribution-map";
import RadialGraph from "../radial_graph/radial-graph";
import SpeciesTag from "../tags/tags";
import "./species-card.css";

const rankedClasses = [
  { marginTop: "mt-0", rank_color: "card_green", theme: "#C6E268" },
  {
    marginTop: "mt-8", rank_color: "card_yellow", theme: "#FBC229",
  },
  { marginTop: "mt-12", rank_color: "card_red", theme: "#FC7F40" },
];

const getDistribution = async ({
  taxon_key,
  setMapData,
  setIsFetchingMapData,
}) => {
  // console.log(`ID in getDist: ${taxon_key}`);
  setIsFetchingMapData(true);

  const localStorageItem = JSON.parse(localStorage.getItem(taxon_key));

  if (localStorageItem != null) {
    setIsFetchingMapData(false);
    // console.log("found:", localStorageItem);
    setMapData(localStorageItem);
    return;
  }

  try {
    // console.log("fetching...");
    await axios.get(`http://localhost:5000/get_occurences_by_country/${taxon_key}`).then((resp) => {
      setIsFetchingMapData(false);
      localStorage.setItem(taxon_key, JSON.stringify(resp.data));
      setMapData(resp.data);
    });
  } catch (error) {
    console.error("Error getting distribution data:", error);
  }
};

const SpeciesCard = (props) => {
  const [expanded, setExpanded] = useState(false);
  const [mapData, setMapData] = useState();
  const [isFetchingMapData, setIsFetchingMapData] = useState(false);
  // const taxon_key = props.distribution_url.split("/").pop();

  useEffect(() => {
    setExpanded(false);
  }, [props]);

  // console.log(props);

  return expanded ? (
    <SpeciesCardExpanded
      {...props}
      expanded={expanded}
      handleCollapse={() => setExpanded(false)}
      mapData={mapData}
      isFetchingMapData={isFetchingMapData}
    />
  ) : (
    <SpeciesCardCollapsed
      {...props}
      setMapData={setMapData}
      handleExpand={() => setExpanded(true)}
      setIsFetchingMapData={setIsFetchingMapData}
    />
  );
};

function SpeciesCardExpanded({
  genus,
  probability,
  species,
  distribution_url,
  tags,
  rank,
  expanded,
  handleCollapse,
  mapData,
  isFetchingMapData,
}) {
  const { rank_color, theme } = rankedClasses[rank];
  const probPercentage = (Number(probability) * 100).toFixed(1);
  // if (isFetchingMapData) return <>loading...</>;
  return (
    <>
      {/* Maximum Height of the parent panel for reference */}
      <div className="w-full"></div>
      {/* Main Expanded Container */}
      <div
        className={`${
          expanded ? "animate-species-card" : ""
        } animate_class ${rank_color} `}
      >
        {/* Items Container */}
        <div className="relative flex flex-row w-full h-full bg-background-light rounded-2xl">
          {/* LEFT INFO-BOX */}
          <div className="flex flex-col items-center justify-center w-4/12 max-h-full gap-4 px-10 py-4 bg-white overflow-clip rounded-2xl">
            {/* Confidence Circle */}
            <div className="flex items-center justify-center w-3/5 rounded-full">
              <RadialGraph
                className="flex"
                progress={probPercentage}
                color={theme}
              />
              <span
                style={{ fontSize: "1.3vw" }}
                className="absolute z-10 flex font-semibold lg:text-2xl md:text-xl text-foreground-dark"
              >
                {`${probPercentage}%`}
              </span>
            </div>

            {/* Species Name */}
            <div
              className="flex flex-col w-full max-w-xl text-center truncate md:text-xl lg:text-2xl text-ellipsis text-foreground-dark"
              style={{
                fontSize: "1.4vw",
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

                return tags[tag] === "TRUE" && <SpeciesTag tag={tag} />;
              })}
            </div>
          </div>

          {/* separator */}
          <div className="w-[2px] h-5/12 mt-[70px] mb-8 opacity-20 bg-foreground-light" />

          {/* RIGHT INFO-BOX */}
          <div className="flex flex-col w-8/12 h-full gap-1 rounded-2xl">
            {/* Collapse Button */}
            <div className="flex">
              <div
                onClick={handleCollapse}
                className="absolute w-8 m-4 bg-white rounded cursor-pointer aspect-square right-1 top-1 indexZ"
              >
                <img
                  src={shrink_icon}
                  className="items-center w-full h-full"
                  alt="shrink icon"
                ></img>
              </div>
            </div>

            {/* Distribution panel body */}
            <div className="flex flex-col items-center h-full pr-4 overflow-hidden distribution_map ">
              {/* Distribution Map */}
              <DisplayDistributionMap
                isFetchingMapData={isFetchingMapData}
                mapData={mapData}
              />
              {/* <DistributionMap data={mapData} /> */}

              {/* GBIF Links */}
              <div className="flex flex-row items-start justify-center w-full gap-12 mb-6 h-1/12">
                <DisplayExtLinks link={distribution_url} />
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
  distribution_url,
  tags,
  rank,
  handleExpand,
  setMapData,
  setIsFetchingMapData,
}) {
  // Props come from the results passed onto the instances in the components in the results page
  const { marginTop, rank_color, theme } = rankedClasses[rank];
  const probPercentage = (Number(probability) * 100).toFixed(1);
  return (
    // BG card container and height reference
    <div className={`w-full max-w-full ${marginTop} max_height`}>
      {/* Card background */}
      <div className={`w-full h-full max-w-full rounded-3xl p-2 ${rank_color}`}>
        {/* Items container */}
        {/* <div className="flex flex-col items-center justify-center max-h-full gap-4 px-10 py-4 bg-white overflow-clip rounded-2xl"> */}
        <div className="species_card_inner_container">
          {/* Confidence Circle */}
          <div className="flex items-center justify-center pt-4 radial_width">
            <RadialGraph
              className="flex"
              progress={probPercentage}
              color={theme}
            />
            <span
              className="absolute z-10 flex font-semibold text-foreground-dark radial_font"
            >
              {`${probPercentage}%`}
            </span>
          </div>

          {/* Species Name */}
          <div
            className="flex flex-col w-full max-w-xl text-center truncate md:text-xl lg:text-2xl text-ellipsis text-foreground-dark name_height"
            style={{
              fontFamily: "Geologica",
              fontWeight: 400,
              letterSpacing: 0,
            }}
          >
            <p className="name_height genus_font">{genus}</p>
            <p
              className="italic species_font"
              style={{
                fontWeight: 200,
                paddingBottom: 10,
                position: "relative",
                bottom: 15,
              }}
            >
              {species}
            </p>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap items-center justify-center p-2">
            {/* Object.keys returns an array of keys */}
            {/* Loop through array */}
            {Object.keys(tags || {}).map((tag) => {
              // If tag is false, return null
              if (!tags[tag]) return null;

              return tags[tag] === "TRUE" && <SpeciesTag tag={tag} />;
            })}
          </div>

          <div className="w-full h-[2px] opacity-20 bg-foreground-light" />

          {/* Tap to view info */}
          <div className="flex pb-4">
            <DisplayExpandButton
              link={distribution_url}
              handleExpand={handleExpand}
              setMapData={setMapData}
              setIsFetchingMapData={setIsFetchingMapData}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function DisplayExpandButton({
  link,
  handleExpand,
  setMapData,
  setIsFetchingMapData,
}) {
  if (!link)
    return (
      <div className="flex items-center gap-2">
        <div className="w-4 rounded aspect-square">
          <img
            src={dist_nan_icon}
            alt="no dist avail icon"
            className="z-0 items-center object-contain w-full h-full scale-125"
          ></img>
        </div>
        <span
          className="distribution_font"
          style={{
            fontFamily: "Geologica",
            fontWeight: 200,
            letterSpacing: 0,
            color: "#707070",
          }}
        >
          no distribution info
        </span>
      </div>
    );
  const taxon_key = link.split("/").pop();
  return (
    <div
      className="flex items-center gap-2 cursor-pointer"
      onClick={handleExpand}
      onClickCapture={() =>
        getDistribution({
          taxon_key,
          setMapData,
          setIsFetchingMapData,
        })
      }
    >
      <div className="object-contain w-4 rounded aspect-square">
        <img
          src={dist_ok_icon}
          alt="dist ok icon"
          className="z-0 items-center object-contain w-full h-full scale-125"
        ></img>
      </div>
      <span
        className="distribution_font"
        style={{
          fontFamily: "Geologica",
          fontWeight: 200,
          letterSpacing: 0,
        }}
      >
        view distribution
      </span>
    </div>
  );
}

function DisplayExtLinks({ link }) {
  if (!link)
    return (
      <span
        className="italic text-gray-500"
        style={{
          fontSize: "1vw",
        }}
      >
        no external links available
      </span>
    );

  const taxon_key = link.split("/").pop();
  return (
    <>
      <a
        className="flex items-center gap-2 cursor-pointer"
        href={`https://www.gbif.org/occurrence/gallery?taxon_key=${taxon_key}`}
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
            fontSize: "1vw",
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
        href={`https://www.gbif.org/species/${taxon_key}/metrics`}
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
            fontSize: "1vw",
            fontFamily: "Geologica",
            fontWeight: 200,
            letterSpacing: 0,
          }}
        >
          more information
        </span>
      </a>
    </>
  );
}

function DisplayDistributionMap({ isFetchingMapData, mapData }) {
  if (isFetchingMapData)
    return (
      // TODO: Add spinner here
      <div className="items-center justify-center w-full h-full text-2xl bg-slate-100">
        <div class="lds-dual-ring"></div>
      </div>
    );
  return <DistributionMap data={mapData} />;
}
export default SpeciesCard;
