import { useEffect, useState } from "react";
import { readDataOnce } from "../../../lib/api";
import { OS, Technician } from "../../../types/types";

interface TableProps {
  orders: OS[];
  handleOpenModal: (order: OS) => void;
}

export const Table: React.FC<TableProps> = ({ orders, handleOpenModal }) => {
  const [technicians, setTechnicians] = useState<Technician[]>([]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("pt-BR").format(date);
  };

  const getTechnicianName = (technicianId: string) => {
    const technician = technicians.find(
      (tech: Technician) => tech.id === technicianId
    );
    return technician ? technician.name : "Desconhecido";
  };

  useEffect(() => {
    const fetchTechnicians = async () => {
      try {
        const fetchedData = await readDataOnce(`tecnicos/`);
        if (fetchedData) {
          const transformedData = Object.entries(fetchedData).map(
            ([id, technician]: [string, any]) => ({
              id,
              name: technician.name,
            })
          );
          setTechnicians(transformedData);
        }
      } catch (err) {
        console.error("Error fetching technicians:", err);
      }
    };

    fetchTechnicians();
  }, []);
  return (
    <>
      <div className="overflow-x-auto rounded-xl border border-gray-600">
        <table className="min-w-full table-auto bg-[#1C2126] text-gray-300  rounded-md shadow-md">
          <thead>
            <tr>
              <th className="p-4 text-left">Dia</th>
              <th className="p-4 text-left">Técnico</th>
              <th className="p-4 text-left">Equipamento</th>
              <th className="p-4 text-left">Hospital</th>
              <th className="p-4 text-left">Status</th>
              <th className="p-4 text-left">Detalhes</th>
            </tr>
          </thead>
          <tbody>
            {orders
              .slice()
              .reverse()
              .map((order) => (
                <tr
                  key={order.id}
                  className="border-b border-gray-600 hover:bg-gray-700"
                >
                  <td className="p-4">{formatDate(order.date)}</td>
                  <td className="p-4">{getTechnicianName(order.userID)}</td>
                  <td className="p-4">{order.equipment.equipment}</td>
                  <td className="p-4">{order.client.name}</td>
                  <td className="p-4">
                    <span
                      className={`px-2 py-1 rounded text-white ${
                        order.status === "Progresso" ? "bg-blue-500" : ""
                      } ${order.status === "Concluido" ? "bg-green-600" : ""}`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="p-4">
                    <button
                      type="button"
                      className="text-blue-400 hover:text-blue-200 transition-colors duration-200"
                      onClick={() => {
                        handleOpenModal(order);
                      }}
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </>
  );
};
