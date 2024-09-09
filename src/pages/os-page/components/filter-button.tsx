interface FilterButtonProps {
  status: string;
  currentFilter: string;
  onClick: (status: string) => void;
}

export const FilterButton = ({
  status,
  currentFilter,
  onClick,
}: FilterButtonProps) => (
  <button
    type="button"
    className={`px-4 py-2 rounded ${
      currentFilter === status
        ? "bg-gray-600 text-white"
        : "bg-gray-800 text-gray-400"
    }`}
    onClick={() => onClick(status)}
  >
    {status}
  </button>
);
