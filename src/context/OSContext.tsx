import React, { createContext, ReactNode, useContext, useState } from "react";
import { order } from "../../public/os";
import { Order } from "../types/types";

interface OSContextProps {
  orders: Order[];
  searchTerm: string;
  filter: string;
  showModal: boolean;
  selectedOrder: Order | null;
  orderQnt: number;
  setSearchTerm: (term: string) => void;
  setFilter: (status: string) => void;
  handleOpenModal: (order: Order) => void;
  handleCloseModal: () => void;
  filteredOrders: Order[];
  addOrder: (newOrder: Order) => void;
}

const OSContext = createContext<OSContextProps | undefined>(undefined);

const OSProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [orders, setOrders] = useState<Order[]>(order);

  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filter, setFilter] = useState<string>("Todas");
  const [showModal, setShowModal] = useState<boolean>(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [orderQnt, setOrderQnt] = useState(orders.length);

  const addOrder = (newOrder: Order) => {
    setOrders((prevOrders) => {
      const updatedOrders = [...prevOrders, newOrder];
      setOrderQnt(updatedOrders.length);
      return updatedOrders;
    });
  };

  const handleOpenModal = (order: Order) => {
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
      order.technician.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.product.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.hospital.toLowerCase().includes(searchTerm.toLowerCase())
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
