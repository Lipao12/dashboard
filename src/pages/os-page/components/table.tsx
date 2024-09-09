interface Order {
  day: string;
  technician: string;
  product: string;
  hospital: string;
  status: string;
}

interface TableProps {
  orders: Order[];
}

export const Table = ({ orders }: TableProps) => (
  <div className="overflow-x-auto">
    <table className="min-w-full table-auto">
      <thead>
        <tr className="bg-[#1C2126] text-gray-300">
          <th className="p-3">Dia</th>
          <th className="p-3">Tecnico</th>
          <th className="p-3">Equipamento</th>
          <th className="p-3">Hospital</th>
          <th className="p-3">Status</th>
          <th className="p-3">Ação</th>
        </tr>
      </thead>
      <tbody>
        {orders.map((order, index) => (
          <tr key={index} className="border-b border-gray-600 text-gray-300">
            <td className="p-3">{order.day}</td>
            <td className="p-3">{order.technician}</td>
            <td className="p-3">{order.product}</td>
            <td className="p-3">{order.hospital}</td>
            <td className="p-3">
              <span
                className={`px-2 py-1 rounded ${
                  order.status === "Progresso" && "bg-blue-500"
                } ${order.status === "Concluido" && "bg-green-600"}`}
              >
                {order.status}
              </span>
            </td>
            <td className="p-3">
              <button className="text-blue-400 hover:text-blue-200">
                View
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);
