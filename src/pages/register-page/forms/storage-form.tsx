export const StorageForm = () => {
  return (
    <form className="flex flex-col space-y-4">
      <h2 className="text-2xl font-bold text-white">
        Cadastro de Peças para o Inventário
      </h2>
      <input
        type="text"
        placeholder="Nome do Item"
        className="p-2 border rounded-md"
      />
      <input
        type="text"
        placeholder="Quantidade"
        className="p-2 border rounded-md"
      />
      <input
        type="text"
        placeholder="Local de Armazenamento"
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
