import { ChangeEvent } from "react";
import { useOSContext } from "../../context/OSContext";
import { FilterButton } from "./components/filter-button";
import { Table } from "./components/table";
import { OsModal } from "./modal/os-modal";

export const OSshower = () => {
  const {
    searchTerm,
    filter,
    showModal,
    selectedOrder,
    setSearchTerm,
    setFilter,
    handleOpenModal,
    handleCloseModal,
    filteredOrders,
  } = useOSContext();

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

      <Table orders={filteredOrders} handleOpenModal={handleOpenModal} />

      {showModal && selectedOrder && (
        <OsModal order={selectedOrder} setShowModal={handleCloseModal} />
      )}
    </div>
  );
};
