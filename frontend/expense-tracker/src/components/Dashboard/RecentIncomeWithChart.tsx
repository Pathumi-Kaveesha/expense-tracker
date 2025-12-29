import React, { useEffect, useState } from "react";
import CustomPieChart from "../Charts/CustomPieChart";

// Define the shape of income items
interface IncomeItem {
  source: string;
  amount: number;
}

interface RecentIncomeWithChartProps {
  data: IncomeItem[];
  totalIncome: number;
}

const COLORS = ["#875CF5", "#FA2C37", "#FF6900", "#4f39f6"];

const RecentIncomeWithChart: React.FC<RecentIncomeWithChartProps> = ({
  data,
  totalIncome,
}) => {
  const [chartData, setChartData] = useState<
    { name: string; amount: number }[]
  >([]);

  const prepareChartData = () => {
    const dataArr = data?.map((item) => ({
      name: item.source,
      amount: item.amount,
    }));
    setChartData(dataArr);
  };

  useEffect(() => {
    prepareChartData();
  }, [data]);

  return (
    <div className="card">
      <div className="flex items-center justify-between">
        <h5 className="text-lg">Last 60 Days Income</h5>
      </div>

      <CustomPieChart
        data={chartData}
        label="Total Income"
        totalAmount={`$${totalIncome}`}
        showTextAnchor
        colors={COLORS}
      />
    </div>
  );
};

export default RecentIncomeWithChart;
