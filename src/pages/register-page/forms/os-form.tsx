import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import React, { useState } from "react";
import { useOSContext } from "../../../context/OSContext";
import { Order } from "../../../types/types";

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
