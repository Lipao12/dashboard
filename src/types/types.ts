export interface Order {
    id: string;
    day: string;
    technician: string;
    product: string;
    hospital: string;
    status: string;
    priority: string
  }

export interface Technician {
    id: string;
    name: string;
    specialty: string;
    phone: string;
  }

  export interface Hospital {
    id: string;
    name: string;
    city: string;
    department: string;
    phone: string;
    address: string;
  }

  export interface Activity {
    activity: string; 
    start: string;    
    end: string;      
    technician: string; 
  }

  export interface Client {
    address: string;
    contact: string;
    email: string;
    id: string;
    name: string;
    phone: string;
    sector: string;
  }

  export interface Equipment {
    brand: string;
    defect: string;
    description: string;
    equipment: string;
    equipmentNotes: string;
    model: string;
    patrimony: string;
    serialNumber: string;
    tag: string;
  }

  export interface OS {
    id: string,
    activities: Activity[];
    cleaning: boolean;
    client: Client;
    equipment: Equipment;
    fitUse: boolean;
    inspection: boolean;
    obs: string;
    status: string; 
    testsFunc: boolean;
    userID: string;
    date: string;
    priority: string;
  }