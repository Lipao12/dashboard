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

  const projectStatus = [
    {
      name: "Progresso",
      count: filteredOrders.filter((task: Order) => task.status === "Progresso")
        .length,
    },
    {
      name: "Concluído",
      count: filteredOrders.filter((task: Order) => task.status === "Concluido")
        .length,
    },
  ];

  // Função para contar o número de ordens por prioridade
  const taskDistribution = filteredOrders.reduce(
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

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">DashBoard</h1>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="rounded-lg p-4 shadow">
          <h3 className="mb-4 text-lg font-semibold text-zinc-100">
            Distribuição de Prioridades
          </h3>
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
              <Bar dataKey="count" fill={chartColors.bar} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="rounded-lg p-4 shadow">
          <h3 className="mb-4 text-lg font-semibold text-zinc-100">
            Status das OS
          </h3>
          <ResponsiveContainer width={"100%"} height={300}>
            <PieChart data={taskDistribution}>
              <Pie dataKey={"count"} data={projectStatus} fill="#82CA9D" label>
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
        </div>
      </div>
    </div>
  );
};
