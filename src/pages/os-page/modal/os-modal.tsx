import { FiX } from "react-icons/fi";
import { OS } from "../../../types/types";

interface OsModalProps {
  order: OS;
  setShowModal: () => void;
}

export const OsModal = ({ order, setShowModal }: OsModalProps) => {
  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
      <div className="bg-zinc-900 p-6 rounded-lg shadow-lg w-full max-w-3xl ">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Detalhes da OS</h2>
            <button type="button" onClick={setShowModal}>
              <FiX className="size-5 text-zinc-400" />
              {""}
            </button>
          </div>

          {/* Informações do cliente */}
          <div className="border-b pb-4">
            <h3 className="text-md font-semibold">Informações do Cliente</h3>
            <p>
              <strong>Nome:</strong> {order.client.name}
            </p>
            <p>
              <strong>Setor:</strong> {order.client.sector}
            </p>
            <p>
              <strong>Endereço:</strong> {order.client.address}
            </p>
            <p>
              <strong>Contato:</strong> {order.client.contact}
            </p>
            <p>
              <strong>Email:</strong> {order.client.email}
            </p>
            <p>
              <strong>Telefone:</strong> {order.client.phone}
            </p>
          </div>

          {/* Informações do equipamento */}
          <div className="border-b pb-4">
            <h3 className="text-md font-semibold">
              Informações do Equipamento
            </h3>
            <p>
              <strong>Equipamento:</strong> {order.equipment.equipment}
            </p>
            <p>
              <strong>Modelo:</strong> {order.equipment.model}
            </p>
            <p>
              <strong>Marca:</strong> {order.equipment.brand}
            </p>
            <p>
              <strong>Nº de Série:</strong> {order.equipment.serialNumber}
            </p>
            <p>
              <strong>Patrimônio:</strong> {order.equipment.patrimony}
            </p>
            <p>
              <strong>Tag:</strong> {order.equipment.tag}
            </p>
            <p>
              <strong>Defeito:</strong> {order.equipment.defect}
            </p>
            <p>
              <strong>Notas sobre o Equipamento:</strong>{" "}
              {order.equipment.equipmentNotes}
            </p>
          </div>

          {/* Informações da OS */}
          <div className="border-b pb-4">
            <h3 className="text-md font-semibold">Informações da OS</h3>
            <p>
              <strong>ID da OS:</strong> {order.id}
            </p>
            <p>
              <strong>Status:</strong> {order.status}
            </p>
            <p>
              <strong>Data:</strong> {order.date}
            </p>
            <p>
              <strong>Prioridade:</strong> {order.priority}
            </p>
            <p>
              <strong>Limpeza:</strong> {order.cleaning ? "Sim" : "Não"}
            </p>
            <p>
              <strong>Testes Funcionais:</strong>{" "}
              {order.testsFunc ? "Sim" : "Não"}
            </p>
            <p>
              <strong>Está apto para uso:</strong>{" "}
              {order.fitUse ? "Sim" : "Não"}
            </p>
            <p>
              <strong>Inspeção:</strong> {order.inspection ? "Sim" : "Não"}
            </p>
            <p>
              <strong>Observações:</strong> {order.obs}
            </p>
          </div>

          {order.activities && (
            <div>
              <h3 className="text-md font-semibold">Atividades Realizadas</h3>
              <div className="overflow-x-auto">
                <table className="table-auto w-full text-left text-sm text-gray-400">
                  <thead className="text-gray-300 bg-zinc-800">
                    <tr>
                      <th className="px-4 py-2">Atividade</th>
                      <th className="px-4 py-2">Início</th>
                      <th className="px-4 py-2">Fim</th>
                      <th className="px-4 py-2">Técnico</th>
                    </tr>
                  </thead>
                  <tbody>
                    {order.activities.map((activity, index) => (
                      <tr key={index} className="border-b border-zinc-700">
                        <td className="px-4 py-2">{activity.activity}</td>
                        <td className="px-4 py-2">{activity.start}</td>
                        <td className="px-4 py-2">{activity.end}</td>
                        <td className="px-4 py-2">{activity.technician}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
