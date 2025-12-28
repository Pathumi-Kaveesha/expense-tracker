import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import CustomTooltip from "./CustomTooltip";
import CustomLegend from "./CustomLegend";

// Define the shape of the data items
interface ChartData {
  name: string;
  amount: number; // Recharts needs numbers for the pie math
}

// Define the Props
interface CustomPieChartProps {
  // We accept the data as 'any' or a broader type here to avoid conflicts
  // with the parent component's flexible string|number types
  data: any[];
  label: string;
  totalAmount: string;
  colors: string[];
  showTextAnchor?: boolean;
}

const CustomPieChart: React.FC<CustomPieChartProps> = ({
  data,
  label,
  totalAmount,
  colors,
  showTextAnchor,
}) => {
  return (
    <ResponsiveContainer width="100%" height={380}>
      <PieChart>
        <Pie
          data={data}
          dataKey="amount"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={130}
          innerRadius={100}
          labelLine={false}
        >
          {data.map((_, index) => (
            <Cell
              key={`cell-${index}`}
              fill={colors[index % colors.length]}
              stroke="none"
            />
          ))}
        </Pie>
        <Tooltip content={<CustomTooltip />} />
        <Legend content={<CustomLegend />} />

        {showTextAnchor && (
          <>
            <text
              x="50%"
              y="50%"
              dy={-20}
              textAnchor="middle"
              fill="#666"
              style={{ fontSize: "14px", fontWeight: 400 }}
            >
              {label}
            </text>
            <text
              x="50%"
              y="50%"
              dy={15}
              textAnchor="middle"
              fill="#333"
              style={{ fontSize: "24px", fontWeight: 700 }}
            >
              {totalAmount}
            </text>
          </>
        )}
      </PieChart>
    </ResponsiveContainer>
  );
};

export default CustomPieChart;
