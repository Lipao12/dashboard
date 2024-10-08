import { useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useOSContext } from "../../context/OSContext";
import { Order } from "../../types/types";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];
const chartColors = {
  bar: "#8884D4",
  barGrid: "#303030",
  pieFiel: "#4A90E2",
  text: "#FFFFFF",
};

export const Dashboard = () => {
  const { filteredOrders } = useOSContext();
  const [filter, setFilter] = useState("ano");
  const [selectedYear, setSelectedYear] = useState(
    new Date().getFullYear().toString()
  );

  const handleFilterChange = (event: any) => {
    setFilter(event.target.value);
  };

  const handleYearChange = (event: any) => {
    setSelectedYear(event.target.value);
  };

  const filteredByPeriod = () => {
    const now = new Date();

    return filteredOrders.filter((order: Order) => {
      const [day, month, year] = order.day.split("/");
      const orderDate = new Date(`${year}-${month}-${day}`);

      console.log(selectedYear);
      console.log(orderDate.getFullYear());

      switch (filter) {
        case "dia":
          return orderDate.toDateString() === now.toDateString();
        case "semana":
          const startOfWeek = new Date(now);
          // Ajusta para o domingo (0) da semana atual
          startOfWeek.setDate(now.getDate() - now.getDay());
          const endOfWeek = new Date(startOfWeek);
          // Define o final da semana como o próximo sábado
          endOfWeek.setDate(startOfWeek.getDate() + 6);
          return orderDate >= startOfWeek && orderDate <= endOfWeek;

        case "mes":
          return (
            orderDate.getMonth() === now.getMonth() &&
            orderDate.getFullYear() === now.getFullYear()
          );
        case "ano":
          return orderDate.getFullYear() === parseInt(selectedYear);
        default:
          return true;
      }
    });
  };

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 10 }, (_, index) => currentYear - index);

  const projectStatus = [
    {
      name: "Progresso",
      count: filteredByPeriod().filter(
        (task: Order) => task.status === "Progresso"
      ).length,
    },
    {
      name: "Concluído",
      count: filteredByPeriod().filter(
        (task: Order) => task.status === "Concluido"
      ).length,
    },
  ];

  // Função para contar o número de ordens por prioridade
  const taskDistribution = filteredByPeriod().reduce(
    (acc: { name: string; count: number }[], task: Order) => {
      const existingPriority = acc.find((item) => item.name === task.priority);
      if (existingPriority) {
        existingPriority.count += 1;
      } else {
        acc.push({ name: task.priority, count: 1 });
      }
      return acc;
    },
    []
  );

  console.log(filteredByPeriod());
  console.log(taskDistribution);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">DashBoard</h1>

      <div className="mb-4 text-zinc-900">
        <label htmlFor="filter" className="text-gray-700">
          Filtrar por:{" "}
        </label>
        <select
          id="filter"
          value={filter}
          onChange={handleFilterChange}
          className="ml-2 p-2 border rounded-md"
        >
          <option value="dia">Dia</option>
          <option value="semana">Semana</option>
          <option value="mes">Mês</option>
          <option value="ano">Ano</option>
        </select>
      </div>

      {/* Componente de Seleção para o Ano */}
      {filter === "ano" && (
        <div className="mb-4 text-zinc-900">
          <label htmlFor="year" className="text-gray-700">
            Selecionar Ano:{" "}
          </label>
          <select
            id="year"
            value={selectedYear}
            onChange={handleYearChange}
            className="ml-2 p-2 border rounded-md"
          >
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
      )}

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="rounded-lg p-4 shadow">
          <h3 className="mb-4 text-lg font-semibold text-zinc-100">
            Distribuição de Prioridades
          </h3>
          {taskDistribution.length === 0 ? (
            <p className="text-gray-500">Nenhuma prioridade encontrada.</p>
          ) : (
            <ResponsiveContainer width={"100%"} height={300}>
              <BarChart data={taskDistribution}>
                <CartesianGrid
                  strokeDasharray={"3 3"}
                  stroke={chartColors.barGrid}
                />
                <XAxis dataKey={"name"} stroke={chartColors.text} />
                <YAxis stroke={chartColors.text} />
                <Tooltip
                  contentStyle={{
                    width: "min-content",
                    height: "min-content",
                  }}
                />
                <Legend />
                <Bar
                  dataKey="count"
                  fill={chartColors.bar}
                  name={"Quantidade"}
                />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>
        <div className="rounded-lg p-4 shadow">
          <h3 className="mb-4 text-lg font-semibold text-zinc-100">
            Status das OS
          </h3>
          {projectStatus[0].count === 0 && projectStatus[1].count === 0 ? (
            <p className="text-gray-500">Nenhum status encontrado.</p>
          ) : (
            <ResponsiveContainer width={"100%"} height={300}>
              <PieChart data={projectStatus}>
                <Pie
                  dataKey={"count"}
                  data={projectStatus}
                  fill="#82CA9D"
                  label
                >
                  {projectStatus.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>
    </div>
  );
};
