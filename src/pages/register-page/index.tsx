import { useState } from "react";
import { FiDownload, FiX } from "react-icons/fi";
import { handleExportToExcel } from "../../helpers/export-import-functions";
import { HospitalForm } from "./forms/hospital-form";
import { OSForm } from "./forms/os-form";
import { StorageForm } from "./forms/storage-form";
import { TechnicianForm } from "./forms/technician-form";

export const RegisterIndex = () => {
  const [selectedForm, setSelectedForm] = useState<string | null>(null);

  const headersMap: Record<string, Array<Record<string, string>>> = {
    technician: [{ Nome: "", Cargo: "", Email: "" }],
    os: [{ Num: "", Data: "", Cliente: "", Tecnico: "", Produto: "" }],
    hospital: [{ Nome: "", Endereço: "", Telefone: "" }],
    stock: [{ Produto: "", Quantidade: "", Localização: "" }],
  };

  const handleItemClick = (item: string) => {
    setSelectedForm(item);
  };

  return (
    <div className="flex flex-col p-6">
      <h1 className="text-3xl font-bold mb-4">Cadastro</h1>

      <div className="mb-6">
        <ul className="space-y-2">
          <li>
            <button
              type="button"
              className={`w-full text-left px-4 py-2 bg-[#1C2126] hover:bg-gray-700 rounded-md transition-colors duration-300 ${
                selectedForm === "technician" ? "bg-[#46505c]" : ""
              }`}
              onClick={() => handleItemClick("technician")}
            >
              Técnico
            </button>
          </li>
          <li>
            <button
              className={`w-full text-left px-4 py-2 bg-[#1C2126] hover:bg-gray-700 rounded-md transition-colors duration-300 ${
                selectedForm === "os" ? "bg-[#46505c]" : ""
              }`}
              onClick={() => handleItemClick("os")}
            >
              Ordem de Serviço (OS)
            </button>
          </li>
          <li>
            <button
              type={"button"}
              className={`w-full text-left px-4 py-2 bg-[#1C2126] hover:bg-gray-700 rounded-md transition-colors duration-300 ${
                selectedForm === "hospital" ? "bg-[#46505c]" : ""
              }`}
              onClick={() => handleItemClick("hospital")}
            >
              Hospital
            </button>
          </li>
          <li>
            <button
              type={"button"}
              className={`w-full text-left px-4 py-2 bg-[#1C2126] hover:bg-gray-700 rounded-md transition-colors duration-300 ${
                selectedForm === "stock" ? "bg-[#46505c]" : ""
              }`}
              onClick={() => handleItemClick("stock")}
            >
              Inventário
            </button>
          </li>
        </ul>
      </div>

      {selectedForm && (
        <div className="fade-in transition duration-100">
          <div className="flex flex-row justify-between mx-3">
            <div className="flex space-x-4 mt-6 mb-3">
              <button
                type="button"
                onClick={() => {
                  handleExportToExcel(headersMap, selectedForm);
                }}
                className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-400 transition duration-300 flex flex-row space-x-2 items-center"
              >
                <FiDownload />
                {""}
                <span>Exportar Dados Para Excel</span>
              </button>
            </div>
            <button
              type="button"
              onClick={() => {
                setSelectedForm(null);
              }}
            >
              <FiX className="size-7 text-red-500  rounded-md hover:bg-red-100 transition duration-300" />
              {""}
            </button>
          </div>

          <div className="bg-[#1C2126] p-4 rounded-md text-black">
            {selectedForm === "technician" && <TechnicianForm />}
            {selectedForm === "os" && <OSForm />}
            {selectedForm === "hospital" && <HospitalForm />}
            {selectedForm === "stock" && <StorageForm />}
          </div>
        </div>
      )}
    </div>
  );
};
