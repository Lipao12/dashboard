export const OSForm = () => {
  return (
    <form className="flex flex-col space-y-4">
      <h2 className="text-2xl font-bold text-white">
        Cadastro de Ordem de Serviço (OS)
      </h2>
      <input
        type="text"
        placeholder="Descrição da OS"
        className="p-2 border rounded-md"
      />
      <input
        type="text"
        placeholder="Responsável Técnico"
        className="p-2 border rounded-md"
      />
      <input
        type="date"
        placeholder="Data de Execução"
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
