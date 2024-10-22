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
    activities: null,
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
    status: "Progresso",
    testsFunc: false,
    userID: "",
    date: "",
    priority: "",
  });

  const [currentActivity, setCurrentActivity] = useState<Activity>({
    activity: "",
    start: "",
    end: "",
    technician: "",
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
    field?: string
  ) => {
    const { name, value } = e.target;

    if (field === "activity") {
      setCurrentActivity((prevActivity) => ({
        ...prevActivity,
        [name]: value,
      }));
    } else if (name in newOrder.client) {
      // Atualizando campos do cliente
      setNewOrder((prevOrder: OS) => ({
        ...prevOrder,
        client: {
          ...prevOrder.client,
          [name]: value,
        },
      }));
    } else if (name in newOrder.equipment) {
      // Atualizando campos dos equipamentos
      setNewOrder((prevOrder: OS) => ({
        ...prevOrder,
        equipment: {
          ...prevOrder.equipment,
          [name]: value,
        },
      }));
    } else {
      // Atualizando outros campos
      setNewOrder((prevOrder: OS) => ({
        ...prevOrder,
        [name]: value,
      }));
    }
  };

  const addActivity = () => {
    if (
      !currentActivity.activity ||
      !currentActivity.start ||
      !currentActivity.end ||
      !currentActivity.technician
    ) {
      alert(
        "Por favor, preencha todos os campos da atividade antes de adicionar."
      );
      return;
    }

    setNewOrder((prevOrder: OS) => ({
      ...prevOrder,
      activities: [
        ...(prevOrder.activities || []), // Garantir que activities seja um array
        currentActivity,
      ],
    }));

    // Reset currentActivity após adicionar
    setCurrentActivity({
      activity: "",
      start: "",
      end: "",
      technician: "",
    });
  };

  const removeActivity = (index: number) => {
    setNewOrder((prevOrder: OS) => {
      const updatedActivities = (prevOrder.activities || []).filter(
        (_, i) => i !== index
      );
      return { ...prevOrder, activities: updatedActivities };
    });
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
      date: "",
      priority: "",
    });
  };

  console.log(newOrder.client);

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
        <div className="flex flex-row space-x-3 mb-4">
          <input
            type="text"
            name="activity"
            className="p-2 border rounded-md"
            value={currentActivity.activity}
            onChange={(e) => handleInputChange(e, "activity")}
            placeholder="Descrição da Atividade"
          />
          <input
            type="time"
            name="start"
            className="p-2 border rounded-md"
            value={currentActivity.start}
            onChange={(e) => handleInputChange(e, "activity")}
          />
          <input
            type="time"
            name="end"
            className="p-2 border rounded-md"
            value={currentActivity.end}
            onChange={(e) => handleInputChange(e, "activity")}
          />
          <input
            type="text"
            name="technician"
            className="p-2 border rounded-md"
            value={currentActivity.technician}
            onChange={(e) => handleInputChange(e, "activity")}
            placeholder="Técnico Responsável"
          />
          <button
            type="button"
            onClick={addActivity}
            className="bg-blue-500 text-white px-4 py-2 rounded-md"
          >
            Adicionar Atividade
          </button>
        </div>

        {/* Tabela de atividades */}
        {newOrder.activities && newOrder.activities.length > 0 && (
          <table className="table-auto w-full bg-white rounded-md overflow-hidden">
            <thead>
              <tr className="bg-gray-700 text-white">
                <th className="p-2">Atividade</th>
                <th className="p-2">Início</th>
                <th className="p-2">Fim</th>
                <th className="p-2">Técnico</th>
                <th className="p-2">Ações</th>
              </tr>
            </thead>
            <tbody>
              {newOrder.activities.map((activity, index) => (
                <tr key={index} className="text-center border-b">
                  <td className="p-2">{activity.activity}</td>
                  <td className="p-2">{activity.start}</td>
                  <td className="p-2">{activity.end}</td>
                  <td className="p-2">{activity.technician}</td>
                  <td className="p-2">
                    <button
                      type="button"
                      onClick={() => removeActivity(index)}
                      className="bg-red-500 text-white px-2 py-1 rounded-md"
                    >
                      Remover
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <button
        type="submit"
        className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-400 transition duration-300"
      >
        Salvar Ordem de Serviço
      </button>
    </form>
  );
};
