import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import React, { useState } from "react";
import { FiChevronDown, FiDownload, FiUpload } from "react-icons/fi";
import { useOSContext } from "../../../context/OSContext";
import {
  handleExportDataToExcel,
  handleExportModelToExcel,
  handleImportFromExcel,
} from "../../../helpers/export-import-functions";
import { Order } from "../../../types/types";

export const OSForm = () => {
  const { addOrder, orderQnt, orders } = useOSContext();

  const [showImportButton, setShowImportButton] = useState(false);
  const [newOrder, setNewOrder] = useState<Order>({
    id: "",
    day: "",
    technician: "",
    product: "",
    hospital: "",
    status: "Progresso",
    priority: "Média",
  });

  const headersMapping: any = {
    day: "Data",
    technician: "Tecnico",
    product: "Produto",
    hospital: "Cliente",
  };

  const headersOS: any = [
    { Num: "", Data: "", Cliente: "", Tecnico: "", Produto: "" },
  ];
  const handleClick = () => {
    setShowImportButton(!showImportButton);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setNewOrder((prevOrder) => ({
      ...prevOrder,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const formattedDate = format(new Date(newOrder.day), "dd/MM/yyyy", {
      locale: ptBR,
    });

    const orderToAdd: Order = {
      ...newOrder,
      id: Date.now().toString(),
      day: formattedDate,
    };

    addOrder(orderToAdd);

    setNewOrder({
      id: "",
      day: "",
      technician: "",
      product: "",
      hospital: "",
      status: "Progresso",
      priority: "Média",
    });
  };

  return (
    <form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
      <div className="flex flex-row justify-between">
        <h2 className="text-2xl font-bold text-white">
          Cadastro de Ordem de Serviço (OS)
        </h2>

        <button
          type="button"
          onClick={() => {
            handleExportDataToExcel(headersMapping, orders);
          }}
          className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-400 transition duration-300 flex flex-row space-x-2 items-center"
        >
          <FiDownload />
          {""}
          <span>Exportar Dados Para Excel</span>
        </button>
      </div>

      <div className="w-1/2 mb-4">
        <span
          className="flex items-center text-gray-300 cursor-pointer transition duration-300"
          onClick={handleClick}
        >
          <span>Importação em massa</span>
          <FiChevronDown
            className={`ml-2 transition-transform duration-300 ${
              showImportButton ? "rotate-180" : ""
            }`}
          />
        </span>
        <div
          className={`my-2 transition-all duration-300 ease-in-out overflow-hidden flex flex-row space-x-2 ${
            showImportButton ? "max-h-20 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <button
            type="button"
            onClick={() => {
              handleExportModelToExcel(headersOS);
            }}
            className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-400 transition duration-300 flex flex-row w-2/6 items-center space-x-4"
          >
            <FiDownload />
            {""}
            <span>Exportar Modelo </span>
          </button>

          <label className="bg-blue-500 text-white px-4 py-2 rounded-md cursor-pointer hover:bg-blue-400 transition duration-300 flex flex-row w-2/6 items-center space-x-4">
            <FiUpload />
            {""}
            <span>Importar de Excel</span>
            {""}
            <input
              type="file"
              accept=".xlsx, .xls"
              className="hidden"
              onChange={(e) => {
                if (e.target.files) {
                  if ("os" === "os") {
                    handleImportFromExcel(
                      e.target.files[0],
                      "os",
                      addOrder,
                      orderQnt
                    );
                  }
                }
              }}
            />
          </label>
        </div>
      </div>

      <input
        type="date"
        name="day"
        placeholder="Data de Execução"
        className="p-2 border rounded-md"
        value={newOrder.day}
        onChange={handleInputChange}
        required
      />
      <input
        type="text"
        name="technician"
        className="p-2 border rounded-md"
        value={newOrder.technician}
        onChange={handleInputChange}
        placeholder="Técnico"
        required
      />
      <input
        type="text"
        name="product"
        className="p-2 border rounded-md"
        value={newOrder.product}
        onChange={handleInputChange}
        placeholder="Produto"
        required
      />
      <input
        type="text"
        name="hospital"
        className="p-2 border rounded-md"
        value={newOrder.hospital}
        onChange={handleInputChange}
        placeholder="Hospital"
        required
      />
      <div className="flex flex-col">
        <label htmlFor="priority" className="text-gray-300 mb-2">
          Prioridade
        </label>

        <select
          id="priority"
          name="priority"
          className="p-2 border rounded-md"
          value={newOrder.priority}
          onChange={handleInputChange}
          required
        >
          <option value="Urgente">Urgente</option>
          <option value="Alta">Alta</option>
          <option value="Média">Média</option>
          <option value="Baixa">Baixa</option>
        </select>
      </div>

      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded-md"
      >
        Abrir Ordem de Serviço
      </button>
    </form>
  );
};
