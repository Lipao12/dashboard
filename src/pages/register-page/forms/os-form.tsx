import React, { useState } from "react";
import { useOSContext } from "../../../context/OSContext";
import { Order } from "../../../types/types";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

export const OSForm = () => {
  const { addOrder } = useOSContext();
  const [newOrder, setNewOrder] = useState<Order>({
    id: "",
    day: "",
    technician: "",
    product: "",
    hospital: "",
    status: "Progresso",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
    });
  };

  return (
    <form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
      <h2 className="text-2xl font-bold text-white">
        Cadastro de Ordem de Serviço (OS)
      </h2>
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

      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded-md"
      >
        Abrir Ordem de Serviço
      </button>
    </form>
  );
};

export const OSForm2 = () => {
  const { addOrder } = useOSContext();

  // Estado para armazenar os valores dos campos do formulário
  const [description, setDescription] = useState<string>("");
  const [technician, setTechnician] = useState<string>("");
  const [date, setDate] = useState<string>("");

  // Função para gerar um ID único, se necessário
  const generateId = () => Date.now().toString();

  // Função para lidar com o envio do formulário
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Criar uma nova ordem de serviço
    const newOrder: Order = {
      id: generateId(), // Gere um ID único para a nova ordem
      day: date,
      technician: technician,
      product: description, // Usando a descrição como produto
      hospital: "", // Adicione um campo para o hospital se necessário
      status: "Progresso",
    };

    // Adicionar a nova ordem de serviço usando a função do contexto
    addOrder(newOrder);

    // Limpar os campos do formulário após o envio
    setDescription("");
    setTechnician("");
    setDate("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
      <h2 className="text-2xl font-bold text-white">
        Cadastro de Ordem de Serviço (OS)
      </h2>
      <input
        type="text"
        placeholder="Descrição da OS"
        className="p-2 border rounded-md"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Responsável Técnico"
        className="p-2 border rounded-md"
        value={technician}
        onChange={(e) => setTechnician(e.target.value)}
        required
      />
      <input
        type="date"
        placeholder="Data de Execução"
        className="p-2 border rounded-md"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        required
      />
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded-md"
      >
        Cadastrar
      </button>
    </form>
  );
};
