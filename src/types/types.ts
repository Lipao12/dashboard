export interface Order {
    id: string;
    day: string;
    technician: string;
    product: string;
    hospital: string;
    status: string;
  }

export interface Technician {
    id: string;
    name: string;
    phone: string;
    location: string;
  }

  export interface Hospital {
    id: string;
    name: string;
    city: string;
    department: string;
    phone: string;
    address: string;
  }