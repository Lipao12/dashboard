import { FiX } from "react-icons/fi";

interface OsModalProps {
  order: {
    id: string;
    day: string;
    technician: string;
    product: string;
    hospital: string;
    status: string;
  };
  setShowModal: () => void;
}

export const OsModal = ({ order, setShowModal }: OsModalProps) => {
  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
      <div className="bg-zinc-900 p-6 rounded-lg shadow-lg w-96">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Detalhes da OS</h2>
            <button type="button" onClick={setShowModal}>
              <FiX className="size-5 text-zinc-400" />
              {""}
            </button>
          </div>
          <div className="mt-4">
            <p>
              <strong>Dia:</strong> {order.day}
            </p>
            <p>
              <strong>Técnico:</strong> {order.technician}
            </p>
            <p>
              <strong>Equipamento:</strong> {order.product}
            </p>
            <p>
              <strong>Hospital:</strong> {order.hospital}
            </p>
            <p>
              <strong>Status:</strong> {order.status}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
