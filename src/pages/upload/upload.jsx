import RootContext from "@/providers/root";
import { useContext } from "react";

const UploadPage = () => {
  const { setCurrentPage } = useContext(RootContext);

  return (
    <div>
      <h1>Upload</h1>

      <button
        type="button"
        onClick={() => setCurrentPage("loading")}
        className="btn"
      >
        Upload Images
      </button>
    </div>
  );
};

export default UploadPage;
