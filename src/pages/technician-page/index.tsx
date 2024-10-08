import { useEffect, useState } from "react";
import { readDataOnce } from "../../lib/api";
import { Table } from "./components/table";

export const TechnicianShower = () => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTechnicians = async () => {
      try {
        console.log("Fetching technicians...");
        const fetchedData = await readDataOnce(`tecnicos/`);
        if (fetchedData) {
          // Transformando os dados no formato [{id, name, phone, specialty}]
          const transformedData = Object.entries(fetchedData).map(
            ([id, technician]: [string, any]) => ({
              id,
              name: technician.name,
              phone: technician.phone,
              specialty: technician.specialty,
            })
          );
          console.log(
            "Technicians fetched and transformed successfully:",
            transformedData
          );
          setData(transformedData);
        } else {
          console.log("No data found for technicians.");
          setData([]);
        }
      } catch (err) {
        console.error("Error fetching technicians:", err);
        setError("Error fetching technicians. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchTechnicians();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-white"></div>
        <span className="text-white ml-4">
          Carregando dados dos técnicos...
        </span>
      </div>
    );
  }

  if (error) {
    return <div className="p-4 text-red-500">{error}</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Técnicos</h1>
      <Table technicians={data} />
    </div>
  );
};
