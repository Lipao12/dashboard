import React, { useState } from "react";
import { FiDownload } from "react-icons/fi";
import { useOSContext } from "../../../context/OSContext";
import { handleExportDataToExcel } from "../../../helpers/export-import-functions";
import { Activity, OS } from "../../../types/types";

export const OSForm = () => {
  const { addOrder, orders } = useOSContext();

  const [showImportButton, setShowImportButton] = useState(false);
  const [newOrder, setNewOrder] = useState<OS>({
    id: "",
    activities: [
      {
        activity: "",
        start: "",
        end: "",
        technician: "",
      },
    ],
    cleaning: false,
    client: {
      address: "",
      contact: "",
      email: "",
      id: "",
      name: "",
      phone: "",
      sector: "",
    },
    equipment: {
      brand: "",
      defect: "",
      description: "",
      equipment: "",
      equipmentNotes: "",
      model: "",
      patrimony: "",
      serialNumber: "",
      tag: "",
    },
    fitUse: false,
    inspection: false,
    obs: "",
    status: "Fazer",
    testsFunc: false,
    userID: "", // Adicione o ID do usuário conforme necessário
  });

  const headersMapping: any = {
    day: "Data",
    technician: "Técnico",
    product: "Produto",
    hospital: "Cliente",
  };

  const handleClick = () => {
    setShowImportButton(!showImportButton);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    activityIndex?: number // Para tratar atividades
  ) => {
    const { name, value } = e.target;

    if (activityIndex !== undefined) {
      // Atualizando atividades
      setNewOrder((prevOrder: OS) => {
        const updatedActivities = [...prevOrder.activities];
        updatedActivities[activityIndex] = {
          ...updatedActivities[activityIndex],
          [name]: value,
        };
        return { ...prevOrder, activities: updatedActivities };
      });
    } else {
      // Atualizando outros campos
      setNewOrder((prevOrder: OS) => ({
        ...prevOrder,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const orderToAdd: OS = {
      ...newOrder,
      id: Date.now().toString(),
    };

    addOrder(orderToAdd);

    setNewOrder({
      id: "",
      activities: [
        {
          activity: "",
          start: "",
          end: "",
          technician: "",
        },
      ],
      cleaning: false,
      client: {
        address: "",
        contact: "",
        email: "",
        id: "",
        name: "",
        phone: "",
        sector: "",
      },
      equipment: {
        brand: "",
        defect: "",
        description: "",
        equipment: "",
        equipmentNotes: "",
        model: "",
        patrimony: "",
        serialNumber: "",
        tag: "",
      },
      fitUse: false,
      inspection: false,
      obs: "",
      status: "Fazer",
      testsFunc: false,
      userID: "",
    });
  };

  const addActivity = () => {
    setNewOrder((prevOrder: OS) => ({
      ...prevOrder,
      activities: [
        ...prevOrder.activities,
        { activity: "", start: "", end: "", technician: "" },
      ],
    }));
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

      {/* Seção do Cliente */}
      <div>
        <h3 className="text-lg font-semibold text-gray-300">
          Dados do Cliente
        </h3>
        <div className="space-x-3">
          <input
            type="text"
            name="name"
            className="p-2 border rounded-md"
            value={newOrder.client.name}
            onChange={handleInputChange}
            placeholder="Nome do Cliente"
            required
          />
          <input
            type="text"
            name="phone"
            className="p-2 border rounded-md"
            value={newOrder.client.phone}
            onChange={handleInputChange}
            placeholder="Telefone do Cliente"
            required
          />
          <input
            type="text"
            name="email"
            className="p-2 border rounded-md"
            value={newOrder.client.email}
            onChange={handleInputChange}
            placeholder="E-mail do Cliente"
            required
          />
          <input
            type="text"
            name="address"
            className="p-2 border rounded-md"
            value={newOrder.client.address}
            onChange={handleInputChange}
            placeholder="Endereço do Cliente"
            required
          />
          <input
            type="text"
            name="sector"
            className="p-2 border rounded-md"
            value={newOrder.client.sector}
            onChange={handleInputChange}
            placeholder="Setor do Cliente"
            required
          />
        </div>
      </div>

      {/* Seção do Equipamento */}
      <div>
        <h3 className="text-lg font-semibold text-gray-300">
          Dados do Equipamento
        </h3>
        <div className="space-x-3">
          <input
            type="text"
            name="equipment"
            className="p-2 border rounded-md"
            value={newOrder.equipment.equipment}
            onChange={handleInputChange}
            placeholder="Equipamento"
            required
          />
          <input
            type="text"
            name="model"
            className="p-2 border rounded-md"
            value={newOrder.equipment.model}
            onChange={handleInputChange}
            placeholder="Modelo do Equipamento"
            required
          />
          <input
            type="text"
            name="brand"
            className="p-2 border rounded-md"
            value={newOrder.equipment.brand}
            onChange={handleInputChange}
            placeholder="Marca do Equipamento"
            required
          />
          <input
            type="text"
            name="serialNumber"
            className="p-2 border rounded-md"
            value={newOrder.equipment.serialNumber}
            onChange={handleInputChange}
            placeholder="Número de Série"
            required
          />
          <input
            type="text"
            name="patrimony"
            className="p-2 border rounded-md"
            value={newOrder.equipment.patrimony}
            onChange={handleInputChange}
            placeholder="Patrimônio"
            required
          />
          <input
            type="text"
            name="defect"
            className="p-2 border rounded-md"
            value={newOrder.equipment.defect}
            onChange={handleInputChange}
            placeholder="Defeito"
          />
        </div>
      </div>

      {/* Seção de Atividades */}
      <div>
        <h3 className="text-lg font-semibold text-gray-300">Atividades</h3>
        {newOrder.activities.map((activity: Activity, index: number) => (
          <div key={index} className="flex flex-col mb-3 space-y-3">
            <input
              type="text"
              name="activity"
              className="p-2 border rounded-md mb-1"
              value={activity.activity}
              onChange={(e) => handleInputChange(e, index)}
              placeholder="Descrição da Atividade"
              required
            />
            <input
              type="time"
              placeholder="-"
              name="start"
              className="p-2 border rounded-md mb-1"
              value={activity.start}
              onChange={(e) => handleInputChange(e, index)}
              required
            />
            <input
              type="time"
              placeholder="-"
              name="end"
              className="p-2 border rounded-md mb-1"
              value={activity.end}
              onChange={(e) => handleInputChange(e, index)}
              required
            />
            <input
              type="text"
              name="technician"
              className="p-2 border rounded-md mb-1"
              value={activity.technician}
              onChange={(e) => handleInputChange(e, index)}
              placeholder="Técnico Responsável"
              required
            />
          </div>
        ))}
        <button
          type="button"
          onClick={addActivity}
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
        >
          Adicionar Atividade
        </button>
      </div>

      {/* Observações */}
      <textarea
        name="obs"
        className="p-2 border rounded-md"
        value={newOrder.obs}
        onChange={handleInputChange}
        placeholder="Observações"
      />

      <div className="flex justify-end">
        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-500 transition duration-300"
        >
          Cadastrar OS
        </button>
      </div>
    </form>
  );
};
