import { child, get, onValue, push, ref, set, update } from "firebase/database";
import { FIREBASE_DATASET } from './firebase';

// Função para leitura única de dados
export const readDataOnce = async <T>(path: string): Promise<T | null> => {
    const dbRef = ref(FIREBASE_DATASET);
    try {
      const snapshot = await get(child(dbRef, path));
      if (snapshot.exists()) {
        return snapshot.val() as T;
      } else {
        console.log("No data available");
        return null;
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  };
  
  // Função para ouvir dados em tempo real
  export const readDataOnValue = <T extends object>(path: string, callback: (data: (T & { id: string })[]) => void): void => {
    const dbRef = ref(FIREBASE_DATASET, path);
    onValue(dbRef, (snapshot) => {
      const data = snapshot.val() as Record<string, T>;
      const formattedData = Object.keys(data).map(key => ({
        id: key,
        ...data[key]
      }));
      callback(formattedData);
    }, {
      onlyOnce: false
    });
  };

  export const writeData = async (path: string, data: any): Promise<void> => {
    const dbRef = ref(FIREBASE_DATASET, path);
    try {
      await set(dbRef, data);
      console.log("Data saved successfully!");
    } catch (error) {
      console.error("Data could not be saved.", error);
      throw error;
    }
  };
  
  // Função para adicionar novos dados em uma lista
  export const pushData = async (path: string, data: any): Promise<void> => {
    const dbRef = ref(FIREBASE_DATASET, path);
    const newRef = push(dbRef);
    try {
      await set(newRef, data);
      console.log("Data pushed successfully!");
    } catch (error) {
      console.error("Data could not be pushed.", error);
      throw error;
    }
  };
  
  // Função para atualizar parcialmente os dados
  export const updateData = async (path: string, data: any): Promise<void> => {
    const dbRef = ref(FIREBASE_DATASET, path);
    try {
      await update(dbRef, data);
      console.log("Data updated successfully!");
    } catch (error) {
      console.error("Data could not be updated.", error);
      throw error;
    }
  };