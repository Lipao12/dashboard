import { ChangeEvent, useState } from "react";
import { FilterButton } from "./components/filter-button";
import { Table } from "./components/table";

const orders = [
  {
    day: "May 1",
    technician: "Dr. John Smith",
    product: "Pacemaker",
    hospital: "NYU Langone Medical Center",
    status: "Progresso",
  },
  {
    day: "May 2",
    technician: "Dr. Jane Doe",
    product: "Stethoscope",
    hospital: "Cleveland Clinic",
    status: "Progresso",
  },
  {
    day: "May 3",
    technician: "Dr. Robert Johnson",
    product: "MRI Scanner",
    hospital: "Massachusetts General Hospital",
    status: "Progresso",
  },
  {
    day: "May 4",
    technician: "Dr. Lisa Davis",
    product: "Defibrillator",
    hospital: "Johns Hopkins Hospital",
    status: "Progresso",
  },
  {
    day: "May 5",
    technician: "Dr. Michael Brown",
    product: "Blood Pressure Monitor",
    hospital: "Mayo Clinic",
    status: "Progresso",
  },
  {
    day: "May 6",
    technician: "Dr. Jennifer Miller",
    product: "Ultrasound Machine",
    hospital: "Stanford Health Care",
    status: "Concluido",
  },
  {
    day: "May 7",
    technician: "Dr. William Wilson",
    product: "X-Ray Machine",
    hospital: "UCLA Medical Center",
    status: "Progresso",
  },
  {
    day: "May 8",
    technician: "Dr. Emily Taylor",
    product: "ECG Machine",
    hospital: "Mount Sinai Hospital",
    status: "Progresso",
  },
  {
    day: "May 9",
    technician: "Dr. David Martinez",
    product: "Oxygen Concentrator",
    hospital: "Cedars-Sinai Medical Center",
    status: "Progresso",
  },
];

export const OSshower = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filter, setFilter] = useState<string>("Todas");

  const filteredOrders = orders.filter((order) => {
    if (filter !== "Todas" && order.status !== filter) return false;
    if (searchTerm === "") return true;
    return (
      order.technician.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.product.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.hospital.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleFilterClick = (status: string) => {
    setFilter(status);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Ordem de serviços</h1>

      <input
        type="text"
        placeholder="Pesquise por hospital..."
        className="w-full mb-4 p-2 border rounded-md bg-gray-800 text-white"
        value={searchTerm}
        onChange={handleSearchChange}
      />

      <div className="flex space-x-4 mb-4">
        {["Todas", "Progresso", "Concluido"].map((status) => (
          <FilterButton
            key={status}
            status={status}
            currentFilter={filter}
            onClick={handleFilterClick}
          />
        ))}
      </div>

      <Table orders={filteredOrders} />
    </div>
  );
};
