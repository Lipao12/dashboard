import { useState } from "react";
import { OSProvider } from "./context/OSContext";
import { DashBoard } from "./pages";
import { HospitalShower } from "./pages/hospital-page";
import { OSshower } from "./pages/os-page";
import { RegisterIndex } from "./pages/register-page";
import { TechnicianShower } from "./pages/technician-page";
import { SideBar } from "./sidebar";

export function App() {
  const [currentPage, setCurrentPage] = useState("dashboard");

  const renderPage = () => {
    switch (currentPage) {
      case "dashboard":
        return <DashBoard />;
      case "serviceorders":
        return (
          <OSProvider>
            <OSshower />
          </OSProvider>
        );
      case "technician":
        return <TechnicianShower />;
      case "hospital":
        return <HospitalShower />;
      case "register":
        return (
          <OSProvider>
            <RegisterIndex />
          </OSProvider>
        );
      default:
        return <DashBoard />;
    }
  };
  return (
    <div className="px-8 py-5 mx-auto space-x-4 flex flex-row">
      <SideBar setCurrentPage={setCurrentPage} />
      <div className="flex-grow w-4/5 min-h-screen">{renderPage()}</div>
    </div>
  );
}
