import { Order } from "../../../types/types";

interface TableProps {
  orders: Order[];
  handleOpenModal: (order: Order) => void;
}

export const Table: React.FC<TableProps> = ({ orders, handleOpenModal }) => (
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
          {orders.map((order) => (
            <tr
              key={order.id}
              className="border-b border-gray-600 hover:bg-gray-700"
            >
              <td className="p-4">{order.day}</td>
              <td className="p-4">{order.technician}</td>
              <td className="p-4">{order.product}</td>
              <td className="p-4">{order.hospital}</td>
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
