import { useState } from "react";

const SpeciesTag = ({ tag }) => {
  // eslint-disable-next-line default-case
  // const [isTagged, setTagged] = useState(tag);

  // eslint-disable-next-line default-case

  switch (tag) {
    case "in_NZ":
      return (
        <div className="inline-block px-2 py-1 m-1 text-xs font-semibold border-4 rounded-md border-opacity-20 border-status-blue">
          <span>in NZ</span>
        </div>
      );

    case "endemic":
      return (
        <div className="inline-block px-2 py-1 m-1 text-xs font-semibold border-4 rounded-md border-opacity-20 border-status-light-green">
          <span>Endemic</span>
        </div>
      );

    case "unwanted_pest":
      return (
        <div className="inline-block px-2 py-1 m-1 text-xs font-semibold border-4 rounded-md border-opacity-20 border-status-red">
          <span>Unwanted Pest</span>
        </div>
      );

    case "native":
      return (
        <div className="inline-block px-2 py-1 m-1 text-xs font-semibold border-4 rounded-md border-opacity-20 border-status-yellow">
          <span>Native</span>
        </div>
      );

    case "introduced_biocontrol":
      return (
        <div className="inline-block px-2 py-1 m-1 text-xs font-semibold border-4 border-purple-700 rounded-md border-opacity-20">
          <span>Introduced Biocontrol</span>
        </div>
      );

    default:
      return null;
  }
};

export default SpeciesTag;
