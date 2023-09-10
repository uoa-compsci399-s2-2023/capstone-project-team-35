import RootContext from "../../providers/root";
import { SpeciesCard, FileButton } from "../../components";

import { useContext, useState } from "react";

const ResultsPage = () => {
  const { data, setCurrentPage } = useContext(RootContext);

  const [currentSelectedImage, setCurrentSelectedImage] = useState(null);

  console.log(data);
  return (
    // Main Parent
    <main className="flex min-h-screen px-8 pt-8 gap-11">
      {/* File Navigation Section */}
      <div className="flex flex-col w-1/3 shadow-2xl bg-slate-100 rounded-t-3xl">
        {/* Navigation Header */}
        <div className="flex items-center justify-center relative  h-[calc(100%-850px)]">
          {/* Ocell.ai Logo */}
          <div className="justify-center text-6xl text-status-orange">
            Ocell.ai
          </div>

          {/* Home Button */}
          <div className="absolute top-0 w-8 m-4 bg-white border border-black rounded cursor-pointer left-1 aspect-square"></div>
        </div>

        {/* Navigation Body */}
        <div className="relative items-center justify-center h-[calc(100%)]">
          <div className="flex flex-col items-center w-full h-full gap-4 p-5">
            {data.map((image) => (
              <FileButton
                image={image}
                selected={
                  currentSelectedImage?.input_image_path ==
                  image.input_image_path
                }
                key={image.input_image_path}
                onClick={() => setCurrentSelectedImage(image)}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Results Section */}
      <div className="flex flex-col w-2/3 pb-8">
        {/* Species Card Section */}
        <div className="relative flex pb-6 border-b border-black h-3/5 gap-9">
          <SpeciesCardGroup image={currentSelectedImage} />
        </div>

        {/* Auxiliary Info Section */}
        <div className="flex h-2/5">
          {/* Reference Image Section */}
          <div className="w-5/12 border-r border-black"></div>

          {/* Data Table Section */}
          <div className="w-7/12"></div>
        </div>
      </div>
    </main>
  );
};

function SpeciesCardGroup({ image }) {
  if (!image) return null;

  const { predictions } = image;
  console.log(predictions);

  return (
    <>
      {Object.entries(predictions).map(([rank, prediction]) => (
        <SpeciesCard key={rank} rank={rank} {...prediction} />
      ))}

      {/* <SpeciesCard
        rank={0}
        confidence={0.79}
        species_name={"species A"}
        tags={{
          endemic: false,
          invasive: true,
          "non-native": true,
          "non-invasive": false,
        }}
      />
       */}
    </>
  );
}

export default ResultsPage;
