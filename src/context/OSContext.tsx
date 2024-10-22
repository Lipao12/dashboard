import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { pushData, readDataOnce } from "../lib/api";
import { OS } from "../types/types";

interface OSContextProps {
  orders: OS[];
  searchTerm: string;
  filter: string;
  showModal: boolean;
  selectedOrder: OS | null;
  orderQnt: number;
  loading: boolean;
  setSearchTerm: (term: string) => void;
  setFilter: (status: string) => void;
  handleOpenModal: (order: OS) => void;
  handleCloseModal: () => void;
  filteredOrders: OS[];
  addOrder: (newOrder: OS) => void;
}

const OSContext = createContext<OSContextProps | undefined>(undefined);

const OSProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [orders, setOrders] = useState<OS[]>([]);

  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filter, setFilter] = useState<string>("Todas");
  const [showModal, setShowModal] = useState<boolean>(false);
  const [selectedOrder, setSelectedOrder] = useState<OS | null>(null);
  const [orderQnt, setOrderQnt] = useState(0);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Função para processar os dados recebidos do Firebase
    const processOrdersData = (data: any): OS[] => {
      const ordersArray: OS[] = [];

      // Itera sobre cada dia (chave no objeto principal)
      Object.keys(data).forEach((date) => {
        const dayOrders = data[date]; // Objeto com as ordens do dia

        // Itera sobre cada ordem dentro do dia
        Object.keys(dayOrders).forEach((orderId) => {
          const orderData = dayOrders[orderId];

          // Adiciona a data e o ID ao objeto de ordem
          const orderWithDateAndId: OS = {
            id: orderId,
            date, // Adicionando a data
            ...orderData, // Resto dos dados da ordem
          };

          // Adiciona a ordem processada ao array
          ordersArray.push(orderWithDateAndId);
        });
      });

      return ordersArray;
    };

    // Lê os dados do Firebase e processa
    readDataOnce(`ordem_de_servico/`).then((data: any) => {
      if (data) {
        const processedOrders = processOrdersData(data);
        setOrders(processedOrders);
        setOrderQnt(processedOrders.length); // Atualiza a quantidade de ordens
      }
    });

    setLoading(false);
  }, []);

  const addOrder = (newOrder: OS) => {
    const today = new Date().toISOString().split("T")[0];
    const path = `ordem_de_servico/${today}`;
    const { date, id, ...processOS } = newOrder;
    pushData(path, processOS);
  };

  const handleOpenModal = (order: OS) => {
    setSelectedOrder(order);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setSelectedOrder(null);
    setShowModal(false);
  };

  const filteredOrders = orders.filter((order) => {
    if (filter !== "Todas" && order.status !== filter) return false;
    if (searchTerm === "") return true;
    return (
      order.userID.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.equipment.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.client.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <OSContext.Provider
      value={{
        orders,
        searchTerm,
        filter,
        showModal,
        selectedOrder,
        orderQnt,
        filteredOrders,
        loading,
        setSearchTerm,
        setFilter,
        handleOpenModal,
        handleCloseModal,
        addOrder,
      }}
    >
      {children}
    </OSContext.Provider>
  );
};

// Hook para usar o contexto
const useOSContext = () => {
  const context = useContext(OSContext);
  if (!context) {
    throw new Error("useOSContext must be used within a OSProvider");
  }
  return context;
};

export { OSProvider, useOSContext };
