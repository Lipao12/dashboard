interface Order {
  id: string;
  day: string;
  technician: string;
  product: string;
  hospital: string;
  status: string;
}

interface TableProps {
  orders: Order[];
}

export const Table: React.FC<TableProps> = ({ orders }) => (
  <>
    <div className="overflow-x-auto">
      <table className="min-w-full table-auto bg-[#1C2126] text-gray-300 border border-gray-600 rounded-md shadow-md">
        <thead>
          <tr>
            <th className="p-4 text-left">Dia</th>
            <th className="p-4 text-left">Técnico</th>
            <th className="p-4 text-left">Equipamento</th>
            <th className="p-4 text-left">Hospital</th>
            <th className="p-4 text-left">Status</th>
            <th className="p-4 text-left">Detalhe</th>
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
                <button className="text-blue-400 hover:text-blue-200 transition-colors duration-200">
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
