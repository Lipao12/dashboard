import React from "react";

interface TableProps {
  items: any[];
}

export const Table: React.FC<TableProps> = ({ items }) => {
  const columnsToRemove = [
    "Part Number",
    "Categoria",
    "Sub categoria",
    "Localização",
    "Status",
    "IPI",
    "Valor Venda R$",
    "Valor Total Venda R$",
  ];

  // Função que filtra as colunas removidas
  const filterColumns = (data: any) => {
    return Object.keys(data).filter((key) => !columnsToRemove.includes(key));
  };

  return (
    <div className="overflow-x-auto border border-gray-600 rounded-xl">
      <table className="min-w-full table-auto bg-[#1C2126] text-gray-300 shadow-md">
        <thead>
          <tr>
            {/* Renderiza cabeçalhos, exceto as colunas removidas */}
            {filterColumns(items[0]).map((key) => (
              <th key={key} className="p-4 text-left">
                {key}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => (
            <tr
              key={index}
              className="border-b border-gray-600 hover:bg-gray-700"
            >
              {/* Renderiza os valores, exceto as colunas removidas */}
              {filterColumns(item).map((key) => (
                <td key={key} className="p-4">
                  {item[key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
