import React, { createContext, ReactNode, useContext, useState } from "react";
import { Order } from "../types/types";

interface OSContextProps {
  orders: Order[];
  searchTerm: string;
  filter: string;
  showModal: boolean;
  selectedOrder: Order | null;
  setSearchTerm: (term: string) => void;
  setFilter: (status: string) => void;
  handleOpenModal: (order: Order) => void;
  handleCloseModal: () => void;
  filteredOrders: Order[];
  addOrder: (newOrder: Order) => void;
}

const OSContext = createContext<OSContextProps | undefined>(undefined);

const OSProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [orders, setOrders] = useState<Order[]>([
    {
      id: "0",
      day: "May 1",
      technician: "Dr. John Smith",
      product: "Pacemaker",
      hospital: "NYU Langone Medical Center",
      status: "Progresso",
    },
    {
      id: "1",
      day: "May 2",
      technician: "Dr. Jane Doe",
      product: "Stethoscope",
      hospital: "Cleveland Clinic",
      status: "Progresso",
    },
    {
      id: "2",
      day: "May 3",
      technician: "Dr. Robert Johnson",
      product: "MRI Scanner",
      hospital: "Massachusetts General Hospital",
      status: "Progresso",
    },
    {
      id: "3",
      day: "May 4",
      technician: "Dr. Lisa Davis",
      product: "Defibrillator",
      hospital: "Johns Hopkins Hospital",
      status: "Progresso",
    },
    {
      id: "4",
      day: "May 5",
      technician: "Dr. Michael Brown",
      product: "Blood Pressure Monitor",
      hospital: "Mayo Clinic",
      status: "Progresso",
    },
    {
      id: "5",
      day: "May 6",
      technician: "Dr. Jennifer Miller",
      product: "Ultrasound Machine",
      hospital: "Stanford Health Care",
      status: "Concluido",
    },
    {
      id: "6",
      day: "May 7",
      technician: "Dr. William Wilson",
      product: "X-Ray Machine",
      hospital: "UCLA Medical Center",
      status: "Progresso",
    },
    {
      id: "7",
      day: "May 8",
      technician: "Dr. Emily Taylor",
      product: "ECG Machine",
      hospital: "Mount Sinai Hospital",
      status: "Progresso",
    },
  ]);

  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filter, setFilter] = useState<string>("Todas");
  const [showModal, setShowModal] = useState<boolean>(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const addOrder = (newOrder: Order) => {
    setOrders((prevOrders) => [...prevOrders, newOrder]);
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
        setSearchTerm,
        setFilter,
        handleOpenModal,
        handleCloseModal,
        filteredOrders,
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
