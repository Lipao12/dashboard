import React, { createContext, ReactNode, useContext, useState } from "react";
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
  const [orders, setOrders] = useState<Order[]>([
    {
      id: "0",
      day: "24/08/2020",
      technician: "Dr. John Smith",
      product: "Pacemaker",
      hospital: "NYU Langone Medical Center",
      status: "Progresso",
      priority: "Urgente",
    },
    {
      id: "1",
      day: "25/08/2020",
      technician: "Dr. Jane Doe",
      product: "Stethoscope",
      hospital: "Cleveland Clinic",
      status: "Progresso",
      priority: "Alta",
    },
    {
      id: "2",
      day: "26/08/2020",
      technician: "Dr. Robert Johnson",
      product: "MRI Scanner",
      hospital: "Massachusetts General Hospital",
      status: "Progresso",
      priority: "Média",
    },
    {
      id: "3",
      day: "27/08/2020",
      technician: "Dr. Lisa Davis",
      product: "Defibrillator",
      hospital: "Johns Hopkins Hospital",
      status: "Progresso",
      priority: "Alta",
    },
    {
      id: "4",
      day: "28/08/2020",
      technician: "Dr. Michael Brown",
      product: "Blood Pressure Monitor",
      hospital: "Mayo Clinic",
      status: "Progresso",
      priority: "Baixa",
    },
    {
      id: "5",
      day: "29/08/2020",
      technician: "Dr. Jennifer Miller",
      product: "Ultrasound Machine",
      hospital: "Stanford Health Care",
      status: "Concluido",
      priority: "Média",
    },
    {
      id: "6",
      day: "30/08/2020",
      technician: "Dr. William Wilson",
      product: "X-Ray Machine",
      hospital: "UCLA Medical Center",
      status: "Progresso",
      priority: "Urgente",
    },
    {
      id: "7",
      day: "31/08/2020",
      technician: "Dr. Emily Taylor",
      product: "ECG Machine",
      hospital: "Mount Sinai Hospital",
      status: "Progresso",
      priority: "Baixa",
    },
    {
      id: "8",
      day: "01/09/2020",
      technician: "Dr. Alice Turner",
      product: "Ventilator",
      hospital: "Houston Methodist Hospital",
      status: "Progresso",
      priority: "Urgente",
    },
    {
      id: "9",
      day: "02/09/2020",
      technician: "Dr. Carlos Martinez",
      product: "CT Scanner",
      hospital: "Cedars-Sinai Medical Center",
      status: "Progresso",
      priority: "Alta",
    },
    {
      id: "10",
      day: "03/09/2020",
      technician: "Dr. Sophia Johnson",
      product: "ECG Machine",
      hospital: "NewYork-Presbyterian Hospital",
      status: "Progresso",
      priority: "Urgente",
    },
    {
      id: "11",
      day: "04/09/2020",
      technician: "Dr. George Harris",
      product: "Pacemaker",
      hospital: "Massachusetts General Hospital",
      status: "Progresso",
      priority: "Média",
    },
    {
      id: "12",
      day: "05/09/2020",
      technician: "Dr. Olivia Lee",
      product: "X-Ray Machine",
      hospital: "UCSF Medical Center",
      status: "Concluido",
      priority: "Urgente",
    },
    {
      id: "13",
      day: "06/09/2020",
      technician: "Dr. Benjamin Moore",
      product: "Ultrasound Machine",
      hospital: "Cleveland Clinic",
      status: "Progresso",
      priority: "Alta",
    },
    {
      id: "14",
      day: "07/09/2020",
      technician: "Dr. Lily Thompson",
      product: "Defibrillator",
      hospital: "Mount Sinai Hospital",
      status: "Progresso",
      priority: "Urgente",
    },
    {
      id: "15",
      day: "08/09/2020",
      technician: "Dr. Ethan Wilson",
      product: "MRI Scanner",
      hospital: "Johns Hopkins Hospital",
      status: "Progresso",
      priority: "Alta",
    },
    {
      id: "16",
      day: "09/09/2020",
      technician: "Dr. Chloe Evans",
      product: "Stethoscope",
      hospital: "Mayo Clinic",
      status: "Progresso",
      priority: "Baixa",
    },
    {
      id: "17",
      day: "10/09/2020",
      technician: "Dr. Mason Green",
      product: "Blood Pressure Monitor",
      hospital: "NYU Langone Medical Center",
      status: "Progresso",
      priority: "Urgente",
    },
    {
      id: "18",
      day: "11/09/2020",
      technician: "Dr. Ella Davis",
      product: "Ventilator",
      hospital: "Stanford Health Care",
      status: "Progresso",
      priority: "Urgente",
    },
    {
      id: "19",
      day: "12/09/2020",
      technician: "Dr. Noah Hall",
      product: "CT Scanner",
      hospital: "Houston Methodist Hospital",
      status: "Concluido",
      priority: "Média",
    },
    {
      id: "20",
      day: "13/09/2020",
      technician: "Dr. Ava Martinez",
      product: "ECG Machine",
      hospital: "Cedars-Sinai Medical Center",
      status: "Progresso",
      priority: "Baixa",
    },
  ]);

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
