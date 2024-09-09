interface Technician {
  id: string;
  name: string;
  phone: string;
  location: string;
}

interface TableProps {
  technicians: Technician[];
}

export const Table: React.FC<TableProps> = ({ technicians }) => (
  <>
    <div className="overflow-x-auto border border-gray-600 rounded-xl">
      <table className="min-w-full table-auto bg-[#1C2126] text-gray-300 shadow-md">
        <thead>
          <tr>
            <th className="p-4 text-left">Nome</th>
            <th className="p-4 text-left">Telefone</th>
            <th className="p-4 text-left">Última Localização</th>
            <th className="p-4 text-left">Detalhe dos Trabalhos</th>
          </tr>
        </thead>
        <tbody>
          {technicians.map((tec) => (
            <tr
              key={tec.id}
              className="border-b border-gray-600 hover:bg-gray-700"
            >
              <td className="p-4">{tec.name}</td>
              <td className="p-4">{tec.phone}</td>
              <td className="p-4">{tec.location}</td>
              <td className="p-4">
                <button
                  type="button"
                  className="text-blue-400 hover:text-blue-200 transition-colors duration-200"
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
