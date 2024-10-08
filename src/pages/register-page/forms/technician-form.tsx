import { useState } from "react";
import { pushData } from "../../../lib/api";

export const TechnicianForm = () => {
  const [newTechnician, setNewTechnician] = useState({
    name: "",
    specialty: "",
    phone: "",
  });

  const formatPhoneNumber = (phone: string) => {
    const cleaned = phone.replace(/\D/g, "");
    const match = cleaned.match(/^(\d{2})(\d{5})(\d{4})$/);
    if (match) {
      return `(${match[1]}) ${match[2]}-${match[3]}`;
    }
    return phone;
  };

  const handleSubmitNewTec = (e: React.FormEvent) => {
    e.preventDefault();

    pushData(`tecnicos/`, newTechnician);

    setNewTechnician({
      name: "",
      specialty: "",
      phone: "",
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "phone") {
      setNewTechnician({ ...newTechnician, [name]: formatPhoneNumber(value) });
    } else {
      setNewTechnician({ ...newTechnician, [name]: value });
    }
  };

  return (
    <form className="flex flex-col space-y-4" onSubmit={handleSubmitNewTec}>
      <h2 className="text-2xl font-bold text-white">Cadastro de Técnico</h2>
      <input
        type="text"
        name="name"
        placeholder="Nome do Técnico"
        className="p-2 border rounded-md"
        value={newTechnician.name}
        onChange={handleInputChange}
        required
      />
      <input
        type="text"
        name="specialty"
        placeholder="Especialidade"
        className="p-2 border rounded-md"
        value={newTechnician.specialty}
        onChange={handleInputChange}
        required
      />
      <input
        type="text"
        name="phone"
        placeholder="Celular"
        className="p-2 border rounded-md"
        value={newTechnician.phone}
        onChange={handleInputChange}
        maxLength={15}
        required
      />
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded-md"
      >
        Cadastrar
      </button>
    </form>
  );
};
