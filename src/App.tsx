import { useState } from "react";
import { DashBoard } from "./pages";
import { OSshower } from "./pages/os-page";
import { SideBar } from "./sidebar";

export function App() {
  const [currentPage, setCurrentPage] = useState("dashboard");

  const renderPage = () => {
    switch (currentPage) {
      case "dashboard":
        return <DashBoard />;
      case "serviceorders":
        return <OSshower />;
      default:
        return <DashBoard />;
    }
  };
  return (
    <div className="px-8 py-5 mx-auto space-x-4 flex flex-row">
      <SideBar setCurrentPage={setCurrentPage} />
      <div className="flex-grow w-4/5 border min-h-screen">{renderPage()}</div>
    </div>
  );
}
