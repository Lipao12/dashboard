import { Table } from "./components/table";

const technicians = [
  {
    id: "0",
    name: "Dr. John Smith",
    phone: "(11) 98765-4321",
    location: "São Paulo - SP",
  },
  {
    id: "1",
    name: "Dr. Jane Doe",
    phone: "(21) 97654-3210",
    location: "Rio de Janeiro - RJ",
  },
  {
    id: "2",
    name: "Dr. Robert Johnson",
    phone: "(31) 96543-2109",
    location: "Belo Horizonte - MG",
  },
  {
    id: "3",
    name: "Dr. Lisa Davis",
    phone: "(41) 95432-1098",
    location: "Curitiba - PR",
  },
  {
    id: "4",
    name: "Dr. Michael Brown",
    phone: "(51) 94321-0987",
    location: "Porto Alegre - RS",
  },
  {
    id: "5",
    name: "Dr. Jennifer Miller",
    phone: "(61) 93210-9876",
    location: "Brasília - DF",
  },
  {
    id: "6",
    name: "Dr. William Wilson",
    phone: "(71) 92109-8765",
    location: "Salvador - BA",
  },
  {
    id: "7",
    name: "Dr. Emily Taylor",
    phone: "(81) 91098-7654",
    location: "Recife - PE",
  },
  {
    id: "8",
    name: "Dr. David Martinez",
    phone: "(91) 90987-6543",
    location: "Belém - PA",
  },
];

export const TechnicianShower = () => {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Técnicos</h1>
      <Table technicians={technicians} />
    </div>
  );
};
