import React, { useEffect, useState } from "react";
import { LuPlus } from "react-icons/lu";
import CustomeBarChart from "../Charts/CustomeBarChart";
import { prepareIncomeBarChartData } from "../../utils/helper";

interface IncomeTransaction {
  _id: string;
  source: string;
  icon?: React.ReactNode;
  date: string;
  amount: number;
}

interface IncomeOverviewProps {
  transactions: IncomeTransaction[];
  onAddIncome: () => void;
}

interface ChartDataItem {
  month: string;
  amount: number;
  source: string;
}

const IncomeOverview: React.FC<IncomeOverviewProps> = ({
  transactions,
  onAddIncome,
}) => {
  const [chartData, setChartData] = useState<ChartDataItem[]>([]);

  useEffect(() => {
    const result = prepareIncomeBarChartData(transactions);
    setChartData(result);
  }, [transactions]);

  return (
    <div className="card">
      <div className="flex justify-between items-center">
        <div className="">
          <h5 className="text-lg">Income Overview</h5>
          <p className="text-xs text-gray-400 mt-0.5">
            Track your earnings over time and analyze your income trends.
          </p>
        </div>
        <button className="add-btn" onClick={onAddIncome}>
          <LuPlus className="text-lg" /> Add Income
        </button>
      </div>

      <div className="mt-10"></div>

      <CustomeBarChart
        data={chartData.map((item) => ({
          category: item.month,
          amount: item.amount,
        }))}
      />
    </div>
  );
};

export default IncomeOverview;
