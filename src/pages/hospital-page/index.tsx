import { ChangeEvent, useEffect, useState } from "react";
import { Table } from "./components/table";

const hospitals = [
  {
    id: "0",
    name: "Hospital das Clínicas",
    city: "São Paulo - SP",
    department: "Cardiologia",
    phone: "(11) 3333-4444",
    address: "Av. Dr. Enéas Carvalho de Aguiar, 155 - São Paulo",
  },
  {
    id: "1",
    name: "Hospital de Câncer de Barretos",
    city: "Barretos - SP",
    department: "Oncologia",
    phone: "(17) 3331-5000",
    address: "Av. Paulo de Tarso, 1200 - Barretos",
  },
  {
    id: "2",
    name: "Hospital São Luiz",
    city: "São Paulo - SP",
    department: "Neurologia",
    phone: "(11) 3395-4000",
    address: "R. São Luiz, 380 - São Paulo",
  },
  {
    id: "3",
    name: "Hospital das Forças Armadas",
    city: "Brasília - DF",
    department: "Ortopedia",
    phone: "(61) 3315-5000",
    address: "SGAN 607 - Brasília",
  },
  {
    id: "4",
    name: "Hospital Universitário",
    city: "Rio de Janeiro - RJ",
    department: "Pediatria",
    phone: "(21) 2244-6677",
    address: "Av. Pasteur, 250 - Rio de Janeiro",
  },
];

export const HospitalShower = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");

  const [debouncedSearchTerm, setDebouncedSearchTerm] =
    useState<string>(searchTerm);

  // Implementa debounce na busca
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 300);

    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm]);

  const filteredHospital = hospitals.filter((hospital) => {
    if (debouncedSearchTerm === "") return true;
    return (
      hospital.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
      hospital.city.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
      hospital.department
        .toLowerCase()
        .includes(debouncedSearchTerm.toLowerCase())
    );
  });

  /*const filteredHospital = hospitals.filter((hospital) => {
    if (searchTerm === "") return true;
    return (
      hospital.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      hospital.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
      hospital.department.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });*/

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Hospitais</h1>
      <input
        type="text"
        placeholder="Pesquise por hospital..."
        aria-label="Pesquisar hospitais"
        className="w-full mb-4 p-2 border rounded-md bg-gray-800 text-white"
        value={searchTerm}
        onChange={handleSearchChange}
      />
      {filteredHospital.length === 0 ? (
        <p className="text-gray-400">Nenhum hospital encontrado.</p>
      ) : (
        <Table hospitals={filteredHospital} />
      )}
    </div>
  );
};
