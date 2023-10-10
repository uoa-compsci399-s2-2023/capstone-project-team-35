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

  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    if (data?.predictions && data.predictions.length) {
      setCurrentSelectedImage(data.predictions[0]);
    }
  }, [data]);

  console.log("currentSelectedImage:");
  console.log(currentSelectedImage);

  const downloadFile = async () => {
    try {
      // Send a POST request to the '/classify' endpoint in the backend to upload the image
      // Replace /download with the individual csv endpoint.
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

  const downloadIndividualFile = async () => {
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

  const openPopup = () => {
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
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
              <button type="button" onClick={openPopup}>
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
                className="company_logo"
                alt="Ocell.ai Logo"
              ></img>
            </div>
          </div>
        </div>

        {/* Navigation Body */}
        <div className="relative flex flex-col items-start gap-4 pt-4 pb-2 h-5/6 max-h-fit overflow-clip">
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
          <div
            className="flex items-center justify-center w-full h-20% absolute bottom-8"
            z
          >
            <button
              className="flex items-center justify-center p-3 rounded-lg hover-btn"
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
                  className="text-xl text-status-orange hover-span"
                  style={{
                    fontSize: "1.2vw",
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
      <div className="flex flex-col w-2/3 pb-8 top-10">
        {/* Species Card Section */}
        <div className="relative flex pb-6 border-b-2 border-black border-opacity-10 h-3/5 gap-9 move">
          <SpeciesCardGroup image={currentSelectedImage} />
        </div>

        {/* Auxiliary Info Section */}
        <div className="flex h-2/5 zindex bg-white">
          {/* Reference Image Section */}
          <div className="flex flex-col justify-center w-4/12 gap-3 border-r-2 border-black border-opacity-10">
            {/* HEADER */}
            <div className="flex items-center justify-center h-16 ">
              <span
                className="font-sans md:text-xl lg:text-2xl text-foreground-dark input_image_header"
                style={{
                  fontSize: "1.4vw",
                  fontFamily: "Mitr",
                  fontWeight: 300,
                  letterSpacing: 1,
                }}
              >
                INPUT IMAGE
              </span>
            </div>

            {/* IMAGE FILE */}
            <div className="input_image">
              <DislplayInputImage image={currentSelectedImage} />
            </div>

            {/* INDIVIDUAL DOWNLOAD */}
            <div className="h-1/12">
              <div className="flex items-center justify-center">
                <button
                  className="flex items-center w-8/12 gap-2 mt-2 cursor-pointer btn"
                  onClick={() => downloadIndividualFile()}
                >
                  <div className="w-5 rounded aspect-square">
                    <img
                      src={gray_download_icon}
                      alt="gray download icon"
                      className="items-center w-full h-full return-button style_home"
                    ></img>
                  </div>
                  <span
                    style={{
                      fontSize: "0.8vw",
                      fontFamily: "Geologica",
                      fontWeight: 300,
                      letterSpacing: -0.8,
                      color: "#707070",
                    }}
                  >
                    save results for input
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
                className="font-sans text-foreground-dark"
                style={{
                  // fontFamily: "Mitr",
                  fontSize: "1.4vw",
                  fontFamily: "Mitr",
                  fontWeight: 300,
                  margin: "auto",
                  paddingRight: 6,
                  // color: "#FF5E49",
                }}
              >
                TOP 10 PREDICTIONS
              </span>
            </div>
            {/* TABLE */}
            <div className="relative flex items-center justify-center pl-6 overflow-auto">
              <ResultsTable image={currentSelectedImage} />
            </div>
          </div>
        </div>
      </div>

      {showPopup && (
        <div className="popup_background">
          <div className="popup_content">
            <p>
              You are about to go back to the home page. All unsaved data will
              be lost. Do you wish to continue?
            </p>
            <span className="popup_container">
              <button className="go_back" onClick={closePopup}>
                Close
              </button>
              <button className="continue" onClick={() => setCurrentPage("")}>
                Continue
              </button>
            </span>
          </div>
        </div>
      )}
    </main>
  );
};

function DislplayInputImage({ image }) {
  if (!image) return null;
  return (
    <div
      id="input_img_container"
      className="flex w-8/12 overflow-hidden rounded-2xl aspect-square bg-slate-500 flex-center"
    >
      <img
        src={`data:image/jpeg;base64,${image.input_image}`}
        alt="input file"
        className="object-cover rounded-2xl input_img"
      />
    </div>
  );
}

function SpeciesCardGroup({ image }) {
  if (!image) return null;

  const { predictions } = image;

  return (
    <>
      <SpeciesCard rank={1} {...predictions[1]} />
      <SpeciesCard rank={0} {...predictions[0]} />
      <SpeciesCard rank={2} {...predictions[2]} />
    </>
  );
}

export default ResultsPage;
