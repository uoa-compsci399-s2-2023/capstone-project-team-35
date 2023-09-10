import { useState } from "react";
import ResultsPage from "./pages/results";
import UploadPage from "./pages/upload";
import LoadingPage from "./pages/loading";
import RootContext from "./providers/root";
export const PageName = "results" | "upload" | "loading";

function AppTest() {
  const [currentPage, setCurrentPage] = useState(PageName);
  const [data, setData] = useState([]);

  const renderPage = () => {
    switch (currentPage) {
      case "results":
        return <ResultsPage />;
      case "upload":
        return <UploadPage />;
      case "loading":
        return <LoadingPage />;
      default:
        return <UploadPage />;
    }
  };

  return (
    // <main className="flex min-h-screen"></main>
    // <ResultsPage />
    <main>
      <RootContext.Provider
        value={{
          data,
          setData,
          setCurrentPage,
        }}
      >
        {renderPage()}
      </RootContext.Provider>
    </main>
  );
}

export default AppTest;
