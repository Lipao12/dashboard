import { ChangeEvent, useEffect, useState } from "react";
import * as XLSX from "xlsx";
import { Table } from "./components/table";

export const StockShower = () => {
  const [data, setData] = useState<any[]>([]); // Armazena os dados do XLS
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] =
    useState<string>(searchTerm);

  // Estados para controlar a paginação
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // Número de itens por página

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 300);

    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm]);

  // Função para carregar o arquivo XLS
  const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const data = new Uint8Array(event.target?.result as ArrayBuffer);
        const workbook = XLSX.read(data, { type: "array" });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(sheet);
        setData(jsonData as any[]);
      };
      reader.readAsArrayBuffer(file);
    }
  };

  // Filtragem dos itens
  const filteredData = data.filter((item) => {
    if (debouncedSearchTerm === "") return true;
    return Object.values(item).some((val) =>
      String(val).toLowerCase().includes(debouncedSearchTerm.toLowerCase())
    );
  });

  // Paginação
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  // Handlers para navegação da página
  const nextPage = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  const prevPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Estoque</h1>

      {/* Campo de busca */}
      <input
        type="text"
        placeholder="Pesquise no estoque..."
        aria-label="Pesquisar estoque"
        className="w-full mb-4 p-2 border rounded-md bg-gray-800 text-white"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {/* Upload do arquivo XLS */}
      <label>
        {""}
        <input
          type="file"
          accept=".xlsx, .xls"
          onChange={handleFileUpload}
          className="mb-4"
        />
      </label>

      {/* Tabela de resultados */}
      {currentItems.length === 0 ? (
        <p className="text-gray-400">Nenhum item encontrado.</p>
      ) : (
        <Table items={currentItems} />
      )}

      {/* Botões de paginação */}
      <div className="flex justify-between mt-4">
        <button
          onClick={prevPage}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-700 text-white rounded-md disabled:opacity-50"
        >
          Anterior
        </button>
        <span className="text-white">
          Página {currentPage} de {totalPages}
        </span>
        <button
          onClick={nextPage}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-gray-700 text-white rounded-md disabled:opacity-50"
        >
          Próxima
        </button>
      </div>
    </div>
  );
};
