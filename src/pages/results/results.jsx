import RootContext from "../../providers/root";
import { SpeciesCard, FileButton, ResultsTable } from "../../components";
import { useContext, useEffect, useState } from "react";
import main_logo from "../../assets/branding/main_logo.svg";
import home_icon from "../../assets/ui-elements/orange_home.svg";
import orange_download_icon from "../../assets/ui-elements/orange_download-icon.svg";
import gray_download_icon from "../../assets/ui-elements/gray_download-icon.svg";
import "tailwindcss/tailwind.css";
import "./results.css";
import axios from "axios";

const ResultsPage = () => {
  const { data, setCurrentPage } = useContext(RootContext);

  const [currentSelectedImage, setCurrentSelectedImage] = useState(null);

  useEffect(() => {
    if (data?.predictions && data.predictions.length) {
      setCurrentSelectedImage(data.predictions[0]);
    }
  }, [data]);

  const downloadFile = async () => {
    try {
      // Send a POST request to the '/classify' endpoint in the backend to upload the image
      const response = await axios.get(`/download`, {
        responseType: "blob",
      });

      // Create a Blob object from the response data
      const fileBlob = new Blob([response.data]);

      // Create a URL for the Blob
      const fileURL = window.URL.createObjectURL(fileBlob);

      // Create a temporary download link from fileURL
      const downloadLink = document.createElement("a");
      downloadLink.href = fileURL;
      downloadLink.download = "predictions.csv";

      // Activate the link to download the file.
      downloadLink.click();

      // Return the URL to the previous link/page.
      downloadLink.parentNode.removeChild(downloadLink);
    } catch (error) {
      // Display errors/status if there is an error
      console.error("Error downloading file:", error);
    }
  };

  const handleClick = () => {
    const confirmMessage =
      "If you continue, you may lose unsaved data. Are you sure?";
    if (window.confirm(confirmMessage)) {
      // User clicked "OK," proceed with the action
      setCurrentPage("");
    } else {
      // User clicked "Cancel," do nothing or handle it accordingly
    }
  };

  // console.log(data[0]);
  return (
    // Main Parent
    <main className="flex max-h-screen min-h-screen px-8 pt-8 overflow-hidden transition max-w-screen gap-11">
      {/* File Navigation Section */}
      <div className="flex flex-col w-1/3 shadow-3xl rounded-t-3xl max-h-fit panel">
        {/* Navigation Header */}
        <div className="relative flex flex-col h-1/6">
          {/* row for the home button so that it doesn't overlap with the logo */}
          <div className="flex w-full h-16">
            {/* Home Button */}
            <div className="top-0 left-0 flex items-center justify-center w-8 m-5 cursor-pointer align-items aspect-square back">
              {/* Return to home button */}
              <button type="button" onClick={handleClick}>
                <img
                  src={home_icon}
                  className="items-center w-full h-full return-button style_home"
                  alt="home icon"
                ></img>
              </button>
            </div>
          </div>

          {/* row for the logo */}
          <div className="flex items-center justify-center w-full h-2/3">
            {/* Ocell.ai Logo */}
            <div className="flex w-1/2 mt-6 mb-6 h-2/3">
              <img
                src={main_logo}
                className="top-0 w-full h-full max-h-fit"
                alt="Ocell.ai Logo"
              ></img>
            </div>
          </div>
        </div>

        {/* Navigation Body */}
        <div className="relative flex flex-col items-start gap-4 pt-4 h-5/6 max-h-fit overflow-clip panel">
          <div className="items-start w-full p-8 overflow-y-auto h-[calc(100%-80px)]">
            <div className="flex flex-col w-full h-full gap-4">
              {data.predictions.map((image) => (
                <FileButton
                  image={image}
                  selected={
                    currentSelectedImage?.input_image_filename ===
                    image.input_image_filename
                  }
                  key={image.input_image_filename}
                  onClick={() => setCurrentSelectedImage(image)}
                />
              ))}
            </div>
          </div>

          {/* Batch Download Button */}
          <div className="flex items-center justify-center w-full h-20% absolute bottom-8">
            <button
              className="flex items-center justify-center p-1 rounded-lg hover:shadow-lg"
              onClick={() => downloadFile()}
            >
              <div className="flex items-center gap-2 cursor-pointer">
                <div className="w-6 rounded aspect-square">
                  <img
                    src={orange_download_icon}
                    className="items-center w-full h-full return-button style_home button_text"
                    alt="Orange download icon"
                  ></img>
                </div>
                <span
                  className="text-xl text-status-orange"
                  style={{
                    fontFamily: "Mitr",
                    fontWeight: 300,
                    letterSpacing: 0,
                  }}
                >
                  DOWNLOAD BATCH RESULT
                </span>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* ============== Results Section ================== */}
      <div className="flex flex-col w-2/3 pb-8">
        {/* Species Card Section */}
        <div className="relative flex pb-6 border-b-2 border-black border-opacity-10 h-3/5 gap-9">
          <SpeciesCardGroup image={currentSelectedImage} />
        </div>

        {/* Auxiliary Info Section */}
        <div className="flex h-2/5">
          {/* Reference Image Section */}
          <div className="flex flex-col justify-center w-4/12 gap-2 pt-4 border-r-2 border-black border-opacity-10">
            {/* HEADER */}
            <div className="flex items-center justify-center h-16 ">
              <span
                className="font-sans text-2xl text-foreground-dark"
                style={{
                  fontFamily: "Mitr",
                  fontWeight: 300,
                  letterSpacing: 0,
                }}
              >
                INPUT IMAGE
              </span>
            </div>

            {/* IMAGE FILE */}
            <div className="flex items-center justify-center h-full ">
              <DislplayInputImage image={currentSelectedImage} />
            </div>

            {/* INDIVIDUAL DOWNLOAD */}
            <div className="h-1/12">
              <div className="flex items-center justify-center">
                <button
                  className="flex items-center gap-2 mt-2 cursor-pointer"
                  // href=""
                  // onClick={handleExpand}
                >
                  <div className="w-5 rounded aspect-square">
                    <img
                      src={gray_download_icon}
                      alt="gray download icon"
                      className="items-center w-full h-full return-button style_home"
                    ></img>
                  </div>
                  <span
                    className="text-xl"
                    style={{
                      fontFamily: "Geologica",
                      fontWeight: 100,
                      letterSpacing: -0.8,
                      color: "#707070",
                    }}
                  >
                    save full results for this input
                  </span>
                </button>
              </div>
            </div>
          </div>

          {/* Data Table Section */}
          <div className="flex flex-col justify-center w-8/12 pt-4">
            {/* HEADER */}
            <div className="relative flex items-center h-16 ml-10 justify-left">
              <span
                className="font-sans text-xl text-foreground-dark"
                style={{
                  fontFamily: "Mitr",
                  fontWeight: 300,
                  letterSpacing: 0,
                }}
              >
                FULL PREDICTION SET PREVIEW
              </span>
            </div>
            {/* TABLE */}
            <div className="relative flex items-center justify-center p-6 overflow-auto">
              <ResultsTable />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

function DislplayInputImage({ image }) {
  if (!image) return null;
  return (
    <div
      id="input_img_container"
      className="flex w-8/12 rounded-2xl aspect-square bg-slate-500"
    >
      <img
        src={`data:image/jpeg;base64,${image.input_image}`}
        alt="input file"
        className="object-cover rounded-2xl"
      />
    </div>
  );
}

function SpeciesCardGroup({ image }) {
  if (!image) return null;

  const { predictions } = image;
  console.log("Predictions:");
  console.log(predictions);

  return (
    <>
      {Object.entries(predictions).map(
        ([rank, prediction]) =>
          rank <= 2 && (
            <SpeciesCard
              // key={rank}
              rank={rank}
              {...prediction}
            />
          )
      )}
    </>
  );
}

export default ResultsPage;
