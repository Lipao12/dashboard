import { useState } from "react";
import { FiX } from "react-icons/fi";
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
    <div className="flex flex-col p-4">
      <h1 className="text-2xl font-bold mb-4">Cadastro</h1>

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
          <div className="flex flex-row justify-end mx-3 mb-3">
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
