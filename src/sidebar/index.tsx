import { useState } from "react";
import {
  BsBox2,
  BsBox2Fill,
  BsClipboard,
  BsClipboardFill,
  BsPeople,
  BsPeopleFill,
} from "react-icons/bs";
import { GoHome, GoHomeFill } from "react-icons/go";
import { MdLocalHospital } from "react-icons/md";

interface SideBarProps {
  setCurrentPage: (page: string) => void;
}

export const SideBar = ({ setCurrentPage }: SideBarProps) => {
  const [selectedItem, setSelectedItem] = useState("dashboard");

  const menuItems = [
    {
      name: "dashboard",
      label: "Dashboard",
      icon: <GoHome />,
      iconActive: <GoHomeFill />,
    },
    {
      name: "serviceorders",
      label: "Ordem de Serviços",
      icon: <BsClipboard />,
      iconActive: <BsClipboardFill />,
    },
    {
      name: "tecnitians",
      label: "Técnicos",
      icon: <BsPeople />,
      iconActive: <BsPeopleFill />,
    },
    {
      name: "hospital",
      label: "Hospitais",
      icon: <MdLocalHospital />,
      iconActive: <MdLocalHospital />,
    },
    {
      name: "inventary",
      label: "Inventário",
      icon: <BsBox2 />,
      iconActive: <BsBox2Fill />,
    },
  ];

  const handleItemClick = (item: string) => {
    setSelectedItem(item);
    setCurrentPage(item);
  };

  return (
    <div className="w-full md:w-1/5 min-h-screen flex flex-col p-4 ">
      <nav>
        {menuItems.map((item) => (
          <div
            key={item.name}
            className={`px-3 py-2 flex items-center space-x-3 text-[21px] cursor-pointer rounded-2xl transform transition-all duration-300 ease-in-out hover:bg-[#464b52] ${
              selectedItem === item.name ? "bg-[#293038]" : ""
            }`}
            onClick={() => handleItemClick(item.name)}
            aria-label={item.label}
            role="button"
            tabIndex={0}
            onKeyDown={() => handleItemClick(item.name)}
          >
            {selectedItem === item.name ? item.iconActive : item.icon}
            <span>{item.label}</span>
          </div>
        ))}
      </nav>
    </div>
  );
};
