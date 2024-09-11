import React from "react";
import { Hospital } from "../../../types/types";

interface TableProps {
  hospitals: Hospital[];
}

export const Table: React.FC<TableProps> = ({ hospitals }) => (
  <div className="overflow-x-auto border border-gray-600 rounded-xl">
    <table className="min-w-full table-auto bg-[#1C2126] text-gray-300 shadow-md">
      <thead>
        <tr>
          <th className="p-4 text-left">Nome</th>
          <th className="p-4 text-left">Cidade</th>
          <th className="p-4 text-left">Setor</th>
          <th className="p-4 text-left">Telefone</th>
          <th className="p-4 text-left">Endereço</th>
          <th className="p-4 text-left">Detalhes</th>
        </tr>
      </thead>
      <tbody>
        {hospitals.map((hospital) => (
          <tr
            key={hospital.id}
            className="border-b border-gray-600 hover:bg-gray-700"
          >
            <td className="p-4">{hospital.name}</td>
            <td className="p-4">{hospital.city}</td>
            <td className="p-4">{hospital.department}</td>
            <td className="p-4">{hospital.phone}</td>
            <td className="p-4">{hospital.address}</td>
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
);
