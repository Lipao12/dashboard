export const TechnicianForm = () => {
  return (
    <form className="flex flex-col space-y-4">
      <h2 className="text-2xl font-bold text-white">Cadastro de Técnico</h2>
      <input
        type="text"
        placeholder="Nome do Técnico"
        className="p-2 border rounded-md"
      />
      <input
        type="text"
        placeholder="Especialidade"
        className="p-2 border rounded-md"
      />
      <input
        type="email"
        placeholder="E-mail"
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
