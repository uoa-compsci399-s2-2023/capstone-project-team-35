const TagThemes = {
  in_NZ: {
    text: "in NZ",
    border_color: "border-status-blue",
    bg_color: "bg-status-blue",
  },

  endemic: {
    text: "Endemic",
    border_color: "border-status-light-green",
    bg_color: "bg-status-light-green",
  },
  unwanted_pest: {
    text: "Unwanted Pest",
    border_color: "border-status-red",
    bg_color: "bg-status-red",
  },
  native: {
    text: "Native",
    border_color: "border-status-yellow",
    bg_color: "bg-status-yellow",
  },
  introduced_biocontrol: {
    text: "Introduced Biocontrol",
    border_color: "border-purple-500",
    bg_color: "bg-purple-500",
  },
};

const SpeciesTag = ({ tag }) => {
  if (tag in TagThemes) {
    const { text, border_color, bg_color } = TagThemes[tag];
    return (
      <div
        className={`flex flex-row items-center justify-center gap-1 px-2 py-1 m-1 text-xs font-semibold border-4 rounded-md border-opacity-20 ${border_color}`}
      >
        <div className={`h-2 rounded-full aspect-square ${bg_color}`} />
        <span style={{ fontSize: "0.7vw" }}>{text}</span>
      </div>
    );
  } else {
    return (
      <div className="p-1 px-2 py-1 m-1 text-xs font-semibold border-4 rounded-md border-slate-500 border-opacity-20">
        <div className="h-2 rounded-full aspect-square bg-slate-500" />
        <div style={{ fontSize: "1vw" }}>{`${tag}`}</div>
      </div>
    );
  }
};

export default SpeciesTag;
