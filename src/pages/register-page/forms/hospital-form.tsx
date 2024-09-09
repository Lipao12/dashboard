export const HospitalForm = () => {
  return (
    <form className="flex flex-col space-y-4">
      <h2 className="text-2xl font-bold">Cadastro de Hospital</h2>
      <input
        type="text"
        placeholder="Nome do Hospital"
        className="p-2 border rounded-md"
      />
      <input
        type="text"
        placeholder="Endereço"
        className="p-2 border rounded-md"
      />
      <input
        type="text"
        placeholder="Telefone"
        className="p-2 border rounded-md"
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
