import { DashBoard } from "./pages";
import { SideBar } from "./sidebar";

export function App() {
  return (
    <div className="px-8 py-5 mx-auto space-x-4 flex flex-row">
      <SideBar />
      <DashBoard />
    </div>
  );
}
